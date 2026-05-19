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

export default function InsightsPage() {
  return (
    <div className="h-full flex flex-col gap-4">
      <div>
        <h1 className="text-lg font-bold text-foreground">인사이트</h1>
        <p className="text-xs text-muted-foreground mt-0.5">시장 영향도 · 선전 키워드 · 데이터 소스 현황</p>
      </div>

      <InsightCards />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1 min-h-0">
        <div className="bg-card border border-border rounded-xl p-4 flex flex-col min-h-0">
          <h2 className="text-xs font-semibold text-muted-foreground mb-2.5">주요 관찰 사항</h2>
          <div className="space-y-2 flex-1">
            {ANALYST_NOTES.map((note, i) => (
              <div key={i} className="p-3 rounded-lg bg-muted/20 flex items-start gap-3">
                <span
                  className="w-1 self-stretch rounded-full shrink-0"
                  style={{ background: note.color, minHeight: 14 }}
                  aria-hidden="true"
                />
                <div>
                  <p className="text-[11px] text-muted-foreground mb-0.5">{note.date}</p>
                  <p className="text-xs text-foreground leading-relaxed">{note.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-4 flex flex-col min-h-0">
          <h2 className="text-xs font-semibold text-muted-foreground mb-2.5">사용자 유형별 권장 활용</h2>
          <div className="grid grid-cols-3 gap-3 flex-1">
            {USER_GUIDES.map((group) => (
              <div
                key={group.title}
                className="rounded-lg border p-3 flex flex-col gap-2"
                style={{
                  borderColor: `color-mix(in srgb, ${group.color} 25%, transparent)`,
                  background: `color-mix(in srgb, ${group.color} 5%, transparent)`,
                }}
              >
                <p className="text-xs font-semibold" style={{ color: group.color }}>{group.title}</p>
                <ul className="space-y-1.5" role="list">
                  {group.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="w-1 h-1 rounded-full shrink-0 mt-1.5" style={{ background: group.color }} aria-hidden="true" />
                      <span className="text-[11px] text-muted-foreground leading-relaxed">{item}</span>
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
