'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { BookOpen } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { RIcons } from "../icons/regular";

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <header className={`fixed top-9 left-0 right-0 z-40 transition-all duration-300 ${isScrolled
            ? 'bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm'
            : 'bg-transparent'
            }`}>
            <div className="container flex h-16 px-4 items-center justify-between mx-auto">
                <Link href="/" className="flex items-center gap-1 font-bold text-xl">
                    <RIcons.Brand className="h-8 w-8" />
                    <RIcons.BrandText className="h-6 w-30" />
                </Link>
                <nav className={`hidden md:flex items-center gap-6 ${isScrolled ? 'text-foreground' : 'text-background'
                    }`}>
                    <Link href="/opportunities" className="text-sm font-medium relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[2px] after:bg-primary after:rounded-full after:scale-x-0 after:origin-center after:transition-transform after:duration-300 hover:after:scale-x-100 hover:text-primary">
                        Opportunities
                    </Link>
                    <Link href="/orgs" className="text-sm font-medium relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[2px] after:bg-primary after:rounded-full after:scale-x-0 after:origin-center after:transition-transform after:duration-300 hover:after:scale-x-100 hover:text-primary">
                        Organizations
                    </Link>
                    <Link href="/groups" className="text-sm font-medium relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[2px] after:bg-primary after:rounded-full after:scale-x-0 after:origin-center after:transition-transform after:duration-300 hover:after:scale-x-100 hover:text-primary">
                        Groups
                    </Link>
                    <Link href="/explore" className="text-sm font-medium relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[2px] after:bg-primary after:rounded-full after:scale-x-0 after:origin-center after:transition-transform after:duration-300 hover:after:scale-x-100 hover:text-primary">
                        Explore
                    </Link>
                </nav>
                <div className="flex items-center gap-2">
                    <Button
                        variant={isScrolled ? "ghost" : "outline"}
                        size="default"
                        className={`rounded-full ${!isScrolled ? 'border-background text-foreground hover:bg-background hover:text-foreground' : ''
                            }`}
                        asChild
                    >
                        <Link href="/auth/signin">Sign In</Link>
                    </Button>
                    <Button
                        size="default"
                        className='rounded-full'
                        asChild
                    >
                        <Link href="/auth/signup">Sign Up</Link>
                    </Button>
                </div>
            </div>
        </header>
    )
}
