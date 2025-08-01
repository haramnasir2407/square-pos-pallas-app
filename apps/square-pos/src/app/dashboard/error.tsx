'use client'
import { Button } from '@/components/primitives/ui/button'
import { Box } from '~/styled-system/jsx'
import { flex } from '~/styled-system/patterns'
import { MdErrorOutline } from 'react-icons/md'

// Error boundaries must be Client Components

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <Box
      className={flex({
        justify: 'center',
        align: 'center',
        h: '100vh',
        gap: 'gap.inline.lg',
      })}
    >
      <h2 className={flex({ alignItems: 'center', gap: 'gap.inline.sm', fontWeight: 'semibold' })}>
        <MdErrorOutline fill="red" size={20} /> Something went wrong! {error.message}{' '}
      </h2>
      <Button variant="outlined" onClick={() => reset()}>
        Try again
      </Button>
    </Box>
  )
}
