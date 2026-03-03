'use client';

import { useEffect, useState, useTransition } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { getOrganization } from '@/actions/organizations';
import { joinOrganization, leaveOrganization } from '@/actions/organizations';
import { toast } from 'sonner';
import { Building2, Globe, MapPin, Users, Mail, Phone, ShieldCheck, Shield, User, Crown } from 'lucide-react';

type OrgRole = 'owner' | 'admin' | 'moderator' | 'member';
type OrgType = 'school' | 'university' | 'company' | 'nonprofit';

const TYPE_LABELS: Record<OrgType, string> = {
  school: '🎓 School',
  university: '🏛️ University',
  company: '🏢 Company',
  nonprofit: '🤝 Non-Profit',
};

const ROLE_BADGE: Record<OrgRole, { label: string; variant: 'default' | 'secondary' | 'outline'; icon: React.ElementType }> = {
  owner: { label: 'Owner', variant: 'default', icon: Crown },
  admin: { label: 'Admin', variant: 'default', icon: ShieldCheck },
  moderator: { label: 'Moderator', variant: 'secondary', icon: Shield },
  member: { label: 'Member', variant: 'outline', icon: User },
};

export default function OrganizationPage() {
  const params = useParams();
  const router = useRouter();
  const orgId = params.id as string;

  const [org, setOrg] = useState<any>(null);
  const [membership, setMembership] = useState<{ role: OrgRole } | null>(null);
  const [loading, setLoading] = useState(true);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    getOrganization(orgId).then(({ org, membership }) => {
      setOrg(org);
      setMembership(membership);
      setLoading(false);
    });
  }, [orgId]);

  const isMember = !!membership;
  const myRole = membership?.role;

  function handleJoinLeave() {
    startTransition(async () => {
      if (isMember) {
        const result = await leaveOrganization(orgId);
        if (result?.error) {
          toast.error(result.error);
        } else {
          setMembership(null);
          toast.success('Left organization');
        }
      } else {
        const result = await joinOrganization(orgId);
        if (result?.error) {
          toast.error(result.error);
        } else {
          setMembership({ role: 'member' });
          toast.success('Joined organization!');
        }
      }
    });
  }

  if (loading) {
    return (
      <div className="container max-w-6xl py-8 px-4 space-y-4">
        <Skeleton className="h-52 rounded-xl" />
        <Skeleton className="h-64 rounded-xl" />
      </div>
    );
  }

  if (!org) {
    return <div className="container py-16 text-center text-muted-foreground">Organization not found</div>;
  }

  const memberCount = org.organization_members?.[0]?.count ?? 0;
  const roleInfo = myRole ? ROLE_BADGE[myRole] : null;
  const canManage = myRole === 'owner' || myRole === 'admin';

  return (
    <div className="container max-w-6xl py-8 px-4 space-y-8">
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-6 md:flex-row md:items-start">
            <Avatar className="h-24 w-24">
              <AvatarImage src={org.logo_url ?? undefined} />
              <AvatarFallback className="text-3xl"><Building2 /></AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="mb-2 flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <h1 className="mb-1 text-3xl font-bold flex items-center gap-2">
                    {org.name}
                    {org.is_verified && <span className="text-primary text-xl" title="Verified">✓</span>}
                  </h1>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <Badge variant="secondary">{TYPE_LABELS[org.type as OrgType]}</Badge>
                    {roleInfo && (
                      <Badge variant={roleInfo.variant} className="flex items-center gap-1">
                        <roleInfo.icon className="w-3 h-3" />
                        {roleInfo.label}
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {canManage && (
                    <Button
                      variant="outline"
                      onClick={() => router.push(`/orgs/${orgId}/edit`)}
                    >
                      Edit
                    </Button>
                  )}
                  {canManage && (
                    <Button variant="outline" asChild>
                      <Link href={`/orgs/${orgId}/members`}>Manage Members</Link>
                    </Button>
                  )}
                  <Button
                    onClick={handleJoinLeave}
                    disabled={isPending || myRole === 'owner'}
                    variant={isMember ? 'outline' : 'default'}
                  >
                    {isPending ? '…' : isMember ? 'Leave' : 'Join'}
                  </Button>
                </div>
              </div>

              {org.description && (
                <p className="mb-4 text-muted-foreground">{org.description}</p>
              )}
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                {org.location && (
                  <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{org.location}</span>
                )}
                {org.website_url && (
                  <a
                    href={org.website_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 hover:text-foreground hover:underline"
                  >
                    <Globe className="w-3.5 h-3.5" />Website
                  </a>
                )}
                {org.email && (
                  <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5" />{org.email}</span>
                )}
                {org.phone && (
                  <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5" />{org.phone}</span>
                )}
                <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" />{memberCount.toLocaleString()} members</span>
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
              <p className="text-center text-muted-foreground text-sm py-8">
                Opportunities posted by this organization will appear here.
              </p>
              {canManage && (
                <Button className="w-full" onClick={() => router.push('/opportunities/create')}>
                  Post Opportunity
                </Button>
              )}
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>About</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div>
                <p className="font-medium">Type</p>
                <p className="text-muted-foreground">{TYPE_LABELS[org.type as OrgType]}</p>
              </div>
              <Separator />
              <div>
                <p className="font-medium">Members</p>
                <p className="text-muted-foreground">{memberCount.toLocaleString()}</p>
              </div>
              <Separator />
              <div>
                <p className="font-medium">Status</p>
                <p className="text-muted-foreground">{org.is_verified ? '✅ Verified' : '⏳ Unverified'}</p>
              </div>
              {!isMember && (
                <>
                  <Separator />
                  <Button className="w-full" onClick={handleJoinLeave} disabled={isPending}>
                    Join Organization
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
