import type { CartItem } from '@/shared/store/useCartStore'

const CART_COOKIE = 'cart'

export function getCartFromCookie(cookieString: string): CartItem[] {
  try {
    const match = cookieString.match(new RegExp(`${CART_COOKIE}=([^;]+)`))
    if (!match) return []
    return JSON.parse(decodeURIComponent(match[1] ?? ''))
  } catch {
    return []
  }
}

export function setCartCookie(cart: CartItem[]) {
  document.cookie = `${CART_COOKIE}=${encodeURIComponent(JSON.stringify(cart))}; path=/; max-age=604800`
}
