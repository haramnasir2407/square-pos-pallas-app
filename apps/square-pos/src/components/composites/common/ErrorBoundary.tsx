// * react error boundary
'use client'

import { Button } from '@/components/primitives/ui/button'
import { ErrorBoundary as REB } from 'react-error-boundary'
import { MdErrorOutline } from 'react-icons/md'
import { Box } from '~/styled-system/jsx'
import { flex } from '~/styled-system/patterns'

export default function ErrorBoundary({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <REB
      fallback={
        <Box
          className={flex({
            mt: 'layout.section.md',
            w: 'full',
            justify: 'center',
            align: 'center',
            py: 'padding.block.lg',
            mb: 'layout.section.md',
            gap: 'gap.inline.sm',
          })}
        >
          <h2
            className={flex({ alignItems: 'center', gap: 'gap.inline.sm', fontWeight: 'semibold' })}
          >
            <MdErrorOutline fill="red" size={20} /> Something went wrong. Can not load products.
          </h2>
          <Button variant="outlined" onClick={() => window.location.reload()}>
            Try again
          </Button>
        </Box>
      }
    >
      {children}
    </REB>
  )
}
