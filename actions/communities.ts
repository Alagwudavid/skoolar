"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createCommunity(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Not authenticated" };
  }

  const name = formData.get("name") as string;
  const description = formData.get("description") as string;

  if (!name) return { error: "Name is required" };

  const { data: community, error } = await supabase
    .from("communities")
    .insert({
      name,
      description,
      creator_id: user.id
    })
    .select()
    .single();

  if (error) return { error: error.message };

  // Add creator as member (admin)
  await supabase.from("community_members").insert({
    community_id: community.id,
    profile_id: user.id,
    role: "admin"
  });

  revalidatePath("/communities");
  redirect(`/communities/${community.id}`);
}

export async function joinCommunity(communityId: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return { error: "Not authenticated" };

  const { error } = await supabase.from("community_members").insert({
    community_id: communityId,
    profile_id: user.id,
    role: "member"
  });

  if (error) return { error: error.message };

  revalidatePath(`/communities/${communityId}`);
}

export async function sendMessage(communityId: string, content: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return { error: "Not authenticated" };

  const { error } = await supabase.from("messages").insert({
    community_id: communityId,
    sender_id: user.id,
    content
  });

  if (error) return { error: error.message };
}
