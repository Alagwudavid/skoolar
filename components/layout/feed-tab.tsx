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

    return (
        <div className="mt-4 lg:mt-8">
            <div className="px-3 pb-3">
                <Button
                    // onClick={handleOpenCreatePostModal}
                    variant={"outline"}
                    className="h-fit w-full p-3 bg-muted rounded-2xl text-muted-foreground/70 text-base flex gap-4 items-center justify-start hover:cursor-pointer"
                >
                    <Avatar className="h-8 w-8">
                        <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                    <span>What&apos;s happening</span>
                </Button>
            </div>
        </div>
    )
}