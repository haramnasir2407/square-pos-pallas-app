import { Skeleton } from '@/components/primitives/ui/skeleton'
import { css } from '~/styled-system/css'
import { Box, Flex, VStack } from '~/styled-system/jsx'
import ProductGridSkeleton from './ProductGridSkeleton'

export default function ProductSectionSkeleton() {
  return (
    <VStack>
      <Box className={css({ w: 'full', mt: '6' })}>
        {/* Search bar skeleton */}
        <Flex
          align="center"
          justify="center"
          gap="8"
          className={css({
            mb: '6',
            width: '100%',
          })}
        >
          <Skeleton
            className={css({
              w: '20',
              h: '10',
              borderRadius: 'md',
            })}
          />
          <Skeleton
            className={css({
              w: '64',
              h: '10',
              borderRadius: 'md',
            })}
          />
        </Flex>

        <ProductGridSkeleton />
      </Box>
    </VStack>
  )
}
