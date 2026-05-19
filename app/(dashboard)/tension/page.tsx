"use client"

import { useState, useMemo } from "react"
import { TensionGauge } from "@/components/dashboard/TensionGauge"
import { ThreatRadarChart } from "@/components/dashboard/ThreatRadarChart"
import { TensionTrendChart } from "@/components/dashboard/TensionTrendChart"
import { Slider } from "@/components/ui/slider"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Download, FileImage } from "lucide-react"
import { downloadAsImage, downloadAsCSV } from "@/lib/export-utils"
import tensionData from "@/lib/tension-data.json"

<<<<<<< HEAD
const INITIAL_WEIGHTS: Record<string, number> = {
  military: 0.4,
  diplomatic: 0.3,
  political: 0.2,
  economic: 0.1,
=======
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
>>>>>>> e71af86cd607c7af4c83986b698ba01ae2ef5172
}

function scoreColor(score: number) {
  if (score <= 33) return "#10b981"
  if (score <= 66) return "#f59e0b"
  return "#ef4444"
}

<<<<<<< HEAD
export default function TensionPage() {
  const [scenarioId, setScenarioId] = useState(tensionData.scenarios[0].id)
  const [weights, setWeights] = useState<Record<string, number>>(INITIAL_WEIGHTS)
  const [selectedDetail, setSelectedDetail] = useState<any>(null)

  const scenario = useMemo(() => 
    tensionData.scenarios.find(s => s.id === scenarioId) || tensionData.scenarios[0]
  , [scenarioId])

  const radarData = useMemo(() => {
    return scenario.parameters.map(p => ({
      subject: p.name,
      value: Math.min(100, Math.round(p.value * (weights[p.id] || 1))),
      fullMark: 100,
      original: p
    }))
  }, [scenario, weights])

  const currentScore = useMemo(() => {
    const total = radarData.reduce((acc, curr) => acc + curr.value, 0)
    return Math.round(total / radarData.length)
  }, [radarData])

  const handleWeightChange = (id: string, val: number[]) => {
    setWeights(prev => ({ ...prev, [id]: val[0] }))
  }

  const handlePointClick = (data: any) => {
    setSelectedDetail(data)
  }

  const exportScenarioData = () => {
    downloadAsCSV(scenario.parameters, `${scenario.id}_parameters`)
  }

  const exportHistoryData = () => {
    downloadAsCSV(scenario.history, `${scenario.id}_history`)
  }
=======
export default async function TensionPage({
  searchParams,
}: {
  searchParams: Promise<{ year?: string }>
}) {
  const { year = "2024" } = await searchParams
  const history = MOCK_DATA[year] || MOCK_DATA["2024"]
>>>>>>> e71af86cd607c7af4c83986b698ba01ae2ef5172

  return (
    <div className="h-full flex flex-col gap-4 p-1 overflow-hidden">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground tracking-tight">지정학적 긴장 지수 분석</h1>
          <p className="text-sm text-muted-foreground mt-1">AI 기반 실시간 리스크 감지 및 가중치 시뮬레이션</p>
        </div>
        <div className="flex gap-1.5 bg-muted/20 p-1 rounded-xl border border-border/50">
          {tensionData.scenarios.map(s => (
            <button
              key={s.id}
              onClick={() => {
                setScenarioId(s.id)
                setSelectedDetail(null)
              }}
              className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                scenarioId === s.id 
                  ? "bg-card text-foreground shadow-sm ring-1 ring-border" 
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {s.name}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 flex-1 min-h-0">
        {/* Left Column: Gauge & Radar */}
        <div className="xl:col-span-4 flex flex-col gap-4 min-h-0">
          <div className="bg-card border border-border rounded-xl p-4 shadow-sm relative group" id="tension-gauge-card">
            <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
              <button
                onClick={() => downloadAsImage("tension-gauge-card", "tension_gauge")}
                className="p-1.5 rounded-lg bg-muted/40 hover:bg-muted/60 text-foreground transition-all border border-border/50"
                title="이미지로 저장"
              >
                <FileImage className="w-4 h-4" />
              </button>
            </div>
            <TensionGauge score={currentScore} />
          </div>

          <div className="bg-card border border-border rounded-xl p-5 flex flex-col flex-1 min-h-[340px] shadow-sm relative group" id="threat-radar-card">
            <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
              <button
                onClick={() => downloadAsImage("threat-radar-card", "threat_radar")}
                className="p-1.5 rounded-lg bg-muted/40 hover:bg-muted/60 text-foreground transition-all border border-border/50"
                title="이미지로 저장"
              >
                <FileImage className="w-4 h-4" />
              </button>
              <button
                onClick={exportScenarioData}
                className="p-1.5 rounded-lg bg-muted/40 hover:bg-muted/60 text-foreground transition-all border border-border/50"
                title="CSV로 저장"
              >
                <Download className="w-4 h-4" />
              </button>
            </div>
            <div className="mb-3">
              <h2 className="text-2xl font-bold text-foreground tracking-tight">다차원 위험 레이더</h2>
              <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider">가중치가 반영된 통합 매트릭스</p>
            </div>
            <div className="flex-1 min-h-0">
              <ThreatRadarChart data={radarData} onPointClick={handlePointClick} />
            </div>
          </div>
        </div>

        {/* Middle Column: Controls & Details */}
        <div className="xl:col-span-3 flex flex-col gap-4 min-h-0">
          <div className="bg-card border border-border rounded-xl p-5 shadow-sm flex flex-col min-h-0">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-foreground">매개변수 가중치</h2>
              <button 
                onClick={() => setWeights(INITIAL_WEIGHTS)}
                className="text-xs font-bold text-muted-foreground hover:text-primary transition-colors"
              >
                초기화
              </button>
            </div>
            <ScrollArea className="flex-1 -mr-2 pr-2">
              <div className="space-y-6 pb-2">
                {scenario.parameters.map(p => (
                  <div key={p.id} className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-bold text-muted-foreground">{p.name}</span>
                      <span className="text-sm font-mono font-black text-foreground">x{weights[p.id].toFixed(2)}</span>
                    </div>
                    <Slider
                      value={[weights[p.id]]}
                      min={0}
                      max={INITIAL_WEIGHTS[p.id] * 2}
                      step={0.01}
                      onValueChange={(val) => handleWeightChange(p.id, val)}
                    />
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>

          <div className="bg-card border border-border rounded-xl p-5 shadow-sm flex-1 flex flex-col min-h-0 relative overflow-hidden group">
            <div className="mb-4">
<<<<<<< HEAD
              <h2 className="text-lg font-bold text-foreground">상세 정보 분석</h2>
              <p className="text-xs text-muted-foreground">그래프 점을 클릭하여 자료 확인</p>
            </div>
            {selectedDetail ? (
              <ScrollArea className="flex-1 -mr-2 pr-2">
                <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest bg-primary/10 text-primary border border-primary/20">
                      {selectedDetail.type === "parameter" ? "지표 분석" : "이력 분석"}
                    </span>
                    <h3 className="text-base font-black text-foreground">
                      {selectedDetail.type === "parameter" ? selectedDetail.subject : selectedDetail.period}
                    </h3>
                  </div>
                  
                  <div className="p-4 rounded-2xl bg-muted/20 border border-border/50">
                    <p className="text-sm leading-relaxed text-slate-300 font-medium whitespace-pre-wrap">
                      {selectedDetail.type === "parameter" 
                        ? selectedDetail.original.details 
                        : selectedDetail.summary}
                    </p>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl bg-muted/10 border border-border/30">
                    <span className="text-xs font-bold text-muted-foreground uppercase">위험 수준</span>
                    <span className="text-sm font-black" style={{ color: scoreColor(selectedDetail.value || selectedDetail.score) }}>
                      {selectedDetail.value || selectedDetail.score} / 100
                    </span>
                  </div>
                </div>
              </ScrollArea>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-4 opacity-40 group-hover:opacity-60 transition-opacity">
                <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-3">
                  <svg className="w-6 h-6 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-sm font-bold text-muted-foreground">데이터 포인트를 선택하여<br/>세부 분석 리포트를 확인하세요.</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Quarterly Trend Chart */}
        <div className="xl:col-span-5 flex flex-col min-h-0">
          <div className="bg-card border border-border rounded-xl p-5 shadow-sm h-full flex flex-col relative group" id="tension-trend-card">
            <div className="absolute top-5 right-5 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
              <button
                onClick={() => downloadAsImage("tension-trend-card", "tension_trend")}
                className="p-1.5 rounded-lg bg-muted/40 hover:bg-muted/60 text-foreground transition-all border border-border/50"
                title="이미지로 저장"
              >
                <FileImage className="w-4 h-4" />
              </button>
              <button
                onClick={exportHistoryData}
                className="p-1.5 rounded-lg bg-muted/40 hover:bg-muted/60 text-foreground transition-all border border-border/50"
                title="CSV로 저장"
              >
                <Download className="w-4 h-4" />
              </button>
            </div>
            <div className="mb-4">
              <h2 className="text-2xl font-bold text-foreground tracking-tight">연도별 긴장도 추이</h2>
              <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider">{scenario.name} 히스토리</p>
=======
              <h2 className="text-2xl font-bold text-foreground tracking-tight">{year}년 분기별 추이</h2>
              <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider">리스크 점수 변화 히스토리</p>
>>>>>>> e71af86cd607c7af4c83986b698ba01ae2ef5172
            </div>
            
            <div className="flex flex-col flex-1 gap-6 min-h-0">
              <div className="flex-1 min-h-[300px]">
                <TensionTrendChart data={scenario.history} onPointClick={handlePointClick} />
              </div>
<<<<<<< HEAD
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-auto pt-4 border-t border-border/20">
                {scenario.history.map((h) => (
                  <div 
                    key={h.period} 
                    onClick={() => handlePointClick({ type: "history", ...h })}
                    className={`flex flex-col gap-2 p-4 bg-muted/5 rounded-2xl border transition-all cursor-pointer hover:shadow-md ${
                      selectedDetail?.period === h.period 
                        ? "border-primary bg-primary/5 ring-1 ring-primary/20" 
                        : "border-border/40 hover:bg-muted/10"
                    }`}
                  >
                    <p className="text-xs font-black text-muted-foreground uppercase tracking-widest">{h.period}</p>
                    <div className="flex items-baseline gap-2">
                      <p className="text-3xl font-black tabular-nums tracking-tighter" style={{ color: scoreColor(h.score) }}>
=======
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-auto pt-4 border-t border-border/20">
                {history.map((h) => (
                  <div key={h.period} className="flex flex-col gap-2 p-5 bg-muted/5 rounded-2xl border border-border/40 shadow-sm transition-all hover:shadow-md hover:bg-muted/10">
                    <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">{h.period}</p>
                    <div className="flex items-baseline gap-3">
                      <p className="text-4xl font-black tabular-nums tracking-tighter" style={{ color: scoreColor(h.score) }}>
>>>>>>> e71af86cd607c7af4c83986b698ba01ae2ef5172
                        {h.score}
                      </p>
                      <span className="text-[10px] font-black px-1.5 py-0.5 rounded bg-muted/10 border uppercase" style={{ color: scoreColor(h.score), borderColor: "currentColor" }}>
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
