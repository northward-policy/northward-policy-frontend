"use client"

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts"

const PARTNER_SHARE = [
  { name: "중국", value: 68, color: "#ef4444" },
  { name: "러시아", value: 16, color: "#f59e0b" },
  { name: "UAE", value: 7, color: "#10b981" },
  { name: "인도", value: 5, color: "#3b82f6" },
  { name: "기타", value: 4, color: "#64748b" },
]

export function TradePartnerChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={PARTNER_SHARE}
          cx="50%"
          cy="50%"
          innerRadius={55}
          outerRadius={85}
          paddingAngle={2}
          dataKey="value"
        >
          {PARTNER_SHARE.map((entry, i) => (
            <Cell
              key={i}
              fill={entry.color}
              opacity={0.85}
              style={{ filter: `drop-shadow(0 0 4px ${entry.color}60)` }}
            />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            background: "var(--card)",
            border: "1px solid var(--surface-border)",
            borderRadius: "6px",
            fontSize: "11px",
            fontFamily: "monospace",
            color: "#e2e8f0",
          }}
          formatter={(v: number) => [`${v}%`, "비중"]}
        />
        <Legend
          iconType="circle"
          iconSize={8}
          wrapperStyle={{ fontSize: "10px", fontFamily: "monospace", color: "#94a3b8" }}
        />
      </PieChart>
    </ResponsiveContainer>
  )
}
