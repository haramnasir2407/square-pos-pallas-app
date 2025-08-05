// apps/square-pos/src/containers/DashboardContainer/DashboardContainerUI.tsx

import ErrorBoundary from '@/components/composites/common/ErrorBoundary'
import DashboardHeader from '@/components/composites/dashboard/header/DashboardHeader'
import ProductSectionSkeleton from '@/components/composites/dashboard/products/skeletons/ProductSectionSkeleton'
import { Heading } from '@/components/primitives/ui/typography'
import type { DashboardDataReturn } from '@/containers/dashboard/dashboardDataService'
import ProductSectionContainer from '@/containers/product/ProductSectionContainer'
import { Suspense } from 'react'
import { css } from '~/styled-system/css'
import { Box, Center, Container, VStack } from '~/styled-system/jsx'

interface Dashboard {
  userName: string
  accessToken: string
  products: DashboardDataReturn['products']
  inventory: DashboardDataReturn['inventoryData']
}

export default function Dashboard({ userName, accessToken, products, inventory }: Dashboard) {
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

              {/* Product Section change this to a layout */}

              <ErrorBoundary>
                <Suspense fallback={<ProductSectionSkeleton />}>
                  <ProductSectionContainer
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
