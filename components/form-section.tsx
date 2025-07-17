"use client"

import { memo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Plus, Trash2 } from "lucide-react"
import { SkillsInput } from "./skills-input"
import type { FormData, ValidationError } from "../types"

interface FormSectionProps {
  formData: FormData
  validationErrors: ValidationError[]
  onUpdate: (section: keyof FormData, index: number | null, field: string, value: string) => void
  onAddEducation: () => void
  onRemoveEducation: (index: number) => void
  onAddProject: () => void
  onRemoveProject: (index: number) => void
  onAddExperience: () => void
  onRemoveExperience: (index: number) => void
  onUpdateSkills: (skills: string[]) => void
}

const FormSection = memo<FormSectionProps>(
  ({
    formData,
    validationErrors,
    onUpdate,
    onAddEducation,
    onRemoveEducation,
    onAddProject,
    onRemoveProject,
    onAddExperience,
    onRemoveExperience,
    onUpdateSkills,
  }) => {
    const getFieldError = (fieldName: string) => {
      return validationErrors.find((error) => error.field === fieldName)?.message
    }

    return (
      <div className="space-y-6">
        {/* Personal Information */}
        <Card className="border-0 bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center text-lg">Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Input
                placeholder="Full Name *"
                value={formData.fullName}
                onChange={(e) => onUpdate("fullName", null, "", e.target.value)}
                className={`transition-all duration-200 ${getFieldError("fullName") ? "border-red-500" : ""}`}
                aria-invalid={!!getFieldError("fullName")}
                aria-describedby={getFieldError("fullName") ? "fullName-error" : undefined}
              />
              {getFieldError("fullName") && (
                <p id="fullName-error" className="text-sm text-red-600 mt-1">
                  {getFieldError("fullName")}
                </p>
              )}
            </div>
            <Textarea
              placeholder="About Me - Tell us about yourself..."
              rows={4}
              value={formData.aboutMe}
              onChange={(e) => onUpdate("aboutMe", null, "", e.target.value)}
              className="transition-all duration-200 resize-none"
            />
          </CardContent>
        </Card>

        {/* Skills */}
        <Card className="border-0 bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle>Skills</CardTitle>
          </CardHeader>
          <CardContent>
            <SkillsInput skills={formData.skills} onSkillsChange={onUpdateSkills} />
          </CardContent>
        </Card>

        {/* Education */}
        <Card className="border-0 bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle>Education</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {formData.education.map((edu, index) => (
              <div key={index} className="relative group">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border rounded-lg hover:shadow-md transition-shadow duration-200">
                  <Input
                    placeholder="Institution"
                    value={edu.institution}
                    onChange={(e) => onUpdate("education", index, "institution", e.target.value)}
                    className="transition-all duration-200"
                  />
                  <Input
                    placeholder="Degree"
                    value={edu.degree}
                    onChange={(e) => onUpdate("education", index, "degree", e.target.value)}
                    className="transition-all duration-200"
                  />
                  <Input
                    placeholder="Year"
                    value={edu.year}
                    onChange={(e) => onUpdate("education", index, "year", e.target.value)}
                    className="transition-all duration-200"
                  />
                </div>
                {formData.education.length > 1 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onRemoveEducation(index)}
                    className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-red-50 hover:bg-red-100 text-red-600"
                    aria-label={`Remove education entry ${index + 1}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </div>
            ))}
            <Button
              onClick={onAddEducation}
              variant="outline"
              size="sm"
              className="hover:scale-105 transition-transform duration-200 bg-transparent"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Education
            </Button>
          </CardContent>
        </Card>

        {/* Projects */}
        <Card className="border-0 bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle>Projects</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {formData.projects.map((project, index) => (
              <div key={index} className="relative group">
                <div className="space-y-4 p-4 border rounded-lg hover:shadow-md transition-shadow duration-200">
                  <Input
                    placeholder="Project Title"
                    value={project.title}
                    onChange={(e) => onUpdate("projects", index, "title", e.target.value)}
                    className="transition-all duration-200"
                  />
                  <Textarea
                    placeholder="Project Description"
                    rows={3}
                    value={project.description}
                    onChange={(e) => onUpdate("projects", index, "description", e.target.value)}
                    className="transition-all duration-200 resize-none"
                  />
                  <Input
                    placeholder="Technologies Used"
                    value={project.techUsed}
                    onChange={(e) => onUpdate("projects", index, "techUsed", e.target.value)}
                    className="transition-all duration-200"
                  />
                  <div>
                    <Input
                      placeholder="GitHub Link (https://...)"
                      value={project.githubLink}
                      onChange={(e) => onUpdate("projects", index, "githubLink", e.target.value)}
                      className={`transition-all duration-200 ${getFieldError(`projects.${index}.githubLink`) ? "border-red-500" : ""}`}
                      aria-invalid={!!getFieldError(`projects.${index}.githubLink`)}
                    />
                    {getFieldError(`projects.${index}.githubLink`) && (
                      <p className="text-sm text-red-600 mt-1">{getFieldError(`projects.${index}.githubLink`)}</p>
                    )}
                  </div>
                </div>
                {formData.projects.length > 1 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onRemoveProject(index)}
                    className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-red-50 hover:bg-red-100 text-red-600"
                    aria-label={`Remove project ${index + 1}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </div>
            ))}
            <Button
              onClick={onAddProject}
              variant="outline"
              size="sm"
              className="hover:scale-105 transition-transform duration-200 bg-transparent"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Project
            </Button>
          </CardContent>
        </Card>

        {/* Experience */}
        <Card className="border-0 bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle>Experience</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {formData.experience.map((exp, index) => (
              <div key={index} className="relative group">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border rounded-lg hover:shadow-md transition-shadow duration-200">
                  <Input
                    placeholder="Company"
                    value={exp.company}
                    onChange={(e) => onUpdate("experience", index, "company", e.target.value)}
                    className="transition-all duration-200"
                  />
                  <Input
                    placeholder="Role"
                    value={exp.role}
                    onChange={(e) => onUpdate("experience", index, "role", e.target.value)}
                    className="transition-all duration-200"
                  />
                  <Input
                    placeholder="Duration"
                    value={exp.duration}
                    onChange={(e) => onUpdate("experience", index, "duration", e.target.value)}
                    className="transition-all duration-200"
                  />
                </div>
                {formData.experience.length > 1 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onRemoveExperience(index)}
                    className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-red-50 hover:bg-red-100 text-red-600"
                    aria-label={`Remove experience entry ${index + 1}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </div>
            ))}
            <Button
              onClick={onAddExperience}
              variant="outline"
              size="sm"
              className="hover:scale-105 transition-transform duration-200 bg-transparent"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Experience
            </Button>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card className="border-0 bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Input
                  placeholder="Email"
                  type="email"
                  value={formData.contact.email}
                  onChange={(e) => onUpdate("contact", null, "email", e.target.value)}
                  className={`transition-all duration-200 ${getFieldError("email") ? "border-red-500" : ""}`}
                  aria-invalid={!!getFieldError("email")}
                />
                {getFieldError("email") && <p className="text-sm text-red-600 mt-1">{getFieldError("email")}</p>}
              </div>
              <div>
                <Input
                  placeholder="Phone"
                  value={formData.contact.phone}
                  onChange={(e) => onUpdate("contact", null, "phone", e.target.value)}
                  className={`transition-all duration-200 ${getFieldError("phone") ? "border-red-500" : ""}`}
                  aria-invalid={!!getFieldError("phone")}
                />
                {getFieldError("phone") && <p className="text-sm text-red-600 mt-1">{getFieldError("phone")}</p>}
              </div>
              <div>
                <Input
                  placeholder="LinkedIn Profile (https://...)"
                  value={formData.contact.linkedin}
                  onChange={(e) => onUpdate("contact", null, "linkedin", e.target.value)}
                  className={`transition-all duration-200 ${getFieldError("linkedin") ? "border-red-500" : ""}`}
                  aria-invalid={!!getFieldError("linkedin")}
                />
                {getFieldError("linkedin") && <p className="text-sm text-red-600 mt-1">{getFieldError("linkedin")}</p>}
              </div>
              <div>
                <Input
                  placeholder="GitHub Profile (https://...)"
                  value={formData.contact.github}
                  onChange={(e) => onUpdate("contact", null, "github", e.target.value)}
                  className={`transition-all duration-200 ${getFieldError("github") ? "border-red-500" : ""}`}
                  aria-invalid={!!getFieldError("github")}
                />
                {getFieldError("github") && <p className="text-sm text-red-600 mt-1">{getFieldError("github")}</p>}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  },
)

FormSection.displayName = "FormSection"

export { FormSection }
