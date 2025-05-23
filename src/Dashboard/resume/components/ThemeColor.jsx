import React, { useContext, useState, useEffect } from 'react'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from '@/components/ui/button'
import { LayoutGrid } from 'lucide-react'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import GlobalApi from './../../../../service/GlobalApi'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'

function ThemeColor() {
    const colors = [
        "#FF5733", "#33FF57", "#3357FF", "#FF33A1", "#A133FF",
        "#33FFA1", "#FF7133", "#71FF33", "#7133FF", "#FF3371",
        "#33FF71", "#3371FF", "#A1FF33", "#33A1FF", "#FF5733",
        "#5733FF", "#33FF5A", "#5A33FF", "#FF335A", "#335AFF"
    ];

    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    const [selectedColor, setSelectedColor] = useState();
    const { resumeId } = useParams();

    useEffect(() => {
        // set the current color on load
        if (resumeInfo?.themeColor) {
            setSelectedColor(resumeInfo.themeColor);
        }
    }, [resumeInfo]);

    const onColorSelect = (color) => {
        setSelectedColor(color);
        setResumeInfo({
            ...resumeInfo,
            themeColor: color
        });

        // ✅ Wrap in `data` for Strapi v5
        const data = {
            data: {
                themeColor: color
            }
        };

        GlobalApi.UpdateResumeDetail(resumeId, data)
            .then(resp => {
                console.log(resp, "color updated");
                toast('Theme Color Updated');
            })
            .catch(err => {
                console.error('Failed to update color:', err.response?.data || err.message);
                toast.error('Failed to update theme color');
            });
    };

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="flex gap-2">
                    <LayoutGrid /> Theme
                </Button>
            </PopoverTrigger>
            <PopoverContent>
                <h2 className='mb-2 text-sm font-bold'>Select Theme Color</h2>
                <div className='grid grid-cols-5 gap-3'>
                    {colors.map((item, index) => (
                        <div
                            key={item + index}
                            onClick={() => onColorSelect(item)}
                            className={`h-5 w-5 rounded-full cursor-pointer border hover:border-black
                                ${selectedColor === item ? 'border-black' : ''}`}
                            style={{ background: item }}
                        />
                    ))}
                </div>
            </PopoverContent>
        </Popover>
    );
}

export default ThemeColor;
