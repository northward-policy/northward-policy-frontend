"use client"

import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts"

interface ThreatRadarChartProps {
  data?: any[]
  onPointClick?: (data: any) => void
}

export function ThreatRadarChart({ data, onPointClick }: ThreatRadarChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%" minHeight={300}>
      <RadarChart cx="50%" cy="50%" outerRadius="65%" data={data} margin={{ top: 20, right: 30, bottom: 20, left: 30 }}>
        <PolarGrid stroke="rgba(148,163,184,0.1)" />
        <PolarAngleAxis
          dataKey="subject"
          tick={{ fill: "#94a3b8", fontSize: 14, fontFamily: "monospace", fontWeight: "bold" }}
        />
        <Radar
          name="위험 점수"
          dataKey="value"
          stroke="#ef4444"
          fill="#ef4444"
          fillOpacity={0.25}
          strokeWidth={4}
          dot={{ fill: "#ef4444", r: 6, className: "cursor-pointer" }}
          activeDot={{ r: 8 }}
          onClick={(data: any) => onPointClick?.({ type: "parameter", ...data })}
          style={{ filter: "drop-shadow(0 0 10px rgba(239,68,68,0.5))" }}
        />
        <Tooltip
          contentStyle={{
            background: "var(--card)",
            border: "1px solid var(--surface-border)",
            borderRadius: "10px",
            fontSize: "14px",
            fontFamily: "monospace",
            fontWeight: "bold",
            color: "#ffffff",
            padding: "10px 15px",
          }}
          formatter={(v: number) => [`${v} / 100`, "점수"]}
        />
      </RadarChart>
    </ResponsiveContainer>
  )
}
