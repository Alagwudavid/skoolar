import { Building2 } from 'lucide-react'

const partnerOrganizations = [
  { name: 'Instutitute 1', type: 'Company' },
  { name: 'Instutitute 2', type: 'Company' },
  { name: 'Instutitute 3', type: 'University' },
  { name: 'Instutitute 4', type: 'University' },
  { name: 'Instutitute 5', type: 'Company' },
  { name: 'Instutitute 6', type: 'Company' }
]

export function PartnerOrganizations() {
  return (
    <section className="py-12 overflow-hidden bg-bacground text-foreground">
      <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] group">
        <div className="flex gap-12 shrink-0 animate-marquee group-hover:paused">
          {partnerOrganizations.map((partner, index) => (
            <div key={index} className="flex flex-col items-center gap-2 min-w-max">
              <div className="w-40 h-20 bg-[#87f335] flex items-center justify-center">
                <Building2 className="h-8 w-8 text-white" />
              </div>
            </div>
          ))}
        </div>
        <div className="ml-12 flex gap-12 shrink-0 animate-marquee group-hover:paused" aria-hidden="true">
          {partnerOrganizations.map((partner, index) => (
            <div key={index} className="flex flex-col items-center gap-2 min-w-max">
              <div className="w-40 h-20 bg-[#87f335] flex items-center justify-center">
                <Building2 className="h-8 w-8 text-white" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
