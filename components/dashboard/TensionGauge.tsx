"use client"

import { useEffect, useState } from "react"
import { TrendingUp } from "lucide-react"

const SCORE = 78
const MAX = 100

function polarToXY(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) }
}

function describeArc(cx: number, cy: number, r: number, startAngle: number, endAngle: number) {
  const s = polarToXY(cx, cy, r, startAngle)
  const e = polarToXY(cx, cy, r, endAngle)
  const largeArc = endAngle - startAngle > 180 ? 1 : 0
  return `M ${s.x} ${s.y} A ${r} ${r} 0 ${largeArc} 1 ${e.x} ${e.y}`
}

function getColor(score: number) {
  if (score <= 33) return "#10b981"
  if (score <= 66) return "#f59e0b"
  return "#ef4444"
}

export function TensionGauge() {
  const [animScore, setAnimScore] = useState(0)

  useEffect(() => {
    const timeout = setTimeout(() => {
      let current = 0
      const step = () => {
        current += 1.5
        if (current >= SCORE) {
          setAnimScore(SCORE)
        } else {
          setAnimScore(current)
          requestAnimationFrame(step)
        }
      }
      requestAnimationFrame(step)
    }, 400)
    return () => clearTimeout(timeout)
  }, [])

  const cx = 200, cy = 200, r = 150
  const startAngle = -135, endAngle = 135
  const totalSpan = endAngle - startAngle
  const fillAngle = startAngle + (animScore / MAX) * totalSpan
  const color = getColor(animScore)

  const needleAngle = startAngle + (animScore / MAX) * totalSpan
  const needleTip = polarToXY(cx, cy, r - 15, needleAngle)
  const needleLeft = polarToXY(cx, cy, 20, needleAngle - 90)
  const needleRight = polarToXY(cx, cy, 20, needleAngle + 90)

  const bands = [
    { start: startAngle, end: startAngle + totalSpan * 0.33, color: "#10b981" },
    { start: startAngle + totalSpan * 0.33, end: startAngle + totalSpan * 0.66, color: "#f59e0b" },
    { start: startAngle + totalSpan * 0.66, end: endAngle, color: "#ef4444" },
  ]

  return (
    <div className="h-full flex flex-col p-1">
      <p className="text-base font-semibold text-foreground mb-0.5 tracking-tight">평양 긴장 점수</p>
      <p className="text-[10px] text-muted-foreground mb-3 font-medium uppercase tracking-wider">AI 분석 · 실시간 위기 지표</p>

      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="relative w-[340px] h-[260px]">
          <svg width="340" height="260" viewBox="0 0 400 340" aria-label={`긴장 점수: ${SCORE} / 100`}>
            {/* Background Track */}
            <path
              d={describeArc(cx, cy, r, startAngle, endAngle)}
              fill="none" stroke="rgba(148,163,184,0.1)" strokeWidth="28" strokeLinecap="round"
            />
            {/* Range Bands */}
            {bands.map((b, i) => (
              <path
                key={i}
                d={describeArc(cx, cy, r, b.start, b.end)}
                fill="none" stroke={b.color} strokeWidth="28"
                strokeLinecap={i === 0 ? "round" : i === bands.length - 1 ? "round" : "butt"}
                opacity="0.15"
              />
            ))}
            {/* Animated Fill */}
            {animScore > 0 && (
              <path
                d={describeArc(cx, cy, r, startAngle, fillAngle)}
                fill="none" stroke={color} strokeWidth="28" strokeLinecap="round"
                style={{ filter: `drop-shadow(0 0 15px ${color}80)` }}
              />
            )}
            {/* Needle */}
            <polygon
              points={`${needleTip.x},${needleTip.y} ${needleLeft.x},${needleLeft.y} ${needleRight.x},${needleRight.y}`}
              fill={color} opacity="0.9"
              style={{ filter: `drop-shadow(0 0 10px ${color})` }}
            />
            <circle cx={cx} cy={cy} r="10" fill="var(--card)" stroke={color} strokeWidth="4" />
            
            {/* Labels */}
            <text x="40" y="335" fill="#10b981" fontSize="12" fontFamily="monospace" fontWeight="900" textAnchor="middle">안전</text>
            <text x="200" y="25" fill="#f59e0b" fontSize="12" fontFamily="monospace" fontWeight="900" textAnchor="middle">주의</text>
            <text x="360" y="335" fill="#ef4444" fontSize="12" fontFamily="monospace" fontWeight="900" textAnchor="middle">위험</text>
          </svg>
          
          {/* Central Score Display */}
          <div className="absolute inset-x-0 bottom-4 flex flex-col items-center pointer-events-none">
            <span className="text-4xl font-black font-mono tabular-nums tracking-tighter leading-none" style={{ color, textShadow: `0 0 25px ${color}40` }}>
              {Math.round(animScore)}
            </span>
            <span className="text-[10px] font-black font-mono text-muted-foreground/60 mt-1 uppercase tracking-widest">Score / 100</span>
          </div>
        </div>
      </div>

      <div className="pt-2 border-t border-border mt-1 flex items-center justify-between">
        <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">전주 대비 변동</p>
        <div className="flex items-center gap-1.5 bg-[var(--danger)]/10 px-2 py-0.5 rounded-lg border border-[var(--danger)]/20 shadow-sm">
          <TrendingUp className="w-3 h-3 text-[var(--danger)]" aria-hidden="true" />
          <span className="text-[10px] font-black text-[var(--danger)] tracking-tighter">+4.2 UP</span>
        </div>
      </div>
    </div>
  )
}
