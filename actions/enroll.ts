"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function enrollStudent(formData: FormData) {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: "User not authenticated" };
  }

  const schoolId = formData.get("schoolId") as string;
  const file = formData.get("studentId") as File | null;

  if (!schoolId) {
    return { error: "School is required" };
  }

  // Check if already enrolled
  const { data: existing } = await supabase
    .from("enrollments")
    .select("id")
    .eq("profile_id", user.id)
    .eq("school_id", schoolId)
    .single();

  if (existing) {
    return { error: "You have already requested enrollment at this school." };
  }

  let status = "pending";
  // Basic check for school email (if implemented later)
  if (user.email?.endsWith(".edu")) {
     // status = "verified"; 
  }

  // Handle File Upload if provided
  if (file && file.size > 0) {
    const fileExt = file.name.split('.').pop();
    const filePath = `student-ids/${user.id}/${Date.now()}.${fileExt}`;
    
    const { error: uploadError } = await supabase.storage
      .from('documents') // Assuming 'documents' bucket exists
      .upload(filePath, file);

    if (uploadError) {
      console.error('Upload error:', uploadError);
      return { error: "Failed to upload student ID. Please try again." };
    }
  } else if (status === "pending") {
     // If pending and no file? Maybe allow it but warn? 
     // For now, require file for non-auto-verified.
     // return { error: "Student ID update is required for verification." };
  }

  const { error: enrollError } = await supabase
    .from("enrollments")
    .insert({
      profile_id: user.id,
      school_id: schoolId,
      role: "student",
      status: status,
    });

  if (enrollError) {
    return { error: enrollError.message };
  }

  revalidatePath("/profile");
  redirect("/profile?message=Enrollment requested");
}
