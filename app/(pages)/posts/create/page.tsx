'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { ImageIcon, FileVideo, Smile } from 'lucide-react'

export default function CreatePostPage() {
  const router = useRouter()
  const [content, setContent] = useState('')
  const [title, setTitle] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Mock submission - in real app, this would call an API
    console.log('Creating post:', { title, content })
    router.push('/feed')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container max-w-2xl mx-auto py-8">
        <Card className='p-0 border-0 shadow-none'>
          <CardHeader>
            <CardTitle className="text-2xl">Create a Post</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6 p-4">
              {/* User Info */}
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-semibold">User Name</div>
                  <div className="text-sm text-muted-foreground">@username</div>
                </div>
              </div>

              {/* Title */}
              <div className="space-y-2">
                <Label htmlFor="title">Title (Optional)</Label>
                <Input
                  id="title"
                  placeholder="Give your post a title..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              {/* Content */}
              <div className="space-y-2">
                <Label htmlFor="content">What's on your mind?</Label>
                <Textarea
                  id="content"
                  placeholder="Share your thoughts, experiences, or questions..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="min-h-[200px] resize-none"
                  required
                />
              </div>

              {/* Media Buttons */}
              <div className="flex items-center gap-2 pt-2 border-t">
                <Button type="button" variant="ghost" size="sm" className="gap-2">
                  <ImageIcon className="h-4 w-4" />
                  Image
                </Button>
                <Button type="button" variant="ghost" size="sm" className="gap-2">
                  <FileVideo className="h-4 w-4" />
                  Video
                </Button>
                <Button type="button" variant="ghost" size="sm" className="gap-2">
                  <Smile className="h-4 w-4" />
                  Emoji
                </Button>
              </div>

              {/* Submit Button */}
              <div className="flex gap-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={() => router.back()}
                >
                  Cancel
                </Button>
                <Button type="submit" className="flex-1" disabled={!content.trim()}>
                  Post
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
