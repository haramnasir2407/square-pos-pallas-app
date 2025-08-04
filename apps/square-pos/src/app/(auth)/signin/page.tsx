'use client'

import HomeLoader from '@/components/primitives/derived/HomeLoader'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import useSignInPage from '../../../shared/hooks/useSignInPage'

// * this way the client coomponent wont be ssr'ed, perform lazy loading using dynamic import (prevents hydration error)
const SignInPageUI = dynamic(() => import('@/components/composites/home/signin/SignInPageUI'), {
  ssr: false,
})

function SignInPageContent() {
  const logic = useSignInPage()
  return <SignInPageUI {...logic} />
}

export default function SignInPage() {
  return (
    <Suspense fallback={<HomeLoader />}>
      <SignInPageContent />
    </Suspense>
  )
}
