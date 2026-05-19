import { DashboardHeader } from "@/components/dashboard/DashboardHeader"
import { Sidebar, BottomNav } from "@/components/dashboard/Sidebar"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen flex flex-col overflow-hidden bg-background">
      <DashboardHeader />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 min-w-0 overflow-y-auto p-5 pb-20 lg:pb-5">
          {children}
        </main>
      </div>
      <BottomNav />
    </div>
  )
}
