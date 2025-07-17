"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, FileText, Loader2 } from "lucide-react"

interface PDFProgressModalProps {
  isOpen: boolean
  progress: number
  isComplete: boolean
}

export function PDFProgressModal({ isOpen, progress, isComplete }: PDFProgressModalProps) {
  return (
    <Dialog open={isOpen}>
      <DialogContent className="sm:max-w-md" hideCloseButton>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {isComplete ? (
              <CheckCircle className="w-5 h-5 text-green-600" />
            ) : (
              <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
            )}
            {isComplete ? "PDF Generated Successfully!" : "Generating PDF..."}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex items-center justify-center py-4">
            <FileText className={`w-16 h-16 ${isComplete ? "text-green-600" : "text-blue-600"}`} />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <div className="text-center text-sm text-gray-600">
            {isComplete
              ? "Your PDF has been generated and downloaded successfully!"
              : "Please wait while we generate your professional PDF..."}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
