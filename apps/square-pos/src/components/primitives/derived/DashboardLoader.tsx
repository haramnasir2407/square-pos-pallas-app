import { css } from '~/styled-system/css'
import { Flex } from '~/styled-system/jsx'
import { Spinner } from '../ui/spinner'

export default function DashboardLoader() {
  return (
    <Flex minH="30vh" align="center" justify="center">
      <Flex
        align="center"
        direction="column"
        gap="layout.section.md"
        className={css({
          textAlign: 'center',
        })}
      >
        <Spinner
          size="lg"
          variant="default"
          color="default"
          className={css({ margin: '0 auto', border: '4px solid rgb(39, 39, 39)' })}
        />
        <p
          className={css({
            fontSize: 'xl',
            fontWeight: 'medium',
            color: '#374151',
          })}
        >
          Loading...
        </p>
      </Flex>
    </Flex>
  )
}
