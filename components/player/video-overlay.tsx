import React from 'react'
import { Music } from 'lucide-react'
import { motion } from "framer-motion"
interface VideoOverlayProps {
  username: string
  caption: string
  sound: string
}
export function VideoOverlay({ username, caption, sound }: VideoOverlayProps) {
  const textShadowStyle = {
    textShadow: '0 1px 3px rgba(0,0,0,0.8)',
  }
  return (
    <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-16 sm:right-6 z-20 flex flex-col gap-2 pointer-events-none">
      {/* Username */}
      <h3
        className="font-bold text-base sm:text-lg text-white"
        style={textShadowStyle}
      >
        {username}
      </h3>

      {/* Caption */}
      <p
        className="text-sm sm:text-base text-white line-clamp-2 sm:line-clamp-none pointer-events-auto max-w-[85%] sm:max-w-full"
        style={textShadowStyle}
      >
        {caption}
        <button className="font-bold ml-1 hover:underline">more</button>
      </p>

      {/* Music Ticker */}
      <div className="flex items-center gap-2 mt-1 pointer-events-auto w-[60%] sm:w-[250px]">
        <Music
          className="w-4 h-4 text-white shrink-0"
          style={{
            filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.8))',
          }}
        />
        <div className="overflow-hidden relative flex-grow mask-image-linear-gradient">
          <motion.div
            animate={{
              x: [0, -150],
            }}
            transition={{
              repeat: Infinity,
              duration: 4,
              ease: 'linear',
            }}
            className="whitespace-nowrap text-sm text-white flex gap-4"
            style={textShadowStyle}
          >
            <span>{sound}</span>
            <span>{sound}</span>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
