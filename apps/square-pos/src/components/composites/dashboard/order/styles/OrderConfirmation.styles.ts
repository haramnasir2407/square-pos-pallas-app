import { css } from '~/styled-system/css/css.mjs'

export const loadingContainer = css({
  bg: 'white',
  p: 'padding.block.md',
  borderRadius: 'lg',
  textAlign: 'center',
  height: '100vh',
})
export const loadingIcon = css({ color: 'blue.600', fontSize: '2xl', mb: '4' })
export const loadingTitle = css({ fontSize: 'xl', fontWeight: 'bold', mb: '2' })
export const loadingText = css({ color: 'gray.600' })

export const errorContainer = css({
  bg: 'white',
  p: '8',
  borderRadius: 'lg',
  boxShadow: 'xl',
  textAlign: 'center',
})
export const errorIcon = css({ color: 'red.600', fontSize: '2xl', mb: '4' })
export const errorTitle = css({ fontSize: 'xl', fontWeight: 'bold', mb: '2' })
export const errorText = css({ color: 'gray.600', mb: '4' })
export const errorCloseButton = css({
  px: '4',
  py: '2',
  bg: 'gray.600',
  color: 'white',
  borderRadius: 'md',
  _hover: { bg: 'gray.700' },
})

export const successContainer = css({
  bg: 'white',
  p: '8',
  borderRadius: 'lg',
  textAlign: 'center',
  maxW: '2xl',
  maxH: '90vh',
  overflowY: 'auto',
})
export const successIcon = css({ color: 'green.600', fontSize: '2xl', mb: '4' })
export const successTitle = css({ fontSize: 'xl', fontWeight: 'bold', mb: '4' })
export const orderIdText = css({ color: 'gray.500', fontSize: 'sm', mb: '4' })
export const continueButton = css({
  w: 'full',
  px: '6',
  py: '3',
  bg: 'green.600',
  color: 'white',
  borderRadius: 'md',
  fontWeight: 'bold',
  _hover: { bg: 'green.700' },
})
