import { Button } from '../ui/button'
import { Box, Flex } from '~/styled-system/jsx'
import { Paragraph } from '../ui/typography'
import { errorBox, errorButton, errorIcon } from './styles/styles'

export default function ErrorComponent({ error }: ErrorProps) {
  return (
    <Box className={errorBox}>
      <Flex align="center" justify="center" gap="gap.component.sm">
        <svg className={errorIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <title>Error icon</title>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <Paragraph color="error" size="compact">
          {error}&nbsp;
          <Button
            variant="text"
            size="sm"
            className={errorButton}
            onClick={() => {
              window.location.href = '/signin'
            }}
          >
            Try again
          </Button>
        </Paragraph>
      </Flex>
    </Box>
  )
}
