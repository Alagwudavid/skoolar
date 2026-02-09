import { Users } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import Image from 'next/image'

const testimonials = [
  {
    id: '1',
    name: 'Sarah Johnson',
    role: 'CS Student',
    rating: 5,
    text: 'The process was very fast and I found my dream internship within a week!',
    detail: 'I was looking for a summer internship in AI/ML and Skoolar connected me with amazing companies. The platform made it so easy to track my applications.'
  }
]

export function TestimonialsSection() {
  return (
    <section className="container mx-auto py-16 p-4">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold">
          What <span className="text-[#87f335]">Students</span> Say About Us
        </h2>
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div className="relative">
          <div className="aspect-video border overflow-hidden bg-gradient-to-br from-primary/20 to-primary/5 rounded-3xl flex items-center justify-center">
            {/* <div className="text-center">
              <Users className="h-24 w-24 mx-auto mb-4 text-primary" />
              <div className="text-4xl font-bold">+2M</div>
              <div className="text-muted-foreground">Happy Students</div>
            </div> */}
            <Image
              src={"/c7238ed4f6c3f25f169eb9561ad4e2fd.jpg"}
              width={1420}
              height={540}
              alt='background image of student with laptop'
              className='object-cover w-full bg-top'
            />
          </div>
        </div>

        <div>
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="p-6 rounded-3xl">
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-500 text-xl">★</span>
                ))}
              </div>
              <p className="text-2xl font-bold mb-4">{testimonial.text}</p>
              <p className="text-muted-foreground mb-6">{testimonial.detail}</p>
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
