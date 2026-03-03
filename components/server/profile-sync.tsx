import { auth } from "@clerk/nextjs/server";
import { createClient } from "@/utils/supabase/server";

// Silently upserts the Clerk user into Supabase profiles on first visit.
// Uses only auth() (JWT-based, no Clerk API call) to avoid network errors.
export default async function ProfileSync() {
    try {
        const { userId } = await auth();
        if (!userId) return null;

        const supabase = await createClient();

        // Only insert if profile doesn't exist yet
        const { data: existing } = await supabase
            .from("profiles")
            .select("id")
            .eq("clerk_id", userId)
            .maybeSingle();

        if (existing) return null;

        // Insert a minimal profile row — the Clerk webhook fills in details
        // when a user signs up. This handles existing accounts that predate the webhook.
        await supabase.from("profiles").insert({
            clerk_id: userId,
        });
    } catch (err) {
        // Never let a sync failure break the page
        console.error("[ProfileSync] Failed to sync profile:", err);
    }

    return null;
}
