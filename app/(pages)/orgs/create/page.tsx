'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { createOrganization } from '@/actions/organizations'
import { toast } from 'sonner'
import { Building2, Globe, Mail, Phone, MapPin } from 'lucide-react'

const ORG_TYPES = [
    { value: 'school', label: 'School' },
    { value: 'university', label: 'University' },
    { value: 'company', label: 'Company' },
    { value: 'nonprofit', label: 'Non-Profit' },
]

export default function CreateOrganizationPage() {
    const router = useRouter()
    const [isPending, startTransition] = useTransition()
    const [orgType, setOrgType] = useState('school')
    const [error, setError] = useState<string | null>(null)

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setError(null)

        const formData = new FormData(e.currentTarget)
        formData.set('type', orgType)

        startTransition(async () => {
            const result = await createOrganization(formData)
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
                    <div className="flex items-center gap-2">
                        <Building2 className="w-6 h-6" />
                        <CardTitle>Register an Organization</CardTitle>
                    </div>
                    <CardDescription>
                        Create a school, university, company, or non-profit. You will be the owner with full control.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="col-span-2 space-y-1.5">
                                <Label htmlFor="name">Organization Name *</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    placeholder="e.g., Stanford University"
                                    required
                                    disabled={isPending}
                                />
                            </div>

                            <div className="col-span-2 space-y-1.5">
                                <Label>Organization Type *</Label>
                                <Select value={orgType} onValueChange={setOrgType} disabled={isPending}>
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {ORG_TYPES.map(t => (
                                            <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                name="description"
                                placeholder="Tell people what your organization does…"
                                className="min-h-25"
                                disabled={isPending}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <Label htmlFor="website_url">
                                    <Globe className="inline w-3.5 h-3.5 mr-1" />
                                    Website
                                </Label>
                                <Input
                                    id="website_url"
                                    name="website_url"
                                    type="url"
                                    placeholder="https://example.com"
                                    disabled={isPending}
                                />
                            </div>

                            <div className="space-y-1.5">
                                <Label htmlFor="email">
                                    <Mail className="inline w-3.5 h-3.5 mr-1" />
                                    Contact Email
                                </Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="contact@example.com"
                                    disabled={isPending}
                                />
                            </div>

                            <div className="space-y-1.5">
                                <Label htmlFor="phone">
                                    <Phone className="inline w-3.5 h-3.5 mr-1" />
                                    Phone
                                </Label>
                                <Input
                                    id="phone"
                                    name="phone"
                                    placeholder="+1 (555) 000-0000"
                                    disabled={isPending}
                                />
                            </div>

                            <div className="space-y-1.5">
                                <Label htmlFor="location">
                                    <MapPin className="inline w-3.5 h-3.5 mr-1" />
                                    Location
                                </Label>
                                <Input
                                    id="location"
                                    name="location"
                                    placeholder="City, Country"
                                    disabled={isPending}
                                />
                            </div>
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
                                {isPending ? 'Registering…' : 'Register Organization'}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
