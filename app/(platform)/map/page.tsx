'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { MapPin, Search } from 'lucide-react'

export default function MapPage() {
  return (
    <div className="space-y-6 p-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Map</h1>
          <p className="text-muted-foreground mt-2">
            Explore universities, companies, and opportunities near you
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search for locations..."
          className="pl-10"
        />
      </div>

      {/* Map Placeholder */}
      <Card>
        <CardContent className="p-0">
          <div className="aspect-video bg-gradient-to-br from-blue-100 to-green-100 dark:from-blue-950 dark:to-green-950 rounded-lg flex items-center justify-center">
            <div className="text-center space-y-4">
              <MapPin className="h-16 w-16 mx-auto text-muted-foreground" />
              <div>
                <h3 className="text-lg font-semibold">Interactive Map</h3>
                <p className="text-muted-foreground">Map view coming soon</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Nearby Locations */}
      <div>
        <h2 className="text-xl font-bold mb-4">Nearby Locations</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Stanford University</CardTitle>
              <CardDescription className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                2.5 miles away
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" size="sm">View Details</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tech Corp Office</CardTitle>
              <CardDescription className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                3.8 miles away
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" size="sm">View Details</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
