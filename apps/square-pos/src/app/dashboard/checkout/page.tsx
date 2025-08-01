'use client'
import { OrderSummary } from '@/components/composites/dashboard/order/OrderSummary'
import { Button } from '@/components/primitives/ui/button'
import type { CartItem } from '@/shared/store/useCartStore'
import { Box, VStack } from '@styled-system/jsx'
import { useSession } from 'next-auth/react'
import { redirect, useRouter } from 'next/navigation'
import { css } from '~/styled-system/css'
// TODO: Replace with real cart store/context
const Items: CartItem[] = []

export default function CheckoutPage() {
  const { data: session } = useSession()
  if (!session) {
    redirect('/signin')
    return null
  }
  const router = useRouter()
  // TODO: Replace with real cart store/context
  const items = Items
  const accessToken = session.accessToken

  return (
    <VStack minH="100vh" justify="center" align="center" gap={8} bg="gray.50">
      <Box
        w="full"
        maxW="lg"
        p={8}
        bg="white"
        className={css({
          borderRadius: 'lg',
          boxShadow: 'lg',
        })}
      >
        <OrderSummary
          items={items}
          accessToken={accessToken ?? ''}
          onGoBack={() => router.push('/dashboard')}
          clearCart={() => {}}
          setShowCheckout={() => {}}
          setOpen={() => {}}
        />
        <Button
          className={css({ w: 'full', mt: 6 })}
          onClick={() => router.push('/dashboard')}
          variant="primary"
        >
          Back to Home
        </Button>
      </Box>
    </VStack>
  )
}
