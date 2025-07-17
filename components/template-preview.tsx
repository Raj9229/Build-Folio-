"use client"

import { forwardRef } from "react"
import { Badge } from "@/components/ui/badge"
import { Mail, Phone, Linkedin, Github } from "lucide-react"
import type { FormData } from "../types"
import type { TemplateStyle } from "../types/templates"

interface TemplatePreviewProps {
  formData: FormData
  template: TemplateStyle
}

export const TemplatePreview = forwardRef<HTMLDivElement, TemplatePreviewProps>(({ formData, template }, ref) => {
  const { colorScheme, typography, headerStyle, sectionStyle } = template

  const sectionTitleClass = `${typography.headingSize} ${typography.headingFont} mb-3 pb-1`
  const bodyTextClass = `${typography.bodySize} ${typography.bodyFont}`

  const getSectionStyle = () => {
    switch (sectionStyle) {
      case "bordered":
        return `border-b-2`
      case "cards":
        return `rounded-lg p-3`
      case "minimal":
      default:
        return ""
    }
  }

  const getHeaderLayout = () => {
    switch (headerStyle) {
      case "left":
        return "text-left"
      case "split":
        return "flex justify-between items-start flex-wrap"
      case "center":
      default:
        return "text-center"
    }
  }

  return (
    <div
      ref={ref}
      className="w-full max-w-[210mm] mx-auto p-8 rounded-lg shadow-sm border min-h-[297mm] print:shadow-none print:border-0 print:p-6 print:min-h-0"
      style={{
        backgroundColor: colorScheme.background,
        color: colorScheme.text,
        fontFamily: "system-ui, -apple-system, sans-serif",
        lineHeight: "1.5",
      }}
    >
      {/* Header - Never break */}
      <div className={`mb-8 print:mb-6 ${getHeaderLayout()} page-break-inside-avoid`}>
        {headerStyle === "split" ? (
          <>
            <div className="flex-1 min-w-0">
              <h1 className="text-3xl print:text-2xl font-bold mb-2 break-words" style={{ color: colorScheme.primary }}>
                {formData.fullName || "Your Name"}
              </h1>
              <div className="space-y-1">
                {formData.contact.email && (
                  <div className="flex items-center text-sm print:text-xs" style={{ color: colorScheme.secondary }}>
                    <Mail className="w-4 h-4 print:w-3 print:h-3 mr-2 flex-shrink-0" />
                    <span className="break-all">{formData.contact.email}</span>
                  </div>
                )}
                {formData.contact.phone && (
                  <div className="flex items-center text-sm print:text-xs" style={{ color: colorScheme.secondary }}>
                    <Phone className="w-4 h-4 print:w-3 print:h-3 mr-2 flex-shrink-0" />
                    <span>{formData.contact.phone}</span>
                  </div>
                )}
              </div>
            </div>
            <div className="text-right flex-shrink-0 ml-4">
              {formData.contact.linkedin && (
                <div
                  className="flex items-center justify-end text-sm print:text-xs mb-1"
                  style={{ color: colorScheme.secondary }}
                >
                  <Linkedin className="w-4 h-4 print:w-3 print:h-3 mr-2" />
                  <span>LinkedIn</span>
                </div>
              )}
              {formData.contact.github && (
                <div
                  className="flex items-center justify-end text-sm print:text-xs"
                  style={{ color: colorScheme.secondary }}
                >
                  <Github className="w-4 h-4 print:w-3 print:h-3 mr-2" />
                  <span>GitHub</span>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <h1 className="text-3xl print:text-2xl font-bold mb-2 break-words" style={{ color: colorScheme.primary }}>
              {formData.fullName || "Your Name"}
            </h1>
            <div
              className={`flex ${headerStyle === "center" ? "justify-center" : "justify-start"} flex-wrap gap-4 text-sm print:text-xs`}
              style={{ color: colorScheme.secondary }}
            >
              {formData.contact.email && (
                <div className="flex items-center">
                  <Mail className="w-4 h-4 print:w-3 print:h-3 mr-1" />
                  <span className="break-all">{formData.contact.email}</span>
                </div>
              )}
              {formData.contact.phone && (
                <div className="flex items-center">
                  <Phone className="w-4 h-4 print:w-3 print:h-3 mr-1" />
                  <span>{formData.contact.phone}</span>
                </div>
              )}
              {formData.contact.linkedin && (
                <div className="flex items-center">
                  <Linkedin className="w-4 h-4 print:w-3 print:h-3 mr-1" />
                  <span>LinkedIn</span>
                </div>
              )}
              {formData.contact.github && (
                <div className="flex items-center">
                  <Github className="w-4 h-4 print:w-3 print:h-3 mr-1" />
                  <span>GitHub</span>
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {/* About Me - Prefer to keep together */}
      {formData.aboutMe && (
        <div className="mb-6 print:mb-4 page-break-inside-avoid">
          <h2
            className={`${sectionTitleClass} ${getSectionStyle()}`}
            style={{
              color: colorScheme.primary,
              borderColor: sectionStyle === "bordered" ? colorScheme.accent : "transparent",
              backgroundColor: sectionStyle === "cards" ? colorScheme.accent : "transparent",
            }}
          >
            About Me
          </h2>
          <p className={`${bodyTextClass} leading-relaxed text-justify`}>{formData.aboutMe}</p>
        </div>
      )}

      {/* Skills - Keep together, allow break before */}
      {formData.skills.length > 0 && (
        <div className="mb-6 print:mb-4 page-break-inside-avoid page-break-before-auto">
          <h2
            className={`${sectionTitleClass} ${getSectionStyle()}`}
            style={{
              color: colorScheme.primary,
              borderColor: sectionStyle === "bordered" ? colorScheme.accent : "transparent",
              backgroundColor: sectionStyle === "cards" ? colorScheme.accent : "transparent",
            }}
          >
            Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {formData.skills.map((skill, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="border text-xs print:text-xs"
                style={{
                  backgroundColor: colorScheme.accent,
                  color: colorScheme.primary,
                  borderColor: colorScheme.secondary,
                }}
              >
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Experience - Allow breaks between items */}
      {formData.experience.some((exp) => exp.company || exp.role || exp.duration) && (
        <div className="mb-6 print:mb-4 page-break-before-auto">
          <h2
            className={`${sectionTitleClass} ${getSectionStyle()} page-break-after-avoid`}
            style={{
              color: colorScheme.primary,
              borderColor: sectionStyle === "bordered" ? colorScheme.accent : "transparent",
              backgroundColor: sectionStyle === "cards" ? colorScheme.accent : "transparent",
            }}
          >
            Experience
          </h2>
          <div className="space-y-4 print:space-y-3">
            {formData.experience.map(
              (exp, index) =>
                (exp.company || exp.role || exp.duration) && (
                  <div
                    key={index}
                    className={`page-break-inside-avoid ${sectionStyle === "cards" ? "p-4 rounded-lg" : ""}`}
                    style={sectionStyle === "cards" ? { backgroundColor: colorScheme.accent } : {}}
                  >
                    <div className="flex justify-between items-start mb-1 flex-wrap gap-2">
                      <h3 className={`${typography.headingFont} flex-1 min-w-0`} style={{ color: colorScheme.text }}>
                        {exp.role}
                      </h3>
                      <span className={`${bodyTextClass} flex-shrink-0`} style={{ color: colorScheme.secondary }}>
                        {exp.duration}
                      </span>
                    </div>
                    <p className={`${typography.headingFont}`} style={{ color: colorScheme.secondary }}>
                      {exp.company}
                    </p>
                  </div>
                ),
            )}
          </div>
        </div>
      )}

      {/* Education - Allow breaks between items */}
      {formData.education.some((edu) => edu.institution || edu.degree || edu.year) && (
        <div className="mb-6 print:mb-4 page-break-before-auto">
          <h2
            className={`${sectionTitleClass} ${getSectionStyle()} page-break-after-avoid`}
            style={{
              color: colorScheme.primary,
              borderColor: sectionStyle === "bordered" ? colorScheme.accent : "transparent",
              backgroundColor: sectionStyle === "cards" ? colorScheme.accent : "transparent",
            }}
          >
            Education
          </h2>
          <div className="space-y-4 print:space-y-3">
            {formData.education.map(
              (edu, index) =>
                (edu.institution || edu.degree || edu.year) && (
                  <div
                    key={index}
                    className={`page-break-inside-avoid ${sectionStyle === "cards" ? "p-4 rounded-lg" : ""}`}
                    style={sectionStyle === "cards" ? { backgroundColor: colorScheme.accent } : {}}
                  >
                    <div className="flex justify-between items-start mb-1 flex-wrap gap-2">
                      <h3 className={`${typography.headingFont} flex-1 min-w-0`} style={{ color: colorScheme.text }}>
                        {edu.degree}
                      </h3>
                      <span className={`${bodyTextClass} flex-shrink-0`} style={{ color: colorScheme.secondary }}>
                        {edu.year}
                      </span>
                    </div>
                    <p className={`${bodyTextClass}`} style={{ color: colorScheme.secondary }}>
                      {edu.institution}
                    </p>
                  </div>
                ),
            )}
          </div>
        </div>
      )}

      {/* Projects - Allow breaks between items, but keep project content together */}
      {formData.projects.some((project) => project.title || project.description) && (
        <div className="mb-6 print:mb-4 page-break-before-auto">
          <h2
            className={`${sectionTitleClass} ${getSectionStyle()} page-break-after-avoid`}
            style={{
              color: colorScheme.primary,
              borderColor: sectionStyle === "bordered" ? colorScheme.accent : "transparent",
              backgroundColor: sectionStyle === "cards" ? colorScheme.accent : "transparent",
            }}
          >
            Projects
          </h2>
          <div className="space-y-4 print:space-y-3">
            {formData.projects.map(
              (project, index) =>
                (project.title || project.description) && (
                  <div
                    key={index}
                    className={`page-break-inside-avoid ${sectionStyle === "cards" ? "p-4 rounded-lg" : ""}`}
                    style={sectionStyle === "cards" ? { backgroundColor: colorScheme.accent } : {}}
                  >
                    <h3 className={`${typography.headingFont} mb-1`} style={{ color: colorScheme.text }}>
                      {project.title}
                    </h3>
                    <p className={`${bodyTextClass} mb-2 leading-relaxed text-justify`}>{project.description}</p>
                    {project.techUsed && (
                      <p className={`${bodyTextClass} mb-1`} style={{ color: colorScheme.secondary }}>
                        <span className="font-medium">Technologies:</span> {project.techUsed}
                      </p>
                    )}
                    {project.githubLink && (
                      <div className={`${bodyTextClass} flex items-center`} style={{ color: colorScheme.primary }}>
                        <Github className="w-3 h-3 print:w-2 print:h-2 mr-1" />
                        <span>GitHub Repository</span>
                      </div>
                    )}
                  </div>
                ),
            )}
          </div>
        </div>
      )}
    </div>
  )
})

TemplatePreview.displayName = "TemplatePreview"
