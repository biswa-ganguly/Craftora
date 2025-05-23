import React from 'react';

function SkillsPreview({ resumeInfo }) {
  return (
    <div className="my-6 text-sm">
      <h2
        className="text-center font-bold text-lg uppercase tracking-wide mb-4"
        style={{ color: resumeInfo?.themeColor }}
      >
      </h2>

      <div className="flex flex-wrap gap-3 justify-cent">
        {resumeInfo?.skills?.map((skill, index) => (
          <span
            key={index}
            className="px-3 py-1 text-xs font-medium border rounded-full"
            style={{
              borderColor: resumeInfo?.themeColor,
              color: resumeInfo?.themeColor,
            }}
          >
            {skill.name}
          </span>
        ))}
      </div>
    </div>
  );
}

export default SkillsPreview;
