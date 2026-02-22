import { Sparkles } from 'lucide-react'

export function AnnouncementBanner() {
  return (
    <div className="bg-background text-foreground py-2 text-center text-sm fixed top-0 left-0 right-0 z-50">
      <span className="inline-flex items-center gap-2 font-semibold">
        🎉 New opportunities added daily. Sign up to get notified!
      </span>
    </div>
  )
}
