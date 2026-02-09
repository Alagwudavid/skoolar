'use client'

import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Calendar, MapPin, Users } from 'lucide-react'

const events = [
  {
    id: '1',
    title: 'Tech Career Fair 2026',
    date: '2026-03-15',
    time: '10:00 AM - 5:00 PM',
    location: 'Convention Center, San Francisco',
    attendees: 500,
    type: 'Career Fair'
  },
  {
    id: '2',
    title: 'Web Development Workshop',
    date: '2026-02-20',
    time: '2:00 PM - 4:00 PM',
    location: 'Online',
    attendees: 150,
    type: 'Workshop'
  },
  {
    id: '3',
    title: 'Startup Networking Mixer',
    date: '2026-03-01',
    time: '6:00 PM - 9:00 PM',
    location: 'Innovation Hub, Boston',
    attendees: 200,
    type: 'Networking'
  }
]

export default function EventsPage() {
  return (
    <div className="space-y-6 p-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Events</h1>
          <p className="text-muted-foreground mt-2">
            Discover and attend career events, workshops, and networking sessions
          </p>
        </div>
        <Button>
          <Calendar className="mr-2 h-4 w-4" />
          Create Event
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {events.map((event) => (
          <Link key={event.id} href={`/events/${event.id}`}>
            <Card className="h-full hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <Badge className="mb-2">{event.type}</Badge>
                    <CardTitle className="text-xl">{event.title}</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>{event.date} • {event.time}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span>{event.attendees} attending</span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
