import React, { useContext } from 'react';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import PersonalDetailPreview from './preview/PersonalDetailPreview';
import SummeryPreview from './preview/SummeryPreview';
import ExperiencePreview from './preview/ExperiencePreview';
import EducationalPreview from './preview/EducationalPreview';
import SkillsPreview from './preview/SkillsPreview';

function ResumePreview() {
  const { resumeInfo } = useContext(ResumeInfoContext);

  return (
    <div
      className="max-w-3xl mx-auto bg-white p-10 text-gray-900 font-serif shadow-lg print:shadow-none print:p-0"
      style={{ borderTop: `8px solid ${resumeInfo?.themeColor || '#000'}` }}
    >
      {/* Personal Detail Section */}
      <section className="mb-10">
        <PersonalDetailPreview resumeInfo={resumeInfo} />
      </section>

      {/* Summary Section */}
      <section className="mb-10">
        <SectionHeader title="Summary" color={resumeInfo?.themeColor} />
        <SummeryPreview resumeInfo={resumeInfo} />
      </section>

      {/* Experience Section */}
      {resumeInfo?.Experience?.length > 0 && (
        <section className="mb-10">
          <SectionHeader title="Professional Experience" color={resumeInfo?.themeColor} />
          <ExperiencePreview resumeInfo={resumeInfo} />
        </section>
      )}

      {/* Education Section */}
      {resumeInfo?.education?.length > 0 && (
        <section className="mb-10">
          <SectionHeader title="Education" color={resumeInfo?.themeColor} />
          <EducationalPreview resumeInfo={resumeInfo} />
        </section>
      )}

      {/* Skills Section */}
      {resumeInfo?.skills?.length > 0 && (
        <section className="mb-10">
          <SectionHeader title="Skills" color={resumeInfo?.themeColor} />
          <SkillsPreview resumeInfo={resumeInfo} />
        </section>
      )}
    </div>
  );
}

// Reusable Section Header component for consistent styling
function SectionHeader({ title, color }) {
  return (
    <h2
      className="text-xl font-bold border-b-2 pb-1 mb-6"
      style={{ borderColor: color || '#000' }}
    >
      {title}
    </h2>
  );
}

export default ResumePreview;
