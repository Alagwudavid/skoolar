"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function registerSchool(formData: FormData) {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    // For now, redirect to login or handle error
    // redirect("/login?message=Could not authenticate user");
    return { error: "User not authenticated" };
  }

  const name = formData.get("name") as string;
  const slug = formData.get("slug") as string;
  const website = formData.get("website") as string;

  if (!name || !slug) {
    return { error: "Name and Slug are required" };
  }

  // Insert School
  const { data: school, error: schoolError } = await supabase
    .from("schools")
    .insert({
      name,
      slug,
      website_url: website,
      is_verified: false, // Default
    })
    .select()
    .single();

  if (schoolError) {
    return { error: schoolError.message };
  }

  // Insert Enrollment (Admit creator as Admin)
  const { error: enrollmentError } = await supabase
    .from("enrollments")
    .insert({
      profile_id: user.id,
      school_id: school.id,
      role: "admin",
      status: "verified",
    });

  if (enrollmentError) {
    // Setup rollback logic if needed, but for MVP just return error
    return { error: enrollmentError.message };
  }

  revalidatePath("/schools");
  redirect(`/schools/${slug}`);
}
