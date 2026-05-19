"use client"

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts"
import { Download, FileImage } from "lucide-react"
import { downloadAsImage, downloadAsCSV } from "@/lib/export-utils"

const PARTNER_SHARE = [
  { name: "중국", value: 68, color: "#ef4444" },
  { name: "러시아", value: 16, color: "#f59e0b" },
  { name: "UAE", value: 7, color: "#10b981" },
  { name: "인도", value: 5, color: "#3b82f6" },
  { name: "기타", value: 4, color: "#64748b" },
]

export function TradePartnerChart() {
  const handleExportCSV = () => {
    downloadAsCSV(PARTNER_SHARE, "trade_partners")
  }

  const handleExportImage = () => {
    downloadAsImage("trade-partner-chart", "trade_partners")
  }

  return (
    <div className="h-full flex flex-col" id="trade-partner-chart">
      <div className="flex justify-end gap-2 mb-2">
        <button
          onClick={handleExportImage}
          className="p-1.5 rounded-lg bg-muted/20 hover:bg-muted/40 text-muted-foreground hover:text-foreground transition-all border border-border/50"
          title="이미지로 저장"
        >
          <FileImage className="w-4 h-4" />
        </button>
        <button
          onClick={handleExportCSV}
          className="p-1.5 rounded-lg bg-muted/20 hover:bg-muted/40 text-muted-foreground hover:text-foreground transition-all border border-border/50"
          title="CSV로 저장"
        >
          <Download className="w-4 h-4" />
        </button>
      </div>
      <div className="flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={PARTNER_SHARE}
              cx="65%"
              cy="50%"
              innerRadius="40%"
              outerRadius="75%"
              paddingAngle={3}
              dataKey="value"
            >
              {PARTNER_SHARE.map((entry, i) => (
                <Cell
                  key={i}
                  fill={entry.color}
                  opacity={0.85}
                  style={{ filter: `drop-shadow(0 0 10px ${entry.color}60)` }}
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                background: "var(--card)",
                border: "1px solid var(--surface-border)",
                borderRadius: "10px",
                fontSize: "18px",
                fontWeight: "700",
                fontFamily: "monospace",
                padding: "14px 18px",
              }}
              itemStyle={{ color: "#ffffff" }}
              labelStyle={{ color: "#ffffff" }}
              formatter={(v: number) => [`${v}%`, "비중"]}
            />
            <Legend
              layout="vertical"
              verticalAlign="middle"
              align="left"
              iconType="circle"
              iconSize={16}
              wrapperStyle={{
                fontSize: "18px",
                fontWeight: "700",
                fontFamily: "monospace",
                color: "#94a3b8",
                paddingLeft: "5%"
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
