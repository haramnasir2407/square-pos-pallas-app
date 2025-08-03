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
