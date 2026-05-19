import { InsightCards } from "@/components/dashboard/InsightCards"

const ANALYST_NOTES = [
  {
    date: "12월 4주",
    color: "var(--danger)",
    text: "KCNA '핵 억제력' 키워드 전주 대비 18% 급증. 노동신문 논조 동반 강경화.",
  },
  {
    date: "12월 3주",
    color: "var(--warning)",
    text: "코스피 북한 리스크로 −3.8% 하락, 방산 ETF +6.2% 동시 상승.",
  },
  {
    date: "12월 2주",
    color: "var(--success)",
    text: "38 North 응답 1.2초 불안정. 대체 소스 검증 중.",
  },
]

const USER_GUIDES = [
  {
    title: "투자자 / 기업",
    color: "var(--danger)",
    items: ["방산 섹터 상관관계 모니터링", "코스피 리스크 조기 감지", "분기별 포트폴리오 신호"],
  },
  {
    title: "언론인 / 연구자",
    color: "var(--warning)",
    items: ["선전 키워드 급등 알림", "KCNA·노동신문 논조 분석", "시계열 비교 데이터"],
  },
  {
    title: "정책 분석가",
    color: "var(--success)",
    items: ["UN 제재 위반 품목 추적", "AI 예측 시나리오 검토", "데이터 소스 신뢰도"],
  },
]

export default async function InsightsPage({
  searchParams,
}: {
  searchParams: Promise<{ year?: string }>
}) {
  const { year = "2024" } = await searchParams

  return (
    <div className="h-full flex flex-col gap-4">
      <div>
<<<<<<< HEAD
        <h1 className="text-3xl font-bold text-foreground tracking-tight">인사이트</h1>
        <p className="text-sm text-muted-foreground mt-1">시장 영향도 · 선전 키워드 · 데이터 소스 현황</p>
=======
        <h1 className="text-lg font-bold text-foreground">인사이트 ({year}년)</h1>
        <p className="text-xs text-muted-foreground mt-0.5">{year}년 시장 영향도 · 선전 키워드 · 데이터 소스 현황</p>
>>>>>>> e71af86cd607c7af4c83986b698ba01ae2ef5172
      </div>

      <InsightCards />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1 min-h-0">
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm flex flex-col min-h-0">
          <div className="mb-4">
            <h2 className="text-2xl font-bold text-foreground tracking-tight">주요 관찰 사항</h2>
            <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider">최신 AI 분석 리포트</p>
          </div>
          <div className="space-y-3 flex-1 overflow-y-auto pr-2 custom-scrollbar">
            {ANALYST_NOTES.map((note, i) => (
              <div key={i} className="p-4 rounded-2xl bg-muted/20 border border-border/50 flex items-start gap-4 transition-all hover:bg-muted/30">
                <span
                  className="w-1.5 self-stretch rounded-full shrink-0"
                  style={{ background: note.color, minHeight: 24 }}
                  aria-hidden="true"
                />
                <div>
                  <p className="text-xs font-black text-muted-foreground uppercase tracking-widest mb-1">{note.date}</p>
                  <p className="text-sm text-foreground font-medium leading-relaxed">{note.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-6 shadow-sm flex flex-col min-h-0">
          <div className="mb-4">
            <h2 className="text-2xl font-bold text-foreground tracking-tight">사용자 유형별 권장 활용</h2>
            <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider">역할 중심 가이드</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 flex-1">
            {USER_GUIDES.map((group) => (
              <div
                key={group.title}
                className="rounded-2xl border p-4 flex flex-col gap-3 transition-all hover:shadow-md"
                style={{
                  borderColor: `color-mix(in srgb, ${group.color} 25%, transparent)`,
                  background: `color-mix(in srgb, ${group.color} 5%, transparent)`,
                }}
              >
                <p className="text-sm font-black uppercase tracking-tight" style={{ color: group.color }}>{group.title}</p>
                <ul className="space-y-2" role="list">
                  {group.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full shrink-0 mt-1.5" style={{ background: group.color }} aria-hidden="true" />
                      <span className="text-xs text-muted-foreground font-medium leading-tight">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
