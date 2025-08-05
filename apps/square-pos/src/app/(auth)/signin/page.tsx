'use client'

import HomeLoader from '@/components/composites/home/loader/HomeLoader'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'

const SignInContainer = dynamic(() => import('@/containers/signin/SignInContainer'), {
  ssr: false,
})

export default function SignInPage() {
  return (
    <Suspense fallback={<HomeLoader />}>
      <SignInContainer />
    </Suspense>
  )
}
