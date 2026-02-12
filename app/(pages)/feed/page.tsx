'use client'

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, Repeat2, Send, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

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

export default function FeedPage() {
  return (
    <div className="max-w-xl mx-auto">
      {/* Header */}
      <div className="sticky top-0 z-10 backdrop-blur-lg bg-background/80">
        <div className="px-4 py-4">
          <h1 className="text-xl font-bold">Home</h1>
        </div>
      </div>

      {/* Posts Feed */}
      <div className="divide-y border rounded-4xl overflow-hidden" >
        {posts.map((post) => (
          <article key={post.id} className="p-4 cursor-pointer">
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
                  <div className="flex items-center gap-1">
                    <Link href={`/users/${post.user.username}`} className="font-semibold hover:underline">
                      {post.user.name}
                    </Link>
                    {post.user.verified && (
                      <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" className="h-5 w-5 text-lime-500"><path fill="currentColor" fillRule="evenodd" d="M12 21a9 9 0 1 0 0-18a9 9 0 0 0 0 18m-.232-5.36l5-6l-1.536-1.28l-4.3 5.159l-2.225-2.226l-1.414 1.414l3 3l.774.774z" clipRule="evenodd"></path></svg>
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

                {/* Action Buttons */}
                <div className="flex items-center gap-3 mt-4">
                  <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-blue-500 rounded-full cursor-pointer">
                    <MessageCircle className="h-5 w-5" />
                    <span className="text-xs">{post.comments}</span>
                  </Button>

                  <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-green-500 rounded-full cursor-pointer">
                    <Repeat2 className="h-5 w-5" />
                    <span className="text-xs">{post.reposts}</span>
                  </Button>

                  <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-red-500 rounded-full cursor-pointer">
                    <Heart className="h-5 w-5" />
                    <span className="text-xs">{post.likes}</span>
                  </Button>

                  <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-blue-500 rounded-full cursor-pointer">
                    <Send className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
      <div className="w-full p-4 flex items-center justify-center">
        <Button size="lg" className="rounded-full hover:bg-secondary/80" asChild>
          <Link href="/auth/signup">Load more</Link>
        </Button>
      </div>
    </div>
  );
}
