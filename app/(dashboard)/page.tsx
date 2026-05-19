import Link from "next/link"
import { Gauge, ShoppingCart, TrendingUp, Lightbulb, ArrowRight } from "lucide-react"

const SUMMARY_CARDS = [
  {
    href: "/tension",
    icon: Gauge,
    label: "긴장 지수 (Crisis Index)",
    value: "78",
    unit: "/ 100",
    valueColor: "var(--danger)",
    badge: "CRITICAL",
    desc: "전주 대비 +4.2점 급증",
    explanation: "AI 기반 뉴스/외교 성명 텍스트 마이닝을 통한 실시간 위기 발생 가능성 및 긴장도 지표입니다.",
    secondaryData: { label: "24h 변동", value: "+1.2%", color: "var(--danger)" },
    accuracy: "98.2%",
    path: "M0,15 Q15,5 30,15 T60,5 T100,10",
  },
  {
    href: "/trade",
    icon: ShoppingCart,
    label: "무역 모니터 (Trade Monitor)",
    value: "4,160",
    unit: "M USD",
    valueColor: "var(--success)",
    badge: "ACTIVE",
    desc: "중국 의존도 68% 기록",
    explanation: "주요 교역국(중국, 러시아 등)과의 실시간 수출입 물동량 및 품목별 경제 의존도를 분석합니다.",
    secondaryData: { label: "월간 추이", value: "-2.4%", color: "var(--warning)" },
    accuracy: "94.5%",
    path: "M0,10 Q20,15 40,5 T70,12 T100,5",
  },
  {
    href: "/correlation",
    icon: TrendingUp,
    label: "상관관계 (Risk Correlation)",
    value: "−0.89",
    unit: "COEFF",
    valueColor: "var(--warning)",
    badge: "STABLE",
    desc: "강한 역상관 관계 지속",
    explanation: "무역량 감소와 군사적 도발 수위 사이의 통계적 인과관계를 AI 모델이 매 시각 도출합니다.",
    secondaryData: { label: "신뢰 구간", value: "95%", color: "var(--success)" },
    accuracy: "91.0%",
    path: "M0,5 Q20,5 40,15 T70,10 T100,15",
  },
  {
    href: "/insights",
    icon: Lightbulb,
    label: "인사이트 (Intelligence)",
    value: "+28.3",
    unit: "%",
    valueColor: "var(--danger)",
    badge: "DEFENSE",
    desc: "방산 섹터 변동성 심화",
    explanation: "글로벌 방산 시장 지표와 한반도 지정학적 리스크를 결합하여 향후 시장 변동성을 예측합니다.",
    secondaryData: { label: "관측 기간", value: "180D", color: "var(--muted-foreground)" },
    accuracy: "89.7%",
    path: "M0,15 Q10,12 30,18 T60,5 T100,2",
  },
]

export default function OverviewPage() {
  return (
    <div className="h-full flex flex-col gap-5 p-2">
      <div className="mb-2">
        <h1 className="text-2xl font-black text-foreground tracking-tight">대시보드 실시간 개요</h1>
        <p className="text-sm text-muted-foreground mt-1">지정학적 리스크 및 경제 지표 통합 분석 플랫폼</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 flex-1">
        {SUMMARY_CARDS.map(({ href, icon: Icon, label, value, unit, valueColor, badge, desc, explanation, secondaryData, accuracy, path }) => (
          <Link
            key={href}
            href={href}
            className="bg-card border-2 border-border/60 rounded-2xl p-6 flex flex-col justify-between hover:border-[var(--success)] transition-all group relative overflow-hidden shadow-lg"
          >
            {/* Background Decoration */}
            <div 
              className="absolute -right-6 -top-6 w-36 h-36 opacity-[0.04] rotate-12 pointer-events-none group-hover:opacity-[0.08] group-hover:scale-125 transition-all duration-700"
              style={{ color: valueColor }}
            >
              <Icon className="w-full h-full" />
            </div>

            <div className="flex items-center justify-between relative z-10 mb-6">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border border-white/10 shadow-xl"
                style={{ background: `color-mix(in srgb, ${valueColor} 20%, transparent)` }}
              >
                <Icon className="w-6 h-6" style={{ color: valueColor }} aria-hidden="true" />
              </div>
              <div className="flex flex-col items-end gap-1">
                <span
                  className="text-[11px] font-black px-2.5 py-1 rounded-md uppercase tracking-widest border shadow-sm"
                  style={{
                    color: valueColor,
                    borderColor: `color-mix(in srgb, ${valueColor} 40%, transparent)`,
                    background: `color-mix(in srgb, ${valueColor} 15%, transparent)`,
                  }}
                >
                  {badge}
                </span>
                <span className="text-[10px] font-mono text-muted-foreground/60 tracking-tighter">
                  ACCURACY: {accuracy}
                </span>
              </div>
            </div>

            <div className="relative z-10 flex-1">
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground/80 mb-2">{label}</p>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-4xl font-black tabular-nums tracking-tighter" style={{ color: valueColor }}>
                  {value}
                </span>
                <span className="text-sm font-bold text-muted-foreground/60">{unit}</span>
              </div>

              {/* Tactical Sparkline */}
              <div className="h-10 mt-4 mb-5 bg-muted/20 rounded-lg p-2 border border-white/5">
                <svg className="w-full h-full opacity-60 group-hover:opacity-100 transition-opacity" viewBox="0 0 100 20" preserveAspectRatio="none">
                  <path
                    d={path}
                    fill="none"
                    stroke={valueColor}
                    strokeWidth="3"
                    strokeLinecap="round"
                    className="transition-all duration-500"
                  />
                </svg>
              </div>

              <div className="space-y-3 bg-muted/10 p-4 rounded-xl border border-white/5">
                <div className="flex items-center justify-between border-b border-white/5 pb-2">
                  <p className="text-sm text-foreground font-black leading-none">{desc}</p>
                  <div className="text-right">
                    <p className="text-[10px] text-muted-foreground uppercase font-bold leading-none mb-1">{secondaryData.label}</p>
                    <p className="text-xs font-black leading-none" style={{ color: secondaryData.color }}>{secondaryData.value}</p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground/90 leading-relaxed font-semibold">
                  {explanation}
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t-2 border-border/40 flex items-center justify-between text-xs font-black uppercase tracking-widest text-muted-foreground group-hover:text-foreground transition-colors relative z-10">
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-current opacity-50" />
                분석 리포트 보기
              </span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </div>
          </Link>
        ))}
      </div>

      <div className="bg-card border-2 border-border/60 rounded-2xl px-6 py-4 flex items-center justify-between shadow-lg mt-2">
        <div className="flex items-center gap-4">
          <div className="relative">
            <span className="pulse-dot w-3 h-3 rounded-full bg-[var(--danger)] inline-block shrink-0" aria-hidden="true" />
            <span className="absolute inset-0 pulse-dot w-3 h-3 rounded-full bg-[var(--danger)] opacity-50 animate-ping" />
          </div>
          <div>
            <p className="text-base font-black text-[var(--danger)] leading-none">현재 긴장 수위: 고위험 경보 (Level 4)</p>
            <p className="text-xs text-muted-foreground mt-1 font-bold">인접 지역 군사 활동 지수 82% 상회</p>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="text-right hidden lg:block">
            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">Data Integrity</p>
            <p className="text-xs font-mono font-bold text-[var(--success)]">STABLE (99.8%)</p>
          </div>
          <div className="hidden sm:flex flex-col gap-1 border-l-2 border-border/40 pl-6">
            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Global Feed Sync</p>
            <p className="text-xs text-muted-foreground font-bold italic">2m 14s ago</p>
          </div>
        </div>
      </div>
    </div>
  )
}
