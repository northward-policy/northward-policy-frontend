import { ShoppingCart } from "@/components/dashboard/ShoppingCart"
import { TradePartnerChart } from "@/components/dashboard/TradePartnerChart"

const SANCTIONS_ITEMS = [
  { item: "석유 (연 50만 배럴 상한)", status: "제한 초과 의심", risk: "고위험" },
  { item: "석탄 수출 전면 금지", status: "우회 수출 포착", risk: "고위험" },
  { item: "무기·군수 수출 금지", status: "러시아 경유 확인", risk: "긴급" },
  { item: "사치품 수입 금지", status: "중국 경유 밀수", risk: "주의" },
  { item: "해외 노동자 송금 금지", status: "IT 인력 원격 활용", risk: "주의" },
]

const RISK_COLOR: Record<string, string> = {
  긴급: "#ef4444",
  고위험: "#f97316",
  주의: "#f59e0b",
}

export default async function TradePage({
  searchParams,
}: {
  searchParams: Promise<{ year?: string }>
}) {
  const { year = "2024" } = await searchParams

  return (
    <div className="h-full flex flex-col gap-4">
      <div>
        <h1 className="text-lg font-bold text-foreground">무역 모니터 ({year}년)</h1>
        <p className="text-xs text-muted-foreground mt-0.5">UN Comtrade 기반 {year}년 수출입 현황 · 제재 위반 의심 품목</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1 min-h-0">
        <div className="bg-card border border-border rounded-xl p-5 flex flex-col min-h-0">
          <h2 className="text-sm font-semibold text-foreground mb-3">품목별 수출입</h2>
          <div className="flex-1 min-h-0">
            <ShoppingCart />
          </div>
        </div>

        <div className="flex flex-col gap-4 min-h-0">
          <div className="bg-card border border-border rounded-xl p-5 flex flex-col flex-1 min-h-0">
            <h2 className="text-sm font-semibold text-foreground mb-3">국가별 무역 의존도</h2>
            <div className="flex-1 min-h-0">
              <TradePartnerChart />
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-4 flex-1 overflow-hidden">
            <h2 className="text-xs font-semibold text-muted-foreground mb-2.5">UN 제재 위반 의심 품목</h2>
            <div className="space-y-1.5">
              {SANCTIONS_ITEMS.map((s, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between px-3 py-2 rounded-lg bg-muted/20"
                >
                  <div className="min-w-0 pr-2">
                    <p className="text-xs font-medium text-foreground truncate">{s.item}</p>
                    <p className="text-[11px] text-muted-foreground">{s.status}</p>
                  </div>
                  <span
                    className="text-[11px] font-medium px-2 py-0.5 rounded-full shrink-0"
                    style={{
                      color: RISK_COLOR[s.risk],
                      background: `color-mix(in srgb, ${RISK_COLOR[s.risk]} 12%, transparent)`,
                    }}
                  >
                    {s.risk}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
