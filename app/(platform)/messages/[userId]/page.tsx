'use client'

import { useState, useEffect, useRef } from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import Link from 'next/link'

type Message = {
    id: string
    senderId: string
    content: string
    timestamp: string
    isCurrentUser: boolean
}

export default function ConversationPage({ params }: { params: { userId: string } }) {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            senderId: params.userId,
            content: 'Hey! How are you?',
            timestamp: '10:30 AM',
            isCurrentUser: false
        },
        {
            id: '2',
            senderId: 'current-user',
            content: "I'm good, thanks! Working on my project",
            timestamp: '10:32 AM',
            isCurrentUser: true
        },
        {
            id: '3',
            senderId: params.userId,
            content: 'That sounds great! Need any help?',
            timestamp: '10:35 AM',
            isCurrentUser: false
        }
    ])
    const [newMessage, setNewMessage] = useState('')
    const scrollRef = useRef<HTMLDivElement>(null)

    const otherUser = {
        id: params.userId,
        name: 'Jane Smith'
    }

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight
        }
    }, [messages])

    const handleSend = (e: React.FormEvent) => {
        e.preventDefault()
        if (!newMessage.trim()) return

        const message: Message = {
            id: Date.now().toString(),
            senderId: 'current-user',
            content: newMessage,
            timestamp: new Date().toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit'
            }),
            isCurrentUser: true
        }

        setMessages([...messages, message])
        setNewMessage('')

        // TODO: Send to Supabase
    }

    return (
        <div className="container max-w-6xl py-8">
            <div className="grid md:grid-cols-3 gap-6 h-[calc(100vh-12rem)]">
                <Card className="md:col-span-1">
                    <CardContent className="p-4">
                        <Link href="/messages" className="text-sm text-muted-foreground hover:underline mb-4 block">
                            ← Back to Messages
                        </Link>

                        <div className="space-y-2 text-sm">
                            <p className="font-medium">Recent conversations</p>
                            {/* List of other conversations */}
                        </div>
                    </CardContent>
                </Card>

                <Card className="md:col-span-2 flex flex-col">
                    <CardHeader className="border-b">
                        <div className="flex items-center gap-3">
                            <Avatar>
                                <AvatarFallback>{otherUser.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                                <Link href={`/users/${otherUser.id}`} className="font-semibold hover:underline">
                                    {otherUser.name}
                                </Link>
                                <p className="text-xs text-muted-foreground">Active now</p>
                            </div>
                        </div>
                    </CardHeader>

                    <CardContent className="flex-1 flex flex-col p-4">
                        <ScrollArea className="flex-1 pr-4 mb-4" ref={scrollRef}>
                            <div className="space-y-4">
                                {messages.map((message) => (
                                    <div
                                        key={message.id}
                                        className={`flex gap-3 ${message.isCurrentUser ? 'flex-row-reverse' : ''
                                            }`}
                                    >
                                        <Avatar className="h-8 w-8">
                                            <AvatarFallback>
                                                {message.isCurrentUser ? 'Y' : otherUser.name.charAt(0)}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div
                                            className={`flex flex-col ${message.isCurrentUser ? 'items-end' : 'items-start'
                                                }`}
                                        >
                                            <div
                                                className={`rounded-lg px-4 py-2 max-w-[70%] ${message.isCurrentUser
                                                    ? 'bg-secondary text-secondary-foreground'
                                                    : 'bg-muted'
                                                    }`}
                                            >
                                                <p className="text-sm">{message.content}</p>
                                            </div>
                                            <span className="text-xs text-muted-foreground mt-1">
                                                {message.timestamp}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </ScrollArea>

                        <form onSubmit={handleSend} className="flex gap-2">
                            <Input
                                placeholder="Type a message..."
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                            />
                            <Button type="submit">Send</Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
