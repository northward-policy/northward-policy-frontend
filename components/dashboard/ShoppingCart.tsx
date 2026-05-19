"use client"

import { useState } from "react"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts"

type TabKey = "전체" | "사치품" | "군수" | "곡물"

const ALL_DATA: Record<TabKey, { name: string; import: number; export: number }[]> = {
  전체: [
    { name: "중국", import: 2840, export: 410 },
    { name: "러시아", import: 680, export: 120 },
    { name: "인도", import: 190, export: 30 },
    { name: "UAE", import: 310, export: 15 },
    { name: "기타", import: 140, export: 95 },
  ],
  사치품: [
    { name: "시계", import: 142, export: 0 },
    { name: "주류", import: 98, export: 0 },
    { name: "차량", import: 87, export: 0 },
    { name: "전자제품", import: 210, export: 0 },
    { name: "패션", import: 63, export: 0 },
  ],
  군수: [
    { name: "미사일", import: 0, export: 340 },
    { name: "탄약", import: 120, export: 580 },
    { name: "부품", import: 290, export: 410 },
    { name: "드론", import: 0, export: 175 },
    { name: "화학물질", import: 85, export: 60 },
  ],
  곡물: [
    { name: "밀", import: 420, export: 0 },
    { name: "쌀", import: 180, export: 0 },
    { name: "옥수수", import: 310, export: 0 },
    { name: "대두", import: 90, export: 0 },
    { name: "기타", import: 75, export: 0 },
  ],
}

const TABS: { key: TabKey; label: string }[] = [
  { key: "전체", label: "전체" },
  { key: "사치품", label: "사치품" },
  { key: "군수", label: "군수" },
  { key: "곡물", label: "곡물" },
]

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-card border border-border rounded-lg p-2.5 text-xs shadow-xl">
      <p className="font-semibold text-foreground mb-1">{label}</p>
      {payload.map((p: any) => (
        <p key={p.name} style={{ color: p.color }}>
          {p.name === "import" ? "수입" : "수출"}: {p.value.toLocaleString()}M USD
        </p>
      ))}
    </div>
  )
}

export function ShoppingCart() {
  const [active, setActive] = useState<TabKey>("전체")
  const data = ALL_DATA[active]

  return (
    <div className="h-full flex flex-col">
      {/* 탭 + 범례 */}
      <div className="flex items-center justify-between mb-4 gap-2">
        <div className="flex gap-1" role="tablist" aria-label="무역 품목 필터">
          {TABS.map(({ key, label }) => (
            <button
              key={key}
              role="tab"
              aria-selected={active === key}
              onClick={() => setActive(key)}
              className={`text-xs px-2.5 py-1 rounded-md transition-colors ${
                active === key
                  ? "bg-[var(--success)]/15 text-[var(--success)]"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="flex gap-3 shrink-0">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-sm inline-block bg-[#10b981]" />
            <span className="text-xs text-muted-foreground">수입</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-sm inline-block bg-[#ef4444]" />
            <span className="text-xs text-muted-foreground">수출</span>
          </div>
        </div>
      </div>

      {/* 차트 */}
      <div className="flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ top: 0, right: 8, bottom: 0, left: 52 }}>
            <XAxis
              type="number"
              tick={{ fill: "#64748b", fontSize: 10 }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              type="category"
              dataKey="name"
              tick={{ fill: "#94a3b8", fontSize: 11 }}
              tickLine={false}
              axisLine={false}
              width={50}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(148,163,184,0.04)" }} />
            <Bar dataKey="import" name="import" radius={[0, 3, 3, 0]} maxBarSize={10}>
              {data.map((_, i) => <Cell key={i} fill="#10b981" />)}
            </Bar>
            <Bar dataKey="export" name="export" radius={[0, 3, 3, 0]} maxBarSize={10}>
              {data.map((_, i) => <Cell key={i} fill="#ef4444" />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
