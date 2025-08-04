import { css } from '~/styled-system/css'
import { token } from '~/styled-system/tokens'

export const signInPageBg = 'linear-gradient(to bottom right, #eff6ff, #e0e7ff, #f3e8ff)'

export const containerStyle = css({
  bg: 'white',
  rounded: 'xl',
  shadow: 'md',
  p: 'layout.default.sm',
  maxW: { base: '90vw', sm: '60vw', md: '30vw' },
  w: '100%',
})

export const signInButton = css({
  color: 'white',
  bg: 'linear-gradient(to right, #3b82f6, #4f46e5)',
  _hover: {
    bg: 'linear-gradient(to right, #2563eb, #4f46e5)',
    transform: 'scale(1.02)',
  },
  fontWeight: 'medium',
  fontSize: 'md',
  width: '100%',
  transition: 'all 0.2s',
  cursor: 'pointer',
})

export const signInButtonBg = `linear-gradient(to right, ${token('colors.blue.50')}, ${token('colors.purple.50')})`
export const signInButtonHoverBg = `linear-gradient(to right, ${token('colors.blue.100')}, ${token('colors.purple.100')})`

export const termsMargin = css({
  mt: 'layout.section.sm',
})

export const linkStyle = css({
  color: { base: token('colors.blue.50'), _hover: token('colors.blue.100') },
  fontWeight: 'medium',
})
