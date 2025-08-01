import Authenticated from '@/components/composites/home/auth/Authenticated'
import AuthenticationProcessor from '@/components/composites/home/auth/AuthenticationProcessor'

import SignInText from '@/components/composites/home/signin/SignInText'
import ErrorComponent from '@/components/primitives/derived/ErrorComponent'
import HomeLoader from '@/components/primitives/derived/HomeLoader'
import type { SignInPageUIProps } from '@/shared/types/catalog'
import Link from 'next/link'
import { Box, Flex } from '~/styled-system/jsx'
import { css } from '../../../../../styled-system/css'
import { ButtonComponent } from '@/components/primitives/derived/Button'
import { startSquareOAuth } from '@/shared/utils/auth/startOAuth'
import { token } from '~/styled-system/tokens'

export default function SignInPageUI({
  session,
  status,
  isProcessing,
  error,
  hasOAuthCode,
}: SignInPageUIProps) {
  if (status === 'loading') {
    return <HomeLoader />
  }

  if (session && !hasOAuthCode && !isProcessing) {
    return <Authenticated session={session} />
  }

  if (isProcessing) {
    return <AuthenticationProcessor />
  }

  return (
    !isProcessing && (
      <Flex
        align="center"
        justify="center"
        minH="100vh"
        bg="linear-gradient(to bottom right, #eff6ff, #e0e7ff, #f3e8ff)"
      >
        <Box
          className={css({
            bg: 'white',
            rounded: 'xl',
            shadow: 'md',
            p: 'layout.default.sm',
            maxW: '450px',
          })}
        >
          <SignInText />

          {error && <ErrorComponent error={error} />}

          {/* Sign in button */}
          <ButtonComponent
            bg={`linear-gradient(to right, ${token('colors.blue.50')}, ${token('colors.purple.50')})`}
            hover={{
              bg: `linear-gradient(to right, ${token('colors.blue.100')}, ${token('colors.purple.100')})`,
              transform: 'scale(1.02)',
            }}
            color="white"
            cursor="pointer"
            onClick={startSquareOAuth}
          >
            Sign in with Square
          </ButtonComponent>

          <Box
            className={css({
              mt: 'layout.section.sm',
              textAlign: 'center',
            })}
          >
            <p
              className={css({
                fontSize: 'sm',
                color: 'text.tertiary',
              })}
            >
              By signing in, you agree to our{' '}
              <Link
                href="/terms"
                className={css({
                  color: { base: token('colors.blue.50'), _hover: token('colors.blue.100') },
                  fontWeight: 'medium',
                })}
              >
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link
                href="/policy"
                className={css({
                  color: { base: token('colors.blue.50'), _hover: token('colors.blue.100') },
                  fontWeight: 'medium',
                })}
              >
                Privacy Policy
              </Link>
            </p>
          </Box>
        </Box>
      </Flex>
    )
  )
}
