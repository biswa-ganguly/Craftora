import React from 'react'
import { Github, Linkedin } from 'lucide-react'

function PersonalDetailPreview({ resumeInfo }) {
  return (
    <div>
      <h2
        className='font-bold text-xl text-center'
        style={{
          color: resumeInfo?.themeColor
        }}
      >
        {resumeInfo?.firstName} {resumeInfo?.lastName}
      </h2>

      <h2 className='text-center text-sm font-medium'>
        {resumeInfo?.jobTitle}
      </h2>

      <h2
        className='text-center font-normal text-xs'
        style={{
          color: resumeInfo?.themeColor
        }}
      >
        {resumeInfo?.address}
      </h2>

      <div className='flex justify-between text-xs font-normal mt-1'>
        <span style={{ color: resumeInfo?.themeColor }}>
          {resumeInfo?.phone}
        </span>
        <span style={{ color: resumeInfo?.themeColor }}>
          {resumeInfo?.email}
        </span>
      </div>

      {(resumeInfo?.gitHub || resumeInfo?.linkedIn) && (
        <div className='flex justify-center gap-4 mt-2'>
          {resumeInfo?.gitHub && (
            <a
              href={resumeInfo.gitHub}
              target='_blank'
              rel='noopener noreferrer'
              className='flex items-center gap-1 text-xs underline'
              style={{ color: resumeInfo?.themeColor }}
            >
              <Github size={12} />
              GitHub
            </a>
          )}
          {resumeInfo?.linkedIn && (
            <a
              href={resumeInfo.linkedIn}
              target='_blank'
              rel='noopener noreferrer'
              className='flex items-center gap-1 text-xs underline'
              style={{ color: resumeInfo?.themeColor }}
            >
              <Linkedin size={12} />
              LinkedIn
            </a>
          )}
        </div>
      )}

      <hr
        className='border-[1.5px] my-2'
        style={{
          borderColor: resumeInfo?.themeColor
        }}
      />
    </div>
  )
}

export default PersonalDetailPreview
