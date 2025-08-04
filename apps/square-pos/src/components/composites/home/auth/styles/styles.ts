import { css } from '~/styled-system/css'
import { flex } from '~/styled-system/patterns'

// Centered section
export const authCenterSection = css({
  textAlign: 'center',
})

// Success icon wrapper
export const authSuccessIconWrapper = css({
  margin: '0 auto',
  borderRadius: '50%',
})

// Success icon SVG
export const authSuccessIcon = css({
  height: '32px',
  width: '32px',
  color: '#16a34a',
})

// Heading
export const authHeading = css({
  fontSize: '30px',
  fontWeight: '700',
  color: '#111827',
  marginBottom: '8px',
})

// Subtext
export const authSubtext = css({
  color: '#6b7280',
})

// Info card
export const authInfoCard = css({
  backgroundColor: 'white',
  borderRadius: '12px',
  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
  border: '1px solid #e5e7eb',
  padding: '24px',
})

// User avatar
export const authUserAvatar = css({
  height: '40px',
  width: '40px',
  backgroundColor: '#dbeafe',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})

// User initial
export const authUserInitial = css({
  color: '#2563eb',
  fontWeight: '600',
  fontSize: '18px',
})

// User name
export const authUserName = css({
  fontWeight: '600',
  color: '#111827',
})

// Merchant ID
export const authMerchantId = css({
  fontSize: '14px',
  color: '#6b7280',
})
