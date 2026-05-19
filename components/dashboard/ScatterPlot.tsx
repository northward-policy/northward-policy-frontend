"use client"

import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts"

const SCATTER_DATA = [
  { tension: 42, trade: 3120 },
  { tension: 45, trade: 2980 },
  { tension: 51, trade: 2850 },
  { tension: 55, trade: 2700 },
  { tension: 60, trade: 2550 },
  { tension: 58, trade: 2640 },
  { tension: 63, trade: 2490 },
  { tension: 70, trade: 2200 },
  { tension: 74, trade: 2050 },
  { tension: 71, trade: 2180 },
  { tension: 76, trade: 1920 },
  { tension: 78, trade: 1830 },
]

export function ScatterPlot() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <ScatterChart margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.07)" />
        <XAxis
          dataKey="tension"
          name="긴장 점수"
          type="number"
          domain={[35, 85]}
          tick={{ fill: "#64748b", fontSize: 10, fontFamily: "monospace" }}
          tickLine={false}
          axisLine={false}
          label={{
            value: "긴장 점수",
            position: "insideBottom",
            offset: -2,
            fill: "#64748b",
            fontSize: 10,
            fontFamily: "monospace",
          }}
        />
        <YAxis
          dataKey="trade"
          name="무역 규모"
          type="number"
          domain={[1600, 3300]}
          tick={{ fill: "#64748b", fontSize: 10, fontFamily: "monospace" }}
          tickLine={false}
          axisLine={false}
          tickFormatter={(v) => `${(v / 1000).toFixed(1)}B`}
        />
        <Tooltip
          contentStyle={{
            background: "var(--card)",
            border: "1px solid var(--surface-border)",
            borderRadius: "6px",
            fontSize: "11px",
            fontFamily: "monospace",
            color: "#e2e8f0",
          }}
          formatter={(v: number, name: string) =>
            name === "긴장 점수"
              ? [`${v} / 100`, name]
              : [`${(v / 1000).toFixed(2)}B USD`, name]
          }
        />
        <Scatter
          data={SCATTER_DATA}
          fill="#ef4444"
          opacity={0.8}
          style={{ filter: "drop-shadow(0 0 4px rgba(239,68,68,0.5))" }}
        />
      </ScatterChart>
    </ResponsiveContainer>
  )
}
