'use client'

import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ShoppingBag } from 'lucide-react'

const items = [
  {
    id: '1',
    title: 'MacBook Pro M3',
    price: '$1,800',
    category: 'Electronics',
    seller: 'John Doe',
    condition: 'Like New'
  },
  {
    id: '2',
    title: 'Data Structures Textbook',
    price: '$45',
    category: 'Books',
    seller: 'Jane Smith',
    condition: 'Good'
  },
  {
    id: '3',
    title: 'Study Desk with Chair',
    price: '$120',
    category: 'Furniture',
    seller: 'Mike Johnson',
    condition: 'Used'
  },
  {
    id: '4',
    title: 'Scientific Calculator',
    price: '$25',
    category: 'Electronics',
    seller: 'Sarah Wilson',
    condition: 'Excellent'
  }
]

export default function MarketplacePage() {
  return (
    <div className="space-y-6 p-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Marketplace</h1>
          <p className="text-muted-foreground mt-2">
            Buy and sell items with other students
          </p>
        </div>
        <Button>
          <ShoppingBag className="mr-2 h-4 w-4" />
          List Item
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <Link key={item.id} href={`/marketplace/${item.id}`}>
            <Card className="h-full hover:shadow-lg transition-shadow">
              <div className="aspect-video bg-gradient-to-br from-primary/10 to-primary/5 rounded-t-lg" />
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <Badge className="mb-2" variant="secondary">{item.category}</Badge>
                    <CardTitle className="text-lg line-clamp-2">{item.title}</CardTitle>
                    <CardDescription className="mt-2">
                      by {item.seller}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="font-bold text-xl text-primary">{item.price}</div>
                  <Badge variant="outline">{item.condition}</Badge>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
