import { ShoppingCart } from "@/components/dashboard/ShoppingCart"
import { TradePartnerChart } from "@/components/dashboard/TradePartnerChart"
import { ScrollArea } from "@/components/ui/scroll-area"

const SANCTIONS_ITEMS = [
  { item: "석유 (연 50만 배럴 상한)", status: "제한 초과 의심", risk: "고위험" },
  { item: "석탄 수출 전면 금지", status: "우회 수출 포착", risk: "고위험" },
  { item: "무기·군수 수출 금지", status: "러시아 경유 확인", risk: "긴급" },
  { item: "사치품 수입 금지", status: "중국 경유 밀수", risk: "주의" },
  { item: "해외 노동자 송금 금지", status: "IT 인력 원격 활용", risk: "주의" },
  { item: "선박 간 불법 환적", status: "동해 공해상 포착", risk: "고위험" },
  { item: "정제유 불법 반입", status: "선박 국적 세탁", risk: "긴급" },
  { item: "불법 사이버 활동", status: "가상자산 탈취 의심", risk: "고위험" },
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
<<<<<<< HEAD
        <h1 className="text-3xl font-bold text-foreground tracking-tight">무역 모니터</h1>
        <p className="text-sm text-muted-foreground mt-1">UN Comtrade 기반 수출입 현황 · 제재 위반 의심 품목</p>
=======
        <h1 className="text-lg font-bold text-foreground">무역 모니터 ({year}년)</h1>
        <p className="text-xs text-muted-foreground mt-0.5">UN Comtrade 기반 {year}년 수출입 현황 · 제재 위반 의심 품목</p>
>>>>>>> e71af86cd607c7af4c83986b698ba01ae2ef5172
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1 min-h-0">
        <div className="bg-card border border-border rounded-xl p-5 flex flex-col min-h-0">
          <h2 className="text-2xl font-bold text-foreground mb-4 tracking-tight">품목별 수출입</h2>
          <div className="flex-1 min-h-0">
            <ShoppingCart />
          </div>
        </div>

        <div className="flex flex-col gap-4 min-h-0">
          <div className="bg-card border border-border rounded-xl p-5 flex flex-col flex-[1.4] min-h-0">
            <h2 className="text-2xl font-bold text-foreground mb-4 tracking-tight">국가별 무역 의존도</h2>
            <div className="flex-1 min-h-0">
              <TradePartnerChart />
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-6 flex-1 flex flex-col min-h-0 overflow-hidden">
            <h2 className="text-xl font-black text-white mb-5 uppercase tracking-tight">UN 제재 위반 의심 품목</h2>
            <div className="flex-1 min-h-0 overflow-y-auto pr-2 custom-scrollbar touch-pan-y">
              <div className="space-y-3 pb-4">
                {SANCTIONS_ITEMS.map((s, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between px-5 py-4 rounded-xl bg-muted/30 border border-white/5"
                  >
                    <div className="min-w-0 pr-4">
                      <p className="text-lg font-bold text-white truncate mb-0.5">{s.item}</p>
                      <p className="text-sm text-slate-300 font-medium">{s.status}</p>
                    </div>
                    <span
                      className="text-sm font-black px-4 py-1.5 rounded-full shrink-0 shadow-sm"
                      style={{
                        color: RISK_COLOR[s.risk],
                        background: `color-mix(in srgb, ${RISK_COLOR[s.risk]} 15%, transparent)`,
                        border: `1px solid color-mix(in srgb, ${RISK_COLOR[s.risk]} 30%, transparent)`,
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
    </div>
  )
}
