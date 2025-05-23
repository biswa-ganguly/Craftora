import React, { useEffect, useState } from 'react'
import AddResume from './components/AddResume'
import { useUser } from '@clerk/clerk-react'
import GlobalApi from '../../service/GlobalApi'
import ResumeCardItem from './components/ResumeCardItem'

function Dashboard() {
  const { user } = useUser()
  const [resumeList, setResumeList] = useState([])

  useEffect(() => {
    user && GetResumesList()
  }, [user])

  const GetResumesList = () => {
    GlobalApi.GetUserResumes(user?.primaryEmailAddress?.emailAddress).then((resp) => {
      setResumeList(resp.data.data)
    })
  }

  return (
    <div className="p-6 md:px-16 font-roboto lg:px-32 bg-background text-foreground min-h-screen">
      
      {/* Welcome Header */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight mb-2">
          Welcome{user?.firstName ? `, ${user.firstName}` : ''} 👋
        </h1>
        <p className="text-muted-foreground text-base max-w-xl mx-auto">
          Your AI-crafted resumes live here. Create, edit, and share professional resumes with ease.
        </p>
      </div>

      {/* Section Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">My Resumes</h2>
        <p className="text-sm text-muted-foreground">
          Start crafting a tailored resume for your next opportunity.
        </p>
      </div>

      {/* Resume Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        <AddResume />
        {resumeList.length > 0 ? (
          resumeList.map((resume) => (
            <ResumeCardItem
              resume={resume}
              key={resume.id}
              refreshData={GetResumesList}
            />
          ))
        ) : (
          Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="h-[280px] rounded-lg bg-muted animate-pulse"></div>
          ))
        )}
      </div>

      {/* Appreciation Note */}
      <div className="mt-16 text-center text-sm text-muted-foreground">
        ❤️ Thank you for choosing <span className="font-medium text-primary">Craftora</span> to build your career.
      </div>
    </div>
  )
}

export default Dashboard
