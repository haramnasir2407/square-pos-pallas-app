import Authenticated from '@/components/composites/home/auth/Authenticated'
import AuthenticationProcessor from '@/components/composites/home/auth/AuthenticationProcessor'
import SignInButton from '@/components/composites/home/signin/SignInButton'
import SignInText from '@/components/composites/home/signin/SignInText'
import ErrorComponent from '@/components/primitives/derived/ErrorComponent'
import HomeLoader from '@/components/primitives/derived/HomeLoader'
import type { SignInPageUIProps } from '@/shared/types/catalog'
import { css } from '../../../../../styled-system/css'
import { Box, Flex } from '~/styled-system/jsx'
import Link from 'next/link'

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

          <SignInButton />

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
                  color: { base: '#2563eb', _hover: '#1d4ed8' },
                  fontWeight: 'medium',
                })}
              >
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link
                href="/policy"
                className={css({
                  color: { base: '#2563eb', _hover: '#1d4ed8' },
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
