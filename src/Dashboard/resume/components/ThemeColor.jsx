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
    "#1A1A1A", // Dark Charcoal
    "#2C3E50", // Midnight Blue
    "#34495E", // Blue Gray
    "#1ABC9C", // Strong Cyan
    "#2980B9", // Bold Blue
    "#2ECC71", // Soft Green
    "#E67E22", // Warm Orange
    "#D35400", // Burnt Orange
    "#8E44AD", // Muted Purple
    "#BDC3C7", // Light Gray
    "#7F8C8D", // Medium Gray
    "#95A5A6", // Muted Teal Gray
    "#F39C12", // Amber Yellow
    "#C0392B", // Soft Red
    "#27AE60", // Emerald Green
    "#3498DB", // Sky Blue
    "#AAB7B8", // Soft Gray
    "#ECF0F1", // Light Off-White
    "#F4F6F7", // Paper White
    "#555555"  // Deep Gray
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
