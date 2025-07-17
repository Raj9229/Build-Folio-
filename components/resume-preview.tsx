"use client"

import { forwardRef } from "react"
import { Badge } from "@/components/ui/badge"
import { Mail, Phone, Linkedin, Github } from "lucide-react"
import type { FormData } from "../types"

interface ResumePreviewProps {
  formData: FormData
}

export const ResumePreview = forwardRef<HTMLDivElement, ResumePreviewProps>(({ formData }, ref) => {
  return (
    <div ref={ref} className="bg-white p-8 rounded-lg shadow-sm border min-h-[600px] print:shadow-none print:border-0">
      {/* Preview Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{formData.fullName || "Your Name"}</h1>
        <div className="flex justify-center flex-wrap gap-4 text-sm text-gray-600">
          {formData.contact.email && (
            <div className="flex items-center">
              <Mail className="w-4 h-4 mr-1" />
              {formData.contact.email}
            </div>
          )}
          {formData.contact.phone && (
            <div className="flex items-center">
              <Phone className="w-4 h-4 mr-1" />
              {formData.contact.phone}
            </div>
          )}
          {formData.contact.linkedin && (
            <div className="flex items-center text-blue-600">
              <Linkedin className="w-4 h-4 mr-1" />
              LinkedIn
            </div>
          )}
          {formData.contact.github && (
            <div className="flex items-center text-gray-700">
              <Github className="w-4 h-4 mr-1" />
              GitHub
            </div>
          )}
        </div>
      </div>

      {/* About Me */}
      {formData.aboutMe && (
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-3 text-blue-600 border-b-2 border-blue-100 pb-1">About Me</h2>
          <p className="text-gray-700 leading-relaxed">{formData.aboutMe}</p>
        </div>
      )}

      {/* Skills */}
      {formData.skills.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-3 text-blue-600 border-b-2 border-blue-100 pb-1">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {formData.skills.map((skill, index) => (
              <Badge key={index} variant="secondary" className="bg-blue-50 text-blue-800 border border-blue-200">
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Experience */}
      {formData.experience.some((exp) => exp.company || exp.role || exp.duration) && (
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-3 text-blue-600 border-b-2 border-blue-100 pb-1">Experience</h2>
          {formData.experience.map(
            (exp, index) =>
              (exp.company || exp.role || exp.duration) && (
                <div key={index} className="mb-4 last:mb-0">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-semibold text-gray-900">{exp.role}</h3>
                    <span className="text-sm text-gray-500">{exp.duration}</span>
                  </div>
                  <p className="text-gray-700 font-medium">{exp.company}</p>
                </div>
              ),
          )}
        </div>
      )}

      {/* Education */}
      {formData.education.some((edu) => edu.institution || edu.degree || edu.year) && (
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-3 text-blue-600 border-b-2 border-blue-100 pb-1">Education</h2>
          {formData.education.map(
            (edu, index) =>
              (edu.institution || edu.degree || edu.year) && (
                <div key={index} className="mb-4 last:mb-0">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                    <span className="text-sm text-gray-500">{edu.year}</span>
                  </div>
                  <p className="text-gray-700">{edu.institution}</p>
                </div>
              ),
          )}
        </div>
      )}

      {/* Projects */}
      {formData.projects.some((project) => project.title || project.description) && (
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-3 text-blue-600 border-b-2 border-blue-100 pb-1">Projects</h2>
          {formData.projects.map(
            (project, index) =>
              (project.title || project.description) && (
                <div key={index} className="mb-4 last:mb-0">
                  <h3 className="font-semibold text-gray-900 mb-1">{project.title}</h3>
                  <p className="text-gray-700 text-sm mb-2 leading-relaxed">{project.description}</p>
                  {project.techUsed && (
                    <p className="text-gray-600 text-sm mb-1">
                      <span className="font-medium">Technologies:</span> {project.techUsed}
                    </p>
                  )}
                  {project.githubLink && (
                    <div className="text-sm text-blue-600 flex items-center">
                      <Github className="w-3 h-3 mr-1" />
                      <span>GitHub Repository</span>
                    </div>
                  )}
                </div>
              ),
          )}
        </div>
      )}
    </div>
  )
})

ResumePreview.displayName = "ResumePreview"
