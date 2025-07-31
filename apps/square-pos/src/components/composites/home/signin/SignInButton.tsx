import { Button } from '@/components/primitives/ui/button'
import { startSquareOAuth } from '@/shared/utils/auth/startOAuth'
import { PiSignInBold } from 'react-icons/pi'
import { css } from '~/styled-system/css'
import { Flex } from '~/styled-system/jsx'

export default function SignInButton() {
  return (
    <Button
      variant="primary"
      size="lg"
      width="full"
      shape="default"
      className={css({
        bg: {
          base: 'linear-gradient(to right, #2563eb, #4f46e5)', // ? make tokens
          _hover: 'linear-gradient(to right, #1d4ed8, #4338ca)',
        },
        color: 'white',
        _hover: {
          transform: 'scale(1.02)',
        },
      })}
      onClick={startSquareOAuth}
    >
      <Flex gap="gap.inline.sm" align="center" justify="center">
        <PiSignInBold size={20} />
        <span className={css({ fontWeight: 'medium' })}>Sign in with Square</span>
      </Flex>
    </Button>
  )
}
