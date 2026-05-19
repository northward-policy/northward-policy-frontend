"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts"

const HISTORY = [
  { period: "1분기", score: 47, label: "안정" },
  { period: "2분기", score: 58, label: "주의" },
  { period: "3분기", score: 69, label: "경고" },
  { period: "4분기", score: 78, label: "고위험" },
]

function scoreColor(score: number) {
  if (score <= 33) return "#10b981"
  if (score <= 66) return "#f59e0b"
  return "#ef4444"
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload
    return (
      <div className="bg-card border border-border rounded-lg p-2 shadow-xl text-xs font-mono">
        <p className="font-bold text-foreground mb-1">{label}</p>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: scoreColor(data.score) }} />
          <span className="text-muted-foreground">긴장 지수:</span>
          <span className="font-bold text-foreground">{data.score}</span>
        </div>
        <p className="mt-1 text-[10px]" style={{ color: scoreColor(data.score) }}>{data.label}</p>
      </div>
    )
  }
  return null
}

export function TensionTrendChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={HISTORY} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
        <defs>
          <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(148,163,184,0.1)" />
        <XAxis
          dataKey="period"
          axisLine={false}
          tickLine={false}
          tick={{ fill: "#64748b", fontSize: 11, fontWeight: 500 }}
          dy={10}
        />
        <YAxis
          domain={[0, 100]}
          axisLine={false}
          tickLine={false}
          tick={{ fill: "#64748b", fontSize: 11, fontWeight: 500 }}
        />
        <Tooltip content={<CustomTooltip />} />
        <Area
          type="monotone"
          dataKey="score"
          stroke="#ef4444"
          strokeWidth={3}
          fillOpacity={1}
          fill="url(#colorScore)"
          dot={{ r: 4, fill: "#ef4444", strokeWidth: 2, stroke: "var(--card)" }}
          activeDot={{ r: 6, strokeWidth: 0 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}
