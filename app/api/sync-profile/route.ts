import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function POST() {
    const { userId } = await auth();
    if (!userId) {
        return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const supabase = await createClient();

    const { error } = await supabase.from("profiles").upsert(
        { clerk_id: userId },
        { onConflict: "clerk_id" }
    );

    if (error) {
        console.error("[sync-profile] Supabase error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ synced: true });
}
