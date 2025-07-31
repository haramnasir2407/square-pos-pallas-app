import { Button } from '@/components/primitives/ui/button'
import { css } from '~/styled-system/css'

export const ButtonComponent = ({
  children,
  onClick,
  bg,
  color,
  hover,
  cursor,
  disabled,
}: {
  children: React.ReactNode
  onClick: () => void
  disabled?: boolean
  bg?: string
  color?: string
  hover?: { bg: string }
  cursor?: string
}) => {
  return (
    <Button
      variant="primary"
      size="lg"
      width="full"
      className={css({
        p: 'padding.block.sm',
        bg: bg,
        color: color,
        borderRadius: 'md',
        fontWeight: 'medium',
        fontSize: 'md',
        width: '100%',
        _hover: disabled ? undefined : hover,
        cursor: disabled ? 'not-allowed' : cursor,
      })}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </Button>
  )
}
