'use client'
import { ButtonComponent } from '@/components/primitives/derived/Button'
import { Button } from '@/components/primitives/ui/button'
import { useCartStore } from '@/shared/store/useCartStore'
import type { ProductCardProps } from '@/shared/types/catalog'
import Image from 'next/image'
import { FiMinus } from 'react-icons/fi'
import { GoPlus } from 'react-icons/go'
import { css } from '~/styled-system/css'
import { Flex } from '~/styled-system/jsx'

/**
 * Card component for displaying product information and cart controls.
 * Handles inventory, pricing, and add/remove/update cart actions.
 */
export default function ProductCard({
  id,
  name,
  price,
  imageUrl,
  state,
  quantity,
  variationId,
  discounts,
  taxes,
}: ProductCardProps) {
  // Use zustand store instead of CartContext
  const items = useCartStore((state) => state.items)
  const addItem = useCartStore((state) => state.addItem)
  const removeItem = useCartStore((state) => state.removeItem)
  const updateQuantity = useCartStore((state) => state.updateQuantity)

  // Find the cart item by id (zustand uses array)
  const cartItem = items.find((item) => item.id === id)

  /**
   * The available inventory quantity for the product.
   */
  const inventoryQty = typeof quantity === 'string' ? Number(quantity) : (quantity ?? 0)
  /**
   * Whether the product is out of stock.
   */
  const isOutOfStock = !inventoryQty || inventoryQty <= 0
  /**
   * Whether the cart already has the maximum allowed quantity for this product.
   */
  const atMaxQty = cartItem && cartItem.quantity >= inventoryQty

  return (
    <Flex
      direction="column"
      p="4"
      className={css({
        height: '100%',
        borderRadius: 'lg',
      })}
    >
      <Image
        priority={true}
        src={imageUrl ?? ''}
        alt={name}
        width={180}
        height={180}
        style={{ objectFit: 'cover', maxHeight: '100%' }}
        className={css({ borderRadius: 'md', mb: '4' })}
      />

      <h3 className={css({ fontSize: 'sm', fontWeight: 'semibold' })}>{name}</h3>

      <p className={css({ color: 'gray.600', fontSize: 'sm' })}>
        {price !== null ? `$${(price / 100).toFixed(2)}` : 'Price not available'}{' '}
      </p>

      <Flex align="center" mt="2" gap="gap.component.sm">
        <span
          className={css({
            px: '2',
            py: '1',
            borderRadius: 'full',
            fontSize: 'xs',
            fontWeight: 'bold',
            bg: state === 'IN_STOCK' ? 'green.100' : 'red.100',
            color: state === 'IN_STOCK' ? 'green.700' : 'red.700',
          })}
        >
          {state ?? 'Unknown'}
        </span>
        <span
          className={css({
            fontSize: 'sm',
            color: 'gray.700',
            ml: '2',
          })}
        >
          Qty: {quantity ?? '-'}
        </span>
      </Flex>
      <Flex align="center" mt="layout.section.sm">
        {cartItem ? (
          <Flex align="center" gap="1">
            <Button
              variant="text"
              size="md"
              className={css({
                color: 'black',
                px: '2',
                py: '1',
                bg: 'gray.200',
                borderRadius: 'md',
              })}
              onClick={() => updateQuantity(id, cartItem.quantity - 1)}
              disabled={cartItem.quantity <= 1}
            >
              <FiMinus size={14} />
            </Button>
            <span className={css({ px: '2' })}>{cartItem.quantity}</span>
            <Button
              variant="text"
              size="md"
              className={css({
                color: 'black',
                px: '2',
                py: '1',
                bg: 'gray.200',
                borderRadius: 'md',
              })}
              onClick={() => updateQuantity(id, cartItem.quantity + 1)}
              disabled={atMaxQty}
            >
              <GoPlus size={14} />
            </Button>
            <Button
              variant="text"
              size="md"
              className={css({ ml: '1', color: 'red.500', fontSize: 'sm', bg: 'gray.50' })}
              onClick={() => removeItem(id)}
            >
              Remove
            </Button>
          </Flex>
        ) : (
          <ButtonComponent
            bg={isOutOfStock ? 'gray.200' : 'gray.800'}
            color={isOutOfStock ? 'gray.500' : 'white'}
            hover={{ bg: 'gray.700' }}
            cursor="pointer"
            onClick={() =>
              addItem({
                id,
                name,
                price,
                imageUrl,
                quantity: 1,
                is_taxable: false,
                variationId,
                discounts,
                taxes,
              })
            }
            disabled={isOutOfStock}
          >
            {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
          </ButtonComponent>
        )}
      </Flex>
    </Flex>
  )
}
