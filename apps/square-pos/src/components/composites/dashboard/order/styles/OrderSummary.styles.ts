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
  textAlign: 'center',
})
export const errorIcon = css({ color: 'red.600', fontSize: '2xl', mb: '4' })
export const errorTitle = css({ fontSize: 'xl', fontWeight: 'bold', mb: '2' })
export const errorText = css({ color: 'gray.600', mb: '4' })

export const summaryContainer = css({
  p: '4',
  borderRadius: 'lg',
  textAlign: 'center',
  overflowY: 'auto',
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
})

export const goBackButton = css({
  display: 'flex',
  alignItems: 'center',
  gap: '2',
  bg: 'gray.100',
  color: 'gray.800',
  _hover: { bg: 'gray.200' },
})

export const confirmButton = css({
  fontWeight: 'bold',
})
