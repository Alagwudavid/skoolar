import { Target, Handshake } from 'lucide-react'
import { BuildingIcon, GraduationCapIcon } from '../icons/regular'
import { ActiveOpportunitiesIcon, GroupIcon } from '../icons'
import { Card, CardContent } from '@/components/ui/card'

  const stats = [
    { icon: GraduationCapIcon, label: 'Schools', value: '500+' },
    { icon: ActiveOpportunitiesIcon, label: 'Opportunities', value: '1.2K+' },
    { icon: GroupIcon, label: 'Students', value: '50K+' },
    { icon: BuildingIcon, label: 'Companies', value: '400+' }
  ]
export function GrowthSection() {
    return (
        <section className="container mx-auto py-16 p-4">
            <h2 className="text-5xl font-normal text-center mb-4 max-w-lg mx-auto">
                A global platform for <span className="text-primary">Opportunity Discovery</span>
            </h2>

          {/* Quick Stats */}
          <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 pt-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <Card key={index} className={`text-foreground text-center border-0 shadow-none bg-transparent rounded-none py-3`}>
                  <CardContent className="p-3 pb-0">
                    {/* <Icon className="h-8 w-8 mx-auto" /> */}
                    <div className="text-3xl lg:text-6xl font-bold">{stat.value}</div>
                    <div className="text-base lg:text-lg">{stat.label}</div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </section>
    )
}
