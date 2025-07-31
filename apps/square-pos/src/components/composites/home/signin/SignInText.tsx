import LockIcon from '@/components/composites/home/signin/LockIcon'
import { css } from '~/styled-system/css'
import { Box } from '~/styled-system/jsx'

export default function SignInText() {
  return (
    <Box
      className={css({
        textAlign: 'center',
        mb: 'layout.section.sm',
      })}
    >
      <LockIcon />
      <h1
        className={css({
          fontSize: '30px',
          fontWeight: 'bold',
          color: '#111827',
          marginBottom: '8px',
        })}
      >
        Welcome Back
      </h1>
      <p
        className={css({
          color: 'text.secondary',
        })}
      >
        Sign in to your Square account to continue
      </p>
    </Box>
  )
}
