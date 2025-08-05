import { createOrderApi } from '@/shared/services/orderService'
import type { CartItem } from '@/shared/store/useCartStore'
import { createOrderData } from '@/shared/utils/cartDrawerUtils'
import { useEffect, useState } from 'react'

export function useOrderConfirmation({
  items,
  orderDiscounts,
  orderTaxes,
  accessToken,
}: {
  items: CartItem[]
  accessToken: string
  orderDiscounts?: OrderDiscount[]
  orderTaxes?: OrderTax[]
}) {
  const [isProcessing, setIsProcessing] = useState(true)
  const [orderResult, setOrderResult] = useState<OrderResult | null>(null)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const createOrder = async () => {
      try {
        setIsProcessing(true)
        setError(null)

        const orderData = createOrderData({ items, orderDiscounts, orderTaxes })
        const result = await createOrderApi(orderData, accessToken)
        setOrderResult(result)
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An error occurred'))
      } finally {
        setIsProcessing(false)
      }
    }

    createOrder()
  }, [items, accessToken, orderDiscounts, orderTaxes])

  return {
    isProcessing,
    orderResult,
    error,
  }
}
