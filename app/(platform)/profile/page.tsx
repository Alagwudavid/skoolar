'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowLeft, Ellipsis, FileText, Activity, Briefcase, GitMerge } from 'lucide-react'
import Image from 'next/image'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { MapPinIcon } from '@/components/icons/regular'
import instituteImage from "@/public/institutes/1631325653420.png";
import { BrandGithubIcon, BrandLinkedInIcon, BrandTwitterIcon, BrandLinkIcon } from '@/components/icons/collection'
import Tooltip from '@/components/tooltip'

const TABS = [
  { key: 'posts', label: 'Posts', icon: FileText },
  { key: 'activity', label: 'Activity', icon: Activity },
  { key: 'opportunities', label: 'Opportunities', icon: Briefcase },
  { key: 'contributions', label: 'Contributions', icon: GitMerge },
] as const;

type TabKey = (typeof TABS)[number]['key'];

export default function MyProfilePage() {
  const router = useRouter();
  const { user, isLoaded } = useUser();
  const [activeTab, setActiveTab] = useState<TabKey>('posts');

  if (!isLoaded) return null;

  const meta = (user?.unsafeMetadata ?? {}) as Record<string, string>;
  const displayName = user?.fullName ?? user?.emailAddresses?.[0]?.emailAddress ?? 'User';
  const username = user?.username ?? user?.emailAddresses?.[0]?.emailAddress ?? '';
  const initials = user?.firstName?.[0] ?? username[0]?.toUpperCase() ?? 'U';
  const bio = meta.bio ?? '';
  const location = meta.location ?? '';
  const school = meta.institution ?? '';
  const website = meta.website ?? '';
  const linkedin = meta.linkedin ?? '';
  const github = meta.github ?? '';
  const twitter = meta.twitter ?? '';

  const socialLinks = [
    linkedin && { href: `www.linkedin.com/in/${linkedin}`, label: 'LinkedIn', icon: BrandLinkedInIcon({ className: 'inline-block h-6 w-6' }) },
    github && { href: `www.github.com/${github}`, label: 'GitHub', icon: BrandGithubIcon({ className: 'inline-block h-6 w-6' }) },
    twitter && { href: `www.x.com/${twitter}`, label: 'Twitter / X', icon: BrandTwitterIcon({ className: 'inline-block h-6 w-6' }) },
    website && { href: website, label: website, icon: BrandLinkIcon({ className: 'inline-block h-6 w-6' }) },
  ].filter(Boolean) as { href: string; label: string; icon: React.ReactNode }[];

  const postCount = 0;

  return (
    <div className="container max-w-3xl mx-auto lg:py-8">
      <div className="sm:pr-4 space-y-4">
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
                <div className="flex flex-wrap gap-4 mt-3 text-sm text-muted-foreground">
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
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex gap-6 text-sm mb-4">
              <Link href={"/profile/followers"} className='hover:underline'><span className="font-semibold">0</span> Followers</Link>
              <Link href={"/profile/following"} className='hover:underline'><span className="font-semibold">0</span> Following</Link>
              <span><span className="font-semibold">{postCount}</span> Posts</span>
            </div>
            {socialLinks.length > 0 && (
              <div className="flex flex-wrap gap-3 text-sm">
                {socialLinks.map((s) => {
                  const url = s.href.startsWith("http")
                    ? s.href
                    : `https://${s.href}`;
                  // Extract the username/slug after the last slash
                  let slug = s.href;
                  try {
                    const u = new URL(url);
                    slug = u.pathname.split('/').filter(Boolean).pop() || u.hostname;
                  } catch {
                    slug = s.href.split('/').filter(Boolean).pop() || s.href;
                  }
                  return (
                    <Tooltip key={s.href} label={slug} position="bottom">
                      <Link
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={s.label}
                        className="flex items-center gap-1 text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {s.icon}
                      </Link>
                    </Tooltip>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Tab bar */}
        <div className="sticky top-13 z-10 bg-background/80 backdrop-blur border-b">
          <div className="flex">
            {TABS.map((tab) => {
              const isActive = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`relative flex-1 py-3 text-sm font-medium transition-colors ${isActive
                      ? 'text-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                    }`}
                >
                  {/* <Icon className="w-4 h-4" /> */}
                  {tab.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-1 w-14 rounded-full bg-foreground after:scale-x-0 after:origin-center after:transition-transform after:duration-300 hover:after:scale-x-100" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab panels */}
        <div className="pb-8">
          {TABS.map((tab) => {
            if (activeTab !== tab.key) return null;
            const Icon = tab.icon;
            return (
              <div key={tab.key}>
                {/* Empty state */}
                <div className="flex flex-col items-center justify-center gap-3 py-16 text-muted-foreground">
                  <Icon className="h-10 w-10 opacity-30" />
                  <p className="text-sm">No {tab.label.toLowerCase()} yet</p>
                  {tab.key === 'posts' && (
                    <Button size="sm" variant="outline" asChild>
                      <Link href="/posts/create">Create a post</Link>
                    </Button>
                  )}
                  {tab.key === 'opportunities' && (
                    <Button size="sm" variant="outline" asChild>
                      <Link href="/opportunities">Browse opportunities</Link>
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  )
}
