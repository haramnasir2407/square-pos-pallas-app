'use client'

import useSignInPageLogic from './useSignInPage'
import SignInPageUI from '@/components/composites/home/signin/SignInPageUI'

export default function SignInContainer() {
  const logic = useSignInPageLogic()
  return <SignInPageUI {...logic} />
}
