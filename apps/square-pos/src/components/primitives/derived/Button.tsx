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
  hover?: { bg: string; transform?: string }
  cursor?: string
}) => {
  return (
    <Button
      variant="default"
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
        _hover: {
          bg: hover?.bg,
          transform: hover?.transform,
        },
        cursor: disabled ? 'not-allowed' : cursor,
        transition: 'all 0.2s',
      })}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </Button>
  )
}
