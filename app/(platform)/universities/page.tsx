'use client'

import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { GraduationCap, MapPin, Users, Search } from 'lucide-react'

const universities = [
  {
    id: '1',
    name: 'Stanford University',
    location: 'Stanford, CA',
    students: '17,000+',
    ranking: '#3 US News',
    type: 'Private'
  },
  {
    id: '2',
    name: 'MIT',
    location: 'Cambridge, MA',
    students: '11,000+',
    ranking: '#2 US News',
    type: 'Private'
  },
  {
    id: '3',
    name: 'UC Berkeley',
    location: 'Berkeley, CA',
    students: '45,000+',
    ranking: '#1 Public',
    type: 'Public'
  },
  {
    id: '4',
    name: 'Harvard University',
    location: 'Cambridge, MA',
    students: '23,000+',
    ranking: '#3 US News',
    type: 'Private'
  },
  {
    id: '5',
    name: 'Carnegie Mellon',
    location: 'Pittsburgh, PA',
    students: '15,000+',
    ranking: '#22 US News',
    type: 'Private'
  },
  {
    id: '6',
    name: 'University of Oxford',
    location: 'Oxford, UK',
    students: '24,000+',
    ranking: '#1 World',
    type: 'Public'
  }
]

export default function UniversitiesPage() {
  return (
    <div className="space-y-6">
      <div className="sticky top-0 z-10 flex items-center justify-between bg-background border-b p-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Universities</h1>
          <p className="text-muted-foreground mt-2">
            Explore top universities and their programs
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative p-4">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search universities..."
          className="pl-10"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 p-4">
        {universities.map((university) => (
          <Link key={university.id} href={`/universities/${university.id}`}>
            <Card className="h-full hover:shadow-lg transition-shadow">
              <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-950 dark:to-purple-950 rounded-t-lg flex items-center justify-center">
                <GraduationCap className="h-16 w-16 text-primary" />
              </div>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <Badge className="mb-2">{university.type}</Badge>
                    <CardTitle className="text-lg">{university.name}</CardTitle>
                    <CardDescription className="mt-2">
                      {university.ranking}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{university.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span>{university.students} students</span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
