import DashboardSkeleton from '@/components/composites/dashboard/skeleton/DashboardSkeleton'
import { Suspense } from 'react'

export default function Loading() {
  return (
    <Suspense fallback={null}>
      <DashboardSkeleton />
    </Suspense>
  )
}
