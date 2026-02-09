'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface Organization {
  id: string;
  name: string;
  type: 'school' | 'company';
  logo?: string;
  description: string;
  location: string;
  website?: string;
  founded?: string;
  memberCount: number;
  isAdmin: boolean;
  isMember: boolean;
}

interface Opportunity {
  id: string;
  title: string;
  type: string;
  deadline: string;
}

export default function OrganizationPage() {
  const params = useParams();
  const router = useRouter();
  const [org, setOrg] = useState<Organization | null>(null);
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    fetchOrganization();
    checkAuth();
  }, [params.id]);

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/auth/me');
      setIsAuthenticated(response.ok);
    } catch {
      setIsAuthenticated(false);
    }
  };

  const fetchOrganization = async () => {
    try {
      const response = await fetch(`/api/orgs/${params.id}`);
      if (response.ok) {
        const data = await response.json();
        setOrg(data.org);
        setOpportunities(data.opportunities);
      }
    } catch (err) {
      console.error('Error fetching organization:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleJoin = async () => {
    if (!isAuthenticated) {
      router.push('/auth/signin');
      return;
    }

    try {
      await fetch(`/api/orgs/${params.id}/join`, { method: 'POST' });
      fetchOrganization();
    } catch (err) {
      console.error('Error joining organization:', err);
    }
  };

  if (loading) {
    return <div className="container py-8">Loading...</div>;
  }

  if (!org) {
    return <div className="container py-8">Organization not found</div>;
  }

  return (
    <div className="container max-w-6xl py-8">
      <Card className="mb-8">
        <CardHeader>
          <div className="flex flex-col gap-6 md:flex-row md:items-start">
            <Avatar className="h-32 w-32">
              <AvatarImage src={org.logo} />
              <AvatarFallback className="text-4xl">{org.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="mb-2 flex items-start justify-between">
                <div>
                  <h1 className="mb-2 text-3xl font-bold">{org.name}</h1>
                  <Badge className="mb-4">
                    {org.type === 'school' ? '🎓 School' : '🏢 Company'}
                  </Badge>
                </div>
                <div className="flex gap-2">
                  {org.isAdmin && (
                    <Button
                      variant="outline"
                      onClick={() => router.push(`/orgs/${org.id}/edit`)}
                    >
                      Edit
                    </Button>
                  )}
                  {!org.isMember && (
                    <Button onClick={handleJoin}>
                      {isAuthenticated ? 'Join' : 'Sign in to Join'}
                    </Button>
                  )}
                  {org.isMember && !org.isAdmin && (
                    <Button variant="outline">Member</Button>
                  )}
                </div>
              </div>
              <p className="mb-4 text-gray-600">{org.description}</p>
              <div className="space-y-2 text-sm">
                <p>📍 {org.location}</p>
                {org.website && (
                  <p>
                    🌐{' '}
                    <a
                      href={org.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {org.website}
                    </a>
                  </p>
                )}
                {org.founded && <p>📅 Founded {org.founded}</p>}
                <p>👥 {org.memberCount} members</p>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Opportunities</CardTitle>
            </CardHeader>
            <CardContent>
              {opportunities.length === 0 ? (
                <p className="text-center text-gray-500">
                  No opportunities available yet
                </p>
              ) : (
                <div className="space-y-4">
                  {opportunities.map((opp) => (
                    <Link
                      key={opp.id}
                      href={`/opportunities/${opp.id}`}
                      className="block rounded-lg border p-4 hover:bg-gray-50"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold">{opp.title}</h3>
                          <Badge variant="secondary" className="mt-1">
                            {opp.type}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-500">
                          Deadline: {new Date(opp.deadline).toLocaleDateString()}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>About</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="mb-2 font-semibold">Industry</h4>
                <p className="text-sm text-gray-600">
                  {org.type === 'school' ? 'Education' : 'Technology'}
                </p>
              </div>
              <div>
                <h4 className="mb-2 font-semibold">Members</h4>
                <p className="text-sm text-gray-600">{org.memberCount}</p>
              </div>
              {org.isAdmin && (
                <Button
                  className="w-full"
                  onClick={() => router.push('/opportunities/create')}
                >
                  Post Opportunity
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
