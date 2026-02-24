'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'
import { ArrowLeft, Ellipsis, Heart, MessageCircle, MoreHorizontal, Repeat2, Send } from 'lucide-react'
import Image from 'next/image'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { MapPinIcon } from '@/components/icons/regular'
import instituteImage from "@/public/institutes/1631325653420.png";

export default function MyProfilePage() {
  const router = useRouter();
  const { user, isLoaded } = useUser();

  if (!isLoaded) return null;

  const meta = (user?.unsafeMetadata ?? {}) as Record<string, string>;
  const displayName = user?.fullName ?? user?.emailAddresses?.[0]?.emailAddress ?? 'User';
  const username = user?.username ?? user?.emailAddresses?.[0]?.emailAddress ?? '';
  const initials = user?.firstName?.[0] ?? username[0]?.toUpperCase() ?? 'U';
  const bio = meta.bio ?? '';
  const location = meta.location ?? '';
  const school = meta.institution ?? '';
  const website = meta.website ?? '';

  const recentPosts = [
    {
      id: '1',
      content: 'Just launched my new project! Check it out 🚀',
      createdAt: '2026-02-07',
      likes: 45,
      comments: 12
    }
  ]

  const posts = [
    {
      id: '1',
      user: {
        name: 'Sarah Johnson',
        username: 'sarahj',
        avatar: 'S',
        verified: true,
      },
      content: 'Just got accepted into Stanford\'s CS program! 🎉 So grateful for all the support from this community. If anyone has tips for incoming students, drop them below! 💙',
      timestamp: '2h',
      likes: 234,
      comments: 45,
      reposts: 12,
      image: null,
    },
    {
      id: '2',
      user: {
        name: 'Tech Internships Hub',
        username: 'techinternships',
        avatar: 'T',
        verified: true,
      },
      content: '🚨 New: Apple Summer 2026 Internship applications are now open! \n\n📍 Positions in Cupertino, Austin, and Seattle\n💰 $8,000/month + housing\n📅 Deadline: March 15\n\nLink in bio to apply!',
      timestamp: '5h',
      likes: 892,
      comments: 124,
      reposts: 445,
      image: null,
    },
    {
      id: '3',
      user: {
        name: 'Mike Chen',
        username: 'mchen',
        avatar: 'M',
        verified: false,
      },
      content: 'Anyone else feeling overwhelmed with scholarship applications? Found this amazing spreadsheet tracker that helps organize everything. Game changer! 📊',
      timestamp: '8h',
      likes: 156,
      comments: 32,
      reposts: 78,
      image: null,
    },
    {
      id: '4',
      user: {
        name: 'Career Advisor Emma',
        username: 'careeradvice',
        avatar: 'E',
        verified: true,
      },
      content: 'Hot take: Your resume matters way less than you think. What really matters:\n\n1. Networking\n2. Projects that show passion\n3. Clear communication skills\n4. Being genuinely curious\n\nThoughts?',
      timestamp: '11h',
      likes: 1205,
      comments: 387,
      reposts: 234,
      image: null,
    },
  ];

  return (
    <div className="container max-w-xl mx-auto lg:pb-8">
      <div className="sm:pr-4 space-y-4">
        {/* Header */}
        <div className="sticky top-0 z-10 backdrop-blur-lg bg-background/80 flex items-center justify-between gap-4 border-b px-4 py-2">
          <Button variant={"outline"} onClick={() => router.back()}>
            <ArrowLeft className="h-5 w-5" />
            <span className=''>Back</span>
          </Button>
          <div className="">
            <h1 className="text-lg font-semibold">Profile</h1>
          </div>
          <Button variant={"outline"} size={"icon"} className="h-8 w-8 rounded-full">
            <Ellipsis className="h-5 w-5" />
            <span className='sr-only'>profile menu</span>
          </Button>
        </div>

        <Card className="rounded-none pt-0 border-0 shadow-none">
          <CardHeader>
            <div className="flex items-start gap-6">
              <Avatar className="h-24 w-24">
                <AvatarImage src={user?.imageUrl} alt={displayName} />
                <AvatarFallback className="text-2xl bg-secondary text-secondary-foreground">{initials}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl">{displayName}</CardTitle>
                    <CardDescription>@{username}</CardDescription>
                  </div>
                  <Button className='bg-muted dark:bg-secondary/80 hover:bg-primary!' variant={"ghost"} asChild>
                    <Link href="/profile/edit">Edit Profile</Link>
                  </Button>
                </div>
                {bio && <p className="mt-3 text-sm">{bio}</p>}
                <div className="flex flex-wrap gap-3 mt-3 text-sm text-muted-foreground">
                  {location && 
                    <div className="flex items-center gap-1">
                      <MapPinIcon className="inline-block h-4 w-4" />
                      <span className="text-sm text-foreground">{location}</span>
                    </div>
                  }
                  {school && 
                    <div className="flex items-center gap-1">
                      <Image src={instituteImage} alt="Institution" className="inline-block h-5 w-5 mr-1 rounded object-cover" />
                      <span>{school}</span>
                    </div>
                  }
                  {website && (
                    <a href={website} target="_blank" rel="noopener noreferrer" className="hover:underline">
                      🔗 {website}
                    </a>
                  )}
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex gap-6 text-sm">
              <Link href={"/profile/followers"} className='hover:underline'><span className="font-semibold">0</span> Followers</Link>
              <Link href={"/profile/following"} className='hover:underline'><span className="font-semibold">0</span> Following</Link>
              <span><span className="font-semibold">{posts.length}</span> Posts</span>
            </div>
          </CardContent>
        </Card>

        <div className="hidden grid md:grid-cols-3 gap-4">
          <Card className="hover:bg-muted/50 transition-colors">
            <Link href="/profile/posts">
              <CardHeader>
                <CardTitle className="text-lg">My Posts</CardTitle>
                <CardDescription>View all your posts</CardDescription>
              </CardHeader>
            </Link>
          </Card>

          <Card className="hover:bg-muted/50 transition-colors">
            <Link href="/profile/saved">
              <CardHeader>
                <CardTitle className="text-lg">Saved</CardTitle>
                <CardDescription>Your saved content</CardDescription>
              </CardHeader>
            </Link>
          </Card>

          <Card className="hover:bg-muted/50 transition-colors">
            <Link href="/profile/settings">
              <CardHeader>
                <CardTitle className="text-lg">Settings</CardTitle>
                <CardDescription>Manage your account</CardDescription>
              </CardHeader>
            </Link>
          </Card>
        </div>

        <div className="divide-y border rounded-4xl overflow-hidden h-full mb-4" >
          {posts.map((post) => (
            <article key={post.id} className="p-4 hover:bg-muted/70 transition-colors cursor-pointer">
              <div className="flex gap-3">
                {/* Avatar */}
                <Link href={`/users/${post.user.username}`}>
                  <Avatar className="h-10 w-10">
                    <AvatarFallback>{post.user.avatar}</AvatarFallback>
                  </Avatar>
                </Link>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  {/* User Info */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Link href={`/users/${post.user.username}`} className="font-semibold hover:underline">
                        {post.user.name}
                      </Link>
                      {post.user.verified && (
                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" className="h-5 w-5 text-lime-500"><path fill="currentColor" fillRule="evenodd" d="M12 21a9 9 0 1 0 0-18a9 9 0 0 0 0 18m-.232-5.36l5-6l-1.536-1.28l-4.3 5.159l-2.225-2.226l-1.414 1.414l3 3l.774.774z" clipRule="evenodd"></path></svg>
                      )}
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                      <MoreHorizontal className="h-5 w-5" />
                    </Button>
                  </div>

                  {/* Post Content */}
                  <div className="mt-2 whitespace-pre-wrap text-[15px]">
                    {post.content}
                  </div>

                  {/* Post Image (if exists) */}
                  {post.image && (
                    <div className="mt-3 rounded-2xl overflow-hidden border relative w-full h-96">
                      <Image src={post.image} alt="Post image" fill className="object-cover" />
                    </div>
                  )}

                  <div className="w-full flex items-center">
                    <div className="mt-3 rounded-2xl overflow-hidden hover:bg-muted border relative w-full h-96">
                    </div>
                  </div>
                  <div className="flex items-center justify-between gap-3 mt-4">
                    <span className="text-muted-foreground">{post.timestamp}</span>
                    {/* Action Buttons */}
                    <div className="flex items-center gap-3">
                      <Button variant="ghost" size="sm" className="gap-2 text-foreground hover:text-red-500 rounded-none bg-transparent hover:bg-transparent! cursor-pointer">
                        <Heart className="h-5! w-5!" />
                        <span className="text-sm">{post.likes}</span>
                      </Button>
                      <Button variant="ghost" size="sm" className="gap-2 text-foreground hover:text-blue-500 rounded-full bg-transparent hover:bg-transparent! cursor-pointer">
                        <MessageCircle className="h-5! w-5!" />
                        <span className="text-xs">{post.comments}</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}
