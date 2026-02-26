'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@clerk/nextjs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export default function EditProfilePage() {
    const router = useRouter()
    const { user, isLoaded } = useUser()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [usernameError, setUsernameError] = useState('')
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        username: '',
        bio: '',
        location: '',
        institution: '',
        website: '',
        linkedin: '',
        github: '',
        twitter: ''
    })

    useEffect(() => {
        if (!isLoaded || !user) return
        const meta = (user.unsafeMetadata ?? {}) as Record<string, string>
        setFormData({
            firstName: user.firstName ?? '',
            lastName: user.lastName ?? '',
            username: user.username ?? '',
            bio: meta.bio ?? '',
            location: meta.location ?? '',
            institution: meta.institution ?? '',
            website: meta.website ?? '',
            linkedin: meta.linkedin ?? '',
            github: meta.github ?? '',
            twitter: meta.twitter ?? ''
        })
    }, [isLoaded, user])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!user) return
        setLoading(true)
        setError('')
        setUsernameError('')

        try {
            // Update profile fields (no username — Clerk requires extra verification for that)
            await user.update({
                firstName: formData.firstName,
                lastName: formData.lastName,
                unsafeMetadata: {
                    ...((user.unsafeMetadata ?? {}) as Record<string, string>),
                    bio: formData.bio,
                    location: formData.location,
                    institution: formData.institution,
                    website: formData.website,
                    linkedin: formData.linkedin,
                    github: formData.github,
                    twitter: formData.twitter,
                }
            })
        } catch (err: unknown) {
            const msg = err instanceof Error ? err.message : 'Failed to update profile'
            setError(msg)
            setLoading(false)
            return
        }

        // Attempt username update separately only if it changed
        const currentUsername = user.username ?? ''
        if (formData.username && formData.username !== currentUsername) {
            try {
                await user.update({ username: formData.username })
            } catch (err: unknown) {
                const msg = err instanceof Error ? err.message : 'Failed to update username'
                if (msg.toLowerCase().includes('verification') || msg.toLowerCase().includes('sensitive')) {
                    setUsernameError('Username change requires additional verification. Please update it via your account security settings.')
                } else {
                    setUsernameError(msg)
                }
                setLoading(false)
                return
            }
        }

        setLoading(false)
        router.push('/profile')
    }

    if (!isLoaded) return null

    const initials = (formData.firstName?.[0] ?? '') + (formData.lastName?.[0] ?? '') || user?.emailAddresses?.[0]?.emailAddress?.[0]?.toUpperCase() || 'U'

    return (
        <div className="container max-w-2xl py-8 px-4">
            <Card>
                <CardHeader>
                    <CardTitle>Edit Profile</CardTitle>
                    <CardDescription>Update your profile information</CardDescription>
                </CardHeader>
                <CardContent>
                    {error && (
                        <div className="mb-4 rounded-md bg-destructive/10 px-4 py-3 text-sm text-destructive">
                            {error}
                        </div>
                    )}
                    <div className="flex items-center gap-4 mb-6">
                        <Avatar className="h-20 w-20">
                            <AvatarImage src={user?.imageUrl} alt={user?.fullName ?? ''} />
                            <AvatarFallback className="text-xl">{initials}</AvatarFallback>
                        </Avatar>
                        <div className="text-sm text-muted-foreground">Profile photo is managed via your Clerk account settings.</div>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="firstName">First Name</Label>
                                <Input
                                    id="firstName"
                                    value={formData.firstName}
                                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="lastName">Last Name</Label>
                                <Input
                                    id="lastName"
                                    value={formData.lastName}
                                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="username">Username</Label>
                            <Input
                                id="username"
                                placeholder="your_username"
                                value={formData.username}
                                onChange={(e) => setFormData({ ...formData, username: e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, '') })}
                            />
                            {usernameError && (
                                <p className="text-sm text-destructive">{usernameError}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="bio">Bio</Label>
                            <Textarea
                                id="bio"
                                placeholder="Tell us about yourself"
                                value={formData.bio}
                                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                            />
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="location">Location</Label>
                                <Input
                                    id="location"
                                    placeholder="City, Country"
                                    value={formData.location}
                                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="institution">School/University</Label>
                                <Input
                                    id="institution"
                                    placeholder="Your school name"
                                    value={formData.institution}
                                    onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="website">Website</Label>
                            <Input
                                id="website"
                                type="url"
                                placeholder="https://yourwebsite.com"
                                value={formData.website}
                                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                            />
                        </div>

                        <div className="space-y-3">
                            <Label>Social Links</Label>

                            <div>
                                <Input
                                    placeholder="LinkedIn URL"
                                    value={formData.linkedin}
                                    onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                                />
                            </div>

                            <div>
                                <Input
                                    placeholder="GitHub URL"
                                    value={formData.github}
                                    onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                                />
                            </div>

                            <div>
                                <Input
                                    placeholder="Twitter/X URL"
                                    value={formData.twitter}
                                    onChange={(e) => setFormData({ ...formData, twitter: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="flex gap-2 pt-4">
                            <Button type="submit" disabled={loading}>
                                {loading ? 'Saving...' : 'Save Changes'}
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
