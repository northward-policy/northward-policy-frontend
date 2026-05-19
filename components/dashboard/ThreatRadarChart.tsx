"use client"

import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts"

const RADAR_DATA = [
  { subject: "군사 도발", value: 85 },
  { subject: "외교 단절", value: 72 },
  { subject: "경제 제재", value: 68 },
  { subject: "사이버 위협", value: 79 },
  { subject: "핵 위협", value: 90 },
  { subject: "선전 강도", value: 83 },
]

export function ThreatRadarChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RadarChart data={RADAR_DATA}>
        <PolarGrid stroke="rgba(148,163,184,0.1)" />
        <PolarAngleAxis
          dataKey="subject"
          tick={{ fill: "#94a3b8", fontSize: 16, fontFamily: "monospace", fontWeight: "bold" }}
        />
        <Radar
          dataKey="value"
          stroke="#ef4444"
          fill="#ef4444"
          fillOpacity={0.2}
          strokeWidth={3}
          dot={{ fill: "#ef4444", r: 5 }}
          style={{ filter: "drop-shadow(0 0 8px rgba(239,68,68,0.5))" }}
        />
        <Tooltip
          contentStyle={{
            background: "var(--card)",
            border: "1px solid var(--surface-border)",
            borderRadius: "10px",
            fontSize: "14px",
            fontFamily: "monospace",
            fontWeight: "bold",
            color: "#e2e8f0",
            padding: "10px 15px",
          }}
          formatter={(v: number) => [`${v} / 100`, "위험 점수"]}
        />
      </RadarChart>
    </ResponsiveContainer>
  )
}
