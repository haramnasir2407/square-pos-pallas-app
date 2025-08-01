import { css } from '~/styled-system/css'
import { Spinner } from '../ui/spinner'
import { Flex } from '~/styled-system/jsx'

export default function HomeLoader() {
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
        gap="gap.block.sm"
        className={css({
          textAlign: 'center',
        })}
      >
        <Spinner
          size="lg"
          variant="default"
          color="primary"
          className={css({ margin: '0 auto' })}
        />
        <p
          className={css({
            fontSize: 'md',
            fontWeight: 'medium',
            color: 'gray.700',
          })}
        >
          Loading...
        </p>
      </Flex>
    </Flex>
  )
}
