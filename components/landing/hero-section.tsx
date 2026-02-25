'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Search, GraduationCap, Briefcase, Users, Building2, ArrowRight, ArrowUpRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import Image from 'next/image'
import { BuildingIcon, GraduationCapIcon } from '../icons/regular'
import { ActiveOpportunitiesIcon, GroupIcon } from '../icons'


export function HeroSection() {
  const [searchQuery, setSearchQuery] = useState('')

  const stats = [
    { id: 1, icon: GraduationCapIcon, label: 'Schools', value: '500+' },
    { id: 2, icon: ActiveOpportunitiesIcon, label: 'Opportunities', value: '1.2K+' },
    { id: 3, icon: GroupIcon, label: 'Students', value: '50K+' },
    { id: 4, icon: BuildingIcon, label: 'Companies', value: '400+' }
  ]

  return (
    <section className="relative w-full pt-9">
      <div className="relative bg-[#55ba08] sm:rounded-b-[82px] rounded-b-2xl overflow-hidden py-10"
      >
        <Image
          src="/c7238ed4f6c3f25f169eb9561ad4e2fd.jpg"
          width={1420}
          height={540}
          alt='background image of student with laptop'
          className='absolute inset-0 w-full h-full object-cover z-0'
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/40 z-[1]" />
        <div className="absolute bottom-0 left-0 right-0 h-3/5 bg-gradient-to-t from-black via-black/80 to-transparent translate-y-0"></div>
        <div className="relative z-10 pt-20 md:pt-32 container max-w-7xl mx-auto text-center">
          <div className='space-y-8 p-4'>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white">
              Search, explore and discover your opportunity!
            </h1>
            <p className="text-xl text-white">
              Connect with opportunities, organizations, and fellow students
            </p>

            {/* Search Bar */}
            <div className="relative max-w-xl mx-auto">
              <Input
                type="search"
                placeholder="Search for opportunities, schools, or companies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-14 px-5 pr-12 text-lg rounded-full bg-background border-0"
              />
              <Button
                size="icon"
                className="absolute right-1 top-1 h-12 w-12 rounded-full hover:bg-primary/80 hover:text-primary-foreground transition-colors"
                asChild
              >
                <Link href={`/explore?q=${searchQuery}`}>
                  <Search className="h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>  
          {/* Quick Stats */}
          <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 pt-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <Card key={index} className={`text-white text-center border-0 shadow-none bg-transparent rounded-none py-3`}>
                  <CardContent className="p-3 pb-0">
                    <Icon className="h-8 w-8 mx-auto text-primary" />
                    <div className="text-3xl font-bold">{stat.value}</div>
                    <div className="text-base">{stat.label}</div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
        
      </div>
    </section>
  )
}
