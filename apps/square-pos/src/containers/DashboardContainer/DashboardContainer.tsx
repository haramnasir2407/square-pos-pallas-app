// * this container contains the business logic and the UI

import ErrorBoundary from '@/components/composites/common/ErrorBoundary'
import DashboardHeader from '@/components/composites/dashboard/header/DashboardHeader'
import ProductSection from '@/components/composites/dashboard/products/ProductSection'
import ProductSectionSkeleton from '@/components/composites/dashboard/products/ProductSectionSkeleton'
import { redirect } from 'next/navigation'
import { Suspense } from 'react'
import { auth } from '~/auth'
import { css } from '~/styled-system/css'
import { Box, Center, Container, Stack, VStack } from '~/styled-system/jsx'
import useDashboardData from './useDashboardData'

/**
 * DashboardContainer is an async server component that handles all data fetching
 * and renders the dashboard UI for authenticated users. Redirects to home if not authenticated.
 */

/* @compile */
export default async function DashboardContainer() {
  // * Check the session
  const session = await auth()
  if (!session) {
    redirect('/signin')
    return null
  }

  // * custom hook that fetches data server side
  const { products, inventoryData } = await useDashboardData({
    accessToken: session.accessToken ?? '',
  })

  return (
    <Box minH="100vh">
      <DashboardHeader user={session.user?.name ?? ''} />

      <main
        className={css({
          py: 'padding.block.lg',
          mt: 'layout.section.sm',
        })}
      >
        <Container>
          <Center className={css({ maxW: '6xl', mx: 'auto' })}>
            <VStack gap="4" align="center" justify="center">
              <Box className={css({ textAlign: 'center' })}>
                <h2
                  className={css({
                    fontSize: '2xl',
                    fontWeight: 'bold',
                    color: 'grey.50.dark',
                    mb: 'layout.section.sm',
                  })}
                >
                  Welcome back,{' '}
                  {session.user?.name === 'Default Test Account' ? 'Haram Nasir' : null}!
                </h2>
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
              {/*  dynamic content on run time  */}
              <ErrorBoundary>
                <Suspense fallback={<ProductSectionSkeleton />}>
                  <ProductSection
                    accessToken={session.accessToken ?? ''}
                    products={products}
                    inventory={inventoryData}
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
