'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ChevronRight, Heart, MessageCircle, MoreHorizontal, Repeat2, Search, Send, TrendingUp } from 'lucide-react';
import SearchBar from '@/components/layout/search-bar';
import Image from 'next/image';

const featuredOpportunities = [
  {
    id: '1',
    type: 'Internship',
    title: 'Software Engineering Intern',
    organization: 'Tech Corp',
    location: 'San Francisco, CA',
    price: '$5,000/month'
  },
  {
    id: '2',
    type: 'Scholarship',
    title: 'Merit-Based Scholarship 2026',
    organization: 'Stanford University',
    location: 'Remote',
    price: 'Full Tuition'
  },
  {
    id: '3',
    type: 'Placement',
    title: 'Graduate Software Developer',
    organization: 'Innovation Labs',
    location: 'New York, NY',
    price: '$95K/year'
  },
  {
    id: '4',
    type: 'Internship',
    title: 'Data Science Intern',
    organization: 'Analytics Inc',
    location: 'Boston, MA',
    price: '$4,500/month'
  }
]

const mockNews = [
  {
    id: '1',
    title: 'How to ace technical interviews',
    content: 'Just finished my 10th technical interview this season. Here are my top tips for success: 1) Practice on LeetCode daily 2) Mock interviews with friends 3) Study system design...',
    type: 'Article',
    tags: ['career', 'interviews', 'tech'],
    author: { id: '1', name: 'Alex Rivera', avatar: 'A' },
    createdAt: '2026-02-07',
    likes: 432,
    comments: 89,
  },
  {
    id: '2',
    title: 'New scholarships for STEM students',
    content: 'Excited to share that the National STEM Foundation just announced 50 new full-ride scholarships for underrepresented students in tech! Applications open March 1st.',
    type: 'Achievement',
    tags: ['scholarships', 'stem', 'opportunities'],
    author: { id: '2', name: 'Dr. Maria Santos', avatar: 'M' },
    createdAt: '2026-02-06',
    likes: 1203,
    comments: 234,
  },
  {
    id: '3',
    title: 'Question: Best coding bootcamp for beginners?',
    content: 'I\'m looking to transition into software engineering. Does anyone have recommendations for beginner-friendly bootcamps? Budget is around $10k.',
    type: 'Question',
    tags: ['coding', 'bootcamp', 'career-change'],
    author: { id: '3', name: 'Jamie Chen', avatar: 'J' },
    createdAt: '2026-02-05',
    likes: 78,
    comments: 156,
  },
];

const trendingTopics = [
  { tag: 'Explore', count: '2.4K newss' },
  { tag: '#InternshipSeason', count: '2.4K newss' },
  { tag: '#CodeDaily', count: '1.8K newss' },
  { tag: '#ScholarshipAlert', count: '1.2K newss' },
  { tag: '#TechCareers', count: '987 newss' },
];

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

export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [newss] = useState(mockNews);

  const filteredNews = newss.filter((news) =>
    news.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    news.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    news.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className='max-w-xl mx-auto space-y-4 py-4'>
      {/* Header */}
      <div className="p-4 sm:p-0">
        <SearchBar />
      </div>

      {/* Trending Topics */}
      <div className="p-4 sm:p-0 flex flex-wrap gap-2 items-center">
        {trendingTopics.map((topic, index) => (
          <Link key={index} href={`/explore?q=${encodeURIComponent(topic.tag)}`}>
            <Badge variant="secondary" className="cursor-pointer px-3 py-2 rounded-md transition-colors">
              {topic.tag}
            </Badge>
          </Link>
        ))}
      </div>

      <div className="space-y-2 p-4 sm:p-0">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg sm:text-xl font-bold mb-2 text-foreground">Trending</h2>
          </div>
          <Button variant="link" className='' asChild>
            <Link href="/opportunities" className='flex items-center gap-2'>
              View All
              <ChevronRight className='w-5 h-5' />
            </Link>
          </Button>
        </div>
        <div className="h-60 w-full border rounded-2xl flex flex-col bg-muted relative overflow-hidden">
          <Image src={"/stories/s_1.png"} width={120} height={240} alt="Status of User 3" className="w-full h-full" />
          <div className="w-full h-full inset-0 bg-black/50 absolute top-0 z-10" />
          <h1 className="text-white text-lg font-bold absolute bottom-2 left-2 z-20">Lorem ipsum dolor sit amet consectetur adipisicing elit.</h1>
        </div>
      </div>

      <div className="space-y-2 p-4 sm:p-0">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg sm:text-xl font-bold mb-2 text-foreground">Opportunities</h2>
          </div>
          <Button variant="link" className='' asChild>
            <Link href="/opportunities" className='flex items-center gap-2'>
              View All
              <ChevronRight className='w-5 h-5' />
            </Link>
          </Button>
        </div>
        <div className="flex items-center gap-6 overflow-x-auto custom-scrollbar sm:pb-2">
          {featuredOpportunities.map((opportunity) => (
            <Link key={opportunity.id} href={`/opportunities/${opportunity.id}`}>
              <Card className="w-72 h-72 shrink-0 hover:shadow-lg transition-shadow rounded-2xl overflow-hidden pt-0 gap-2">
                <div className="aspect-video bg-muted rounded-2xl relative">
                  <div className="flex items-start justify-between mb-2 mr-2 absolute bottom-0 right-0">
                    <Badge className='px-3 py-1.5 bg-primary text-primary-foreground'>{opportunity.type}</Badge>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-lg line-clamp-2 hover:text-primary">{opportunity.title}</CardTitle>
                  <CardDescription className="line-clamp-1">
                    {opportunity.organization} • {opportunity.location}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="font-semibold text-foreground">{opportunity.price}</div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      <div className="space-y-2 p-4 sm:p-0">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg sm:text-xl font-bold mb-2 text-foreground">Today&apos;s News</h2>
          </div>
          <Button variant="link" className='' asChild>
            <Link href="/opportunities" className='flex items-center gap-2'>
              View All
              <ChevronRight className='w-5 h-5' />
            </Link>
          </Button>
        </div>
        <div className="divide-y border rounded-4xl overflow-hidden">
          {filteredNews.map((news) => (
            // <Link key={news.id} href={`/news/${news.id}`}>
            <article key={news.id} className="p-4 cursor-pointer transition-colors h-full">
              <div className="flex gap-3">
                {/* Avatar */}
                <Avatar className="h-10 w-10">
                  <AvatarFallback>{news.author.avatar}</AvatarFallback>
                </Avatar>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  {/* User Info */}
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold">{news.author.name}</span>
                    <span className="text-muted-foreground">·</span>
                    <span className="text-muted-foreground text-sm">
                      {new Date(news.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  {/* Post Content */}
                  <h3 className="font-bold text-lg mb-1">{news.title}</h3>
                  <p className="text-muted-foreground line-clamp-2 text-sm mb-2">
                    {news.content}
                  </p>

                  {/* Tags */}
                  {news.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-2">
                      {news.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="hidden grid grid-cols-4 mt-3 w-full">
                    <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-blue-500 hover:bg-blue-500/10 rounded-3xl cursor-pointer">
                      <MessageCircle className="h-5 w-5" />
                      <span className="text-xs">{news.comments}</span>
                    </Button>

                    <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-green-500 hover:bg-green-500/10 rounded-3xl cursor-pointer">
                      <Repeat2 className="h-5 w-5" />
                      <span className="text-xs">0</span>
                    </Button>

                    <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-red-500 hover:bg-red-500/10 rounded-3xl cursor-pointer">
                      <Heart className="h-5 w-5" />
                      <span className="text-xs">{news.likes}</span>
                    </Button>

                    <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-blue-500 hover:bg-blue-500/10 rounded-3xl cursor-pointer">
                      <Send className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </div>
            </article>
            // </Link>
          ))}
        </div>
      </div>

      <div className="space-y-2 p-4 sm:p-0">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg sm:text-xl font-bold mb-2 text-foreground">For You</h2>
          </div>
          <Button variant="link" className='' asChild>
            <Link href="/opportunities" className='flex items-center gap-2'>
              View All
              <ChevronRight className='w-5 h-5' />
            </Link>
          </Button>
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
      </div>
    </div>
  );
}
