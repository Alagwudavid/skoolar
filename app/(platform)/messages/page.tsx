'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import Link from 'next/link'

type Conversation = {
    id: string
    userId: string
    userName: string
    lastMessage: string
    timestamp: string
    unread: number
}

export default function MessagesPage() {
    const [searchQuery, setSearchQuery] = useState('')

    const conversations: Conversation[] = [
        {
            id: '1',
            userId: '1',
            userName: 'Jane Smith',
            lastMessage: 'Thanks for the help!',
            timestamp: '2h ago',
            unread: 2
        },
        {
            id: '2',
            userId: '2',
            userName: 'Mike Johnson',
            lastMessage: 'See you tomorrow',
            timestamp: '5h ago',
            unread: 0
        },
        {
            id: '3',
            userId: '3',
            userName: 'Sarah Williams',
            lastMessage: 'Great presentation!',
            timestamp: '1d ago',
            unread: 1
        }
    ]

    const filteredConversations = conversations.filter(conv =>
        conv.userName.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <div className="container max-w-6xl py-8">
            <div className="grid md:grid-cols-3 gap-6 h-[calc(100vh-12rem)]">
                <Card className="md:col-span-1">
                    <CardContent className="p-4 h-full flex flex-col">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-semibold">Messages</h2>
                            <Button size="sm" asChild>
                                <Link href="/messages/new">New</Link>
                            </Button>
                        </div>

                        <Input
                            placeholder="Search conversations..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="mb-4"
                        />

                        <ScrollArea className="flex-1">
                            <div className="space-y-2">
                                {filteredConversations.map((conv) => (
                                    <Link
                                        key={conv.id}
                                        href={`/messages/${conv.userId}`}
                                        className="block"
                                    >
                                        <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors">
                                            <Avatar>
                                                <AvatarFallback>{conv.userName.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center justify-between">
                                                    <p className="font-medium truncate">{conv.userName}</p>
                                                    <span className="text-xs text-muted-foreground">
                                                        {conv.timestamp}
                                                    </span>
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <p className="text-sm text-muted-foreground truncate">
                                                        {conv.lastMessage}
                                                    </p>
                                                    {conv.unread > 0 && (
                                                        <span className="ml-2 bg-secondary text-secondary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                                            {conv.unread}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </ScrollArea>
                    </CardContent>
                </Card>

                <Card className="md:col-span-2 flex items-center justify-center">
                    <CardContent className="text-center py-12">
                        <h3 className="text-xl font-semibold mb-2">Select a conversation</h3>
                        <p className="text-muted-foreground mb-4">
                            Choose a conversation from the left or start a new one
                        </p>
                        <Button asChild>
                            <Link href="/messages/new">Start New Message</Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
