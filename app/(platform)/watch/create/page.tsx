'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export default function CreateGroupPage() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        type: 'public',
        category: 'general',
        rules: ''
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            // TODO: Implement create in Supabase
            // await supabase.from('groups').insert([formData])
            router.push('/groups')
        } catch (error) {
            console.error('Failed to create group:', error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="container max-w-2xl py-8">
            <Card>
                <CardHeader>
                    <CardTitle>Create a Group</CardTitle>
                    <CardDescription>
                        Start a new community around shared interests
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <Label htmlFor="name">Group Name</Label>
                            <Input
                                id="name"
                                placeholder="e.g., Computer Science Students"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                required
                            />
                        </div>

                        <div>
                            <Label htmlFor="description">Description</Label>
                            <textarea
                                id="description"
                                className="w-full min-h-[100px] px-3 py-2 border rounded-md"
                                placeholder="What is this group about?"
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                required
                            />
                        </div>

                        <div>
                            <Label htmlFor="type">Privacy</Label>
                            <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="public">Public - Anyone can join</SelectItem>
                                    <SelectItem value="private">Private - Approval required</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <Label htmlFor="category">Category</Label>
                            <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="general">General</SelectItem>
                                    <SelectItem value="academics">Academics</SelectItem>
                                    <SelectItem value="technology">Technology</SelectItem>
                                    <SelectItem value="business">Business</SelectItem>
                                    <SelectItem value="arts">Arts & Culture</SelectItem>
                                    <SelectItem value="sports">Sports</SelectItem>
                                    <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <Label htmlFor="rules">Group Rules (Optional)</Label>
                            <textarea
                                id="rules"
                                className="w-full min-h-[100px] px-3 py-2 border rounded-md"
                                placeholder="Set guidelines for members (one per line)"
                                value={formData.rules}
                                onChange={(e) => setFormData({ ...formData, rules: e.target.value })}
                            />
                        </div>

                        <div className="flex gap-2 pt-4">
                            <Button type="submit" disabled={loading}>
                                {loading ? 'Creating...' : 'Create Group'}
                            </Button>
                            <Button type="button" variant="outline" onClick={() => router.back()}>
                                Cancel
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
