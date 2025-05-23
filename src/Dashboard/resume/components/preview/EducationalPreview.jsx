import React from 'react';

function EducationalPreview({ resumeInfo }) {
  return (
    <div className="my-6 text-sm">
      <h2
        className="text-center font-bold text-lg uppercase tracking-wide mb-4"
        style={{ color: resumeInfo?.themeColor }}
      >
      </h2>

      {resumeInfo?.education?.map((education, index) => (
        <div key={index} className="mb-6">
          <div className="flex justify-between items-center">
            <h3
              className="font-semibold text-base"
              style={{ color: resumeInfo?.themeColor }}
            >
              {education.universityName}
            </h3>
            <span className="text-xs text-gray-500">
              {education.startDate} - {education.endDate}
            </span>
          </div>

          <div className="flex justify-between text-xs text-gray-700 mt-1 italic">
            <span>{education.degree} in {education.major}</span>
          </div>

          {education.description && (
            <p className="text-xs text-gray-600 mt-2 leading-relaxed">
              {education.description}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

export default EducationalPreview;
