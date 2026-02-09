'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Organization {
  id: string;
  name: string;
  type: 'school' | 'company';
  logo?: string;
  description: string;
  location: string;
  memberCount: number;
  opportunitiesCount: number;
}

export default function OrganizationsPage() {
  const router = useRouter();
  const [orgs, setOrgs] = useState<Organization[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'school' | 'company'>('all');

  useEffect(() => {
    fetchOrganizations();
  }, []);

  const fetchOrganizations = async () => {
    try {
      const response = await fetch('/api/orgs');
      if (response.ok) {
        const data = await response.json();
        setOrgs(data);
      }
    } catch (err) {
      console.error('Error fetching organizations:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredOrgs = orgs.filter((org) => {
    const matchesSearch = org.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      org.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === 'all' || org.type === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="container max-w-6xl py-8 border-r">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="mb-2 text-3xl font-bold">Organizations</h1>
          <p className="text-gray-600">
            Discover schools and companies on Skoolar
          </p>
        </div>
        <Button onClick={() => router.push('/orgs/create')}>
          + Create Organization
        </Button>
      </div>

      <div className="mb-6 flex flex-col gap-4 md:flex-row">
        <Input
          placeholder="Search organizations..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="md:flex-1"
        />
        <div className="flex gap-2">
          <Button
            variant={filterType === 'all' ? 'default' : 'outline'}
            onClick={() => setFilterType('all')}
          >
            All
          </Button>
          <Button
            variant={filterType === 'school' ? 'default' : 'outline'}
            onClick={() => setFilterType('school')}
          >
            Schools
          </Button>
          <Button
            variant={filterType === 'company' ? 'default' : 'outline'}
            onClick={() => setFilterType('company')}
          >
            Companies
          </Button>
        </div>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredOrgs.map((org) => (
            <Link key={org.id} href={`/orgs/${org.id}`}>
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={org.logo} />
                      <AvatarFallback>{org.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <CardTitle className="line-clamp-1">{org.name}</CardTitle>
                      <Badge className="mt-1">
                        {org.type === 'school' ? '🎓 School' : '🏢 Company'}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="mb-4 line-clamp-2 text-sm text-gray-600">
                    {org.description}
                  </p>
                  <div className="space-y-1 text-sm text-gray-500">
                    <p>📍 {org.location}</p>
                    <p>👥 {org.memberCount} members</p>
                    <p>💼 {org.opportunitiesCount} opportunities</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
