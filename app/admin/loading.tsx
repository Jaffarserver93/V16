import { Loader2 } from "lucide-react"

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <Loader2 className="h-16 w-16 animate-spin text-purple-500" />
      <p className="mt-4 text-lg">Loading admin panel...</p>
    </div>
  )
}
