"use client"

import { useState } from "react"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, CartesianGrid } from "recharts"
import { Download, FileImage } from "lucide-react"
import { downloadAsImage, downloadAsCSV } from "@/lib/export-utils"

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
    <div className="bg-card border border-border rounded-lg p-3 text-sm shadow-xl">
      <p className="font-bold text-foreground mb-1.5">{label}</p>
      {payload.map((p: any) => (
        <p key={p.name} style={{ color: p.color }} className="font-medium">
          {p.name === "import" ? "수입" : "수출"}: {p.value.toLocaleString()}M USD
        </p>
      ))}
    </div>
  )
}

export function ShoppingCart() {
  const [active, setActive] = useState<TabKey>("전체")
  const data = ALL_DATA[active]

  const handleExportCSV = () => {
    downloadAsCSV(data, `trade_items_${active}`)
  }

  const handleExportImage = () => {
    downloadAsImage("shopping-cart-chart", `trade_items_${active}`)
  }

  return (
    <div className="h-full flex flex-col" id="shopping-cart-chart">
      {/* 탭 + 범례 + 다운로드 */}
      <div className="flex flex-col gap-4 mb-6">
        <div className="flex items-center justify-between gap-2">
          <div className="flex gap-2" role="tablist" aria-label="무역 품목 필터">
            {TABS.map(({ key, label }) => (
              <button
                key={key}
                role="tab"
                aria-selected={active === key}
                onClick={() => setActive(key)}
                className={`text-base font-bold px-4 py-2 rounded-md transition-colors ${
                  active === key
                    ? "bg-[var(--success)]/15 text-[var(--success)]"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleExportImage}
              className="p-2 rounded-lg bg-muted/20 hover:bg-muted/40 text-muted-foreground hover:text-foreground transition-all border border-border/50"
              title="이미지로 저장"
            >
              <FileImage className="w-5 h-5" />
            </button>
            <button
              onClick={handleExportCSV}
              className="p-2 rounded-lg bg-muted/20 hover:bg-muted/40 text-muted-foreground hover:text-foreground transition-all border border-border/50"
              title="CSV로 저장"
            >
              <Download className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex gap-6 shrink-0 justify-end">
          <div className="flex items-center gap-2.5">
            <span className="w-3 h-3 rounded-sm inline-block bg-[#10b981]" />
            <span className="text-base font-bold text-muted-foreground uppercase tracking-wider">수입</span>
          </div>
          <div className="flex items-center gap-2.5">
            <span className="w-3 h-3 rounded-sm inline-block bg-[#ef4444]" />
            <span className="text-base font-bold text-muted-foreground uppercase tracking-wider">수출</span>
          </div>
        </div>
      </div>

      {/* 차트 */}
      <div className="flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ top: 0, right: 15, bottom: 0, left: 10 }}>
            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="rgba(148,163,184,0.1)" />
            <XAxis
              type="number"
              tick={{ fill: "#64748b", fontSize: 14, fontWeight: 700 }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              type="category"
              dataKey="name"
              tick={{ fill: "#94a3b8", fontSize: 15, fontWeight: 800 }}
              tickLine={false}
              axisLine={false}
              width={80}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(148,163,184,0.04)" }} />
            <Bar dataKey="import" name="import" radius={[0, 4, 4, 0]} maxBarSize={14}>
              {data.map((_, i) => <Cell key={i} fill="#10b981" />)}
            </Bar>
            <Bar dataKey="export" name="export" radius={[0, 4, 4, 0]} maxBarSize={14}>
              {data.map((_, i) => <Cell key={i} fill="#ef4444" />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
