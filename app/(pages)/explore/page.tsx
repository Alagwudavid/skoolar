'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Heart, MessageCircle, Repeat2, Search, Send, TrendingUp } from 'lucide-react';
import SearchBar from '@/components/layout/search-bar';

const mockPosts = [
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
  { tag: '#InternshipSeason', count: '2.4K posts' },
  { tag: '#CodeDaily', count: '1.8K posts' },
  { tag: '#ScholarshipAlert', count: '1.2K posts' },
  { tag: '#TechCareers', count: '987 posts' },
];

export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [posts] = useState(mockPosts);

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div>
      {/* Header */}
      <div className="sticky top-0 z-10 backdrop-blur-lg bg-background/80">
        <div className="px-4 py-4">
          <h1 className="text-xl font-bold mb-3">Discover</h1>
          {/* Search Bar */}
          <div className="relative">
            <SearchBar />
          </div>
        </div>
      </div>

      {/* Trending Topics */}
      <div className="p-4">
        <h2 className="font-bold text-lg mb-3 flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Trending Topics
        </h2>
        <div className="flex flex-wrap gap-2">
          {trendingTopics.map((topic, index) => (
            <Link key={index} href={`/explore?q=${encodeURIComponent(topic.tag)}`}>
              <Badge variant="secondary" className="cursor-pointer hover:bg-secondary/80 hover:text-primary-foreground px-2 py-1.5">
                {topic.tag}
              </Badge>
            </Link>
          ))}
        </div>
      </div>

      {/* Posts Feed */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {filteredPosts.map((post) => (
          <Link key={post.id} href={`/posts/${post.id}`}>
            <article className="p-4 hover:bg-muted/50 transition-colors rounded-2xl border h-full">
              <div className="flex gap-3">
                {/* Avatar */}
                <Avatar className="h-10 w-10">
                  <AvatarFallback>{post.author.avatar}</AvatarFallback>
                </Avatar>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  {/* User Info */}
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold">{post.author.name}</span>
                    <span className="text-muted-foreground">·</span>
                    <span className="text-muted-foreground text-sm">
                      {new Date(post.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  {/* Post Content */}
                  <h3 className="font-bold text-lg mb-1">{post.title}</h3>
                  <p className="text-muted-foreground line-clamp-2 text-sm mb-2">
                    {post.content}
                  </p>

                  {/* Tags */}
                  {post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-2">
                      {post.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="grid grid-cols-4 mt-3 w-full">
                    <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-blue-500 hover:bg-blue-500/10 rounded-3xl cursor-pointer">
                      <MessageCircle className="h-5 w-5" />
                      <span className="text-xs">{post.comments}</span>
                    </Button>

                    <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-green-500 hover:bg-green-500/10 rounded-3xl cursor-pointer">
                      <Repeat2 className="h-5 w-5" />
                      <span className="text-xs">0</span>
                    </Button>

                    <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-red-500 hover:bg-red-500/10 rounded-3xl cursor-pointer">
                      <Heart className="h-5 w-5" />
                      <span className="text-xs">{post.likes}</span>
                    </Button>

                    <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-blue-500 hover:bg-blue-500/10 rounded-3xl cursor-pointer">
                      <Send className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
}
