"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export async function createCommunity(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return { error: "Not authenticated" };

  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const type = (formData.get("type") as string) || "public";
  const category = (formData.get("category") as string) || "general";
  const rules = formData.get("rules") as string;

  if (!name?.trim()) return { error: "Name is required" };

  const baseSlug = generateSlug(name);
  const slug = `${baseSlug}-${Date.now().toString(36)}`;

  const { data: group, error } = await supabase
    .from("groups")
    .insert({
      name: name.trim(),
      slug,
      description: description?.trim() || null,
      type,
      category,
      rules: rules?.trim() || null,
      creator_id: user.id,
    })
    .select()
    .single();

  if (error) return { error: error.message };

  // Add creator as super_admin
  const { error: memberError } = await supabase.from("group_members").insert({
    group_id: group.id,
    profile_id: user.id,
    role: "super_admin",
  });

  if (memberError) return { error: memberError.message };

  revalidatePath("/communities");
  redirect(`/c/${group.id}`);
}

export async function joinCommunity(groupId: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return { error: "Not authenticated" };

  // Check if already a member
  const { data: existing } = await supabase
    .from("group_members")
    .select("id")
    .eq("group_id", groupId)
    .eq("profile_id", user.id)
    .maybeSingle();

  if (existing) return { error: "Already a member" };

  const { error } = await supabase.from("group_members").insert({
    group_id: groupId,
    profile_id: user.id,
    role: "member",
  });

  if (error) return { error: error.message };

  revalidatePath(`/c/${groupId}`);
  return { success: true };
}

export async function leaveCommunity(groupId: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return { error: "Not authenticated" };

  // Super admin cannot leave — must transfer ownership first
  const { data: membership } = await supabase
    .from("group_members")
    .select("role")
    .eq("group_id", groupId)
    .eq("profile_id", user.id)
    .maybeSingle();

  if (membership?.role === "super_admin") {
    return { error: "Super admin must transfer ownership before leaving" };
  }

  const { error } = await supabase
    .from("group_members")
    .delete()
    .eq("group_id", groupId)
    .eq("profile_id", user.id);

  if (error) return { error: error.message };

  revalidatePath(`/c/${groupId}`);
  return { success: true };
}

export async function updateMemberRole(
  groupId: string,
  targetProfileId: string,
  newRole: "moderator" | "member"
) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return { error: "Not authenticated" };

  // Only super_admin can change roles
  const { data: callerMembership } = await supabase
    .from("group_members")
    .select("role")
    .eq("group_id", groupId)
    .eq("profile_id", user.id)
    .maybeSingle();

  if (callerMembership?.role !== "super_admin") {
    return { error: "Only the super admin can manage roles" };
  }

  const { error } = await supabase
    .from("group_members")
    .update({ role: newRole })
    .eq("group_id", groupId)
    .eq("profile_id", targetProfileId);

  if (error) return { error: error.message };

  revalidatePath(`/c/${groupId}/members`);
  return { success: true };
}

export async function removeMember(groupId: string, targetProfileId: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return { error: "Not authenticated" };

  const { data: callerMembership } = await supabase
    .from("group_members")
    .select("role")
    .eq("group_id", groupId)
    .eq("profile_id", user.id)
    .maybeSingle();

  const canRemove =
    callerMembership?.role === "super_admin" ||
    callerMembership?.role === "moderator";

  if (!canRemove) return { error: "Not authorized to remove members" };

  // Moderators cannot remove other moderators or super_admin
  if (callerMembership?.role === "moderator") {
    const { data: targetMembership } = await supabase
      .from("group_members")
      .select("role")
      .eq("group_id", groupId)
      .eq("profile_id", targetProfileId)
      .maybeSingle();

    if (
      targetMembership?.role === "super_admin" ||
      targetMembership?.role === "moderator"
    ) {
      return { error: "Moderators can only remove regular members" };
    }
  }

  const { error } = await supabase
    .from("group_members")
    .delete()
    .eq("group_id", groupId)
    .eq("profile_id", targetProfileId);

  if (error) return { error: error.message };

  revalidatePath(`/c/${groupId}/members`);
  return { success: true };
}

export async function getCommunity(groupId: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: group, error } = await supabase
    .from("groups")
    .select("*, group_members(count)")
    .eq("id", groupId)
    .single();

  if (error) return { error: error.message, group: null, membership: null };

  let membership = null;
  if (user) {
    const { data } = await supabase
      .from("group_members")
      .select("role")
      .eq("group_id", groupId)
      .eq("profile_id", user.id)
      .maybeSingle();
    membership = data;
  }

  return { group, membership, error: null };
}

export async function getCommunities() {
  const supabase = await createClient();

  const { data: groups, error } = await supabase
    .from("groups")
    .select("*, group_members(count)")
    .order("created_at", { ascending: false });

  if (error) return { error: error.message, groups: [] };
  return { groups: groups ?? [], error: null };
}

export async function getCommunityMembers(groupId: string) {
  const supabase = await createClient();

  const { data: members, error } = await supabase
    .from("group_members")
    .select("*, profile:profiles(id, username, full_name, avatar_url)")
    .eq("group_id", groupId)
    .order("joined_at", { ascending: true });

  if (error) return { error: error.message, members: [] };
  return { members: members ?? [], error: null };
}

export async function sendCommunityMessage(groupId: string, content: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return { error: "Not authenticated" };

  const { error } = await supabase.from("community_messages").insert({
    group_id: groupId,
    sender_id: user.id,
    content: content.trim(),
  });

  if (error) return { error: error.message };
  return { success: true };
}
