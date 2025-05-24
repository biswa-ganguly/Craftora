import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'
import { UserButton, useUser } from '@clerk/clerk-react'

function Header() {
  const { user, isSignedIn } = useUser();

  return (
    <header className="bg-primary font-roboto backdrop-blur-2xl dark:bg-background border-b border-white/20 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        
        {/* Logo */}
        <Link to="/" className="flex items-center rounded-2xl gap-2">
          <img
            src="/logo.png"
            alt="Craftora Logo"
            className="w-28 h-14 object-contain "
          />
        </Link>

        {/* Right side: Button or User */}
        <div className="flex items-center gap-4">
          {isSignedIn ? (
            <>
              <Link to="/dashboard">
                <Button variant="ghost" className="text-base bg-accent font-medium hover:scale-105 transition delay-75">
                  Dashboard
                </Button>
              </Link>
              <UserButton
                appearance={{
                  elements: {
                    userButtonAvatarBox: "rounded-full w-10 h-10 ring-2 ring-primary",
                  },
                }}
              />
            </>
          ) : (
            <Link to="/auth/sign-in">
              <Button variant="ghost" className="text-base bg-accent font-medium hover:scale-105 transition delay-75">
                Go to Dashboard
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
