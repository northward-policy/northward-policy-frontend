# 📊 대시보드 API 요구사항 명세서 (DPRK Monitor)

이 문서는 프론트엔드 대시보드 인터페이스의 모든 위젯과 페이지를 구동하는 데 필요한 API 엔드포인트와 데이터 구조를 정의합니다.

## 공통 파라미터
- `year`: (Optional) 데이터 조회 연도 (기본값: "2024")
- `lang`: (Optional) 언어 설정 ("ko", "en")

---

## 1. 실시간 개요 (Overview)
메인 대시보드 상단의 요약 카드 및 하단 상태바 데이터.

- **Endpoint**: `GET /api/v1/dashboard/overview`
- **Response Structure**:
```json
{
  "summaryCards": [
    {
      "id": "tension",
      "label": "긴장 지수",
      "value": "78",
      "unit": "/ 100",
      "badge": "CRITICAL",
      "desc": "전주 대비 +4.2점 급증",
      "accuracy": "98.2%",
      "secondaryData": { "label": "24h 변동", "value": "+1.2%", "color": "danger" },
      "sparkline": [15, 5, 15, 5, 10] // 차트 시각화용 시계열 요약 데이터
    },
    { "id": "trade", "value": "4,160", "unit": "M USD", ... }
  ],
  "systemStatus": {
    "riskLevel": 4,
    "riskTitle": "고위험 경보",
    "riskDesc": "인접 지역 군사 활동 지수 82% 상회",
    "dataIntegrity": 99.8,
    "lastSync": "2026-05-19T10:00:00Z"
  }
}
```

---

## 2. 긴장 지수 분석 (Tension Analysis)
`TensionPage` 및 `TensionGauge`, `ThreatRadarChart` 연동 데이터.

- **Endpoint**: `GET /api/v1/dashboard/tension`
- **Response Structure**:
```json
{
  "current": {
    "score": 78,
    "label": "고위험",
    "weeklyDelta": 4.2
  },
  "radarData": [
    { "subject": "군사 활동", "score": 120, "fullMark": 150 },
    { "subject": "외교 성명", "score": 98, "fullMark": 150 },
    { "subject": "사이버 위협", "score": 85, "fullMark": 150 }
  ],
  "history": [
    { "period": "1분기", "score": 47, "label": "안정" },
    { "period": "2분기", "score": 58, "label": "주의" }
  ]
}
```

---

## 3. 무역 모니터링 (Trade Monitor)
`TradePage` 및 `ShoppingCart`, `TradePartnerChart` 연동 데이터.

- **Endpoint**: `GET /api/v1/dashboard/trade`
- **Response Structure**:
```json
{
  "tradeByCategory": {
    "전체": [{ "name": "중국", "import": 2840, "export": 410 }, ...],
    "사치품": [{ "name": "시계", "import": 142, "export": 0 }, ...],
    "군수": [...],
    "곡물": [...]
  },
  "partnerDependency": [
    { "name": "중국", "value": 68 },
    { "name": "러시아", "value": 15 },
    { "name": "기타", "value": 17 }
  ],
  "sanctionViolations": [
    { "item": "석유 (연 50만 배럴 상한)", "status": "제한 초과 의심", "risk": "고위험" },
    { "item": "무기·군수 수출 금지", "status": "러시아 경유 확인", "risk": "긴급" }
  ]
}
```

---

## 4. 위험 상관관계 (Risk Correlation)
`CorrelationPage` 및 `CorrelationChart`, `ScatterPlot` 연동 데이터.

- **Endpoint**: `GET /api/v1/dashboard/correlation`
- **Response Structure**:
```json
{
  "stats": {
    "pearson": -0.89,
    "rSquared": 0.79,
    "pValue": 0.001,
    "predictionPeriod": "3개월"
  },
  "timeSeries": [
    { "month": "24년 1월", "tension": 42, "trade": 3120, "isPredicted": false },
    { "month": "25년 1월", "tension": 80, "trade": 1750, "isPredicted": true }
  ],
  "scenarios": [
    { "name": "낙관", "probability": "20%", "tension": 65, "trade": 2100 },
    { "name": "기준", "probability": "55%", "tension": 80, "trade": 1700 },
    { "name": "비관", "probability": "25%", "tension": 92, "trade": 1200 }
  ]
}
```

---

## 5. 인텔리전스 인사이트 (Intelligence Insights)
`InsightsPage` 및 `InsightCards` 연동 데이터.

- **Endpoint**: `GET /api/v1/dashboard/insights`
- **Response Structure**:
```json
{
  "marketImpact": {
    "defenseIndexDelta": 28.3,
    "chartData": [98, 101, 97, 103, ...],
    "sectorChanges": [
      { "name": "록히드 마틴", "value": 31.2, "isUp": true },
      { "name": "코스피", "value": -3.8, "isUp": false }
    ]
  },
  "propagandaKeywords": [
    { "word": "핵 억제력", "english": "Nuclear Deterrence", "score": 94, "delta": "+18%" },
    { "word": "선제 타격", "english": "Preemptive Strike", "score": 87, "delta": "+12%" }
  ],
  "dataSources": [
    { "name": "UN Comtrade API", "status": "connected", "latency": "142ms" },
    { "name": "38 North 피드", "status": "unstable", "latency": "1.2s" }
  ],
  "analystNotes": [
    { "date": "12월 4주", "severity": "danger", "content": "KCNA '핵 억제력' 키워드 급증..." }
  ]
}
```
