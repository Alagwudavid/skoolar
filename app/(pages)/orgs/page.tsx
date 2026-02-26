'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { getOrganizations } from '@/actions/organizations';
import { Building2, MapPin, Users, Globe } from 'lucide-react';

type OrgType = 'school' | 'university' | 'company' | 'nonprofit';

const TYPE_LABELS: Record<OrgType, string> = {
  school: '🎓 School',
  university: '🏛️ University',
  company: '🏢 Company',
  nonprofit: '🤝 Non-Profit',
};

interface Organization {
  id: string;
  name: string;
  type: OrgType;
  logo_url?: string | null;
  description?: string | null;
  location?: string | null;
  website_url?: string | null;
  is_verified: boolean;
  organization_members: { count: number }[];
}

export default function OrganizationsPage() {
  const router = useRouter();
  const [orgs, setOrgs] = useState<Organization[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | OrgType>('all');

  useEffect(() => {
    getOrganizations().then(({ orgs }) => {
      setOrgs(orgs as Organization[]);
      setLoading(false);
    });
  }, []);

  const filteredOrgs = orgs.filter((org) => {
    const matchesSearch =
      org.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (org.description ?? '').toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === 'all' || org.type === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="container max-w-6xl py-8 px-4">
      <div className="mb-8 flex items-center justify-between gap-4">
        <div>
          <h1 className="mb-1 text-3xl font-bold">Organizations</h1>
          <p className="text-muted-foreground">
            Discover schools, universities, and companies on Skoolar
          </p>
        </div>
        <Button onClick={() => router.push('/orgs/create')}>
          + Register Org
        </Button>
      </div>

      <div className="mb-6 flex flex-col gap-4 md:flex-row flex-wrap">
        <Input
          placeholder="Search organizations..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="md:max-w-sm"
        />
        <div className="flex gap-2 flex-wrap">
          {(['all', 'school', 'university', 'company', 'nonprofit'] as const).map((t) => (
            <Button
              key={t}
              variant={filterType === t ? 'default' : 'outline'}
              onClick={() => setFilterType(t)}
              className="capitalize"
              size="sm"
            >
              {t === 'all' ? 'All' : TYPE_LABELS[t as OrgType].split(' ')[1]}
            </Button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-44 rounded-xl" />)}
        </div>
      ) : filteredOrgs.length === 0 ? (
        <div className="flex flex-col items-center gap-3 py-16 text-muted-foreground">
          <Building2 className="w-10 h-10 opacity-40" />
          <p className="text-sm">No organizations found.</p>
          <Button asChild size="sm">
            <Link href="/orgs/create">Register one</Link>
          </Button>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredOrgs.map((org) => {
            const memberCount = org.organization_members?.[0]?.count ?? 0;
            return (
              <Link key={org.id} href={`/orgs/${org.id}`}>
                <Card className="h-full hover:shadow-lg transition-shadow hover:bg-muted/30">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <Avatar className="h-14 w-14">
                        <AvatarImage src={org.logo_url ?? undefined} />
                        <AvatarFallback>{org.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <CardTitle className="line-clamp-1 flex items-center gap-1.5">
                          {org.name}
                          {org.is_verified && <span title="Verified" className="text-primary">✓</span>}
                        </CardTitle>
                        <Badge variant="secondary" className="mt-1 text-xs">
                          {TYPE_LABELS[org.type]}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-3 line-clamp-2 text-sm text-muted-foreground">
                      {org.description ?? 'No description'}
                    </p>
                    <div className="space-y-1 text-xs text-muted-foreground">
                      {org.location && (
                        <p className="flex items-center gap-1"><MapPin className="w-3 h-3" />{org.location}</p>
                      )}
                      <p className="flex items-center gap-1"><Users className="w-3 h-3" />{memberCount.toLocaleString()} members</p>
                      {org.website_url && (
                        <p className="flex items-center gap-1"><Globe className="w-3 h-3" />Website</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
