"use client"

import { useState, useEffect } from "react"
import { ShieldAlert } from "lucide-react"

export function DashboardHeader() {
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  const formatted = now.toLocaleString("ko-KR", {
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZone: "UTC",
  })

  return (
    <header className="sticky top-0 z-50 bg-background/90 backdrop-blur border-b border-border px-6 h-14 flex items-center justify-between">
      <div className="flex items-center gap-2.5">
        <ShieldAlert className="w-4 h-4 text-[var(--danger)] shrink-0" aria-hidden="true" />
        <span className="text-sm font-semibold tracking-wide text-foreground">평양 모니터</span>
        <span className="hidden sm:block text-xs text-muted-foreground">
          — DPRK 경제 &amp; 긴장도 대시보드
        </span>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1.5">
          <span className="pulse-dot w-1.5 h-1.5 rounded-full bg-[var(--danger)] inline-block shrink-0" aria-hidden="true" />
          <span className="text-xs font-medium text-[var(--danger)]">고위험 경보</span>
        </div>
        <span className="hidden md:block text-xs font-mono text-muted-foreground" suppressHydrationWarning>
          {formatted} UTC
        </span>
      </div>
    </header>
  )
}
