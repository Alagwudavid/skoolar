'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Heart, MessageCircle, MoreHorizontal, Repeat2, Send } from 'lucide-react';
import SearchBar from '@/components/layout/search-bar';
import Image from 'next/image';

const featuredOpportunities = [
  {
    id: '1',
    type: 'Internship',
    title: 'Software Engineering Intern',
    organization: 'Tech Corp',
    location: 'San Francisco, CA',
    duration: '4-6 months'
  },
  {
    id: '2',
    type: 'Scholarship',
    title: 'Merit-Based Scholarship 2026',
    organization: 'Stanford University',
    location: 'Remote',
    duration: '3 months'
  },
  {
    id: '3',
    type: 'Placement',
    title: 'Graduate Software Developer',
    organization: 'Innovation Labs',
    location: 'New York, NY',
    duration: '4-6 months'
  },
  {
    id: '4',
    type: 'Internship',
    title: 'Data Science Intern',
    organization: 'Analytics Inc',
    location: 'Boston, MA',
    duration: '6 months'
  }
]

const mockNews = [
  {
    id: '1',
    title: 'How to ace technical interviews: Tips from a 10x candidate',
    content: 'Just finished my 10th technical interview this season. Here are my top tips for success: 1) Practice on LeetCode daily 2) Mock interlikes with friends 3) Study system design...',
    // type: 'Article',
    // tags: ['career', 'interlikes', 'tech'],
    author: { id: '1', name: 'UNN Gists', avatar: 'U' },
    createdAt: '2026-02-07',
    likes: 432,
    comments: 89,
  },
  {
    id: '2',
    title: 'New scholarships for STEM students',
    content: 'Excited to share that the National STEM Foundation just announced 50 new full-ride scholarships for underrepresented students in tech! Applications open March 1st.',
    // type: 'Achievement',
    // tags: ['scholarships', 'stem', 'opportunities'],
    author: { id: '2', name: 'Makoko Girls', avatar: 'M' },
    createdAt: '2026-02-06',
    likes: 1203,
    comments: 234,
  },
  {
    id: '3',
    title: 'Question: Best coding bootcamp for beginners?',
    content: 'I\'m looking to transition into software engineering. Does anyone have recommendations for beginner-friendly bootcamps? Budget is around $10k.',
    // type: 'Question',
    // tags: ['coding', 'bootcamp', 'career-change'],
    author: { id: '3', name: 'TheTrustMedia', avatar: 'T' },
    createdAt: '2026-02-05',
    likes: 78,
    comments: 156,
  },
];

const trendingTopics = [
  { id: 1, tag: '#TechInternships', posts: '1.2K posts' },
  { id: 2, tag: '#ScholarshipTips', posts: '850 posts' },
  { id: 3, tag: '#CareerAdvice', posts: '2.1K posts' },
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

  const newsScrollRef = useRef<HTMLDivElement>(null);
  const opportunitiesScrollRef = useRef<HTMLDivElement>(null);
  const topicsScrollRef = useRef<HTMLDivElement>(null);
  const postsScrollRef = useRef<HTMLDivElement>(null);

  const scroll = (ref: React.RefObject<HTMLDivElement | null>, direction: 'left' | 'right') => {
    if (ref.current) {
      ref.current.scrollBy({ left: direction === 'left' ? -320 : 320, behavior: 'smooth' });
    }
  };

  const filteredNews = newss.filter((news) =>
    news.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    news.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className='max-w-6xl mx-auto sm:space-y-4 sm:p-4'>
      {/* Header */}
      <div className="bg-background flex items-center gap-4 overflow-x-auto custom-scrollbar">
        <div className="px-4 pb-4 sm:py-4 flex items-center justify-center">
          <h1 className="text-lg font-medium relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[2px] after:bg-primary after:rounded-full after:origin-center after:transition-transform after:duration-300 after:scale-x-100 text-primary cursor-pointer">Explore</h1>
        </div>
        <div className="px-4 pb-4 sm:py-4 flex items-center justify-center">
          <h1 className="text-lg font-medium relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[2px] after:bg-primary after:rounded-full after:scale-x-0 after:origin-center after:transition-transform after:duration-300 hover:after:scale-x-100 hover:text-primary cursor-pointer">Trending</h1>
        </div>
        <div className="px-4 pb-4 sm:py-4 flex items-center justify-center">
          <h1 className="text-lg font-medium relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[2px] after:bg-primary after:rounded-full after:scale-x-0 after:origin-center after:transition-transform after:duration-300 hover:after:scale-x-100 hover:text-primary cursor-pointer">News</h1>
        </div>
        <div className="px-4 pb-4 sm:py-4 flex items-center justify-center">
          <h1 className="text-lg font-medium relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[2px] after:bg-primary after:rounded-full after:scale-x-0 after:origin-center after:transition-transform after:duration-300 hover:after:scale-x-100 hover:text-primary cursor-pointer">Topics</h1>
        </div>
        <div className="px-4 pb-4 sm:py-4 flex items-center justify-center">
          <h1 className="text-lg font-medium relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[2px] after:bg-primary after:rounded-full after:scale-x-0 after:origin-center after:transition-transform after:duration-300 hover:after:scale-x-100 hover:text-primary cursor-pointer">Opportunities</h1>
        </div>
        <div className="px-4 pb-4 sm:py-4 flex items-center justify-center">
          <h1 className="text-lg font-medium relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[2px] after:bg-primary after:rounded-full after:scale-x-0 after:origin-center after:transition-transform after:duration-300 hover:after:scale-x-100 hover:text-primary cursor-pointer">Posts</h1>
        </div>
      </div>

      <div className="p-4 sm:p-0">
        <SearchBar
          // maxWidth="max-w-sm"
          placeholder="Search..."
          value={searchQuery}
          onChange={setSearchQuery}
          showDropdown={false}
        />
      </div>

      {/* Trending News */}
      <div className="space-y-2 p-4 sm:p-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <h2 className="text-lg sm:text-xl font-bold text-foreground">Today&apos;s News</h2>
            <Button variant="link" asChild>
              <Link href="/news" className='flex items-center gap-1 text-sm'>
                View All
                <ChevronRight className='w-4 h-4' />
              </Link>
            </Button>
          </div>
          <div className="flex items-center gap-1">
            <button onClick={() => scroll(newsScrollRef, 'left')} className="h-8 w-8 flex items-center justify-center rounded border hover:bg-muted transition-colors">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button onClick={() => scroll(newsScrollRef, 'right')} className="h-8 w-8 flex items-center justify-center rounded border hover:bg-muted transition-colors">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
        <div>
          <div ref={newsScrollRef} className="flex gap-4 overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pb-2">
            {filteredNews.map((news) => (
              <article key={news.id} className="min-w-[280px] max-w-[280px] border rounded-2xl overflow-hidden cursor-pointer hover:bg-muted/50 transition-colors shrink-0">
                <div className='w-full h-32 bg-muted'></div>
                <div className=" p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Avatar className="h-5 w-5 rounded">
                      <AvatarFallback className='rounded text-xs'>{news.author.avatar}</AvatarFallback>
                    </Avatar>
                    <span className="text-muted-foreground text-sm truncate">{news.author.name}</span>
                  </div>
                  <h3 className="font-bold text-sm mb-2 line-clamp-2">{news.title}</h3>
                  <div className="flex items-center gap-2 text-muted-foreground text-xs">
                    <span>{news.likes} likes</span>
                    <span>·</span>
                    <span>{news.comments} comments</span>
                    <span>·</span>
                    <span>{new Date(news.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>

              </article>
            ))}
          </div>
        </div>
      </div>

      {/* Trending Opportunities */}
      <div className="space-y-2 p-4 sm:p-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <h2 className="text-lg sm:text-xl font-bold text-foreground">Opportunities</h2>
            <Button variant="link" asChild>
              <Link href="/opportunities" className='flex items-center gap-1 text-sm'>
                View All
                <ChevronRight className='w-4 h-4' />
              </Link>
            </Button>
          </div>
          <div className="flex items-center gap-1">
            <button onClick={() => scroll(opportunitiesScrollRef, 'left')} className="h-8 w-8 flex items-center justify-center rounded border hover:bg-muted transition-colors">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button onClick={() => scroll(opportunitiesScrollRef, 'right')} className="h-8 w-8 flex items-center justify-center rounded border hover:bg-muted transition-colors">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
        <div>
          <div ref={opportunitiesScrollRef} className="flex gap-4 overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pb-2">
            {featuredOpportunities.map((opportunity) => (
              <Link key={opportunity.id} href={`/opportunities/${opportunity.id}`} className="shrink-0">
                <Card className="w-64 h-64 hover:shadow-lg transition-shadow rounded-2xl overflow-hidden pt-0 gap-2">
                  <div className="aspect-video bg-muted rounded-2xl relative">
                    <div className="flex items-start justify-between mb-2 mr-2 absolute bottom-0 right-0">
                      <Badge className='px-3 py-1.5 bg-primary text-primary-foreground'>{opportunity.type}</Badge>
                    </div>
                  </div>
                  <CardHeader className="pb-0">
                    <CardTitle className="text-sm line-clamp-2 hover:text-primary">{opportunity.title}</CardTitle>
                    <CardDescription className="line-clamp-1 text-xs">
                      {opportunity.organization} • {opportunity.location}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="font-semibold text-foreground text-sm">{opportunity.duration}</div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Trending Topics */}
      <div className="space-y-2 p-4 sm:p-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <h2 className="text-lg sm:text-xl font-bold text-foreground">Trending Topics</h2>
            <Button variant="link" asChild>
              <Link href="/explore/topics" className='flex items-center gap-1 text-sm'>
                View All
                <ChevronRight className='w-4 h-4' />
              </Link>
            </Button>
          </div>
          <div className="flex items-center gap-1">
            <button onClick={() => scroll(topicsScrollRef, 'left')} className="h-8 w-8 flex items-center justify-center rounded border hover:bg-muted transition-colors">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button onClick={() => scroll(topicsScrollRef, 'right')} className="h-8 w-8 flex items-center justify-center rounded border hover:bg-muted transition-colors">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
        <div>
          <div ref={topicsScrollRef} className="flex gap-4 overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pb-2">
            {trendingTopics.map((topic) => (
              <article key={topic.id} className="min-w-[180px] border rounded-2xl p-4 cursor-pointer bg-muted/50 transition-colors shrink-0">
                <h3 className="font-bold text-base mb-1">{topic.tag}</h3>
                <p className="text-muted-foreground text-sm">{topic.posts}</p>
              </article>
            ))}
          </div>
        </div>
      </div>

      {/* Trending Posts */}
      <div className="space-y-2 p-4 sm:p-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <h2 className="text-lg sm:text-xl font-bold text-foreground">For You</h2>
            <Button variant="link" asChild>
              <Link href="/feed/global" className='flex items-center gap-1 text-sm'>
                View All
                <ChevronRight className='w-4 h-4' />
              </Link>
            </Button>
          </div>
          <div className="flex items-center gap-1">
            <button onClick={() => scroll(postsScrollRef, 'left')} className="h-8 w-8 flex items-center justify-center rounded border hover:bg-muted transition-colors">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button onClick={() => scroll(postsScrollRef, 'right')} className="h-8 w-8 flex items-center justify-center rounded border hover:bg-muted transition-colors">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
        <div>
          <div ref={postsScrollRef} className="flex gap-4 overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pb-2">
            {posts.map((post) => (
              <article key={post.id} className="min-w-[300px] max-w-[300px] border rounded-2xl p-4 cursor-pointer bg-muted/50 transition-colors shrink-0 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Link href={`/users/${post.user.username}`}>
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>{post.user.avatar}</AvatarFallback>
                      </Avatar>
                    </Link>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1">
                        <Link href={`/users/${post.user.username}`} className="font-semibold text-sm hover:underline truncate">
                          {post.user.name}
                        </Link>
                        {post.user.verified && (
                          <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24" className="text-lime-500 shrink-0"><path fill="currentColor" fillRule="evenodd" d="M12 21a9 9 0 1 0 0-18a9 9 0 0 0 0 18m-.232-5.36l5-6l-1.536-1.28l-4.3 5.159l-2.225-2.226l-1.414 1.414l3 3l.774.774z" clipRule="evenodd"></path></svg>
                        )}
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="h-7 w-7 rounded-full shrink-0">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>

                <p className="text-sm line-clamp-4 whitespace-pre-wrap flex-1">{post.content}</p>

                {post.image && (
                  <div className="rounded-xl overflow-hidden border relative w-full h-40">
                    <Image src={post.image} alt="Post image" fill className="object-cover" />
                  </div>
                )}

                <div className="flex items-center justify-between gap-3 mt-4">
                  <span className="text-muted-foreground">{post.timestamp}</span>
                  {/* Action Buttons */}
                  <div className="flex items-center gap-3">
                    <Button variant="ghost" size="sm" className="gap-2 text-foreground hover:text-red-500 rounded-none bg-transparent hover:bg-transparent! cursor-pointer">
                      <Heart className="h-4 w-4" />
                      <span className="text-sm">{post.likes}</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="gap-2 text-foreground hover:text-blue-500 rounded-full bg-transparent hover:bg-transparent! cursor-pointer">
                      <MessageCircle className="h-4 w-4" />
                      <span className="text-xs">{post.comments}</span>
                    </Button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
