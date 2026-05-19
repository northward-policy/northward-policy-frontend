"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Gauge, ShoppingCart, TrendingUp, Lightbulb, LayoutDashboard } from "lucide-react"

const NAV_ITEMS = [
  { href: "/",            label: "개요",         icon: LayoutDashboard },
  { href: "/tension",     label: "긴장 지수",     icon: Gauge },
  { href: "/trade",       label: "무역 모니터",   icon: ShoppingCart },
  { href: "/correlation", label: "상관관계 분석", icon: TrendingUp },
  { href: "/insights",    label: "인사이트",      icon: Lightbulb },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside
      className="hidden lg:flex flex-col w-52 shrink-0 border-r border-border min-h-screen sticky top-14 self-start bg-background"
      aria-label="사이드 네비게이션"
    >
      <nav className="flex-1 px-3 py-4 space-y-1" role="navigation">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                isActive
                  ? "bg-[var(--success)]/10 text-[var(--success)] font-medium"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
              aria-current={isActive ? "page" : undefined}
            >
              <Icon className="w-4 h-4 shrink-0" aria-hidden="true" />
              {label}
            </Link>
          )
        })}
      </nav>

      <div className="px-4 py-4 border-t border-border">
        <div className="flex items-center gap-1.5">
          <span className="pulse-dot w-1.5 h-1.5 rounded-full bg-[var(--success)] inline-block" aria-hidden="true" />
          <span className="text-xs text-muted-foreground">실시간</span>
        </div>
      </div>
    </aside>
  )
}

export function BottomNav() {
  const pathname = usePathname()

  return (
    <nav
      className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur border-t border-border flex items-center justify-around px-2 py-2"
      aria-label="하단 네비게이션"
    >
      {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
        const isActive = pathname === href
        return (
          <Link
            key={href}
            href={href}
            className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-lg transition-colors ${
              isActive ? "text-[var(--success)]" : "text-muted-foreground"
            }`}
            aria-current={isActive ? "page" : undefined}
          >
            <Icon className="w-4 h-4" aria-hidden="true" />
            <span className="text-[10px]">{label}</span>
          </Link>
        )
      })}
    </nav>
  )
}
