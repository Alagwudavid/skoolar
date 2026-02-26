'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { createCommunity } from '@/actions/communities'
import { toast } from 'sonner'

export default function CreateCommunityPage() {
    const router = useRouter()
    const [isPending, startTransition] = useTransition()
    const [type, setType] = useState('public')
    const [category, setCategory] = useState('general')
    const [error, setError] = useState<string | null>(null)

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setError(null)

        const formData = new FormData(e.currentTarget)
        formData.set('type', type)
        formData.set('category', category)

        startTransition(async () => {
            const result = await createCommunity(formData)
            if (result?.error) {
                setError(result.error)
                toast.error(result.error)
            }
        })
    }

    return (
        <div className="container max-w-2xl py-8">
            <Card>
                <CardHeader>
                    <CardTitle>Create a Community</CardTitle>
                    <CardDescription>
                        Start a community around shared interests. You will be the super admin.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-1.5">
                            <Label htmlFor="name">Community Name *</Label>
                            <Input
                                id="name"
                                name="name"
                                placeholder="e.g., Computer Science Students"
                                required
                                disabled={isPending}
                            />
                        </div>

                        <div className="space-y-1.5">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                name="description"
                                placeholder="What is this community about?"
                                className="min-h-25"
                                disabled={isPending}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <Label>Privacy</Label>
                                <Select value={type} onValueChange={setType} disabled={isPending}>
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="public">Public — Anyone can join</SelectItem>
                                        <SelectItem value="private">Private — Approval required</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-1.5">
                                <Label>Category</Label>
                                <Select value={category} onValueChange={setCategory} disabled={isPending}>
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="general">General</SelectItem>
                                        <SelectItem value="academics">Academics</SelectItem>
                                        <SelectItem value="technology">Technology</SelectItem>
                                        <SelectItem value="business">Business</SelectItem>
                                        <SelectItem value="arts">Arts &amp; Culture</SelectItem>
                                        <SelectItem value="sports">Sports</SelectItem>
                                        <SelectItem value="other">Other</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <Label htmlFor="rules">Community Rules</Label>
                            <Textarea
                                id="rules"
                                name="rules"
                                placeholder="Optional: Set ground rules for members…"
                                className="min-h-20"
                                disabled={isPending}
                            />
                        </div>

                        {error && (
                            <p className="text-sm text-destructive">{error}</p>
                        )}

                        <div className="flex gap-3 pt-2">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => router.back()}
                                disabled={isPending}
                            >
                                Cancel
                            </Button>
                            <Button type="submit" disabled={isPending} className="flex-1">
                                {isPending ? 'Creating…' : 'Create Community'}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
