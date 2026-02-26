import { clerkClient } from '@clerk/nextjs/server'
import { notFound } from 'next/navigation'
import UserProfileView from './UserProfileView'

export default async function UserProfilePage({ params }: { params: Promise<{ username: string }> }) {
    const { username } = await params
    const client = await clerkClient()
    const { data: users } = await client.users.getUserList({ username: [username] })
    const clerkUser = users[0]

    if (!clerkUser) notFound()

    const meta = (clerkUser.unsafeMetadata ?? {}) as Record<string, string>

    return (
        <UserProfileView
            imageUrl={clerkUser.imageUrl}
            displayName={clerkUser.fullName ?? clerkUser.emailAddresses?.[0]?.emailAddress ?? username}
            username={username}
            initials={clerkUser.firstName?.[0] ?? username[0]?.toUpperCase() ?? 'U'}
            bio={meta.bio ?? ''}
            location={meta.location ?? ''}
            school={meta.institution ?? ''}
            website={meta.website ?? ''}
            linkedin={meta.linkedin ?? ''}
            github={meta.github ?? ''}
            twitter={meta.twitter ?? ''}
        />
    )
}
