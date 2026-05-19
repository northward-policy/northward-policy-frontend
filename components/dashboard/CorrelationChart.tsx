"use client"

import {
  ComposedChart,
  Line,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts"

const HISTORICAL = [
  { month: "24년 1월", tension: 42, trade: 3120 },
  { month: "24년 2월", tension: 45, trade: 2980 },
  { month: "24년 3월", tension: 51, trade: 2850 },
  { month: "24년 4월", tension: 55, trade: 2700 },
  { month: "24년 5월", tension: 60, trade: 2550 },
  { month: "24년 6월", tension: 58, trade: 2640 },
  { month: "24년 7월", tension: 63, trade: 2490 },
  { month: "24년 8월", tension: 70, trade: 2200 },
  { month: "24년 9월", tension: 74, trade: 2050 },
  { month: "24년 10월", tension: 71, trade: 2180 },
  { month: "24년 11월", tension: 76, trade: 1920 },
  { month: "24년 12월", tension: 78, trade: 1830 },
]

const ALL_DATA = [
  ...HISTORICAL,
  { month: "25년 1월", predTension: 80, predTrade: 1750 },
  { month: "25년 2월", predTension: 83, predTrade: 1640 },
  { month: "25년 3월", predTension: 79, predTrade: 1700 },
]

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const isPredicted = label.includes("25년")
    return (
      <div className="glass-card rounded-lg p-3 text-xs font-mono border border-[var(--surface-border)] shadow-xl min-w-[160px]">
        <div className="flex items-center gap-2 mb-2">
          <p className="font-bold text-foreground">{label}</p>
          {isPredicted && (
            <span className="text-[9px] px-1.5 py-0.5 rounded bg-[var(--warning)]/20 text-[var(--warning)] border border-[var(--warning)]/40 font-mono">
              AI 예측
            </span>
          )}
        </div>
        {payload.map((p: any) => (
          <p key={p.name} style={{ color: p.color }} className="flex justify-between gap-4">
            <span>{p.name === "tension" || p.name === "predTension" ? "긴장 점수" : "무역 규모"}</span>
            <span className="font-bold">
              {p.name === "tension" || p.name === "predTension"
                ? `${p.value}/100`
                : `${(p.value / 1000).toFixed(1)}B USD`}
            </span>
          </p>
        ))}
      </div>
    )
  }
  return null
}

export function CorrelationChart() {
  return (
    <div className="glass-card rounded-xl p-5 shadow-sm">
      {/* 헤더 */}
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-4 mb-4">
        <div className="flex-1">
          <span className="text-xs font-black uppercase tracking-widest text-muted-foreground/80">
            교차 분석 &amp; 예측
          </span>
          <h2 className="text-xl font-black text-foreground mt-1 tracking-tight">
            상관관계 &amp; 예측 분석
          </h2>
          <p className="text-sm text-muted-foreground mt-1.5 font-medium whitespace-nowrap overflow-hidden text-ellipsis">
            높은 긴장도가 경제적 생명줄을 끊는가? 12개월간 무역 데이터와 긴장 지수의 비교 분석입니다.
          </p>
        </div>
        {/* 범례 */}
        <div className="flex gap-4 shrink-0 bg-muted/10 p-2.5 rounded-xl border border-border/50">
          <div className="flex items-center gap-2">
            <span className="w-5 h-1 bg-[#ef4444] inline-block rounded-full" />
            <span className="text-xs font-bold text-foreground/70">긴장 점수</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-5 h-1 bg-[#10b981] inline-block rounded-full" />
            <span className="text-xs font-bold text-foreground/70">무역 규모</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-5 h-1 border-t-2 border-dashed border-[var(--warning)] inline-block" />
            <span className="text-xs font-bold text-foreground/70">AI 예측</span>
          </div>
        </div>
      </div>

      {/* 차트 */}
      <div className="h-[340px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={ALL_DATA} margin={{ top: 10, right: 30, bottom: 5, left: 0 }}>
            <defs>
              <linearGradient id="tensionGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="tradeGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(148,163,184,0.07)"
              vertical={false}
            />
            <XAxis
              dataKey="month"
              tick={{ fill: "#64748b", fontSize: 10, fontFamily: "monospace" }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              yAxisId="left"
              domain={[30, 100]}
              tick={{ fill: "#ef4444", fontSize: 10, fontFamily: "monospace" }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v) => `${v}`}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              domain={[1000, 3500]}
              tick={{ fill: "#10b981", fontSize: 10, fontFamily: "monospace" }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v) => `${(v / 1000).toFixed(1)}B`}
            />
            <Tooltip content={<CustomTooltip />} />
            {/* 예측 구간 기준선 */}
            <ReferenceLine
              x="25년 1월"
              yAxisId="left"
              stroke="rgba(245,158,11,0.4)"
              strokeDasharray="4 4"
              label={{ value: "예측 구간", fill: "#f59e0b", fontSize: 9, fontFamily: "monospace", position: "top" }}
            />
            {/* 긴장 면적 */}
            <Area
              yAxisId="left"
              type="monotone"
              dataKey="tension"
              stroke="#ef4444"
              strokeWidth={2}
              fill="url(#tensionGrad)"
              dot={false}
              activeDot={{ r: 4, fill: "#ef4444", stroke: "#0f172a", strokeWidth: 2 }}
            />
            {/* 무역 면적 */}
            <Area
              yAxisId="right"
              type="monotone"
              dataKey="trade"
              stroke="#10b981"
              strokeWidth={2}
              fill="url(#tradeGrad)"
              dot={false}
              activeDot={{ r: 4, fill: "#10b981", stroke: "#0f172a", strokeWidth: 2 }}
            />
            {/* 예측 긴장 점선 */}
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="predTension"
              stroke="#ef4444"
              strokeWidth={2}
              strokeDasharray="5 4"
              dot={false}
              activeDot={{ r: 4, fill: "#ef4444", stroke: "#0f172a", strokeWidth: 2 }}
            />
            {/* 예측 무역 점선 */}
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="predTrade"
              stroke="#10b981"
              strokeWidth={2}
              strokeDasharray="5 4"
              dot={false}
              activeDot={{ r: 4, fill: "#10b981", stroke: "#0f172a", strokeWidth: 2 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* 인사이트 콜아웃 */}
      <div className="mt-8 p-4 rounded-2xl border border-[var(--warning)]/30 bg-[var(--warning)]/5 flex items-start gap-3 shadow-inner">
        <span className="text-[var(--warning)] text-lg shrink-0">⚡</span>
        <p className="text-sm font-medium text-muted-foreground leading-relaxed">
          <span className="text-[var(--warning)] font-black uppercase tracking-tighter">AI INSIGHT:</span>{" "}
          긴장 점수와 무역 규모 사이에서 역상관계수{" "}
          <span className="text-foreground font-black underline decoration-[var(--warning)]/30 underline-offset-4">−0.89</span>가 감지되었습니다.
          긴장도가 82를 초과할 경우, 2025년 1분기에 무역 규모가 지속적으로 감소할 것으로 예측됩니다.
        </p>
      </div>
    </div>
  )
}
