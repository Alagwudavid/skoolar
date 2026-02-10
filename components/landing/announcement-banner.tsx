import { Sparkles } from 'lucide-react'

export function AnnouncementBanner() {
  return (
    <div className="bg-secondary text-secondary-foreground py-2 text-center text-sm fixed top-0 left-0 right-0 z-50">
      <span className="inline-flex items-center gap-2">
        <Sparkles className="h-4 w-4" />
        New opportunities added daily. Sign up to get notified!
      </span>
    </div>
  )
}
