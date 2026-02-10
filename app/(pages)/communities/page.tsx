'use client'

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Users, Plus } from "lucide-react";
import Link from "next/link";

export default function CommunitiesPage() {
  // Mock data for frontend-only version
  const [communities] = useState([
    {
      id: '1',
      name: 'Computer Science Hub',
      description: 'Connect with CS students and professionals',
      members: 1523,
      created_at: '2026-01-15'
    },
    {
      id: '2',
      name: 'Career Guidance',
      description: 'Get career advice and mentorship',
      members: 892,
      created_at: '2026-01-20'
    },
    {
      id: '3',
      name: 'Study Groups',
      description: 'Find study partners and collaborate',
      members: 2341,
      created_at: '2026-02-01'
    },
    {
      id: '4',
      name: 'Startup Founders',
      description: 'Network with student entrepreneurs',
      members: 456,
      created_at: '2026-02-03'
    }
  ]);

  return (
    <div>
      {/* Header */}
      <div className="sticky top-0 z-10 backdrop-blur-lg bg-background/80 border-b">
        <div className="px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold">Communities</h1>
          <Button size="sm" className="gap-2">
            <Plus className="h-4 w-4" />
            Create
          </Button>
        </div>
      </div>

      {/* Communities Grid */}
      <div className="p-4 grid gap-4 md:grid-cols-2">
        {communities.map((community) => (
          <Link key={community.id} href={`/communities/${community.id}`}>
            <Card className="hover:shadow-lg transition-all hover:border-secondary/50">
              <CardHeader>
                <div className="flex items-start gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback>
                      <Users className="h-6 w-6" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <CardTitle className="text-lg">{community.name}</CardTitle>
                    <CardDescription className="mt-1">{community.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardFooter className="text-sm text-muted-foreground">
                <Users className="h-4 w-4 mr-1" />
                {community.members.toLocaleString()} members
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
