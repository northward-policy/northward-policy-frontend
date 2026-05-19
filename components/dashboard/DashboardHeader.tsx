"use client"

import { useState, useEffect, Suspense } from "react"
import { ShieldAlert } from "lucide-react"
import { YearSelector } from "./YearSelector"

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
    <header className="sticky top-0 z-50 bg-background/90 backdrop-blur border-b border-border px-6 h-16 flex items-center justify-between">
      <div className="flex items-center gap-2.5">
        <ShieldAlert className="w-5 h-5 text-[var(--danger)] shrink-0" aria-hidden="true" />
        <span className="text-lg font-bold tracking-tight text-foreground">평양 모니터</span>
        <span className="hidden sm:block text-sm text-muted-foreground">
          — DPRK 경제 &amp; 긴장도 대시보드
        </span>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1.5">
          <span className="pulse-dot w-2 h-2 rounded-full bg-[var(--danger)] inline-block shrink-0" aria-hidden="true" />
          <span className="text-base font-semibold text-[var(--danger)]">고위험 경보</span>
        </div>

        
        <div className="flex items-center gap-4 border-l border-border pl-4">
          <Suspense fallback={<div className="w-[110px] h-8 bg-muted animate-pulse rounded-md" />}>
            <YearSelector />
          </Suspense>
          <span className="hidden md:block text-sm font-mono text-muted-foreground" suppressHydrationWarning>
            {formatted} UTC
          </span>
        </div>
      </div>
    </header>
  )
}
