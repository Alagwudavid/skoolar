'use client'

import React, { useRef, useState, useCallback } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import Image from 'next/image'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { RefreshCCWIcon } from '../icons/regular';
import { Button } from '../ui/button';

// Types for our data
interface Space {
  id: string
  name: string
  comments: string
  likes: number
  image: string
  isActive?: boolean
  color?: string // For the placeholder image background
}
// Mock news data
const TRENDING: Space[] = [
  {
    id: '1',
    name: 'Campus Protests Across Nigeria Over ASUU Strike',
    comments: '8.3k',
    likes: 214,
    image: 'https://placehold.co/100x100/ffffff/000000?text=NEWS',
    isActive: true,
  },
  {
    id: '2',
    name: 'ASUU Strike Update 2026',
    comments: '12.1k',
    likes: 874,
    image: 'https://placehold.co/100x100/ffffff/006400?text=ASUU',
  },
  {
    id: '3',
    name: 'New Students Loan Scheme',
    comments: '6.7k',
    likes: 331,
    image: 'https://placehold.co/100x100/ffffff/000080?text=LOAN',
  },
  {
    id: '4',
    name: 'Scholarship Opportunities',
    comments: '9.4k',
    likes: 620,
    image: 'https://placehold.co/100x100/ffffff/000000?text=SCH',
  },
]
export function Trending({ orientation, className }: { orientation?: string, className?: string }) {

  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const updateScrollButtons = useCallback(() => {
    const el = scrollContainerRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 0)
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1)
  }, [])

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
  if (orientation === 'vertical') {
    return (
      <Card className={`p-0 pb-2 gap-0 rounded-xl bg-muted/50 ${className}`}>
        <CardHeader className="pt-3 pb-2! border-b px-4">
          <CardTitle className="text-base flex items-center justify-between gap-2 ">
            <p className="text-foreground">
              Today&#39;s News
            </p>
            <Button variant="link">
                view all
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-0 divide-y p-0 overflow-hidden">
          {TRENDING.map((trend) => (
            <div
              key={trend.id}
              className="flex items-center gap-3 hover:bg-muted/50 hover:text-muted-foreground p-2 px-4 transition-colors group cursor-pointer"
            >
              {/* Image Section */}
              <div className="w-24 h-15 bg-primary flex items-center justify-center rounded-lg shrink-0">
              </div>

              {/* Content Section */}
              <div className="flex-1 flex flex-col justify-center min-w-0 text-foreground">
                <h3 className="group-hover:text-primary font-semibold text-sm line-clamp-2">
                  {trend.name}
                </h3>
                <div className='flex items-center gap-1'>
                  <p className="text-xs truncate">
                    {trend.likes} likes
                  </p>
                  ∙
                  <p className="text-foreground text-xs truncate">
                    {trend.comments} comments
                  </p>
                </div>
              </div>
            </div>
          ))}

        </CardContent>
      </Card>
    )
  }

  return (
    <section className={`w-full border-b ${className}`}>
      <div className="max-w-7xl mx-auto py-4">
        {/* Scrollable Container with side controls */}
        <div className="relative">
          {/* Left control */}
          {canScrollLeft && (
            <button
              onClick={() => scroll('left')}
              className="absolute left-5 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 p-1.5 rounded-full bg-background border shadow-md text-foreground hover:text-primary transition-colors focus:outline-none"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}

          <div
            ref={scrollContainerRef}
            onScroll={updateScrollButtons}
            className="flex overflow-x-auto gap-4 scrollbar-hide snap-x snap-mandatory mx-4"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            {TRENDING.map((trend) => (
              <div
                key={trend.id}
                className="flex-none w-75 h-25 rounded-xl overflow-hidden flex snap-start transition-all duration-300 bg-muted/50 hover:bg-muted/70 cursor-pointer group"
              >
                {/* Content Section */}
                <div className="flex-1 flex flex-col min-w-0 text-foreground p-2">
                  <h3 className="hover:text-primary font-semibold text-base lg:text-lg line-clamp-2">
                    {trend.name}
                  </h3>
                  <div className='flex items-center gap-1'>
                    <p className="text-sm truncate">
                      {trend.likes} likes
                    </p>
                    ∙
                    <p className="text-foreground text-sm truncate">
                      {trend.comments} comments
                    </p>
                  </div>
                </div>
                {/* Image Section */}
                <div className="w-25 h-25 bg-primary flex items-center justify-center shrink-0">
                </div>
              </div>
            ))}
          </div>

          {/* Right control */}
          {canScrollRight && (
            <button
              onClick={() => scroll('right')}
              className="absolute right-5 top-1/2 -translate-y-1/2 translate-x-1/2 z-10 p-1.5 rounded-full bg-background border shadow-md text-foreground hover:text-primary transition-colors focus:outline-none"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </section>
  )
}
