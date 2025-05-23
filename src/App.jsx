import React from 'react'
import { RouterProvider, createBrowserRouter, Outlet, Navigate } from 'react-router-dom'
import Home from './home/Home.jsx'
import Dashboard from './dashboard/Dashboard'
import SignInPage from './auth/sign-in/index.jsx'
import EditResume from './dashboard/resume/[resumeId]/edit/EditResume.jsx'
import ViewResume from './my-resume/[resumeId]/view/ViewResume.jsx'
import { useUser } from '@clerk/clerk-react'
import Header from './components/customs/Header'
import { Toaster } from './components/ui/sonner'

function RequireAuth() {
  const { isLoaded, isSignedIn } = useUser();
  if (!isSignedIn && isLoaded) return <Navigate to="/auth/sign-in" />;
  return <Outlet />;
}

function Layout() {
  return (
    <>
      <Header />
      <Outlet />
      <Toaster />
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />, // This ensures Header + Toaster are inside the router context
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        element: <RequireAuth />,
        children: [
          {
            path: '/dashboard',
            element: <Dashboard />
          },
          {
            path: '/dashboard/resume/:resumeId/edit',
            element: <EditResume />
          },
          {
            path: '/my-resume/:resumeId/view',
            element: <ViewResume />
          }
        ]
      }
    ]
  },
  {
    path: '/auth/sign-in',
    element: <SignInPage />
  }
]);

export default function App() {
  return <RouterProvider router={router} />
}
