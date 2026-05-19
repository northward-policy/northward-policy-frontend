import { TensionGauge } from "@/components/dashboard/TensionGauge"
import { ThreatRadarChart } from "@/components/dashboard/ThreatRadarChart"

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

export default function TensionPage() {
  return (
    <div className="h-full flex flex-col gap-4 p-1">
      <div>
        <h1 className="text-xl font-bold text-foreground tracking-tight">지정학적 긴장 지수 분석</h1>
        <p className="text-xs text-muted-foreground mt-0.5">AI 기반 실시간 리스크 감지 및 다차원 분석</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1 min-h-0">
        <div className="bg-card border border-border rounded-xl p-4 flex flex-col min-h-0 shadow-sm">
          <TensionGauge />
        </div>

        <div className="bg-card border border-border rounded-xl p-4 flex flex-col min-h-0 shadow-sm">
          <div className="mb-2">
            <h2 className="text-base font-semibold text-foreground tracking-tight">다차원 위험 레이더</h2>
            <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">위협 수준 통합 매트릭스</p>
          </div>
          <div className="flex-1 min-h-0">
            <ThreatRadarChart />
          </div>
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl p-4 shadow-sm">
        <div className="mb-3">
          <h2 className="text-base font-semibold text-foreground tracking-tight">2024년 분기별 추이</h2>
          <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">리스크 점수 변화 히스토리</p>
        </div>
        <div className="grid grid-cols-4 gap-3">
          {HISTORY.map((h) => (
            <div key={h.period} className="flex flex-col gap-1.5 p-3 bg-muted/5 rounded-lg border border-border/40">
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">{h.period}</p>
              <p className="text-2xl font-black tabular-nums tracking-tighter" style={{ color: scoreColor(h.score) }}>
                {h.score}
              </p>
              <span
                className="text-[9px] font-black w-fit px-1.5 py-0.5 rounded-md border"
                style={{
                  color: scoreColor(h.score),
                  borderColor: `color-mix(in srgb, ${scoreColor(h.score)} 30%, transparent)`,
                  background: `color-mix(in srgb, ${scoreColor(h.score)} 12%, transparent)`,
                }}
              >
                {h.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
