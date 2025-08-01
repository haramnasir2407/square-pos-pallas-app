'use client'

import { Button } from '@/components/primitives/ui/button'
import { signOut } from 'next-auth/react'
import { css } from '~/styled-system/css'

export function HomeSignOutButton() {
  return (
    <Button
      variant="outlined"
      size="lg"
      onClick={() => signOut()}
      className={css({
        width: '100%',
        bg: 'white',
        color: 'gray.900',
        padding: '12px 16px',
        fontWeight: 'normal',
        textAlign: 'center',
        cursor: 'pointer',
        _hover: {
          transform: 'scale(1.02)',
        },
        transition: 'all 0.2s',
      })}
    >
      Sign Out
    </Button>
  )
}
