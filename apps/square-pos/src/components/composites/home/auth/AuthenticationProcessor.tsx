import { Spinner } from '@/components/primitives/ui/spinner'
import { Spinnaker } from 'next/font/google'
import { css } from '~/styled-system/css'
import { Box, Flex } from '~/styled-system/jsx'

export default function AuthenticationProcessor() {
  return (
    <Flex
      minH="100vh"
      align="center"
      justify="center"
      className={css({
        background: 'linear-gradient(to bottom right, #eff6ff, #e0e7ff)',
      })}
    >
      <Flex
        align="center"
        justify="center"
        direction="column"
        gap="gap.component.lg"
        className={css({
          textAlign: 'center',
        })}
      >
        <Box
          className={css({
            position: 'relative',
          })}
        >
          <Spinner
            size="lg"
            variant="default"
            color="primary"
            className={css({ margin: '0 auto' })}
          />
        </Box>
        <Box>
          <p
            className={css({
              fontSize: 'lg',
              fontWeight: 'bold',
              color: '#1f2937',
              marginBottom: 'gap.block.xs',
            })}
          >
            Processing Authentication
          </p>
          <p
            className={css({
              color: '#6b7280',
            })}
          >
            Please wait while we complete your sign-in...
          </p>
        </Box>
      </Flex>
    </Flex>
  )
}
