import LockIcon from '@/components/composites/home/signin/LockIcon'
import { Heading, Paragraph } from '@/components/primitives/ui/typography'
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
      <Heading
        className={css({
          fontSize: '3xl',
          fontWeight: 'bold',
          color: 'black',
          marginBottom: '8px',
        })}
      >
        Welcome Back
      </Heading>
      <Paragraph color="tertiary" textAlign="center" size="base">
        Sign in to your Square account to continue
      </Paragraph>
    </Box>
  )
}
