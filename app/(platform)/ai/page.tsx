'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Bot, Send } from 'lucide-react'

export default function AIPage() {
  const [message, setMessage] = useState('')

  return (
    <div className="space-y-6 p-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Bot className="h-8 w-8" />
            AI Assistant
          </h1>
          <p className="text-muted-foreground mt-2">
            Get help with your studies, career planning, and more
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Chat with AI</CardTitle>
          <CardDescription>Ask me anything about opportunities, universities, or career advice</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="min-h-[300px] p-4 border rounded-lg bg-muted/20">
            <p className="text-muted-foreground">Start a conversation...</p>
          </div>
          <div className="flex gap-2">
            <Textarea
              placeholder="Type your message here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="min-h-[60px]"
            />
            <Button size="icon" className="h-auto">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
