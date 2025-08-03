import { Button } from '@/components/primitives/ui/button'
import { css } from '~/styled-system/css'

export const ButtonVariant = ({
  children,
  onClick,
  variant,
  bg,
  hover,
  disabled,
  className,
}: {
  children: React.ReactNode
  onClick: () => void
  variant?: 'default' | 'outlined' | 'primary'
  disabled?: boolean
  bg?: string
  hover?: { bg: string; transform?: string }
  className?: string
}) => {
  return (
    <Button
      variant={variant}
      size="lg"
      width="full"
      className={
        className
          ? className
          : css({
              bg: bg,
              fontWeight: 'medium',
              fontSize: 'md',
              width: '100%',
              _hover: {
                bg: hover?.bg,
                transform: hover?.transform || 'scale(1.02)',
              },
              cursor: disabled ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s',
            })
      }
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </Button>
  )
}
