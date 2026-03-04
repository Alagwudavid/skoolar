import React from 'react'
import { Heart, MessageCircle, Bookmark, Share, Plus } from 'lucide-react'
import { motion } from "framer-motion"
import Image from 'next/image'
import { Avatar, AvatarFallback } from '../ui/avatar'
interface ActionBarProps {
  likes: string
  comments: string
  bookmarks: string
  shares: string
}
export function ActionBar({
  likes,
  comments,
  bookmarks,
  shares,
}: ActionBarProps) {
  return (
    <div className="flex flex-col items-center gap-4 sm:gap-5">
      {/* Profile Avatar */}
      <div className="relative mb-2 cursor-pointer">
        <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full border-[1.5px] border-primary overflow-hidden bg-secondary">
          <Avatar className="h-12 w-12">
            <AvatarFallback >A</AvatarFallback>
          </Avatar>
        </div>
        <button
          className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-5 h-5 bg-primary rounded-full flex items-center justify-center hover:scale-110 transition-transform"
          aria-label="Follow"
        >
          <Plus className="w-3 h-3 text-primary-foreground" strokeWidth={3} />
        </button>
      </div>

      {/* Action Buttons */}
      <ActionButton
        icon={<Heart className="w-5 h-5 sm:w-6 sm:h-6" stroke='none' fill="white" />}
        count={likes}
      />
      <ActionButton
        icon={<MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" stroke='none' fill="white" />}
        count={comments}
      />
      <ActionButton
        icon={<Bookmark className="w-5 h-5 sm:w-6 sm:h-6" stroke='none' fill="white" />}
        count={bookmarks}
      />
      <ActionButton
        icon={<Share className="w-5 h-5 sm:w-6 sm:h-6" stroke='white' fill="none" />}
        count={shares}
      />
    </div>
  )
}
function ActionButton({
  icon,
  count,
}: {
  icon: React.ReactNode
  count: string
}) {
  return (
    <motion.button
      whileHover={{
        scale: 1.1,
      }}
      whileTap={{
        scale: 0.95,
      }}
      className="flex flex-col items-center gap-1 group"
    >
      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-secondary flex items-center justify-center group-hover:bg-secondary/80 transition-colors">
        {icon}
      </div>
      <span
        className="text-[11px] sm:text-xs font-semibold text-foreground"
        // style={{
        //   textShadow: '0 1px 2px rgba(0,0,0,0.8)',
        // }}
      >
        {count}
      </span>
    </motion.button>
  )
}
