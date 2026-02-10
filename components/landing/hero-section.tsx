'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Search, GraduationCap, Briefcase, Users, Building2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import Image from 'next/image'

export function HeroSection() {
  const [searchQuery, setSearchQuery] = useState('')

  const stats = [
    { icon: GraduationCap, label: 'Schools', value: '500+' },
    { icon: Briefcase, label: 'Opportunities', value: '1.2K+' },
    { icon: Users, label: 'Students', value: '50K+' },
    { icon: Building2, label: 'Companies', value: '400+' }
  ]

  return (
    <section className="relative w-full pt-9">
      <div className="relative bg-[#55ba08] rounded-b-[82px] overflow-hidden "
      // bg-[url('/c7238ed4f6c3f25f169eb9561ad4e2fd.jpg')]" 
      // style={{backgroundImage: url('/c7238ed4f6c3f25f169eb9561ad4e2fd.jpg')}}
      >
        <Image
          src={"/c7238ed4f6c3f25f169eb9561ad4e2fd.jpg"}
          width={1420}
          height={540}
          alt='background image of student with laptop'
          className='absolute inset-0 w-full h-full object-cover z-0'
        />
        <div className="relative z-10 pt-20 md:pt-32 container max-w-3xl mx-auto text-center">
          <div className='space-y-8 p-4'>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-background">
              Search, explore and discover your opportunity!
            </h1>
            <p className="text-xl text-background">
              Connect with opportunities, organizations, and fellow students
            </p>

            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <Input
                type="search"
                placeholder="Search for opportunities, schools, or companies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-14 px-5 pr-12 text-lg rounded-full bg-background border-0"
              />
              <Button
                size="icon"
                className="absolute right-1 top-1 h-12 w-12 rounded-full"
                asChild
              >
                <Link href={`/explore?q=${searchQuery}`}>
                  <Search className="h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
          {/* Quick Stats */}
          <div className="max-w-2xl mx-auto grid grid-cols-2 md:grid-cols-4 pt-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <Card key={index} className={`text-center border-0 shadow-none bg-black/50 rounded-none py-3 ${index === 0 && ("md:rounded-tl-2xl pl-6")} ${index === 3 && ("md:rounded-tr-2xl pr-6")}`}>
                  <CardContent className="p-3 pb-0 text-background">
                    <Icon className="h-8 w-8 mx-auto" />
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <div className="text-sm">{stat.label}</div>
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
