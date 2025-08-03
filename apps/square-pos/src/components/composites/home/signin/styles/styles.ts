import { css } from '~/styled-system/css'
import { token } from '~/styled-system/tokens'

export const signInPageBg = 'linear-gradient(to bottom right, #eff6ff, #e0e7ff, #f3e8ff)'

export const containerStyle = css({
  bg: 'white',
  rounded: 'xl',
  shadow: 'md',
  p: 'layout.default.sm',
  maxW: 'md',
  w: '100%',
})

export const signInButtonText = css({
  color: 'white',
})
// export const signInButtonBg = `linear-gradient(to right, ${token('colors.blue.50')}, ${token('colors.purple.50')})`
export const signInButtonBg = 'linear-gradient(to right, #3b82f6, #4f46e5)'
// export const signInButtonHoverBg = `linear-gradient(to right, ${token('colors.blue.100')}, ${token('colors.purple.100')})`
export const signInButtonHoverBg = 'linear-gradient(to right, #2563eb, #4f46e5)'

export const termsMargin = css({
  mt: 'layout.section.sm',
})

export const linkStyle = css({
  color: { base: token('colors.blue.50'), _hover: token('colors.blue.100') },
  fontWeight: 'medium',
})
