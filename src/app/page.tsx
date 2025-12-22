import React from 'react'
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <div className="m-10">
      {/* <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn> */}

      <h1 className="text-3xl font-bold underline">Hello, Clerk!</h1>
      <SignInButton>
        <Button>
          log in
        </Button>
      </SignInButton>
    </div>
  )
}
