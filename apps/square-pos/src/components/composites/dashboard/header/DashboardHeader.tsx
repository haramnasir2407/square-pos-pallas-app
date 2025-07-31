import { css } from '~/styled-system/css'
import { DashboardSignOutButton } from '../signout/DashboardSignOutButton'
import { container } from '~/styled-system/patterns'
import { Container, Flex } from '~/styled-system/jsx'

export default function DashboardHeader({ user }: { user: string }) {
  return (
    <header
      className={css({
        bg: 'white',
        py: 'padding.block.lg',
        shadow: 'sm',
      })}
    >
      <Container>
        <Flex justify="between" align="center" gap="gap.inline.sm">
          <h1
            className={css({
              fontSize: 'md',
              fontWeight: 'normal',
              color: 'black',
            })}
          >
            {user === 'Default Test Account' ? 'Haram Nasir' : null}
          </h1>
          <DashboardSignOutButton />
        </Flex>
      </Container>
    </header>
  )
}
