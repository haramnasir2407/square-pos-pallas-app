// apps/square-pos/src/containers/DashboardContainer/DashboardContainerUI.tsx

import ErrorBoundary from '@/components/composites/common/ErrorBoundary'
import DashboardHeader from '@/components/composites/dashboard/header/DashboardHeader'
import ProductSection from '@/components/composites/dashboard/products/ProductSection'
import ProductSectionSkeleton from '@/components/composites/dashboard/products/skeletons/ProductSectionSkeleton'
import { Heading } from '@/components/primitives/ui/typography'
import type { DashboardDataReturn } from '@/shared/services/dashboardDataService'
import { Suspense } from 'react'
import { css } from '~/styled-system/css'
import { Box, Center, Container, VStack } from '~/styled-system/jsx'

interface DashboardContainerUIProps {
  userName: string
  accessToken: string
  products: DashboardDataReturn['products']
  inventory: DashboardDataReturn['inventoryData']
}

export default function DashboardContainerUI({
  userName,
  accessToken,
  products,
  inventory,
}: DashboardContainerUIProps) {
  return (
    <Box minH="100vh">
      <DashboardHeader user={userName} />

      <main
        className={css({
          py: 'padding.block.lg',
          mt: 'layout.section.sm',
        })}
      >
        <Container>
          <Center className={css({ maxW: '6xl', mx: 'auto' })}>
            <VStack align="center" justify="center">
              <Box className={css({ textAlign: 'center' })}>
                <Heading
                  className={css({
                    fontSize: '2xl',
                    fontWeight: 'bold',
                    color: 'grey.50.dark',
                    mb: 'layout.section.sm',
                  })}
                >
                  Welcome back, {userName === 'Default Test Account' ? 'Haram Nasir' : null}!
                </Heading>
                <p
                  className={css({
                    fontSize: 'md',
                    color: 'grey.50.dark',
                    mx: 'auto',
                    textAlign: 'center',
                  })}
                >
                  Manage your Square integration, view products, and handle transactions all in one
                  place.
                </p>
              </Box>

              {/* Product Section */}
              <ErrorBoundary>
                <Suspense fallback={<ProductSectionSkeleton />}>
                  <ProductSection
                    accessToken={accessToken}
                    products={products}
                    inventory={inventory}
                  />
                </Suspense>
              </ErrorBoundary>
            </VStack>
          </Center>
        </Container>
      </main>
    </Box>
  )
}
