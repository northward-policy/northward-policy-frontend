import { CorrelationChart } from "@/components/dashboard/CorrelationChart"
import { ScatterPlot } from "@/components/dashboard/ScatterPlot"

const STAT_CARDS = [
  { label: "피어슨 상관계수", value: "−0.89", color: "var(--warning)" },
  { label: "결정계수 R²", value: "0.79", color: "var(--success)" },
  { label: "p-값", value: "< 0.001", color: "var(--success)" },
  { label: "AI 예측 기간", value: "3개월", color: "var(--warning)" },
]

const SCENARIOS = [
  {
    name: "낙관",
    prob: "20%",
    tension: "65",
    trade: "2,100M",
    color: "#10b981",
  },
  {
    name: "기준",
    prob: "55%",
    tension: "80",
    trade: "1,700M",
    color: "#f59e0b",
  },
  {
    name: "비관",
    prob: "25%",
    tension: "92",
    trade: "1,200M",
    color: "#ef4444",
  },
]

export default function CorrelationPage() {
  return (
    <div className="h-full flex flex-col gap-4">
      <div>
        <h1 className="text-lg font-bold text-foreground">상관관계 분석</h1>
        <p className="text-xs text-muted-foreground mt-0.5">긴장 지수 ↔ 무역 규모 역상관 관계 · AI 단기 예측 포함</p>
      </div>

      <div className="grid grid-cols-4 gap-3">
        {STAT_CARDS.map((s) => (
          <div key={s.label} className="bg-card border border-border rounded-xl px-4 py-3">
            <p className="text-[11px] text-muted-foreground">{s.label}</p>
            <p className="text-xl font-bold tabular-nums mt-1" style={{ color: s.color }}>{s.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1 min-h-0">
        <div className="bg-card border border-border rounded-xl p-5 flex flex-col min-h-0">
          <h2 className="text-sm font-semibold text-foreground mb-3">긴장도 · 무역 추이</h2>
          <div className="flex-1 min-h-0">
            <CorrelationChart />
          </div>
        </div>

        <div className="flex flex-col gap-4 min-h-0">
          <div className="bg-card border border-border rounded-xl p-5 flex flex-col flex-1 min-h-0">
            <h2 className="text-sm font-semibold text-foreground mb-1">산점도</h2>
            <p className="text-[11px] text-muted-foreground mb-2">각 점 = 1개월 데이터</p>
            <div className="flex-1 min-h-0">
              <ScatterPlot />
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-4">
            <h2 className="text-xs font-semibold text-muted-foreground mb-2.5">2025년 1분기 AI 예측 시나리오</h2>
            <div className="grid grid-cols-3 gap-2">
              {SCENARIOS.map((sc) => (
                <div
                  key={sc.name}
                  className="rounded-lg border p-3 flex flex-col gap-2"
                  style={{
                    borderColor: `color-mix(in srgb, ${sc.color} 30%, transparent)`,
                    background: `color-mix(in srgb, ${sc.color} 6%, transparent)`,
                  }}
                >
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold" style={{ color: sc.color }}>{sc.name}</p>
                    <span className="text-[11px] font-medium" style={{ color: sc.color }}>{sc.prob}</span>
                  </div>
                  <div className="space-y-1">
                    <div>
                      <p className="text-[10px] text-muted-foreground">긴장도</p>
                      <p className="text-sm font-bold text-foreground">{sc.tension}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-muted-foreground">무역액</p>
                      <p className="text-sm font-bold text-foreground">{sc.trade}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
