import { TensionGauge } from "@/components/dashboard/TensionGauge"
import { ThreatRadarChart } from "@/components/dashboard/ThreatRadarChart"
import { TensionTrendChart } from "@/components/dashboard/TensionTrendChart"

const MOCK_DATA: Record<string, { period: string; score: number; label: string }[]> = {
  "2022": [
    { period: "1분기", score: 35, label: "안정" },
    { period: "2분기", score: 42, label: "안정" },
    { period: "3분기", score: 48, label: "안정" },
    { period: "4분기", score: 52, label: "주의" },
  ],
  "2023": [
    { period: "1분기", score: 55, label: "주의" },
    { period: "2분기", score: 60, label: "주의" },
    { period: "3분기", score: 65, label: "경고" },
    { period: "4분기", score: 70, label: "경고" },
  ],
  "2024": [
    { period: "1분기", score: 47, label: "안정" },
    { period: "2분기", score: 58, label: "주의" },
    { period: "3분기", score: 69, label: "경고" },
    { period: "4분기", score: 78, label: "고위험" },
  ],
  "2025": [
    { period: "1분기", score: 82, label: "고위험" },
    { period: "2분기", score: 85, label: "고위험" },
    { period: "3분기", score: 88, label: "고위험" },
    { period: "4분기", score: 92, label: "고위험" },
  ],
}

function scoreColor(score: number) {
  if (score <= 33) return "#10b981"
  if (score <= 66) return "#f59e0b"
  return "#ef4444"
}

export default async function TensionPage({
  searchParams,
}: {
  searchParams: Promise<{ year?: string }>
}) {
  const { year = "2024" } = await searchParams
  const history = MOCK_DATA[year] || MOCK_DATA["2024"]

  return (
    <div className="h-full flex flex-col gap-4 p-1">
      <div>
        <h1 className="text-3xl font-bold text-foreground tracking-tight">지정학적 긴장 지수 분석</h1>
        <p className="text-sm text-muted-foreground mt-1">AI 기반 실시간 리스크 감지 및 다차원 분석</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 flex-1 min-h-0">
        {/* Left Column: Gauge & Radar (Stacked) */}
        <div className="xl:col-span-4 flex flex-col gap-4 min-h-0">
          <div className="bg-card border border-border rounded-xl p-4 shadow-sm">
            <TensionGauge />
          </div>

          <div className="bg-card border border-border rounded-xl p-4 flex flex-col flex-1 min-h-[300px] shadow-sm">
            <div className="mb-2">
              <h2 className="text-2xl font-bold text-foreground tracking-tight">다차원 위험 레이더</h2>
              <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider">위협 수준 통합 매트릭스</p>
            </div>
            <div className="flex-1 min-h-0">
              <ThreatRadarChart />
            </div>
          </div>
        </div>

        {/* Right Column: Quarterly Trend Chart */}
        <div className="xl:col-span-8 flex flex-col min-h-0">
          <div className="bg-card border border-border rounded-xl p-4 shadow-sm h-full flex flex-col">
            <div className="mb-4">
              <h2 className="text-2xl font-bold text-foreground tracking-tight">{year}년 분기별 추이</h2>
              <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider">리스크 점수 변화 히스토리</p>
            </div>
            
            <div className="flex flex-col flex-1 gap-6 min-h-0">
              <div className="flex-1 min-h-[400px]">
                <TensionTrendChart />
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-auto pt-4 border-t border-border/20">
                {history.map((h) => (
                  <div key={h.period} className="flex flex-col gap-2 p-5 bg-muted/5 rounded-2xl border border-border/40 shadow-sm transition-all hover:shadow-md hover:bg-muted/10">
                    <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">{h.period}</p>
                    <div className="flex items-baseline gap-3">
                      <p className="text-4xl font-black tabular-nums tracking-tighter" style={{ color: scoreColor(h.score) }}>
                        {h.score}
                      </p>
                      <span
                        className="text-xs font-black px-2.5 py-1 rounded-lg bg-muted/10 border"
                        style={{
                          color: scoreColor(h.score),
                          borderColor: `color-mix(in srgb, ${scoreColor(h.score)} 30%, transparent)`,
                        }}
                      >
                        {h.label}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
