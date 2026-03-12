'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, Repeat2, Send, MoreHorizontal, PlaySquare, ShoppingBag, MapPin, ChevronRight, Share } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { GroupIcon, HomeIcon } from "@/components/icons";
import { PlusIcon } from "@/components/icons/regular";
import CreatePostModal from "@/components/post/create-post";
import { useState } from "react";
import { Communities } from "@/components/server/myCommunities";
import { Trending } from "@/components/server/trendingRow";
import { BusinessIcon, PremiumIcon } from "@/components/icons/collection";

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
      isBusiness: true,
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
  const [openPostMenuId, setOpenPostMenuId] = useState<string | null>(null)

  const handleOpenPostMenu = (e: React.MouseEvent, postId: string) => {
    e.stopPropagation()
    setOpenPostMenuId(openPostMenuId === postId ? null : postId)
  }
  return (
    <div className="max-w-xl mx-auto">
      {/* <Communities /> */}
      <Trending className="sm:hidden" orientation="horizontal"/>
      {/* <CreatePostModal /> */}
      <div className="mt-4 sm:border divide-y sm:rounded-3xl overflow-hidden" >
        {posts.map((post) => (
          <article key={post.id} className="p-4 cursor-pointer">
            <div className="flex gap-3">
              {/* Avatar */}
              <Link href={`/users/${post.user.username}`}>
                <Avatar className="h-12 w-12">
                  <AvatarFallback isBusiness={post.user.isBusiness}>{post.user.avatar}</AvatarFallback>
                </Avatar>
              </Link>

              {/* Content */}
              <div className="flex-1 min-w-0">
                {/* User Info */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                  <div className="flex items-center gap-1">
                    <Link href={`/users/${post.user.username}`} className="font-semibold hover:underline">
                      {post.user.name}
                    </Link>
                    {post.user.verified ? (post.user.isBusiness ? (
                      <BusinessIcon className="h-5 w-5" />
                    )
                    :
                    (
                      <PremiumIcon className="h-5 w-5"/>
                    )) : ""}
                  </div>
                    <span className="text-muted-foreground">
                      {" • "}{post.timestamp}
                    </span>
                  </div>

                  <div className="relative">
                    <Button onClick={(e) => handleOpenPostMenu(e, post.id)} variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:text-primary">
                      <MoreHorizontal className="h-5 w-5" />
                    </Button>
                    {openPostMenuId === post.id && (
                      <div className="absolute right-2 p-3 rounded-sm bg-muted border w-50">
                        <div>Menu opened</div>
                      </div>
                    )}
                  </div>

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
                  <div className="mt-3 rounded-2xl overflow-hidden hover:bg-muted border relative w-60 h-80">
                  </div>
                </div>
                <div className="flex items-center justify-between gap-3 mt-4">
                  {/* <span className="text-muted-foreground">{post.timestamp}</span> */}
                  {/* Action Buttons */}
                  <div className="flex items-center gap-3">
                    <Button variant="ghost" size="sm" className="gap-2 text-foreground hover:text-red-500 rounded-3xl bg-red-500 cursor-pointer">
                      <Heart className="h-5! w-5!" />
                      <span className="text-sm">{post.likes}</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="gap-2 text-foreground hover:text-foreground rounded-3xl shadow-sm cursor-pointer">
                      <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36" className="h-5! w-5!"><path fill="#009a49" d="M4 5a4 4 0 0 0-4 4v18a4 4 0 0 0 4 4h8V5z"/><path fill="#eee" d="M12 5h12v26H12z"/><path fill="#009a49" d="M32 5h-8v26h8a4 4 0 0 0 4-4V9a4 4 0 0 0-4-4"/></svg>
                      <span className="text-sm">{post.comments}</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="gap-2 text-foreground hover:text-foreground rounded-3xl shadow-sm cursor-pointer">
                      <MessageCircle className="h-5! w-5!" />
                      <span className="text-sm">{post.comments}</span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
