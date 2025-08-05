import { ButtonVariant } from '@/components/primitives/derived/Button'
import { ORDER_LEVEL_DISCOUNTS, ORDER_LEVEL_TAXES } from '@/shared/constants/order_discounts_taxes'
import { calculateOrderApi } from '@/shared/services/orderService'
import {
  calculateOrderData,
  formatMoney,
  getDiscountName,
  getTaxName,
} from '@/shared/utils/cart/cartDrawerUtils'
import { useEffect, useState } from 'react'
import { BsHourglassSplit } from 'react-icons/bs'
import { RiArrowGoBackFill } from 'react-icons/ri'
import { Box, Flex } from '~/styled-system/jsx'
import { OrderConfirmation } from './OrderConfirmation'
import { OrderSummaryContent } from './OrderSummaryContent'
import {
  errorContainer,
  errorIcon,
  errorText,
  errorTitle,
  goBackButton,
  loadingContainer,
  loadingIcon,
  loadingText,
  loadingTitle,
  summaryContainer,
} from './styles/styles'
import { checkoutButtonStyle } from '../cart/styles/CartDrawer.styles'
/**
 * Displays a summary of the current order, including items, discounts, taxes, and totals.
 * Handles order calculation, error/loading states, and order confirmation.
 */
export const OrderSummary = ({
  items,
  accessToken,
  onGoBack,
  clearCart,
  setShowCheckout,
  setOpen,
  setShowConfirmation,
  showCheckout,
  showConfirmation,
}: OrderSummaryProps) => {
  const [orderPreview, setOrderPreview] = useState<OrderPreview | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const handlePlaceOrder = () => {
    setShowConfirmation(true)
  }

  // * client component calling server logic
  useEffect(() => {
    // if (showCheckout) return
    const calculateOrder = async () => {
      try {
        setError(null)
        // * calculate order
        const orderData = calculateOrderData({
          items,
          orderDiscounts: ORDER_LEVEL_DISCOUNTS,
          orderTaxes: ORDER_LEVEL_TAXES,
        })

        // * make API call to square orders api to calculate order
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

  if (isLoading) {
    // * Loading state UI
    return (
      <Flex direction="column" align="center" justify="center" className={loadingContainer}>
        <Box className={loadingIcon}>
          <BsHourglassSplit />
        </Box>
        <h2 className={loadingTitle}>Calculating Order...</h2>
        <p className={loadingText}>Please wait while we prepare your order summary</p>
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
      </Box>
    )
  }

  if (showConfirmation) {
    // * Show order confirmation dialog
    return (
      <OrderConfirmation
        items={items}
        accessToken={accessToken}
        orderDiscounts={ORDER_LEVEL_DISCOUNTS}
        orderTaxes={ORDER_LEVEL_TAXES}
        onClose={() => {
          clearCart()
          setShowCheckout(false)
          setShowConfirmation(false)
          setOpen(false)
        }}
      />
    )
  }

  return (
    !isLoading && (
      <Box className={summaryContainer}>
        {/* Order Summary */}
        <OrderSummaryContent
          order={orderPreview}
          formatMoney={formatMoney}
          getTaxName={(uid) => getTaxName(orderPreview, uid)}
          getDiscountName={(uid) => getDiscountName(orderPreview, uid)}
        />
        <Flex direction="column" gap="gap.component.sm" mt="auto">
          <ButtonVariant variant="outlined" onClick={onGoBack} className={goBackButton}>
            <RiArrowGoBackFill /> Go back
          </ButtonVariant>
          <ButtonVariant variant="primary" onClick={handlePlaceOrder} className={checkoutButtonStyle}>
            Confirm and place order
          </ButtonVariant>
        </Flex>
      </Box>
    )
  )
}
