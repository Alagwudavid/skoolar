'use client'

import { useEffect, useState, useTransition } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import Link from 'next/link'
import { getCommunityMembers, getCommunity, updateMemberRole, removeMember } from '@/actions/communities'
import { toast } from 'sonner'
import { MoreHorizontal, ShieldCheck, Shield, User, Trash2 } from 'lucide-react'

type CommunityRole = 'super_admin' | 'moderator' | 'member'

const ROLE_BADGE: Record<CommunityRole, { label: string; variant: 'default' | 'secondary' | 'outline' }> = {
    super_admin: { label: 'Super Admin', variant: 'default' },
    moderator: { label: 'Moderator', variant: 'secondary' },
    member: { label: 'Member', variant: 'outline' },
}

type Member = {
    id: string
    profile_id: string
    role: CommunityRole
    joined_at: string
    profile: {
        id: string
        username: string | null
        full_name: string | null
        avatar_url: string | null
    }
}

export default function GroupMembersPage({ params }: { params: { id: string } }) {
    const [searchQuery, setSearchQuery] = useState('')
    const [members, setMembers] = useState<Member[]>([])
    const [myRole, setMyRole] = useState<CommunityRole | null>(null)
    const [loading, setLoading] = useState(true)
    const [isPending, startTransition] = useTransition()

    useEffect(() => {
        Promise.all([
            getCommunityMembers(params.id),
            getCommunity(params.id),
        ]).then(([{ members }, { membership }]) => {
            setMembers(members as Member[])
            setMyRole(membership?.role ?? null)
            setLoading(false)
        })
    }, [params.id])

    const filteredMembers = members.filter(m =>
        (m.profile.full_name ?? m.profile.username ?? '').toLowerCase().includes(searchQuery.toLowerCase())
    )

    function handleRoleChange(profileId: string, newRole: 'moderator' | 'member') {
        startTransition(async () => {
            const result = await updateMemberRole(params.id, profileId, newRole)
            if (result?.error) {
                toast.error(result.error)
            } else {
                setMembers(prev => prev.map(m => m.profile_id === profileId ? { ...m, role: newRole } : m))
                toast.success('Role updated')
            }
        })
    }

    function handleRemove(profileId: string) {
        startTransition(async () => {
            const result = await removeMember(params.id, profileId)
            if (result?.error) {
                toast.error(result.error)
            } else {
                setMembers(prev => prev.filter(m => m.profile_id !== profileId))
                toast.success('Member removed')
            }
        })
    }

    const canManage = myRole === 'super_admin' || myRole === 'moderator'

    if (loading) {
        return (
            <div className="container max-w-4xl py-8 space-y-3 p-4">
                {Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-16 rounded-xl" />)}
            </div>
        )
    }

    return (
        <div className="container max-w-4xl py-8 p-4">
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle>Members ({members.length})</CardTitle>
                        <Button variant="outline" asChild>
                            <Link href={`/c/${params.id}`}>Back to Community</Link>
                        </Button>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Input
                        placeholder="Search members..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />

                    <div className="space-y-2">
                        {filteredMembers.map((member) => {
                            const display = member.profile.full_name ?? member.profile.username ?? 'Unknown'
                            const badge = ROLE_BADGE[member.role]
                            const isSelf = false // We don't have current user id here easily; manage via server actions
                            const canModify = canManage && member.role !== 'super_admin'

                            return (
                                <div
                                    key={member.id}
                                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50"
                                >
                                    <div className="flex items-center gap-3">
                                        <Avatar>
                                            <AvatarImage src={member.profile.avatar_url ?? undefined} />
                                            <AvatarFallback>{display.charAt(0).toUpperCase()}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="font-medium">{display}</p>
                                            {member.profile.username && (
                                                <p className="text-xs text-muted-foreground">@{member.profile.username}</p>
                                            )}
                                            <p className="text-xs text-muted-foreground">
                                                Joined {new Date(member.joined_at).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <Badge variant={badge.variant}>{badge.label}</Badge>

                                        {canModify && (
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon" disabled={isPending}>
                                                        <MoreHorizontal className="w-4 h-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    {myRole === 'super_admin' && member.role !== 'moderator' && (
                                                        <DropdownMenuItem onClick={() => handleRoleChange(member.profile_id, 'moderator')}>
                                                            <Shield className="w-4 h-4 mr-2" />
                                                            Make Moderator
                                                        </DropdownMenuItem>
                                                    )}
                                                    {myRole === 'super_admin' && member.role === 'moderator' && (
                                                        <DropdownMenuItem onClick={() => handleRoleChange(member.profile_id, 'member')}>
                                                            <User className="w-4 h-4 mr-2" />
                                                            Demote to Member
                                                        </DropdownMenuItem>
                                                    )}
                                                    <DropdownMenuItem
                                                        className="text-destructive focus:text-destructive"
                                                        onClick={() => handleRemove(member.profile_id)}
                                                    >
                                                        <Trash2 className="w-4 h-4 mr-2" />
                                                        Remove
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        )}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
