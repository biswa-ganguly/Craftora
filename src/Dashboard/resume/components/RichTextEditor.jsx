import React, { useContext, useState } from 'react';
import {
  Editor,
  EditorProvider,
  Toolbar,
  BtnBold,
  BtnItalic,
  BtnUnderline,
  BtnStrikeThrough,
  BtnNumberedList,
  BtnBulletList,
  BtnLink,
  Separator
} from 'react-simple-wysiwyg';
import { Button } from '@/components/ui/button';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { Brain, LoaderCircle } from 'lucide-react';
import { AIChatSession } from '../../../../service/AiModal';
import { toast } from 'sonner';

const PROMPT = `
Position title: {positionTitle}
Based on the position title above, generate 5–7 impactful bullet points for a resume experience section.
- Do not include experience level or seniority
- Output the result using HTML list format (<ul><li>...</li></ul>)
`;

function RichTextEditor({ onRichTextEditorChange, index, defaultValue }) {
  const [value, setValue] = useState(defaultValue || '');
  const [loading, setLoading] = useState(false);
  const { resumeInfo } = useContext(ResumeInfoContext);

  const generateSummaryFromAI = async () => {
    const title = resumeInfo?.Experience?.[index]?.title;

    if (!title) {
      toast.warning('Please provide a position title first.');
      return;
    }

    setLoading(true);
    const prompt = PROMPT.replace('{positionTitle}', title);

    try {
      const result = await AIChatSession.sendMessage(prompt);
      const responseText = await result.response.text();
      const cleanHTML = responseText.replace(/^\[|\]$/g, '').trim();
      setValue(cleanHTML);
      onRichTextEditorChange({ target: { value: cleanHTML } });
    } catch (error) {
      console.error('AI generation error:', error);
      toast.error('Failed to generate summary from AI.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="my-4">
      <div className="flex justify-between items-center mb-2">
        <label className="text-xs font-semibold">Experience Summary</label>
        <Button
          variant="outline"
          size="sm"
          onClick={generateSummaryFromAI}
          disabled={loading}
          className="flex items-center gap-2 border-primary text-primary"
        >
          {loading ? (
            <LoaderCircle className="w-4 h-4 animate-spin" />
          ) : (
            <>
              <Brain className="w-4 h-4" />
              Generate from AI
            </>
          )}
        </Button>
      </div>

      <EditorProvider>
        <Editor
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            onRichTextEditorChange(e);
          }}
        >
          <Toolbar>
            <BtnBold />
            <BtnItalic />
            <BtnUnderline />
            <BtnStrikeThrough />
            <Separator />
            <BtnNumberedList />
            <BtnBulletList />
            <Separator />
            <BtnLink />
          </Toolbar>
        </Editor>
      </EditorProvider>
    </div>
  );
}

export default RichTextEditor;
