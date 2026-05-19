"use client"

import * as React from "react"
import { useRouter, useSearchParams, usePathname } from "next/navigation"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Calendar } from "lucide-react"

const YEARS = ["2022", "2023", "2024", "2025"]

export function YearSelector() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  
  const currentYear = searchParams.get("year") || "2024"

  const handleYearChange = (year: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("year", year)
    router.push(`${pathname}?${params.toString()}`)
  }

  return (
    <div className="flex items-center gap-2">
      <Select value={currentYear} onValueChange={handleYearChange}>
        <SelectTrigger size="sm" className="w-[110px] bg-muted/50 border-border/50 font-bold">
          <Calendar className="w-3.5 h-3.5 mr-2 text-muted-foreground" />
          <SelectValue placeholder="연도 선택" />
        </SelectTrigger>
        <SelectContent align="end">
          {YEARS.map((year) => (
            <SelectItem key={year} value={year} className="font-medium">
              {year}년
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
