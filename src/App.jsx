import React from 'react'
import { Button } from './components/ui/button'
import Home from './Home'
import { Navigate, Outlet } from 'react-router-dom'
import { useUser } from '@clerk/clerk-react';

function App() {

  const {user,isLoaded,isSignedIn}=useUser();

  if(!isSignedIn&&isLoaded)
  {
    return <Navigate to={'/auth/sign-in'} />
  }

  return (
    <div className=' text-center '>
      <Outlet/>
    </div>
  )
}

export default App