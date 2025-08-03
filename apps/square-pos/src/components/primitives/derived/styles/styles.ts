import { css } from '~/styled-system/css'
import { flex } from '~/styled-system/patterns'

export const errorBox = css({
  mb: 'layout.section.sm',
  px: 'padding.inline.md',
  py: 'padding.block.md',
  backgroundColor: 'red.50',
  border: '1px solid',
  borderColor: 'red.200',
  rounded: 'lg',
})

export const errorIcon = css({
  height: '20px',
  width: '20px',
  color: 'red.500',
  marginRight: '8px',
})

export const errorButton = css({
  color: 'error.text',
  fontSize: 'sm',
})
