'use client'

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, Repeat2, Send, MoreHorizontal, PlaySquare, ShoppingBag, MapPin, ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { GroupIcon, HomeIcon } from "@/components/icons";
import { PlusIcon } from "@/components/icons/regular";

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
      <div className="bg-background flex items-center justify-center gap-4">
        <div className="px-4 py-4 flex items-center justify-center">
          <h1 className="text-lg font-medium relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[2px] after:bg-primary after:rounded-full after:origin-center after:transition-transform after:duration-300 after:scale-x-100 text-primary cursor-pointer">Stories</h1>
        </div>
        <div className="px-4 py-4 flex items-center justify-center">
          <h1 className="text-lg font-medium relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[2px] after:bg-primary after:rounded-full after:scale-x-0 after:origin-center after:transition-transform after:duration-300 hover:after:scale-x-100 hover:text-primary cursor-pointer">Watch</h1>
        </div>
      </div>
      <div className="mb-4 flex items-center gap-2 relative">
        <div className="h-50 w-35 border rounded-2xl relative grid grid-rows-2 overflow-hidden">
          <div className="bg-primary"></div>
          <div className="bg-muted relative">
            <h1 className="text-xs font-bold absolute bottom-2 left-1/4">Create story</h1>
          </div>
          <div className="absolute top-[40%] left-[40%] w-8 h-8 p-2 rounded-full bg-white flex items-center justify-center">
            <PlusIcon className="w-6 h-6 text-black" />
          </div>
        </div>
        <div className="h-50 w-35 border rounded-2xl flex flex-col relative overflow-hidden">
          <div className="absolute top-2 left-2 z-20 border-2 border-primary rounded-full overflow-hidden w-10 h-10">
            <Image src={"/stories/u_1.png"} width={24} height={24} alt="Image of User 1" className="w-full h-full" />
          </div>
          <div className="bg-muted relative h-full">
            <Image src={"/stories/s_1.png"} width={120} height={240} alt="Status of User 1" className="w-full h-full" />
            <div className="w-full h-full inset-0 bg-black/50 absolute top-0 z-10" />
            <h1 className="text-white text-xs font-bold absolute bottom-2 left-2 z-20">User 1</h1>
          </div>
        </div>
        <div className="h-50 w-35 border rounded-2xl flex flex-col relative overflow-hidden">
          <div className="absolute top-2 left-2 z-20 border-2 border-primary rounded-full overflow-hidden w-10 h-10">
            <Image src={"/stories/u_2.png"} width={24} height={24} alt="Image of User 2" className="w-full h-full" />
          </div>
          <div className="bg-muted relative h-full">
            <Image src={"/stories/s_2.png"} width={120} height={240} alt="Status of User 2" className="w-full h-full" />
            <div className="w-full h-full inset-0 bg-black/50 absolute top-0 z-10" />
            <h1 className="text-white text-xs font-bold absolute bottom-2 left-2 z-20">User 2</h1>
          </div>
        </div>
        <div className="h-50 w-35 border rounded-2xl flex flex-col relative overflow-hidden">
          <div className="absolute top-2 left-2 z-20 border-2 border-primary rounded-full overflow-hidden w-10 h-10">
            <Image src={"/stories/u_3.png"} width={24} height={24} alt="Image of User 3" className="w-full h-full" />
          </div>
          <div className="bg-muted relative h-full">
            <Image src={"/stories/s_3.png"} width={120} height={240} alt="Status of User 3" className="w-full h-full" />
            <div className="w-full h-full inset-0 bg-black/50 absolute top-0 z-10" />
            <h1 className="text-white text-xs font-bold absolute bottom-2 left-2 z-20">User 3</h1>
          </div>
        </div>
        <div className="absolute top-[40%] -right-4 w-8 h-8 p-2 rounded-full bg-foreground flex items-center justify-center z-20 cursor-pointer group shadow-sm shadow-muted">
          <ChevronRight className="w-6 h-6 text-background group-hover:text-primary" />
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
