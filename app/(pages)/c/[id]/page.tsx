'use client'

import { useEffect, useState, useTransition } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import Link from 'next/link'
import { getCommunity } from '@/actions/communities'
import { joinCommunity, leaveCommunity } from '@/actions/communities'
import { toast } from 'sonner'
import { Users, MessageSquare, Lock, Globe, ShieldCheck, Shield, User } from 'lucide-react'

type CommunityRole = 'super_admin' | 'moderator' | 'member'

const ROLE_LABELS: Record<CommunityRole, { label: string; icon: React.ElementType; variant: 'default' | 'secondary' | 'outline' }> = {
    super_admin: { label: 'Super Admin', icon: ShieldCheck, variant: 'default' },
    moderator: { label: 'Moderator', icon: Shield, variant: 'secondary' },
    member: { label: 'Member', icon: User, variant: 'outline' },
}

export default function GroupDetailPage({ params }: { params: { id: string } }) {
    const [community, setCommunity] = useState<any>(null)
    const [membership, setMembership] = useState<{ role: CommunityRole } | null>(null)
    const [loading, setLoading] = useState(true)
    const [isPending, startTransition] = useTransition()

    useEffect(() => {
        getCommunity(params.id).then(({ group, membership }) => {
            setCommunity(group)
            setMembership(membership)
            setLoading(false)
        })
    }, [params.id])

    const isMember = !!membership
    const myRole = membership?.role

    function handleJoinLeave() {
        startTransition(async () => {
            if (isMember) {
                const result = await leaveCommunity(params.id)
                if (result?.error) {
                    toast.error(result.error)
                } else {
                    setMembership(null)
                    toast.success('Left community')
                }
            } else {
                const result = await joinCommunity(params.id)
                if (result?.error) {
                    toast.error(result.error)
                } else {
                    setMembership({ role: 'member' })
                    toast.success('Joined community!')
                }
            }
        })
    }

    if (loading) {
        return (
            <div className="container max-w-4xl py-8 space-y-4 p-4">
                <Skeleton className="h-40 rounded-xl" />
                <Skeleton className="h-64 rounded-xl" />
            </div>
        )
    }

    if (!community) {
        return (
            <div className="container max-w-4xl py-16 text-center text-muted-foreground">
                Community not found.
            </div>
        )
    }

    const memberCount = community.group_members?.[0]?.count ?? 0
    const roleInfo = myRole ? ROLE_LABELS[myRole] : null

    return (
        <div className="container max-w-4xl py-8">
            <div className="space-y-6 p-4">
                <Card>
                    <CardHeader>
                        <div className="flex items-start justify-between gap-4">
                            <div className="space-y-2 flex-1">
                                <div className="flex items-center flex-wrap gap-2">
                                    <CardTitle className="text-3xl">{community.name}</CardTitle>
                                    <Badge variant={community.type === 'public' ? 'default' : 'secondary'} className="flex items-center gap-1">
                                        {community.type === 'public' ? <Globe className="w-3 h-3" /> : <Lock className="w-3 h-3" />}
                                        {community.type}
                                    </Badge>
                                    {community.category && (
                                        <Badge variant="outline" className="capitalize">{community.category}</Badge>
                                    )}
                                    {roleInfo && (
                                        <Badge variant={roleInfo.variant} className="flex items-center gap-1">
                                            <roleInfo.icon className="w-3 h-3" />
                                            {roleInfo.label}
                                        </Badge>
                                    )}
                                </div>
                                <CardDescription>{community.description ?? 'No description'}</CardDescription>
                            </div>
                            <Button
                                onClick={handleJoinLeave}
                                disabled={isPending || myRole === 'super_admin'}
                                variant={isMember ? 'outline' : 'default'}
                                size="lg"
                            >
                                {isPending ? '…' : isMember ? 'Leave' : 'Join'}
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="flex gap-6 text-sm text-muted-foreground flex-wrap">
                            <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /> {memberCount.toLocaleString()} members</span>
                            <span>Created {new Date(community.created_at).toLocaleDateString()}</span>
                        </div>
                    </CardContent>
                </Card>

                <div className="grid md:grid-cols-3 gap-6">
                    <div className="md:col-span-2 space-y-4">
                        {isMember && (
                            <Card>
                                <CardContent className="pt-4">
                                    <Button asChild className="w-full" variant="outline">
                                        <Link href={`/posts/create?community=${params.id}`}>
                                            What&apos;s on your mind?
                                        </Link>
                                    </Button>
                                </CardContent>
                            </Card>
                        )}
                        <Card>
                            <CardContent className="pt-6 text-center text-muted-foreground text-sm">
                                Posts from community members will appear here.
                            </CardContent>
                        </Card>
                    </div>

                    <div className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">About</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {community.rules && (
                                    <div>
                                        <h4 className="font-medium mb-2 text-sm">Community Rules</h4>
                                        <p className="text-sm text-muted-foreground whitespace-pre-line">{community.rules}</p>
                                        <Separator className="mt-3" />
                                    </div>
                                )}
                                <div className="space-y-2">
                                    <Button variant="outline" className="w-full" asChild>
                                        <Link href={`/c/${params.id}/members`}>
                                            <Users className="w-4 h-4 mr-2" />
                                            View Members
                                        </Link>
                                    </Button>
                                    {isMember && (
                                        <Button variant="outline" className="w-full" asChild>
                                            <Link href={`/c/${params.id}/chat`}>
                                                <MessageSquare className="w-4 h-4 mr-2" />
                                                Community Chat
                                            </Link>
                                        </Button>
                                    )}
                                    {(myRole === 'super_admin' || myRole === 'moderator') && (
                                        <Button variant="secondary" className="w-full" asChild>
                                            <Link href={`/c/${params.id}/members`}>
                                                <ShieldCheck className="w-4 h-4 mr-2" />
                                                Manage Members
                                            </Link>
                                        </Button>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}
