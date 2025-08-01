import { css } from '~/styled-system/css/css.mjs'
import { Box, Flex } from '~/styled-system/jsx'

/**
 * Props for OrderSummaryContent
 */
type OrderSummaryContentProps = {
  order: OrderPreview | OrderResult | null
  formatMoney: (amount: number | undefined) => string
  getTaxName: (uid: string) => string
  getDiscountName: (uid: string) => string
  title?: string
  mbTitle?: string | number
}

/**
 * Pure presentational component for displaying order summary content (items, discounts, taxes, totals).
 * Used in both OrderSummary and OrderConfirmation.
 */
export const OrderSummaryContent = ({
  order,
  formatMoney,
  getTaxName,
  getDiscountName,
  title = 'Order Summary',
}: OrderSummaryContentProps) => {
  return (
    <Box className={css({ textAlign: 'left', mb: 6, mt: 4 })}>
      <h3
        className={css({
          fontSize: 'lg',
          fontWeight: 'bold',
          mb: 6,
          color: 'gray.800',
          letterSpacing: 'tight',
        })}
      >
        {title}
      </h3>

      {/* Items List with old/new values, applied discounts/taxes */}
      <Box className={css({ mb: '4' })}>
        <h4
          className={css({
            fontSize: 'md',
            fontWeight: 'semibold',
            mb: '2',
            color: 'gray.700',
          })}
        >
          Items ({order?.order?.line_items?.length || 0})
        </h4>
        <Box className={css({ spaceY: '2' })}>
          {order?.order?.line_items?.map((item, index) => (
            <Flex
              key={index}
              direction="column"
              gap="gap.component.sm"
              py="2"
              px="3"
              bg="gray.50"
              mb="2"
              className={css({
                borderRadius: 'md',
              })}
            >
              <Box className={css({ fontWeight: 'medium', fontSize: 'sm' })}>{item.name}</Box>
              <Box className={css({ color: 'gray.600', fontSize: 'xs' })}>
                Qty: {item.quantity} × {formatMoney(item.base_price_money?.amount)}
              </Box>
              {/* Old value (before discounts/taxes) */}
              <Box className={css({ color: 'gray.500', fontSize: 'xs' })}>
                <b>Original:</b> {formatMoney(item.gross_sales_money?.amount)}
              </Box>
              {/* Applied Discounts */}
              {item.applied_discounts && item.applied_discounts.length > 0 && (
                <Box className={css({ color: 'green.600', fontSize: 'xs' })}>
                  <b>Discounts:</b>
                  <ul style={{ margin: 0, paddingLeft: 16 }}>
                    {item.applied_discounts.map((d) => (
                      <li key={d.uid}>
                        {getDiscountName(d.discount_uid)}: -{formatMoney(d.applied_money?.amount)}
                      </li>
                    ))}
                  </ul>
                </Box>
              )}
              {/* Applied Taxes */}
              {item.applied_taxes && item.applied_taxes.length > 0 && (
                <Box className={css({ color: 'blue.600', fontSize: 'xs' })}>
                  <b>Taxes:</b>
                  <ul style={{ margin: 0, paddingLeft: 16 }}>
                    {item.applied_taxes.map((t) => (
                      <li key={t.uid}>
                        {getTaxName(t.tax_uid)}: +{formatMoney(t.applied_money?.amount)}
                      </li>
                    ))}
                  </ul>
                </Box>
              )}
              {/* New value (after discounts/taxes) */}
              <Box
                className={css({
                  color: 'gray.800',
                  fontSize: 'sm',
                  fontWeight: 'bold',
                })}
              >
                <b>Final:</b> {formatMoney(item.total_money?.amount)}
              </Box>
            </Flex>
          ))}
        </Box>
      </Box>

      {/* Order-level summary */}
      <Box className={css({ mt: '4', borderTop: '1px solid #eee', pt: '3' })}>
        <Box className={css({ color: 'green.700', fontSize: 'sm', mb: '1' })}>
          <b>Total Discount:</b> {formatMoney(order?.order.total_discount_money?.amount)}
        </Box>
        <Box className={css({ color: 'blue.700', fontSize: 'sm', mb: '1' })}>
          <b>Total Tax:</b> {formatMoney(order?.order.total_tax_money?.amount)}
        </Box>
        <Box
          className={css({
            color: 'gray.900',
            fontSize: 'md',
            fontWeight: 'bold',
          })}
        >
          <b>Order Total:</b> {formatMoney(order?.order.total_money?.amount)}
        </Box>
      </Box>
    </Box>
  )
}
