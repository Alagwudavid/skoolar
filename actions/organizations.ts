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

export async function createOrganization(formData: FormData) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return { error: "Not authenticated" };

    const name = formData.get("name") as string;
    const type = formData.get("type") as string;
    const description = formData.get("description") as string;
    const website_url = formData.get("website_url") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const location = formData.get("location") as string;

    if (!name?.trim()) return { error: "Name is required" };
    if (!type) return { error: "Organization type is required" };

    const baseSlug = generateSlug(name);
    const slug = `${baseSlug}-${Date.now().toString(36)}`;

    const { data: org, error } = await supabase
        .from("organizations")
        .insert({
            name: name.trim(),
            slug,
            type,
            description: description?.trim() || null,
            website_url: website_url?.trim() || null,
            email: email?.trim() || null,
            phone: phone?.trim() || null,
            location: location?.trim() || null,
            is_verified: false,
        })
        .select()
        .single();

    if (error) return { error: error.message };

    // Add creator as owner
    const { error: memberError } = await supabase
        .from("organization_members")
        .insert({
            org_id: org.id,
            profile_id: user.id,
            role: "owner",
        });

    if (memberError) return { error: memberError.message };

    revalidatePath("/orgs");
    redirect(`/orgs/${org.id}`);
}

export async function joinOrganization(orgId: string) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return { error: "Not authenticated" };

    const { data: existing } = await supabase
        .from("organization_members")
        .select("id")
        .eq("org_id", orgId)
        .eq("profile_id", user.id)
        .maybeSingle();

    if (existing) return { error: "Already a member" };

    const { error } = await supabase.from("organization_members").insert({
        org_id: orgId,
        profile_id: user.id,
        role: "member",
    });

    if (error) return { error: error.message };

    revalidatePath(`/orgs/${orgId}`);
    return { success: true };
}

export async function leaveOrganization(orgId: string) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return { error: "Not authenticated" };

    const { data: membership } = await supabase
        .from("organization_members")
        .select("role")
        .eq("org_id", orgId)
        .eq("profile_id", user.id)
        .maybeSingle();

    if (membership?.role === "owner") {
        return { error: "Owner must transfer ownership before leaving" };
    }

    const { error } = await supabase
        .from("organization_members")
        .delete()
        .eq("org_id", orgId)
        .eq("profile_id", user.id);

    if (error) return { error: error.message };

    revalidatePath(`/orgs/${orgId}`);
    return { success: true };
}

export async function updateOrgMemberRole(
    orgId: string,
    targetProfileId: string,
    newRole: "admin" | "moderator" | "member"
) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return { error: "Not authenticated" };

    const { data: callerMembership } = await supabase
        .from("organization_members")
        .select("role")
        .eq("org_id", orgId)
        .eq("profile_id", user.id)
        .maybeSingle();

    const callerRole = callerMembership?.role;
    if (callerRole !== "owner" && callerRole !== "admin") {
        return { error: "Only owners and admins can manage roles" };
    }

    // Admins cannot promote to admin or above
    if (callerRole === "admin" && newRole === "admin") {
        return { error: "Admins cannot grant admin role" };
    }

    const { error } = await supabase
        .from("organization_members")
        .update({ role: newRole })
        .eq("org_id", orgId)
        .eq("profile_id", targetProfileId);

    if (error) return { error: error.message };

    revalidatePath(`/orgs/${orgId}/members`);
    return { success: true };
}

export async function removeOrgMember(orgId: string, targetProfileId: string) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return { error: "Not authenticated" };

    const { data: callerMembership } = await supabase
        .from("organization_members")
        .select("role")
        .eq("org_id", orgId)
        .eq("profile_id", user.id)
        .maybeSingle();

    const callerRole = callerMembership?.role;
    if (!callerRole || !["owner", "admin", "moderator"].includes(callerRole)) {
        return { error: "Not authorized to remove members" };
    }

    const { data: targetMembership } = await supabase
        .from("organization_members")
        .select("role")
        .eq("org_id", orgId)
        .eq("profile_id", targetProfileId)
        .maybeSingle();

    const targetRole = targetMembership?.role;

    // Hierarchy enforcement
    if (targetRole === "owner") return { error: "Cannot remove the owner" };
    if (callerRole === "moderator" && targetRole !== "member") {
        return { error: "Moderators can only remove regular members" };
    }
    if (callerRole === "admin" && targetRole === "admin") {
        return { error: "Admins cannot remove other admins" };
    }

    const { error } = await supabase
        .from("organization_members")
        .delete()
        .eq("org_id", orgId)
        .eq("profile_id", targetProfileId);

    if (error) return { error: error.message };

    revalidatePath(`/orgs/${orgId}/members`);
    return { success: true };
}

export async function getOrganization(orgId: string) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    const { data: org, error } = await supabase
        .from("organizations")
        .select("*, organization_members(count)")
        .eq("id", orgId)
        .single();

    if (error) return { error: error.message, org: null, membership: null };

    let membership = null;
    if (user) {
        const { data } = await supabase
            .from("organization_members")
            .select("role")
            .eq("org_id", orgId)
            .eq("profile_id", user.id)
            .maybeSingle();
        membership = data;
    }

    return { org, membership, error: null };
}

export async function getOrganizations() {
    const supabase = await createClient();

    const { data: orgs, error } = await supabase
        .from("organizations")
        .select("*, organization_members(count)")
        .order("created_at", { ascending: false });

    if (error) return { error: error.message, orgs: [] };
    return { orgs: orgs ?? [], error: null };
}

export async function getOrgMembers(orgId: string) {
    const supabase = await createClient();

    const { data: members, error } = await supabase
        .from("organization_members")
        .select("*, profile:profiles(id, username, full_name, avatar_url)")
        .eq("org_id", orgId)
        .order("joined_at", { ascending: true });

    if (error) return { error: error.message, members: [] };
    return { members: members ?? [], error: null };
}
