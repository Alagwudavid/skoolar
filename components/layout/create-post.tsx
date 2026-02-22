"use client"
import { useState } from "react"
import { Button } from "../ui/button"
import { X } from "lucide-react"
import { Avatar, AvatarFallback } from "../ui/avatar"
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetHeader, SheetOverlay, SheetTrigger } from "../ui/sheet"

export default function CreatePostModal() {
    const [openCreatePostModal, setCreatePostModal] = useState(false)
    const handleOpenCreatePostModal = ()=>{
        setCreatePostModal(true)
    }
    const handleCloseCreatePostModal = ()=>{
        setCreatePostModal(false)
    }
    return(
        <div className="mt-4 lg:mt-8">
            {/* <div className={`${openCreatePostModal ? "flex" : "hidden"}`}>
                I am a modal
                <Button
                onClick={handleCloseCreatePostModal}
                variant={"outline"}
                >
                    <X className="w-4 h-4" />
                </Button>
            </div> */}
            {/* {openCreatePostModal ? ( */}
            <Sheet open={openCreatePostModal} onOpenChange={setCreatePostModal}>
                <SheetTrigger asChild>
                    <Button
                        variant={"outline"}
                        className="h-fit w-full p-3 bg-muted rounded-2xl text-muted-foreground/70 text-base flex gap-4 items-center justify-start hover:cursor-pointer"
                    >
                        <Avatar className="h-8 w-8">
                        <AvatarFallback>U</AvatarFallback>
                        </Avatar>
                        <span>What&apos;s happening</span>
                    </Button>
                </SheetTrigger>
                <SheetOverlay />
                <SheetContent side="bottom">
                    <SheetClose
                    onClick={handleCloseCreatePostModal}
                    />
                    <SheetHeader>Create Post</SheetHeader>
                    <SheetDescription>
                        This is a sheet
                    </SheetDescription>
                </SheetContent>
            </Sheet>
            {/* ) : ""} */}
        </div>
    )
}