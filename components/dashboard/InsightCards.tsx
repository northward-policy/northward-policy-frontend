"use client"

import {
  AreaChart,
  Area,
  ResponsiveContainer,
  Tooltip,
} from "recharts"
import { TrendingUp, CheckCircle2, AlertCircle } from "lucide-react"

// --- 시장 위험 미니 데이터 ---
const MARKET_DATA = [
  { v: 98 }, { v: 101 }, { v: 97 }, { v: 103 }, { v: 99 },
  { v: 107 }, { v: 113 }, { v: 108 }, { v: 116 }, { v: 124 },
  { v: 119 }, { v: 128 },
]

// --- 핵심 키워드 데이터 ---
const KEYWORDS = [
  { word: "핵 억제력", en: "Nuclear Deterrence", score: 94, delta: "+18%" },
  { word: "선제 타격", en: "Preemptive Strike", score: 87, delta: "+12%" },
  { word: "적대 세력", en: "Hostile Forces", score: 81, delta: "+9%" },
  { word: "자위권", en: "Right to Self-Defense", score: 76, delta: "+7%" },
  { word: "전쟁 억제", en: "War Deterrence", score: 68, delta: "+4%" },
]

// --- 데이터 소스 ---
const SOURCES = [
  { name: "UN Comtrade API", status: "연결됨", latency: "142ms" },
  { name: "NAVER 뉴스 API", status: "연결됨", latency: "88ms" },
  { name: "KCNA 모니터", status: "연결됨", latency: "205ms" },
  { name: "38 North 피드", status: "불안정", latency: "1.2s" },
]

export function InsightCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* 카드 1: 시장 위험 */}
      <div className="glass-card rounded-xl p-5 flex flex-col">
        <div className="mb-3">
          <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
            투자자 / 기업 대상
          </span>
          <h3 className="text-sm font-bold text-foreground mt-1">시장 위험 영향도</h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            방산 섹터와 북한 긴장도 상관관계
          </p>
        </div>

        <div className="flex items-end gap-3 mb-3">
          <div>
            <p className="text-2xl font-mono font-bold text-danger-glow tabular-nums">+28.3%</p>
            <p className="text-xs font-mono text-muted-foreground">방산 지수 연초 대비</p>
          </div>
          <div className="flex items-center gap-1 text-[var(--danger)] text-xs font-mono mb-1">
            <TrendingUp className="w-3.5 h-3.5" aria-hidden="true" />
            긴장도와 동반 상승 ↑
          </div>
        </div>

        <div className="flex-1 min-h-[80px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={MARKET_DATA} margin={{ top: 2, right: 2, bottom: 2, left: 2 }}>
              <defs>
                <linearGradient id="mktGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey="v"
                stroke="#ef4444"
                strokeWidth={1.5}
                fill="url(#mktGrad)"
                dot={false}
                style={{ filter: "drop-shadow(0 0 3px rgba(239,68,68,0.5))" }}
              />
              <Tooltip
                contentStyle={{
                  background: "var(--card)",
                  border: "1px solid var(--surface-border)",
                  borderRadius: "6px",
                  fontSize: "11px",
                  fontFamily: "monospace",
                }}
                itemStyle={{ color: "#ef4444" }}
                labelStyle={{ display: "none" }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-3 pt-3 border-t border-[var(--surface-border)]">
          <div className="grid grid-cols-2 gap-2 text-xs font-mono">
            <div>
              <p className="text-muted-foreground">록히드 마틴</p>
              <p className="text-[var(--success)] font-semibold">+31.2%</p>
            </div>
            <div>
              <p className="text-muted-foreground">레이시온</p>
              <p className="text-[var(--success)] font-semibold">+24.7%</p>
            </div>
            <div>
              <p className="text-muted-foreground">코스피 (한국)</p>
              <p className="text-[var(--danger)] font-semibold">−3.8%</p>
            </div>
            <div>
              <p className="text-muted-foreground">엔/달러</p>
              <p className="text-[var(--danger)] font-semibold">−2.1%</p>
            </div>
          </div>
        </div>
      </div>

      {/* 카드 2: 선전 키워드 */}
      <div className="glass-card rounded-xl p-5 flex flex-col">
        <div className="mb-4">
          <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
            언론인 대상
          </span>
          <h3 className="text-sm font-bold text-foreground mt-1">핵심 선전 키워드</h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            조선중앙통신 &amp; 노동신문 급상승 키워드
          </p>
        </div>

        <div className="flex-1 space-y-3">
          {KEYWORDS.map((kw, i) => (
            <div key={i}>
              <div className="flex items-center justify-between mb-1">
                <div>
                  <span className="text-xs font-mono font-semibold text-foreground">{kw.word}</span>
                  <span className="text-[10px] font-mono text-muted-foreground ml-2">{kw.en}</span>
                </div>
                <span className="text-[10px] font-mono text-[var(--danger)]">{kw.delta}</span>
              </div>
              <div className="h-1.5 rounded-full bg-[var(--muted)] overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: `${kw.score}%`,
                    background: `linear-gradient(90deg, #ef4444 0%, #dc2626 100%)`,
                    boxShadow: "0 0 6px rgba(239,68,68,0.5)",
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 pt-3 border-t border-[var(--surface-border)]">
          <p className="text-[10px] font-mono text-muted-foreground">
            매 시간 업데이트 · 출처: KCNA Watch, NK News
          </p>
        </div>
      </div>

      {/* 카드 3: 데이터 소스 현황 */}
      <div className="glass-card rounded-xl p-5 flex flex-col">
        <div className="mb-4">
          <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
            데이터 인프라
          </span>
          <h3 className="text-sm font-bold text-foreground mt-1">데이터 소스 현황</h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            실시간 API 피드 상태 모니터
          </p>
        </div>

        <div className="flex-1 space-y-3">
          {SOURCES.map((src, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-3 rounded-lg border border-[var(--surface-border)] bg-[var(--muted)]/40"
            >
              <div className="flex items-center gap-2.5">
                {src.status === "연결됨" ? (
                  <CheckCircle2 className="w-4 h-4 text-[var(--success)] shrink-0" aria-hidden="true" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-[var(--warning)] shrink-0" aria-hidden="true" />
                )}
                <div>
                  <p className="text-xs font-mono font-semibold text-foreground">{src.name}</p>
                  <p className="text-[10px] font-mono text-muted-foreground">{src.status}</p>
                </div>
              </div>
              <div className="text-right">
                <p
                  className="text-xs font-mono font-bold"
                  style={{ color: src.status === "연결됨" ? "var(--success)" : "var(--warning)" }}
                >
                  {src.latency}
                </p>
                <p className="text-[10px] font-mono text-muted-foreground">응답속도</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 pt-3 border-t border-[var(--surface-border)]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="pulse-dot w-2 h-2 rounded-full bg-[var(--success)] inline-block" aria-hidden="true" />
              <span className="text-[10px] font-mono text-muted-foreground">4개 중 3개 정상</span>
            </div>
            <span className="text-[10px] font-mono text-muted-foreground">
              마지막 동기화: 2분 전
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
