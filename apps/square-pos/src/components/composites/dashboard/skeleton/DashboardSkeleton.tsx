import { Skeleton } from '@/components/primitives/ui/skeleton'
import { css } from '~/styled-system/css'
import { Box, Container } from '~/styled-system/jsx'
import { center, container, flex } from '~/styled-system/patterns'
import ProductSectionSkeleton from '../products/skeletons/ProductSectionSkeleton'

export default function DashboardSkeleton() {
  return (
    <Box className={css({ minH: '100vh' })}>
      <Skeleton className={css({ py: 'padding.block.lg', mb: '8' })}>
        <Container>
          <Skeleton
            css={{
              h: '32px',
              borderRadius: 'lg',
              mb: '2',
              width: '5%',
            }}
          />
        </Container>
      </Skeleton>
      <Box
        className={flex({
          direction: 'column',
          mb: '2',
          alignItems: 'center',
          justifyContent: 'center',
        })}
      >
        <Skeleton
          className={css({
            w: '96',
            h: '10',
            borderRadius: 'md',
          })}
        />
        <Skeleton
          className={css({
            mt: '2',
            w: '3xl',
            h: '10',
            borderRadius: 'md',
          })}
        />
      </Box>
      <main className={css({ py: '8', mt: '2' })}>
        <div className={center({ maxW: '6xl', mx: 'auto' })}>
          <ProductSectionSkeleton />
        </div>
      </main>
    </Box>
  )
}
