import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { useContext, useEffect, useState } from 'react'
import RichTextEditor from '../RichTextEditor'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { useParams } from 'react-router-dom'
import GlobalApi from './../../../../../service/GlobalApi'
import { toast } from 'sonner'
import { LoaderCircle } from 'lucide-react'

const emptyExperience = {
  title: '',
  companyName: '',
  city: '',
  state: '',
  startDate: '',
  endDate: '',
  workSummery: '',
}

function Experience() {
  const [experinceList, setExperinceList] = useState([]);
  const { resumeInfo } = useContext(ResumeInfoContext);
  const params = useParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (Array.isArray(resumeInfo?.experience) && resumeInfo.experience.length > 0) {
      setExperinceList(resumeInfo.experience);
    }
  }, [resumeInfo]);

  const handleChange = (index, event) => {
    const { name, value } = event.target;
    setExperinceList(prev =>
      prev.map((item, i) =>
        i === index ? { ...item, [name]: value } : item
      )
    );
  }

  const handleRichTextEditor = (e, name, index) => {
    const value = e.target.value;
    setExperinceList(prev =>
      prev.map((item, i) =>
        i === index ? { ...item, [name]: value } : item
      )
    );
  }

  const AddNewExperience = () => {
    setExperinceList(prev => [...prev, { ...emptyExperience }]);
  }

  const RemoveExperience = () => {
    setExperinceList(prev => prev.slice(0, -1));
  }

  const onSave = () => {
    setLoading(true);
    const data = {
      data: {
        experience: experinceList.map(({ id, ...rest }) => rest),
      },
    };

    GlobalApi.UpdateResumeDetail(params?.resumeId, data)
      .then(res => {
        setLoading(false);
        toast('Details updated !');
      })
      .catch(() => {
        setLoading(false);
      });
  }

  return (
    <div>
      <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
        <h2 className="font-bold text-lg">Professional Experience</h2>
        <p>Add Your previous Job experience</p>
        <div>
          {experinceList.map((item, index) => (
            <div key={index}>
              <div className="grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg">
                <div>
                  <label className="text-xs">Position Title</label>
                  <Input
                    name="title"
                    onChange={(event) => handleChange(index, event)}
                    value={item.title}
                  />
                </div>
                <div>
                  <label className="text-xs">Company Name</label>
                  <Input
                    name="companyName"
                    onChange={(event) => handleChange(index, event)}
                    value={item.companyName}
                  />
                </div>
                <div>
                  <label className="text-xs">City</label>
                  <Input
                    name="city"
                    onChange={(event) => handleChange(index, event)}
                    value={item.city}
                  />
                </div>
                <div>
                  <label className="text-xs">State</label>
                  <Input
                    name="state"
                    onChange={(event) => handleChange(index, event)}
                    value={item.state}
                  />
                </div>
                <div>
                  <label className="text-xs">Start Date</label>
                  <Input
                    type="date"
                    name="startDate"
                    onChange={(event) => handleChange(index, event)}
                    value={item.startDate}
                  />
                </div>
                <div>
                  <label className="text-xs">End Date</label>
                  <Input
                    type="date"
                    name="endDate"
                    onChange={(event) => handleChange(index, event)}
                    value={item.endDate}
                  />
                </div>
                <div className="col-span-2">
                  <RichTextEditor
                    index={index}
                    defaultValue={item.workSummery}
                    onRichTextEditorChange={(event) => handleRichTextEditor(event, 'workSummery', index)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between">
          <div className="flex gap-2">
            <Button variant="outline" onClick={AddNewExperience} className="text-primary">
              + Add More Experience
            </Button>
            <Button variant="outline" onClick={RemoveExperience} className="text-primary">
              - Remove
            </Button>
          </div>
          <Button disabled={loading} onClick={onSave}>
            {loading ? <LoaderCircle className="animate-spin" /> : 'Save'}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Experience;
