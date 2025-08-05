import { useEffect, useState } from 'react'
import { ORDER_LEVEL_DISCOUNTS, ORDER_LEVEL_TAXES } from '@/shared/constants/order_discounts_taxes'
import { calculateOrderApi } from '@/shared/services/orderService'
import { calculateOrderData } from '@/shared/utils/cartDrawerUtils'
import type { CartItem } from '@/shared/store/useCartStore'

export const useOrderSummary = (items: CartItem[], accessToken: string) => {
  const [orderPreview, setOrderPreview] = useState<OrderPreview | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const calculateOrder = async () => {
      try {
        setError(null)
        const orderData = calculateOrderData({
          items,
          orderDiscounts: ORDER_LEVEL_DISCOUNTS,
          orderTaxes: ORDER_LEVEL_TAXES,
        })

        const result = await calculateOrderApi(orderData, accessToken)
        setOrderPreview(result)
      } catch (err) {
        console.error('Error creating order:', err)
        setError(err instanceof Error ? err : new Error('An error occurred'))
      } finally {
        setIsLoading(false)
      }
    }

    calculateOrder()
  }, [items, accessToken])

  return { orderPreview, isLoading, error }
}
