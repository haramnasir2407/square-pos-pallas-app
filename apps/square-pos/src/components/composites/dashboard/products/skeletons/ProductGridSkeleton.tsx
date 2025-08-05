import { Skeleton } from '@/components/primitives/ui/skeleton'
import { css } from '~/styled-system/css'
import { Box, Grid } from '~/styled-system/jsx'

export default function ProductGridSkeleton() {
  return (
    <Box className={css({ w: 'full', mt: '2' })}>
      {/* Product grid skeleton */}
      <Grid
        gap="gap.component.sm"
        w="full"
        className={css({
          gridTemplateColumns: ['1fr', 'repeat(2, 1fr)', 'repeat(3, 1fr)'], // responsive: 1/2/3 columns
        })}
      >
        {Array.from({ length: 12 }).map((_, i) => (
          <Skeleton
            key={i}
            className={css({
              h: '64',
              borderRadius: 'lg',
              w: '64',
            })}
          />
        ))}
      </Grid>
    </Box>
  )
}
