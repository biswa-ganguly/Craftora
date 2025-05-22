import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'
import { UserButton, useUser } from '@clerk/clerk-react'

function Header() {
  const { user, isSignedIn } = useUser();

  return (
<header className="bg-primary backdrop-blur-2xl dark:bg-background/40 border-b border-white/20 shadow-md sticky top-0 z-50">

      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        
        {/* Logo */}
        <Link to="/dashboard" className="flex items-center rounded-2xl gap-2">
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
                <Button variant="ghost" className="text-base bg-primary-foreground  font-medium hover:text-primary transition-colors">
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
              <Button className="px-5 py-2 text-base font-semibold shadow-md hover:shadow-lg transition-all">
                Dashboard
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
