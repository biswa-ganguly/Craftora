import { Loader2Icon, MoreVertical, Notebook, Eye, Download, Pencil, Trash2 } from 'lucide-react'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import GlobalApi from '../../../service/GlobalApi'
import { toast } from 'sonner'

function ResumeCardItem({ resume, refreshData }) {
  const navigate = useNavigate();
  const [openAlert, setOpenAlert] = useState(false);
  const [loading, setLoading] = useState(false);

  const onDelete = () => {
    setLoading(true);
    GlobalApi.DeleteResumeById(resume.documentId).then(resp => {
      toast('Resume Deleted!');
      refreshData();
      setLoading(false);
      setOpenAlert(false);
    }).catch(() => setLoading(false));
  };

  return (
    <div className="rounded-xl overflow-hidden shadow-lg border border-gray-200 hover:shadow-xl transition-all">
      <Link to={`/dashboard/resume/${resume.documentId}/edit`}>
        <div
          className="relative h-[240px] flex items-center justify-center"
          style={{ backgroundColor: resume?.themeColor }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-20"></div>
          <Notebook className="z-10 w-12 h-12 text-white" />
        </div>
      </Link>

      <div className="flex items-center justify-between px-4 py-3 bg-white">
        <h2 className="font-semibold text-sm truncate">{resume.title}</h2>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button>
              <MoreVertical className="w-4 h-4 text-gray-600 hover:text-black" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => navigate(`/dashboard/resume/${resume.documentId}/edit`)}>
              <Pencil className="w-4 h-4 mr-2" /> Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate(`/my-resume/${resume.documentId}/view`)}>
              <Eye className="w-4 h-4 mr-2" /> View
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate(`/my-resume/${resume.documentId}/view`)}>
              <Download className="w-4 h-4 mr-2" /> Download
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setOpenAlert(true)}>
              <Trash2 className="w-4 h-4 mr-2 text-red-500" /> <span className="text-red-500">Delete</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <AlertDialog open={openAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Resume?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the resume.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setOpenAlert(false)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={onDelete} disabled={loading}>
              {loading ? <Loader2Icon className="animate-spin w-4 h-4" /> : 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

export default ResumeCardItem;
