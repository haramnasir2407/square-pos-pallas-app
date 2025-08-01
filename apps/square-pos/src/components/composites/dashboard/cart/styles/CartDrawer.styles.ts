import { css } from '~/styled-system/css'
import { flex } from '~/styled-system/patterns'

export const drawerTriggerStyle = flex({
  position: 'fixed',
  top: '4',
  right: '10',
  zIndex: 50,
  cursor: 'pointer',
  px: 'padding.inline.lg',
  py: 'padding.block.sm',
  borderRadius: 'md',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 'gap.inline.xs',
})

export const drawerContentStyle = css({
  height: '100vh',
  width: '30vw',
  bg: 'white',
  boxShadow: 'lg',
  display: 'flex',
  flexDirection: 'column',
  p: 6,
})

export const drawerCloseStyle = css({
  alignSelf: 'flex-end',
  mb: '4',
  color: 'gray.600',
  fontSize: 'xl',
  cursor: 'pointer',
})

export const drawerTitleStyle = css({
  fontSize: '2xl',
  fontWeight: 'bold',
  mb: 'gap.component.sm',
})

export const emptyCartTextStyle = css({ color: 'gray.500' })

export const drawerBodyStyle = css({ flex: 1, overflowY: 'auto' })

export const summaryContainerStyle = css({
  mt: 'auto',
  pt: '4',
  borderTop: 'none',
  display: 'flex',
  flexDirection: 'column',
  gap: '2',
})

export const summaryBoxStyle = css({
  bg: 'white',
  boxShadow: 'sm',
  borderRadius: 'lg',
  p: '4',
  mb: '2',
  display: 'flex',
  flexDirection: 'column',
  gap: '2',
})

export const labelStyle = css({
  fontSize: 'sm',
  fontWeight: 'bold',
  mr: '2',
})

export const customSelectStyle = css({ mr: '2' })

export const warningTextStyle = css({
  color: 'red.500',
  fontSize: 'xs',
  ml: '2',
})

export const orderLevelInfoStyle = css({
  fontSize: 'xs',
  color: 'gray.700',
  mb: '1',
})

export const totalTextStyle = css({
  fontWeight: 'bold',
  fontSize: 'lg',
  mb: '1',
})

export const clearCartButtonStyle = css({
  w: 'full',
  bg: 'gray.200',
  color: 'black',
  py: '2',
  fontWeight: 'semibold',
  fontSize: 'sm',
  _hover: { bg: 'gray.300' },
})

export const checkoutButtonStyle = css({
  w: 'full',
  py: 'padding.block.lg',
  px: 'padding.inline.md',
  fontWeight: 'bold',
  fontSize: 'md',
})

export const cartCountStyle = css({
  color: 'gray.500',
  position: 'absolute',
  top: '0',
  right: '0',
  transform: 'translate(50%, -50%)',
})
