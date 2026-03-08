"use client"
import { useState } from "react"
import { Button } from "../ui/button"
import { X } from "lucide-react"
import { Avatar, AvatarFallback } from "../ui/avatar"

// 'use client'

// import { useState } from 'react'
// import { useRouter } from 'next/navigation'
// import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
// import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { ImageIcon, FileVideo, Smile } from 'lucide-react'


export default function CreatePostModal() {
    const [openCreatePostModal, setCreatePostModal] = useState(false)
    const handleOpenCreatePostModal = () => {
        setCreatePostModal(true)
    }
    const handleCloseCreatePostModal = () => {
        setCreatePostModal(false)
    }

    const [content, setContent] = useState('')
    const [title, setTitle] = useState('')
    return (
        <div className="mt-4 lg:mt-8">
            <div className="">
                <Button
                    onClick={handleOpenCreatePostModal}
                    variant={"outline"}
                    className="h-fit w-full p-3 border-0 bg-transparent! text-muted-foreground/70 text-base flex gap-4 items-center justify-start hover:cursor-pointer"
                >
                    <Avatar className="h-8 w-8">
                        <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                    <span>What&apos;s happening</span>
                </Button>
            </div>
            
            <div className={`${openCreatePostModal ? "flex" : "hidden"} relative w-full h-full flex items-center justify-center`}>
                <div onClick={handleCloseCreatePostModal} className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-60 bg-black/5 backdrop-blur-xs" />
                <div className="max-w-lg w-full bg-muted shadow-xs fixed top-10 z-70 p-3 rounded-3xl">
                    <form onSubmit={() => {}} className="relative space-y-6 p-4">
                            {/* User Info */}
                            <div className="flex items-center gap-3">
                                <Avatar>
                                <AvatarFallback>U</AvatarFallback>
                                </Avatar>
                                {/* Title */}
                                <div>
                                    <div className="font-semibold">User Name</div>
                                    <Input
                                    id="title"
                                    placeholder="Give your post a title..."
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="border-0 ring-0 p-0! min-w-sm rounded-none h-5 focus-visible:ring-0 focus-visible:border-0"
                                    />
                                </div>
                            </div>

                            {/* Content */}
                            <div className="space-y-2">
                                <Textarea
                                id="content"
                                placeholder="Share your thoughts, experiences, or questions..."
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                className="bg-transparent border-0 ring-0 p-0! rounded-lg h-5 min-h-[200px] resize-y"
                                // className="min-h-[200px] resize-none"
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
                    </form>
                    <div className="w-full flex items-center gap-3 justify-end">
                        <Button
                            onClick={handleCloseCreatePostModal}
                            variant={"outline"}
                        >
                            Close
                        </Button>
                        <Button
                            // onClick={handleCloseCreatePostModal}
                            variant={"default"}
                            className="bg-background"
                        >
                            Post
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}