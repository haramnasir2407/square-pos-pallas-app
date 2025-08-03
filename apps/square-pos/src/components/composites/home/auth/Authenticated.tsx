import { ButtonVariant } from '@/components/primitives/derived/Button'
import type { Session } from 'next-auth'
import { css } from '~/styled-system/css'
import { Box, Flex } from '~/styled-system/jsx'
import { authSuccessIcon, authSuccessIconWrapper, authUserInitial } from './styles/styles'
import { Heading, Paragraph } from '@/components/primitives/ui/typography'
import { signOut } from 'next-auth/react'
import { circle } from '~/styled-system/patterns'

type sessionProps = {
  session: Session
}

export default function Authenticated({ session }: sessionProps) {
  return (
    <Flex
      minH="100vh"
      align="center"
      justify="center"
      bg="linear-gradient(to bottom right, #f0fdf4, #d1fae5)"
      p="16px"
    >
      <Flex direction="column" gap="layout.default.md" maxW="lg" w="100%">
        <Box
          className={css({
            textAlign: 'center',
          })}
        >
          <Flex
            align="center"
            justify="center"
            mb="gap.component.md"
            h="64px"
            w="64px"
            bg="#dcfce7"
            className={authSuccessIconWrapper}
          >
            <svg className={authSuccessIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <title>Success checkmark</title>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </Flex>
          <Heading
            color="default"
            className={css({
              fontSize: '3xl',
              fontWeight: 'bold',
              mb: 'gap.component.sm',
            })}
          >
            Already Signed In
          </Heading>
          <Paragraph textAlign="center" color="tertiary">
            You are currently signed in as:
          </Paragraph>
        </Box>

        <Box
          className={css({
            bgColor: 'white',
            rounded: 'xl',
            boxShadow: 'md',
            border: '1px solid #e5e7eb',
            py: 'gap.component.md',
            px: 'padding.inline.lg',
          })}
        >
          <Flex align="center" gap="gap.component.sm" mb="gap.component.sm">
            <Box
              className={circle({
                size: '10',
                bg: '#dbeafe',
              })}
            >
              <span className={authUserInitial}>{session.user?.name?.charAt(0) || 'U'}</span>
            </Box>
            <Box>
              <Paragraph className={css({ fontWeight: 'medium' })} color="default">
                {session.user?.name === 'Default Test Account' ? 'Haram Nasir' : session.user?.name}
              </Paragraph>
              {session.merchantId && (
                <Paragraph className={css({ fontWeight: 'base' })} color="tertiary">
                  Merchant ID: {session.merchantId}
                </Paragraph>
              )}
            </Box>
          </Flex>
        </Box>

        <Flex direction="column" gap="gap.component.sm">
          <ButtonVariant
            onClick={() => {
              window.location.href = '/dashboard'
            }}
            variant="primary"
          >
            Go to Dashboard
          </ButtonVariant>

          <ButtonVariant variant="outlined" onClick={() => signOut()} bg="white">
            Sign out
          </ButtonVariant>
        </Flex>
      </Flex>
    </Flex>
  )
}
