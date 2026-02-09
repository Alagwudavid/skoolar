'use client'

import { useState, useEffect, useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { ScrollArea } from '@/components/ui/scroll-area'

type Message = {
    id: string
    userId: string
    userName: string
    content: string
    timestamp: string
}

export default function GroupChatPage({ params }: { params: { id: string } }) {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            userId: '1',
            userName: 'John Doe',
            content: 'Hey everyone! Ready for the exam tomorrow?',
            timestamp: '10:30 AM'
        },
        {
            id: '2',
            userId: '2',
            userName: 'Jane Smith',
            content: 'Yes! Been studying all week',
            timestamp: '10:32 AM'
        },
        {
            id: '3',
            userId: '3',
            userName: 'Mike Johnson',
            content: 'Any tips for the algorithms section?',
            timestamp: '10:35 AM'
        }
    ])
    const [newMessage, setNewMessage] = useState('')
    const scrollRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        // Auto scroll to bottom
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight
        }
    }, [messages])

    const handleSend = (e: React.FormEvent) => {
        e.preventDefault()
        if (!newMessage.trim()) return

        const message: Message = {
            id: Date.now().toString(),
            userId: 'current-user',
            userName: 'You',
            content: newMessage,
            timestamp: new Date().toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit'
            })
        }

        setMessages([...messages, message])
        setNewMessage('')

        // TODO: Send to Supabase Realtime
    }

    return (
        <div className="container max-w-4xl py-8">
            <Card className="h-[calc(100vh-12rem)]">
                <CardHeader>
                    <CardTitle>Group Chat</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col h-[calc(100%-5rem)]">
                    <ScrollArea className="flex-1 pr-4" ref={scrollRef}>
                        <div className="space-y-4">
                            {messages.map((message) => (
                                <div
                                    key={message.id}
                                    className={`flex gap-3 ${message.userId === 'current-user' ? 'flex-row-reverse' : ''
                                        }`}
                                >
                                    <Avatar className="h-8 w-8">
                                        <AvatarFallback>{message.userName.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div
                                        className={`flex flex-col ${message.userId === 'current-user' ? 'items-end' : 'items-start'
                                            }`}
                                    >
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="text-sm font-medium">{message.userName}</span>
                                            <span className="text-xs text-muted-foreground">
                                                {message.timestamp}
                                            </span>
                                        </div>
                                        <div
                                            className={`rounded-lg px-4 py-2 max-w-[70%] ${message.userId === 'current-user'
                                                    ? 'bg-primary text-primary-foreground'
                                                    : 'bg-muted'
                                                }`}
                                        >
                                            <p className="text-sm">{message.content}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </ScrollArea>

                    <form onSubmit={handleSend} className="flex gap-2 mt-4">
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
    )
}
