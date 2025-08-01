// ProductCard.styles.ts
import { css } from '~/styled-system/css'

export const cardContainer = css({
  height: '100%',
  borderRadius: 'lg',
})

export const productImage = css({
  borderRadius: 'md',
  mb: '4',
})

export const productName = css({
  fontSize: 'sm',
  fontWeight: 'semibold',
})

export const priceText = css({
  color: 'gray.600',
  fontSize: 'sm',
})

export const stateTag = (state: string) =>
  css({
    px: '2',
    py: '1',
    borderRadius: 'full',
    fontSize: 'xs',
    fontWeight: 'bold',
    bg: state === 'IN_STOCK' ? 'green.100' : 'red.100',
    color: state === 'IN_STOCK' ? 'green.700' : 'red.700',
  })

export const qtyText = css({
  fontSize: 'sm',
  color: 'gray.700',
  ml: '2',
})

export const quantityButton = css({
  color: 'black',
  px: '2',
  py: '1',
  bg: 'gray.200',
  borderRadius: 'md',
})

export const removeButton = css({
  ml: '1',
  color: 'red.500',
  fontSize: 'sm',
  bg: 'gray.50',
})

export const addToCartButton = (isOutOfStock: boolean) =>
  css({
    p: 'padding.block.sm',
    bg: isOutOfStock ? 'gray.200' : 'gray.700',
    color: isOutOfStock ? 'gray.50' : 'white',
    borderRadius: 'md',
    fontWeight: 'medium',
    fontSize: 'md',
    width: '100%',
    _hover: {
      bg: isOutOfStock ? 'gray.100' : 'gray.600',
    },
    cursor: isOutOfStock ? 'not-allowed' : 'pointer',
    transition: 'all 0.2s',
  })
