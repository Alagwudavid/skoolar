'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'
import { Heart, MessageCircle, MoreHorizontal, Repeat2, Send } from 'lucide-react'
import Image from 'next/image'

export default function MyProfilePage() {
    // This would come from auth context
    const user = {
        id: 'current-user',
        name: 'John Doe',
        email: 'john@example.com',
        bio: 'Computer Science student | AI enthusiast | Building cool stuff',
        location: 'San Francisco, CA',
        school: 'Stanford University',
        website: 'https://johndoe.dev',
        joinedAt: '2025-01-15',
        followers: 234,
        following: 189,
        posts: 56
    }

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
        <div className="max-w-xl mx-auto pr-4">
            <div className="">
                {/* Header */}
                <div className="sticky top-0 z-10 backdrop-blur-lg bg-background/80">
                    <div className="px-4 py-4">
                        <h1 className="text-xl font-bold">Profile</h1>
                    </div>
                </div>

                <Card className="rounded-none pt-0 border-0 shadow-none">
                    <div className='h-50 w-full bg-secondary rounded-4xl'></div>
                    <CardHeader>
                        <div className="flex items-start gap-6">
                            <Avatar className="h-24 w-24">
                                <AvatarFallback className="text-2xl bg-secondary text-secondary-foreground">{user.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <CardTitle className="text-2xl">{user.name}</CardTitle>
                                        <CardDescription>{user.email}</CardDescription>
                                    </div>
                                    <Button className='hover:bg-secondary/80' asChild>
                                        <Link href="/profile/edit">Edit Profile</Link>
                                    </Button>
                                </div>
                                <p className="mt-3 text-sm">{user.bio}</p>
                                <div className="flex flex-wrap gap-3 mt-3 text-sm text-muted-foreground">
                                    {user.location && <span>📍 {user.location}</span>}
                                    {user.school && <span>🎓 {user.school}</span>}
                                    {user.website && (
                                        <a href={user.website} target="_blank" rel="noopener noreferrer" className="hover:underline">
                                            🔗 {user.website}
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="flex gap-6">
                            <Link href={`/users/${user.id}/followers`} className="hover:underline">
                                <span className="font-semibold">{user.followers}</span> Followers
                            </Link>
                            <Link href={`/users/${user.id}/following`} className="hover:underline">
                                <span className="font-semibold">{user.following}</span> Following
                            </Link>
                            <span>
                                <span className="font-semibold">{user.posts}</span> Posts
                            </span>
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
                                  <svg className="h-5 w-5 text-blue-500" viewBox="0 0 22 22" fill="currentColor">
                                    <path d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.634.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.776-1.044.908-1.681s.075-1.299-.165-1.903c.586-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z"></path>
                                  </svg>
                                )}
                                {/* <span className="text-muted-foreground">@{post.user.username}</span> */}
                                <span className="text-muted-foreground">·</span>
                                <span className="text-muted-foreground">{post.timestamp}</span>
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
                          </div>
                        </div>
                
                        {/* Action Buttons */}
                        <div className="grid grid-cols-4 mt-3 w-full">
                          <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-blue-500 hover:bg-blue-500/10 rounded-3xl cursor-pointer">
                            <MessageCircle className="h-5 w-5" />
                            <span className="text-xs">{post.comments}</span>
                          </Button>
                
                          <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-green-500 hover:bg-green-500/10 rounded-3xl cursor-pointer">
                            <Repeat2 className="h-5 w-5" />
                            <span className="text-xs">{post.reposts}</span>
                          </Button>
                
                          <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-red-500 hover:bg-red-500/10 rounded-3xl cursor-pointer">
                            <Heart className="h-5 w-5" />
                            <span className="text-xs">{post.likes}</span>
                          </Button>
                
                          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-blue-500 hover:bg-blue-500/10 rounded-3xl cursor-pointer">
                            <Send className="h-5 w-5" />
                          </Button>
                        </div>
                      </article>
                    ))}
                </div>
            </div>
        </div>
    )
}
