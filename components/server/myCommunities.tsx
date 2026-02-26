import React, { useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
// Types for our data
interface Space {
  id: string
  name: string
  members: string
  replies: number
  image: string
  isActive?: boolean
  color?: string // For the placeholder image background
}
// Mock data based on the screenshot
const COMMUNITIES: Space[] = [
  {
    id: '1',
    name: 'Biology 101',
    members: '5.1k',
    replies: 12,
    image: 'https://placehold.co/100x100/ffffff/000000?text=BIO',
    isActive: true,
  },
  {
    id: '2',
    name: 'UNN Aspirants',
    members: '4.2k',
    replies: 566,
    image: 'https://placehold.co/100x100/ffffff/006400?text=UNN',
  },
  {
    id: '3',
    name: 'Physics 121',
    members: '8.9k',
    replies: 124,
    image: 'https://placehold.co/100x100/ffffff/000080?text=ATOM',
  },
  {
    id: '4',
    name: 'Chemistry Lab',
    members: '3.5k',
    replies: 89,
    image: 'https://placehold.co/100x100/ffffff/800000?text=CHEM',
  },
  {
    id: '5',
    name: 'Mathematics',
    members: '12k',
    replies: 1042,
    image: 'https://placehold.co/100x100/ffffff/000000?text=MATH',
  },
]
export function Communities() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 320 // Approx card width + gap
      const currentScroll = scrollContainerRef.current.scrollLeft
      const targetScroll =
        direction === 'left'
          ? currentScroll - scrollAmount
          : currentScroll + scrollAmount
      scrollContainerRef.current.scrollTo({
        left: targetScroll,
        behavior: 'smooth',
      })
    }
  }
  return (
    <section className="w-full bg-transparent pt-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">
            Communities
          </h2>
          <div className="flex items-center gap-2">
            <button
              onClick={() => scroll('left')}
              className="p-1.5 rounded hover:bg-white/10 text-gray-400 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white/20"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-1.5 rounded hover:bg-white/10 text-gray-400 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white/20"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Container */}
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto gap-4 scrollbar-hide snap-x snap-mandatory"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {COMMUNITIES.map((community) => (
            <div
              key={community.id}
              className={`
                flex-none w-[300px] md:w-[340px] h-[100px] rounded-xl overflow-hidden flex snap-start transition-all duration-300 bg-muted
                `}
                // ${community.isActive ? 'ring-2 ring-primary bg-muted' : 'bg-muted hover:bg-muted/80'}
            >
              {/* Image Section */}
              <div className="w-25 h-full bg-white flex items-center justify-center p-2 flex-shrink-0">
                <Image
                  src={community.image}
                  alt={`${community.name} logo`}
                  className="w-full h-full object-contain"
                  width={100}
                  height={100}
                />
              </div>

              {/* Content Section */}
              <div className="flex-1 p-3 flex flex-col justify-center min-w-0">
                <h3 className="text-white font-bold text-base mb-1 truncate pr-2">
                  {community.name}
                </h3>
                <div className="community-y-0.5">
                  <p className="text-gray-400 text-sm truncate">
                    Members:{' '}
                    <span className="text-gray-300">{community.members}</span>
                  </p>
                  <p className="text-gray-400 text-sm truncate">
                    replies:{' '}
                    <span className="text-gray-300">{community.replies}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
