import React from 'react'
import { Button } from './components/ui/button'
import Home from './Home'
import { Outlet } from 'react-router-dom'

function App() {
  return (
    <div className=' text-center '>
      <Outlet/>
    </div>
  )
}

export default App