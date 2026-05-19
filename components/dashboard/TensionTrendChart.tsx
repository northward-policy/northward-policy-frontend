"use client"

import { useMemo } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts"

function scoreColor(score: number) {
  if (score <= 33) return "#10b981"
  if (score <= 66) return "#f59e0b"
  return "#ef4444"
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload
    return (
      <div className="bg-card border border-border rounded-lg p-3 shadow-xl text-sm font-mono">
        <p className="font-bold text-foreground mb-1.5">{label}</p>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: scoreColor(data.score) }} />
          <span className="text-muted-foreground">긴장 지수:</span>
          <span className="font-bold text-foreground text-base">{data.score}</span>
        </div>
        <p className="mt-1 text-xs" style={{ color: scoreColor(data.score) }}>{data.label}</p>
      </div>
    )
  }
  return null
}

interface TensionTrendChartProps {
  data?: any[]
  onPointClick?: (data: any) => void
}

export function TensionTrendChart({ data = [], onPointClick }: TensionTrendChartProps) {
  const gradientStops = useMemo(() => {
    if (!data || data.length === 0) return null
    return data.map((d, i) => ({
      offset: `${(i / (data.length - 1)) * 100}%`,
      color: scoreColor(d.score)
    }))
  }, [data])

  const renderDot = (props: any) => {
    const { cx, cy, payload } = props
    const color = scoreColor(payload.score)
    return (
      <circle
        key={`dot-${payload.period}`}
        cx={cx}
        cy={cy}
        r={6}
        fill={color}
        stroke="var(--card)"
        strokeWidth={2}
        className="cursor-pointer transition-all hover:r-8"
        onClick={(e) => {
          e.stopPropagation()
          onPointClick?.({ type: "history", ...payload })
        }}
      />
    )
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart 
        data={data} 
        margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
        onClick={(e: any) => {
          if (e && e.activePayload) {
            onPointClick?.({ type: "history", ...e.activePayload[0].payload })
          }
        }}
      >
        <defs>
          <linearGradient id="tensionGradient" x1="0" y1="0" x2="1" y2="0">
            {gradientStops?.map((stop, i) => (
              <stop key={i} offset={stop.offset} stopColor={stop.color} stopOpacity={0.2} />
            ))}
          </linearGradient>
          <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
            {gradientStops?.map((stop, i) => (
              <stop key={i} offset={stop.offset} stopColor={stop.color} />
            ))}
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(148,163,184,0.1)" />
        <XAxis
          dataKey="period"
          axisLine={false}
          tickLine={false}
          tick={{ fill: "#94a3b8", fontSize: 13, fontWeight: 700 }}
          dy={10}
        />
        <YAxis
          domain={[0, 100]}
          axisLine={false}
          tickLine={false}
          tick={{ fill: "#94a3b8", fontSize: 13, fontWeight: 700 }}
        />
        <Tooltip content={<CustomTooltip />} />
        <Area
          type="monotone"
          dataKey="score"
          stroke="url(#lineGradient)"
          strokeWidth={5}
          fillOpacity={1}
          fill="url(#tensionGradient)"
          dot={renderDot}
          activeDot={{ r: 9, strokeWidth: 0 }}
          className="cursor-pointer"
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}
