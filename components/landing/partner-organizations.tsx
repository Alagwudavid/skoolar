import { Building2 } from 'lucide-react'

const partnerOrganizations = [
  { name: 'Tech Corp', type: 'Company' },
  { name: 'Innovation Labs', type: 'Company' },
  { name: 'Stanford', type: 'University' },
  { name: 'MIT', type: 'University' },
  { name: 'Google', type: 'Company' },
  { name: 'Microsoft', type: 'Company' }
]

export function PartnerOrganizations() {
  return (
    <section className="bg-muted/30 py-12">
      <div className="container mx-auto">
        <h3 className="text-center text-sm font-semibold text-muted-foreground mb-8 capitalize">
          TRUSTED BY LEADING ORGANIZATIONS
        </h3>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-8 items-center justify-items-center">
          {partnerOrganizations.map((partner, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 rounded-full bg-background flex items-center justify-center mb-2 mx-auto">
                <Building2 className="h-8 w-8 text-primary" />
              </div>
              <div className="text-xs font-medium">{partner.name}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
