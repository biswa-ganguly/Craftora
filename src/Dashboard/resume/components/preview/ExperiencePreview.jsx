import React from 'react';

function ExperiencePreview({ resumeInfo }) {
  const themeColor = resumeInfo?.themeColor || '#000';

  return (
    <div className="my-6">
      {resumeInfo?.Experience?.map((experience, index) => (
        <div key={index} className="mb-6">
          {/* Job Title and Duration */}
          <div className="flex justify-between items-start">
            <h3 className="text-base font-semibold" style={{ color: themeColor }}>
              {experience?.title}
            </h3>
            <span className="text-xs text-gray-700 italic">
              {experience?.startDate} – {experience?.currentlyWorking ? 'Present' : experience?.endDate}
            </span>
          </div>

          {/* Company Info */}
          <p className="text-sm text-gray-800 mb-1">
            {experience?.companyName}, {experience?.city}, {experience?.state}
          </p>

          {/* Work Summary / Responsibilities */}
          <div
            className="text-sm text-gray-700 leading-relaxed ml-4 list-disc [&>ul]:list-disc [&>ul]:ml-4 [&>li]:mb-1"
            dangerouslySetInnerHTML={{ __html: experience?.workSummery }}
          />
        </div>
      ))}
    </div>
  );
}

export default ExperiencePreview;
