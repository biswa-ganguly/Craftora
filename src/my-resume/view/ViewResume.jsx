import { Button } from '@/components/ui/button'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import ResumePreview from '@/dashboard/resume/components/ResumePreview'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import GlobalApi from '../../../service/GlobalApi'
import { RWebShare } from 'react-web-share'
import Header from '@/components/customs/Header'
import { Download, Share2 } from 'lucide-react'

function ViewResume() {
  const [resumeInfo, setResumeInfo] = useState()
  const { resumeId } = useParams()

  useEffect(() => {
    GetResumeInfo()
  }, [])

  const GetResumeInfo = () => {
    GlobalApi.GetResumeById(resumeId).then((resp) => {
      setResumeInfo(resp.data.data)
    })
  }

  const HandleDownload = () => {
    window.print()
  }

  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
      <div id="no-print">
        <Header />

        <div className="my-10 font-roboto mx-6 md:mx-16 lg:mx-36 text-center">
          <h2 className="text-3xl font-bold text-gray-800">
            🎉 Your AI-Generated Resume is Ready!
          </h2>
          <p className="text-gray-500 mt-2">
            Download your polished resume or share it instantly with a unique link.
          </p>
          

          <div className="flex flex-col md:flex-row justify-center md:justify-center gap-4 mt-8">
            <Button
              onClick={HandleDownload}
              className="flex items-center gap-2 px-6 py-2 rounded-full shadow-md hover:bg-primary/90"
            >
              <Download className="w-4 h-4" />
              Download
            </Button>

            <RWebShare
              data={{
                text: "Hello Everyone, This is my resume. Check it out!",
                url: import.meta.env.VITE_BASE_URL + "/my-resume/" + resumeId + "/view",
                title: `${resumeInfo?.firstName} ${resumeInfo?.lastName}'s Resume`,
              }}
              onClick={() => console.log('shared successfully!')}
            >
              <Button
                className="flex items-center gap-2 px-6 py-2 rounded-full shadow-md bg-muted text-muted-foreground hover:bg-muted/80"
              >
                <Share2 className="w-4 h-4" />
                Share
              </Button>
            </RWebShare>
          </div>
        </div>
      </div>

      <div className="my-10 mx-6 md:mx-16 lg:mx-36 bg-white p-6 rounded-xl shadow-lg border" id="print-area">
        <ResumePreview />
      </div>
    </ResumeInfoContext.Provider>
  )
}

export default ViewResume
