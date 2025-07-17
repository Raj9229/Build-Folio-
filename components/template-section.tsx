"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { TEMPLATE_STYLES } from "../types/templates"
import { CheckCircle } from "lucide-react"

interface TemplateSectionProps {
  selectedTemplate: any
  onTemplateSelect: (template: any) => void
}

const templates = TEMPLATE_STYLES

export function TemplateSection({ selectedTemplate, onTemplateSelect }: TemplateSectionProps) {
  return (
    <section id="templates" className="py-16 px-4 sm:px-6 lg:px-8 bg-white/50 relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-indigo-50/50"></div>
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 animate-gradient-x bg-300%"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-12 animate-in fade-in-0 slide-in-from-bottom-4 duration-800">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Template</h2>
          <p className="text-gray-600">Select from our professionally designed templates</p>
        </div>

        <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
          {templates.map((template, index) => (
            <Card
              key={template.id}
              className={`group hover:shadow-xl transition-all duration-500 border-2 bg-white/80 backdrop-blur-sm cursor-pointer transform hover:scale-105 animate-in fade-in-0 slide-in-from-bottom-6 duration-800 ${
                selectedTemplate?.id === template.id
                  ? "border-green-500 shadow-lg shadow-green-200 ring-2 ring-green-200"
                  : "border-transparent hover:border-blue-300 hover:shadow-blue-200"
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={() => onTemplateSelect(template)}
            >
              <CardContent className="p-4">
                {/* Template Preview Image */}
                <div className="relative mb-4 aspect-[3/4] rounded-lg overflow-hidden group-hover:shadow-lg transition-shadow duration-300">
                  <div
                    className={`w-full h-full ${template.color} p-4 flex flex-col transition-all duration-300 group-hover:scale-105`}
                    style={{ backgroundColor: template.colorScheme.background }}
                  >
                    {/* Header Preview */}
                    <div
                      className={`mb-3 ${template.headerStyle === "center" ? "text-center" : template.headerStyle === "left" ? "text-left" : "flex justify-between"}`}
                    >
                      <div className={template.headerStyle === "split" ? "flex-1" : ""}>
                        <div
                          className="h-2 rounded mb-1 animate-pulse"
                          style={{
                            backgroundColor: template.colorScheme.primary,
                            width: template.headerStyle === "center" ? "60%" : "80%",
                            margin: template.headerStyle === "center" ? "0 auto" : "0",
                          }}
                        />
                        <div
                          className="h-1 rounded animate-pulse delay-100"
                          style={{
                            backgroundColor: template.colorScheme.secondary,
                            width: "40%",
                            margin: template.headerStyle === "center" ? "0 auto" : "0",
                          }}
                        />
                      </div>
                      {template.headerStyle === "split" && (
                        <div className="flex-1 text-right">
                          <div
                            className="h-1 rounded mb-1 ml-auto animate-pulse delay-200"
                            style={{ backgroundColor: template.colorScheme.secondary, width: "60%" }}
                          />
                          <div
                            className="h-1 rounded ml-auto animate-pulse delay-300"
                            style={{ backgroundColor: template.colorScheme.secondary, width: "40%" }}
                          />
                        </div>
                      )}
                    </div>

                    {/* Section Previews */}
                    <div className="space-y-2 flex-1">
                      {/* About Section */}
                      <div>
                        <div
                          className={`h-1 rounded mb-1 animate-pulse delay-400 ${template.sectionStyle === "bordered" ? "border-b" : ""}`}
                          style={{
                            backgroundColor: template.colorScheme.primary,
                            width: "30%",
                            borderColor: template.colorScheme.accent,
                          }}
                        />
                        <div
                          className="h-0.5 rounded mb-1 animate-pulse delay-500"
                          style={{ backgroundColor: template.colorScheme.text, width: "90%" }}
                        />
                        <div
                          className="h-0.5 rounded animate-pulse delay-600"
                          style={{ backgroundColor: template.colorScheme.text, width: "70%" }}
                        />
                      </div>

                      {/* Skills Section */}
                      <div className="pt-1">
                        <div
                          className="h-1 rounded mb-1 animate-pulse delay-700"
                          style={{ backgroundColor: template.colorScheme.primary, width: "25%" }}
                        />
                        <div className="flex gap-1 flex-wrap">
                          {[1, 2, 3, 4].map((i) => (
                            <div
                              key={i}
                              className={`h-1 rounded animate-pulse ${template.sectionStyle === "cards" ? "px-1" : ""}`}
                              style={{
                                backgroundColor: template.colorScheme.accent,
                                width: `${15 + i * 5}%`,
                                border: `1px solid ${template.colorScheme.secondary}`,
                                animationDelay: `${800 + i * 100}ms`,
                              }}
                            />
                          ))}
                        </div>
                      </div>

                      {/* Experience Section */}
                      <div className="pt-1">
                        <div
                          className="h-1 rounded mb-1 animate-pulse delay-1000"
                          style={{ backgroundColor: template.colorScheme.primary, width: "35%" }}
                        />
                        <div
                          className={template.sectionStyle === "cards" ? "p-1 rounded" : ""}
                          style={
                            template.sectionStyle === "cards" ? { backgroundColor: template.colorScheme.accent } : {}
                          }
                        >
                          <div className="flex justify-between mb-0.5">
                            <div
                              className="h-0.5 rounded animate-pulse delay-1100"
                              style={{ backgroundColor: template.colorScheme.text, width: "40%" }}
                            />
                            <div
                              className="h-0.5 rounded animate-pulse delay-1200"
                              style={{ backgroundColor: template.colorScheme.secondary, width: "20%" }}
                            />
                          </div>
                          <div
                            className="h-0.5 rounded animate-pulse delay-1300"
                            style={{ backgroundColor: template.colorScheme.secondary, width: "50%" }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Selection Indicator */}
                  {selectedTemplate?.id === template.id && (
                    <div className="absolute top-2 right-2 bg-green-500 rounded-full p-1 animate-in zoom-in-50 duration-300">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>

                <h3 className="font-semibold text-sm mb-2 group-hover:text-blue-600 transition-colors duration-200">
                  {template.name}
                </h3>
                <p className="text-xs text-gray-600 mb-3">{template.description}</p>

                <Button
                  size="sm"
                  className={`w-full transition-all duration-300 transform hover:scale-105 ${
                    selectedTemplate?.id === template.id
                      ? "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-lg"
                      : "bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
                  }`}
                  onClick={(e) => {
                    e.stopPropagation()
                    onTemplateSelect(template)
                  }}
                >
                  {selectedTemplate?.id === template.id ? "✓ Selected" : "Use Template"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
