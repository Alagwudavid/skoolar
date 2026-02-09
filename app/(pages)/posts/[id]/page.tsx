'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

interface Post {
  id: string;
  title: string;
  content: string;
  type: string;
  tags: string[];
  author: {
    id: string;
    name: string;
    avatar?: string;
    title?: string;
  };
  createdAt: string;
  likes: number;
  comments: number;
  isLiked: boolean;
}

interface Comment {
  id: string;
  content: string;
  author: {
    id: string;
    name: string;
    avatar?: string;
  };
  createdAt: string;
}

export default function PostPage() {
  const params = useParams();
  const router = useRouter();
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    fetchPost();
    checkAuth();
  }, [params.id]);

  const checkAuth = async () => {
    // Check if user is authenticated
    try {
      const response = await fetch('/api/auth/me');
      setIsAuthenticated(response.ok);
    } catch {
      setIsAuthenticated(false);
    }
  };

  const fetchPost = async () => {
    try {
      const response = await fetch(`/api/posts/${params.id}`);
      if (response.ok) {
        const data = await response.json();
        setPost(data.post);
        setComments(data.comments);
      }
    } catch (err) {
      console.error('Error fetching post:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async () => {
    if (!isAuthenticated) {
      router.push('/auth/signin');
      return;
    }

    try {
      await fetch(`/api/posts/${params.id}/like`, { method: 'POST' });
      fetchPost();
    } catch (err) {
      console.error('Error liking post:', err);
    }
  };

  const handleComment = async () => {
    if (!isAuthenticated) {
      router.push('/auth/signin');
      return;
    }

    if (!newComment.trim()) return;

    try {
      await fetch(`/api/posts/${params.id}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: newComment }),
      });
      setNewComment('');
      fetchPost();
    } catch (err) {
      console.error('Error posting comment:', err);
    }
  };

  if (loading) {
    return <div className="container py-8">Loading...</div>;
  }

  if (!post) {
    return <div className="container py-8">Post not found</div>;
  }

  return (
    <div className="container max-w-4xl py-8">
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              <Avatar>
                <AvatarImage src={post.author.avatar} />
                <AvatarFallback>{post.author.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <Link
                  href={`/users/${post.author.id}`}
                  className="font-semibold hover:underline"
                >
                  {post.author.name}
                </Link>
                {post.author.title && (
                  <p className="text-sm text-gray-600">{post.author.title}</p>
                )}
                <p className="text-sm text-gray-500">
                  {new Date(post.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
            </div>
            <Badge>{post.type}</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6 p-4">
          <div>
            <h1 className="mb-4 text-3xl font-bold">{post.title}</h1>
            <div className="prose max-w-none">
              <p className="whitespace-pre-wrap">{post.content}</p>
            </div>
          </div>

          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  #{tag}
                </Badge>
              ))}
            </div>
          )}

          <div className="flex items-center gap-4 border-t border-b py-4">
            <Button
              variant={post.isLiked ? 'default' : 'outline'}
              size="sm"
              onClick={handleLike}
            >
              👍 {post.likes} Likes
            </Button>
            <span className="text-sm text-gray-600">
              {post.comments} Comments
            </span>
          </div>

          {/* Comments Section */}
          <div className="space-y-4">
            <h3 className="font-semibold">Comments</h3>

            {isAuthenticated && (
              <div className="flex gap-2">
                <input
                  type="text"
                  className="flex-1 rounded-md border border-gray-300 px-3 py-2"
                  placeholder="Write a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleComment()}
                />
                <Button onClick={handleComment}>Post</Button>
              </div>
            )}

            {!isAuthenticated && (
              <div className="rounded-md bg-gray-50 p-4 text-center">
                <p className="text-sm text-gray-600">
                  <Link href="/auth/signin" className="text-blue-600 hover:underline">
                    Sign in
                  </Link>{' '}
                  to comment on this post
                </p>
              </div>
            )}

            <div className="space-y-4">
              {comments.map((comment) => (
                <div key={comment.id} className="flex gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={comment.author.avatar} />
                    <AvatarFallback>{comment.author.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="rounded-lg bg-gray-50 px-4 py-2">
                      <Link
                        href={`/users/${comment.author.id}`}
                        className="text-sm font-semibold hover:underline"
                      >
                        {comment.author.name}
                      </Link>
                      <p className="text-sm">{comment.content}</p>
                    </div>
                    <p className="mt-1 text-xs text-gray-500">
                      {new Date(comment.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
