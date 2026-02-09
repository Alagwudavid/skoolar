'use client'

import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Home, MapPin, DollarSign } from 'lucide-react'

const accommodations = [
  {
    id: '1',
    title: 'Modern Studio Apartment',
    price: '$800/month',
    location: 'Near Stanford Campus',
    type: 'Studio',
    available: 'Available Now'
  },
  {
    id: '2',
    title: 'Shared 2BR Apartment',
    price: '$600/month',
    location: 'Downtown SF',
    type: 'Shared',
    available: 'March 1'
  },
  {
    id: '3',
    title: 'Private Room in House',
    price: '$700/month',
    location: 'Berkeley',
    type: 'Room',
    available: 'Available Now'
  },
  {
    id: '4',
    title: 'Luxury 1BR with Gym',
    price: '$1,200/month',
    location: 'Mission Bay',
    type: '1 Bedroom',
    available: 'April 1'
  }
]

export default function AccommodationPage() {
  return (
    <div className="space-y-6 p-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Accommodation</h1>
          <p className="text-muted-foreground mt-2">
            Find student housing and apartments near your university
          </p>
        </div>
        <Button>
          <Home className="mr-2 h-4 w-4" />
          List Property
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {accommodations.map((accommodation) => (
          <Link key={accommodation.id} href={`/accommodation/${accommodation.id}`}>
            <Card className="h-full hover:shadow-lg transition-shadow">
              <div className="aspect-video bg-gradient-to-br from-orange-100 to-pink-100 dark:from-orange-950 dark:to-pink-950 rounded-t-lg" />
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <Badge className="mb-2">{accommodation.type}</Badge>
                    <CardTitle className="text-xl">{accommodation.title}</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{accommodation.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <DollarSign className="h-4 w-4" />
                  <span>{accommodation.price}</span>
                </div>
                <Badge variant="secondary">{accommodation.available}</Badge>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
