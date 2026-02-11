'use client'

import { Suspense, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Label } from '@/components/ui/label'

type User = {
    id: string
    name: string
    email: string
}

function NewMessageContent() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const preselectedUserId = searchParams.get('userId')

    const [searchQuery, setSearchQuery] = useState('')
    const [selectedUser, setSelectedUser] = useState<User | null>(null)
    const [message, setMessage] = useState('')

    // Mock users - in reality, fetch from API
    const users: User[] = [
        { id: '1', name: 'Jane Smith', email: 'jane@example.com' },
        { id: '2', name: 'Mike Johnson', email: 'mike@example.com' },
        { id: '3', name: 'Sarah Williams', email: 'sarah@example.com' }
    ]

    const filteredUsers = users.filter(
        user =>
            user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!selectedUser || !message.trim()) return

        // TODO: Send message via Supabase
        router.push(`/messages/${selectedUser.id}`)
    }

    return (
        <div className="container max-w-2xl py-8">
            <Card>
                <CardHeader>
                    <CardTitle>New Message</CardTitle>
                    <CardDescription>Start a conversation with someone</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSend} className="space-y-4">
                        <div>
                            <Label htmlFor="to">To</Label>
                            {selectedUser ? (
                                <div className="flex items-center gap-3 p-3 border rounded-md">
                                    <Avatar>
                                        <AvatarFallback>{selectedUser.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1">
                                        <p className="font-medium">{selectedUser.name}</p>
                                        <p className="text-sm text-muted-foreground">{selectedUser.email}</p>
                                    </div>
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => setSelectedUser(null)}
                                    >
                                        ✕
                                    </Button>
                                </div>
                            ) : (
                                <>
                                    <Input
                                        id="to"
                                        placeholder="Search users..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                    {searchQuery && (
                                        <div className="mt-2 border rounded-md max-h-48 overflow-y-auto">
                                            {filteredUsers.map((user) => (
                                                <button
                                                    key={user.id}
                                                    type="button"
                                                    className="w-full flex items-center gap-3 p-3 hover:bg-muted hover:text-muted-foreground transition-colors"
                                                    onClick={() => {
                                                        setSelectedUser(user)
                                                        setSearchQuery('')
                                                    }}
                                                >
                                                    <Avatar>
                                                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                                                    </Avatar>
                                                    <div className="text-left">
                                                        <p className="font-medium">{user.name}</p>
                                                        <p className="text-sm text-muted-foreground">{user.email}</p>
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </>
                            )}
                        </div>

                        <div>
                            <Label htmlFor="message">Message</Label>
                            <textarea
                                id="message"
                                className="w-full min-h-[150px] px-3 py-2 border rounded-md"
                                placeholder="Type your message..."
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                required
                            />
                        </div>

                        <div className="flex gap-2">
                            <Button type="submit" disabled={!selectedUser || !message.trim()}>
                                Send Message
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

export default function NewMessagePage() {
    return (
        <Suspense fallback={
            <div className="container max-w-2xl py-8">
                <Card>
                    <CardHeader>
                        <CardTitle>New Message</CardTitle>
                        <CardDescription>Loading...</CardDescription>
                    </CardHeader>
                </Card>
            </div>
        }>
            <NewMessageContent />
        </Suspense>
    )
}
