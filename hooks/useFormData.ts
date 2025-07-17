"use client"

import { useState, useCallback, useMemo } from "react"
import { validator } from "../lib/validation"
import type { FormData } from "../types"

const initialFormData: FormData = {
  fullName: "",
  aboutMe: "",
  skills: [],
  education: [{ institution: "", degree: "", year: "" }],
  projects: [{ title: "", description: "", techUsed: "", githubLink: "" }],
  experience: [{ company: "", role: "", duration: "" }],
  contact: { email: "", phone: "", linkedin: "", github: "" },
}

export function useFormData() {
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [isDirty, setIsDirty] = useState(false)

  const validationErrors = useMemo(() => {
    return validator.validate(formData)
  }, [formData])

  const isValid = useMemo(() => {
    return validationErrors.length === 0 && formData.fullName.trim().length > 0
  }, [validationErrors, formData.fullName])

  const updateFormData = useCallback((section: keyof FormData, index: number | null, field: string, value: string) => {
    setFormData((prev) => {
      setIsDirty(true)

      if (index !== null && Array.isArray(prev[section])) {
        const updatedArray = [...(prev[section] as any[])]
        updatedArray[index] = { ...updatedArray[index], [field]: value }
        return { ...prev, [section]: updatedArray }
      } else if (section === "contact") {
        return {
          ...prev,
          contact: { ...prev.contact, [field]: value },
        }
      } else {
        return { ...prev, [section]: value }
      }
    })
  }, [])

  const addEducation = useCallback(() => {
    setFormData((prev) => ({
      ...prev,
      education: [...prev.education, { institution: "", degree: "", year: "" }],
    }))
    setIsDirty(true)
  }, [])

  const removeEducation = useCallback((index: number) => {
    setFormData((prev) => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index),
    }))
    setIsDirty(true)
  }, [])

  const addProject = useCallback(() => {
    setFormData((prev) => ({
      ...prev,
      projects: [...prev.projects, { title: "", description: "", techUsed: "", githubLink: "" }],
    }))
    setIsDirty(true)
  }, [])

  const removeProject = useCallback((index: number) => {
    setFormData((prev) => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== index),
    }))
    setIsDirty(true)
  }, [])

  const addExperience = useCallback(() => {
    setFormData((prev) => ({
      ...prev,
      experience: [...prev.experience, { company: "", role: "", duration: "" }],
    }))
    setIsDirty(true)
  }, [])

  const removeExperience = useCallback((index: number) => {
    setFormData((prev) => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index),
    }))
    setIsDirty(true)
  }, [])

  const updateSkills = useCallback((skills: string[]) => {
    setFormData((prev) => ({ ...prev, skills }))
    setIsDirty(true)
  }, [])

  const resetForm = useCallback(() => {
    setFormData(initialFormData)
    setIsDirty(false)
  }, [])

  const saveToLocalStorage = useCallback(() => {
    try {
      localStorage.setItem("buildfolio-form-data", JSON.stringify(formData))
      localStorage.setItem("buildfolio-form-timestamp", Date.now().toString())
    } catch (error) {
      console.warn("Failed to save form data to localStorage:", error)
    }
  }, [formData])

  const loadFromLocalStorage = useCallback(() => {
    try {
      const savedData = localStorage.getItem("buildfolio-form-data")
      const timestamp = localStorage.getItem("buildfolio-form-timestamp")

      if (savedData && timestamp) {
        const age = Date.now() - Number.parseInt(timestamp)
        const maxAge = 7 * 24 * 60 * 60 * 1000 // 7 days

        if (age < maxAge) {
          setFormData(JSON.parse(savedData))
          setIsDirty(true)
          return true
        }
      }
    } catch (error) {
      console.warn("Failed to load form data from localStorage:", error)
    }
    return false
  }, [])

  return {
    formData,
    isDirty,
    isValid,
    validationErrors,
    updateFormData,
    addEducation,
    removeEducation,
    addProject,
    removeProject,
    addExperience,
    removeExperience,
    updateSkills,
    resetForm,
    saveToLocalStorage,
    loadFromLocalStorage,
  }
}
