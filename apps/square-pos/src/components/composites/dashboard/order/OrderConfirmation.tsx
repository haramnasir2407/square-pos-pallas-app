import { ButtonVariant } from '@/components/primitives/derived/Button'
import { createOrderApi } from '@/shared/services/orderService'
import {
  createOrderData,
  formatMoney,
  getDiscountName,
  getTaxName,
} from '@/shared/utils/cart/cartDrawerUtils'
import { useEffect, useState } from 'react'
import { BsHourglassSplit } from 'react-icons/bs'
import { Box, Flex } from '~/styled-system/jsx'
import { OrderSummaryContent } from './OrderSummaryContent'
import {
  errorContainer,
  errorIcon,
  errorText,
  errorTitle,
  loadingContainer,
  loadingIcon,
  loadingText,
  loadingTitle,
  orderIdText,
  successContainer,
  successIcon,
  successTitle,
} from './styles/styles'

/**
 * Handles order creation and displays the result (success or error) with a summary.
 * Shows loading, error, and success states for order processing.
 */
export const OrderConfirmation = ({
  items,
  accessToken,
  orderDiscounts,
  orderTaxes,
  onClose,
}: OrderConfirmationProps) => {
  const [isProcessing, setIsProcessing] = useState(true)
  const [orderResult, setOrderResult] = useState<OrderResult | null>(null)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const createOrder = async () => {
      try {
        setIsProcessing(true)
        setError(null)

        // * create order data
        const orderData = createOrderData({
          items,
          orderDiscounts,
          orderTaxes,
        })

        const result = await createOrderApi(orderData, accessToken)
        setOrderResult(result) // * contains the order object that is created
      } catch (err) {
        console.error('Error creating order:', err)
        setError(err instanceof Error ? err : new Error('An error occurred'))
      } finally {
        setIsProcessing(false)
      }
    }

    createOrder()
  }, [items, accessToken, orderDiscounts, orderTaxes])

  if (isProcessing) {
    // * Loading state UI
    return (
      <Flex direction="column" align="center" justify="center" className={loadingContainer}>
        <Box className={loadingIcon}>
          <BsHourglassSplit />
        </Box>
        <h2 className={loadingTitle}>Processing Order...</h2>
        <p className={loadingText}>Please wait while we create your order</p>
      </Flex>
    )
  }

  if (error) {
    // * Error state UI
    return (
      <Box className={errorContainer}>
        <Box className={errorIcon}>✗</Box>
        <h2 className={errorTitle}>Order Failed</h2>
        <p className={errorText}>{error.message}</p>
        <ButtonVariant variant="outlined" onClick={onClose}>
          Close
        </ButtonVariant>
      </Box>
    )
  }

  return (
    !isProcessing && (
      <Box className={successContainer}>
        <Box className={successIcon}>✓</Box>
        <h2 className={successTitle}>Order Successful!</h2>
        {/* Order Summary */}
        <OrderSummaryContent
          order={orderResult}
          formatMoney={formatMoney}
          getTaxName={(uid) => getTaxName(orderResult, uid)}
          getDiscountName={(uid) => getDiscountName(orderResult, uid)}
        />
        {orderResult?.order?.id && <p className={orderIdText}>Order ID: {orderResult.order.id}</p>}
        <ButtonVariant variant="primary" onClick={onClose}>
          Continue Shopping
        </ButtonVariant>
      </Box>
    )
  )
}
