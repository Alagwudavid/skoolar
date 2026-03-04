import React, { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion } from "framer-motion"
import { Play, ChevronUp, ChevronDown } from 'lucide-react'
import { ActionBar } from './action-bar'
import { VideoOverlay } from './video-overlay'
interface VideoData {
  id: number
  image: string
  username: string
  caption: string
  sound: string
  likes: string
  comments: string
  bookmarks: string
  shares: string
  progress: number
}
const VIDEOS: VideoData[] = [
  {
    id: 1,
    image:
      'https://cdn.magicpatterns.com/uploads/7g3PQsy9iwkahmdLLDx4Sx/image.png',
    username: 'punnalia',
    caption:
      'Whiz kids C & D 😊🔥👨‍💻 @DaYen_enioℓα 🐱🐸🎭 @Dera 🐸 @Okwukwe ❤️ 👑 #naijaanimation #FlipaClip #punnalia ...',
    sound: 'original sound – punnalia',
    likes: '71.6K',
    comments: '1872',
    bookmarks: '5170',
    shares: '3450',
    progress: 40,
  },
  {
    id: 2,
    image: 'https://picsum.photos/seed/tiktok2/1080/1920',
    username: 'creativestudio',
    caption:
      'When the beat drops 🎵🔥 This took 3 weeks to animate! #animation #art #fyp #viral',
    sound: 'Levitating – Dua Lipa',
    likes: '234K',
    comments: '5.2K',
    bookmarks: '12.8K',
    shares: '8901',
    progress: 65,
  },
  {
    id: 3,
    image: 'https://picsum.photos/seed/tiktok3/1080/1920',
    username: 'naturelover_',
    caption:
      'POV: You found the most peaceful place on earth 🌿✨ #nature #peaceful #asmr #relaxing',
    sound: 'Weightless – Marconi Union',
    likes: '1.2M',
    comments: '18.4K',
    bookmarks: '89.2K',
    shares: '23.1K',
    progress: 20,
  },
]
type Orientation = 'landscape' | 'portrait' | 'square'
function useImageOrientations(videos: VideoData[]) {
  const [orientations, setOrientations] = useState<Record<number, Orientation>>(
    {},
  )
  useEffect(() => {
    videos.forEach((video) => {
      const img = new Image()
      img.crossOrigin = 'anonymous'
      img.onload = () => {
        const orientation: Orientation =
          img.naturalWidth > img.naturalHeight
            ? 'landscape'
            : img.naturalWidth < img.naturalHeight
              ? 'portrait'
              : 'square'
        setOrientations((prev) => ({
          ...prev,
          [video.id]: orientation,
        }))
      }
      img.onerror = () => {
        // Default to landscape on error
        setOrientations((prev) => ({
          ...prev,
          [video.id]: 'landscape',
        }))
      }
      img.src = video.image
    })
  }, [videos])
  return orientations
}
const slideVariants = {
  enter: (direction: number) => ({
    y: direction > 0 ? '100%' : '-100%',
    opacity: 0,
  }),
  center: {
    y: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    y: direction > 0 ? '-100%' : '100%',
    opacity: 0,
  }),
}
export function VideoPlayer() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const orientations = useImageOrientations(VIDEOS)
  const video = VIDEOS[currentIndex]
  const currentOrientation = orientations[video.id] || 'landscape'
  const goToVideo = useCallback((newDirection: number) => {
    setDirection(newDirection)
    setCurrentIndex((prev) => {
      const next = prev + newDirection
      if (next < 0) return VIDEOS.length - 1
      if (next >= VIDEOS.length) return 0
      return next
    })
    setIsPlaying(true)
  }, [])
  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }
  // Dynamic container classes based on orientation
  const containerClasses =
    currentOrientation === 'portrait'
      ? 'relative bg-neutral-900 sm:rounded-2xl overflow-hidden flex-shrink-0 cursor-pointer group shadow-2xl w-full h-full sm:h-full sm:w-auto sm:aspect-[9/16] sm:max-h-[85vh]'
      : currentOrientation === 'square'
        ? 'relative bg-neutral-900 sm:rounded-2xl overflow-hidden flex-shrink-0 cursor-pointer group shadow-2xl w-full h-full sm:h-full sm:w-auto sm:aspect-square sm:max-h-[85vh]'
        : 'relative bg-neutral-900 sm:rounded-2xl overflow-hidden flex-shrink-0 cursor-pointer group shadow-2xl w-full h-full sm:h-full sm:w-auto sm:aspect-video sm:max-h-[85vh]'
  return (
    <div className="w-full h-screen bg-black text-white flex items-center justify-center overflow-hidden relative font-sans">
      {/* Main Content Wrapper */}
      <div className="flex flex-row items-center justify-center w-full h-full sm:h-[85vh] max-w-3xl mx-auto relative sm:px-12">
        {/* Video Container - orientation-aware */}
        <motion.div
          layout
          transition={{
            duration: 0.35,
            ease: [0.32, 0.72, 0, 1],
          }}
          className={containerClasses}
          onClick={togglePlay}
        >
          {/* Animated Video Content */}
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.img
              key={video.id}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                duration: 0.4,
                ease: [0.32, 0.72, 0, 1],
              }}
              src={video.image}
              alt="Video content"
              className={`absolute inset-0 w-full h-full ${currentOrientation === 'portrait' ? 'object-cover' : 'object-cover sm:object-contain'}`}
            />
          </AnimatePresence>

          {/* Orientation badge */}
          <motion.div
            key={currentOrientation}
            initial={{
              opacity: 0,
              scale: 0.8,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            exit={{
              opacity: 0,
            }}
            className="absolute top-3 left-3 z-30 px-2 py-0.5 rounded bg-black/50 backdrop-blur-sm text-[10px] uppercase tracking-wider text-white/70 font-medium pointer-events-none"
          >
            {currentOrientation === 'portrait'
              ? '9:16'
              : currentOrientation === 'square'
                ? '1:1'
                : '16:9'}
          </motion.div>

          {/* Play/Pause Overlay Animation */}
          <AnimatePresence>
            {!isPlaying && (
              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.8,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  scale: 1.2,
                }}
                className="absolute inset-0 flex items-center justify-center bg-black/20 z-20"
              >
                <Play className="w-20 h-20 text-white/80 fill-white/80" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Bottom Overlay (Username, Caption, Music) */}
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={video.id}
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -20,
              }}
              transition={{
                duration: 0.3,
                delay: 0.15,
              }}
            >
              <VideoOverlay
                username={video.username}
                caption={video.caption}
                sound={video.sound}
              />
            </motion.div>
          </AnimatePresence>

          {/* Mobile Action Bar (Inside video container) */}
          <div className="sm:hidden absolute right-2 bottom-20 z-30">
            <ActionBar
              likes={video.likes}
              comments={video.comments}
              bookmarks={video.bookmarks}
              shares={video.shares}
            />
          </div>

          {/* Progress Bar */}
          <div className="absolute bottom-0 left-0 w-full h-[2px] sm:h-[3px] bg-white/20 z-30">
            <motion.div
              key={video.id}
              className="h-full bg-[#FE2C55]"
              initial={{
                width: 0,
              }}
              animate={{
                width: `${video.progress}%`,
              }}
              transition={{
                duration: 0.5,
                ease: 'easeOut',
              }}
            />
          </div>
        </motion.div>

        {/* Desktop Action Bar (Beside video container) */}
        <div className="hidden sm:flex flex-col justify-end h-full ml-6 pb-4 z-30">
          <ActionBar
            likes={video.likes}
            comments={video.comments}
            bookmarks={video.bookmarks}
            shares={video.shares}
          />
        </div>
      </div>

      {/* Desktop Navigation Chevrons */}
      <div className="hidden lg:flex flex-col gap-4 absolute right-8 top-1/2 -translate-y-1/2 z-30">
        <motion.button
          whileHover={{
            scale: 1.15,
          }}
          whileTap={{
            scale: 0.9,
          }}
          onClick={() => goToVideo(-1)}
          className="w-10 h-10 rounded-full bg-neutral-800/80 flex items-center justify-center hover:bg-neutral-700 transition-colors"
          aria-label="Previous video"
        >
          <ChevronUp className="w-6 h-6" />
        </motion.button>
        <motion.button
          whileHover={{
            scale: 1.15,
          }}
          whileTap={{
            scale: 0.9,
          }}
          onClick={() => goToVideo(1)}
          className="w-10 h-10 rounded-full bg-neutral-800/80 flex items-center justify-center hover:bg-neutral-700 transition-colors"
          aria-label="Next video"
        >
          <ChevronDown className="w-6 h-6" />
        </motion.button>
      </div>

      {/* Video counter indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-30 lg:hidden">
        {VIDEOS.map((_, i) => (
          <div
            key={i}
            className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${i === currentIndex ? 'bg-white' : 'bg-white/30'}`}
          />
        ))}
      </div>
    </div>
  )
}
