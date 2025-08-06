// apps/square-pos/src/containers/DashboardContainer/DashboardContainerUI.tsx

import ErrorBoundary from '@/components/composites/common/ErrorBoundary'
import ProductSectionSkeleton from '@/components/composites/dashboard/products/skeletons/ProductSectionSkeleton'
import type { DashboardDataReturn } from '@/containers/dashboard/dashboardDataService'
import ProductSectionContainer from '@/containers/product/ProductSectionContainer'
import { Suspense } from 'react'

interface Dashboard {
  userName: string
  accessToken: string
  products: DashboardDataReturn['products']
  inventory: DashboardDataReturn['inventoryData']
}

export default function Dashboard({ userName, accessToken, products, inventory }: Dashboard) {
  return (
    <ErrorBoundary>
      <Suspense fallback={<ProductSectionSkeleton />}>
        <ProductSectionContainer
          accessToken={accessToken}
          products={products}
          inventory={inventory}
        />
      </Suspense>
    </ErrorBoundary>
  )
}
