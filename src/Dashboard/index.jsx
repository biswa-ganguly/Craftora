import React, { useEffect, useState } from 'react'
import AddResume from './components/AddResume'
import { useUser } from '@clerk/clerk-react'
import GlobalApi from './../../service/GlobalApi';
import ResumeCardItem from './components/ResumeCardItem';

function Dashboard() {
  const { user } = useUser();
  const [resumeList, setResumeList] = useState([]);

  useEffect(() => {
    user && GetResumesList();
  }, [user]);

  const GetResumesList = () => {
    GlobalApi.GetUserResumes(user?.primaryEmailAddress?.emailAddress)
      .then(resp => {
        setResumeList(resp.data.data);
      });
  };

  return (
    <div className='p-6 md:px-16 lg:px-32'>
      <h2 className='font-bold text-3xl'>My Resume</h2>
      
      {/* ✅ Welcome message */}
      {user && (
        <div className='mt-2 text-gray-700'>
          <p className='text-lg'>
            Welcome back, <span className='font-semibold'>{user.firstName || user.username}!</span>
          </p>
        </div>
      )}

      <p className='text-sm text-gray-500 mt-1'>
        Start creating AI-powered resumes tailored for your next job role.
      </p>

      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 mt-10'>
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
          [1, 2, 3, 4].map((item, index) => (
            <div key={index} className='h-[280px] rounded-lg bg-slate-200 animate-pulse'></div>
          ))
        )}
      </div>
    </div>
  );
}

export default Dashboard;
