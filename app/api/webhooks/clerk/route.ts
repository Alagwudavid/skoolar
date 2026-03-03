import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { Webhook } from 'svix';
import { createClient } from '@/utils/supabase/server';

type ClerkUserEvent = {
    type: 'user.created' | 'user.updated' | 'user.deleted';
    data: {
        id: string;
        email_addresses: { email_address: string; id: string }[];
        primary_email_address_id: string;
        first_name: string | null;
        last_name: string | null;
        image_url: string | null;
        username: string | null;
        deleted?: boolean;
    };
};

export async function POST(req: Request) {
    const secret = process.env.CLERK_WEBHOOK_SECRET;
    if (!secret) {
        return NextResponse.json({ error: 'Missing CLERK_WEBHOOK_SECRET' }, { status: 500 });
    }

    // Verify the webhook signature using svix
    const headersList = await headers();
    const svixId = headersList.get('svix-id');
    const svixTimestamp = headersList.get('svix-timestamp');
    const svixSignature = headersList.get('svix-signature');

    if (!svixId || !svixTimestamp || !svixSignature) {
        return NextResponse.json({ error: 'Missing svix headers' }, { status: 400 });
    }

    const payload = await req.text();

    let event: ClerkUserEvent;
    try {
        const wh = new Webhook(secret);
        event = wh.verify(payload, {
            'svix-id': svixId,
            'svix-timestamp': svixTimestamp,
            'svix-signature': svixSignature,
        }) as ClerkUserEvent;
    } catch {
        return NextResponse.json({ error: 'Invalid webhook signature' }, { status: 400 });
    }

    const { type, data } = event;

    try {
        const supabase = await createClient();

        if (type === 'user.created') {
            const primaryEmail = data.email_addresses.find(
                (e) => e.id === data.primary_email_address_id
            )?.email_address;

            const fullName =
                [data.first_name, data.last_name].filter(Boolean).join(' ') || null;

            await supabase.from('profiles').insert({
                clerk_id: data.id,
                email: primaryEmail ?? null,
                full_name: fullName,
                username: data.username ?? null,
                avatar_url: data.image_url ?? null,
            });
        }

        if (type === 'user.updated') {
            const primaryEmail = data.email_addresses.find(
                (e) => e.id === data.primary_email_address_id
            )?.email_address;

            const fullName =
                [data.first_name, data.last_name].filter(Boolean).join(' ') || null;

            await supabase.from('profiles').update({
                email: primaryEmail ?? null,
                full_name: fullName,
                username: data.username ?? null,
                avatar_url: data.image_url ?? null,
            }).eq('clerk_id', data.id);
        }

        if (type === 'user.deleted') {
            await supabase.from('profiles').delete().eq('clerk_id', data.id);
        }
    } catch (err) {
        console.error(`[clerk-webhook] Error handling ${type}:`, err);
        return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }

    return NextResponse.json({ received: true });
}
