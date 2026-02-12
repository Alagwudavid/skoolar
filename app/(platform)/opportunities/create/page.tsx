'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export default function CreateOpportunityPage() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        title: '',
        type: 'internship',
        organization: '',
        location: '',
        deadline: '',
        description: '',
        requirements: '',
        benefits: '',
        compensation: '',
        duration: '',
        remoteOption: 'no'
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            // TODO: Implement create in Supabase
            // await supabase.from('opportunities').insert([formData])
            router.push('/opportunities')
        } catch (error) {
            console.error('Failed to create opportunity:', error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="container max-w-2xl py-8">
            <Card>
                <CardHeader>
                    <CardTitle>Post an Opportunity</CardTitle>
                    <CardDescription>
                        Create a new internship, scholarship, or placement opportunity
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <Label htmlFor="title">Title</Label>
                            <Input
                                id="title"
                                placeholder="e.g., Summer Engineering Internship"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                required
                            />
                        </div>

                        <div>
                            <Label htmlFor="type">Type</Label>
                            <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="internship">Internship</SelectItem>
                                    <SelectItem value="scholarship">Scholarship</SelectItem>
                                    <SelectItem value="placement">Placement</SelectItem>
                                    <SelectItem value="job">Job</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <Label htmlFor="organization">Organization</Label>
                            <Input
                                id="organization"
                                placeholder="Your organization name"
                                value={formData.organization}
                                onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                                required
                            />
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="location">Location</Label>
                                <Input
                                    id="location"
                                    placeholder="City, Country"
                                    value={formData.location}
                                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                    required
                                />
                            </div>

                            <div>
                                <Label htmlFor="deadline">Application Deadline</Label>
                                <Input
                                    id="deadline"
                                    type="date"
                                    value={formData.deadline}
                                    onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <Label htmlFor="description">Description</Label>
                            <textarea
                                id="description"
                                className="w-full min-h-[120px] px-3 py-2 border rounded-md"
                                placeholder="Describe the opportunity, responsibilities, and what candidates can expect..."
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                required
                            />
                        </div>

                        <div>
                            <Label htmlFor="requirements">Requirements</Label>
                            <textarea
                                id="requirements"
                                className="w-full min-h-[100px] px-3 py-2 border rounded-md"
                                placeholder="List the requirements (one per line)"
                                value={formData.requirements}
                                onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                            />
                        </div>

                        <div>
                            <Label htmlFor="benefits">Benefits</Label>
                            <textarea
                                id="benefits"
                                className="w-full min-h-[100px] px-3 py-2 border rounded-md"
                                placeholder="List the benefits (one per line)"
                                value={formData.benefits}
                                onChange={(e) => setFormData({ ...formData, benefits: e.target.value })}
                            />
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="compensation">Compensation</Label>
                                <Input
                                    id="compensation"
                                    placeholder="e.g., $5000/month"
                                    value={formData.compensation}
                                    onChange={(e) => setFormData({ ...formData, compensation: e.target.value })}
                                />
                            </div>

                            <div>
                                <Label htmlFor="duration">Duration</Label>
                                <Input
                                    id="duration"
                                    placeholder="e.g., 12 weeks"
                                    value={formData.duration}
                                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                                />
                            </div>
                        </div>

                        <div>
                            <Label htmlFor="remoteOption">Remote Work</Label>
                            <Select value={formData.remoteOption} onValueChange={(value) => setFormData({ ...formData, remoteOption: value })}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="no">On-site only</SelectItem>
                                    <SelectItem value="hybrid">Hybrid</SelectItem>
                                    <SelectItem value="yes">Fully remote</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="flex gap-2 pt-4">
                            <Button type="submit" disabled={loading}>
                                {loading ? 'Creating...' : 'Post Opportunity'}
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
