'use client'
import { Button } from '@/components/primitives/ui/button'
import { useCartStore } from '@/shared/store/useCartStore'
import type { ProductCardProps } from '@/shared/types/catalog'
import Image from 'next/image'
import { FiMinus } from 'react-icons/fi'
import { GoPlus } from 'react-icons/go'
import { css } from '~/styled-system/css'
import { Flex } from '~/styled-system/jsx'
import {
  productImage,
  productName,
  priceText,
  stateTag,
  qtyText,
  quantityButton,
  removeButton,
  addToCartButton,
  cardContainer,
} from './ProductCard.styles'

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
  // * Use zustand store
  const items = useCartStore((state) => state.items)
  const addItem = useCartStore((state) => state.addItem)
  const removeItem = useCartStore((state) => state.removeItem)
  const updateQuantity = useCartStore((state) => state.updateQuantity)

  const cartItem = items.find((item) => item.id === id) // Find the cart item by id (zustand uses array)
  const inventoryQty = typeof quantity === 'string' ? Number(quantity) : (quantity ?? 0) // available inventory quantity
  const isOutOfStock = !inventoryQty || inventoryQty <= 0
  const atMaxQty = cartItem && cartItem.quantity >= inventoryQty

  return (
    <Flex direction="column" p="4" className={cardContainer}>
      <Image
        priority={true}
        src={imageUrl ?? ''}
        alt={name}
        width={180}
        height={180}
        style={{ objectFit: 'cover', maxHeight: '100%' }}
        className={productImage}
      />

      <h3 className={productName}>{name}</h3>

      <p className={priceText}>
        {price !== null ? `$${(price / 100).toFixed(2)}` : 'Price not available'}
      </p>

      <Flex align="center" mt="2" gap="gap.component.sm">
        <span className={stateTag(state ?? 'Unknown')}>{state ?? 'Unknown'}</span>
        <span className={qtyText}>Qty: {quantity ?? '-'}</span>
      </Flex>
      <Flex align="center" mt="layout.section.sm">
        {cartItem ? (
          <Flex align="center" gap="1">
            <Button
              variant="text"
              size="md"
              className={quantityButton}
              onClick={() => updateQuantity(id, cartItem.quantity - 1)}
              disabled={cartItem.quantity <= 1}
            >
              <FiMinus size={14} />
            </Button>
            <span className={css({ px: '2' })}>{cartItem.quantity}</span>
            <Button
              variant="text"
              size="md"
              className={quantityButton}
              onClick={() => updateQuantity(id, cartItem.quantity + 1)}
              disabled={atMaxQty}
            >
              <GoPlus size={14} />
            </Button>
            <Button
              variant="text"
              size="md"
              className={removeButton}
              onClick={() => removeItem(id)}
            >
              Remove
            </Button>
          </Flex>
        ) : (
          <Button
            variant="default"
            size="lg"
            width="full"
            className={addToCartButton(isOutOfStock)}
            disabled={isOutOfStock}
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
          >
            {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
          </Button>
        )}
      </Flex>
    </Flex>
  )
}
