export interface FormData {
  fullName: string
  aboutMe: string
  skills: string[]
  education: EducationItem[]
  projects: ProjectItem[]
  experience: ExperienceItem[]
  contact: ContactInfo
}

export interface EducationItem {
  institution: string
  degree: string
  year: string
}

export interface ProjectItem {
  title: string
  description: string
  techUsed: string
  githubLink: string
}

export interface ExperienceItem {
  company: string
  role: string
  duration: string
}

export interface ContactInfo {
  email: string
  phone: string
  linkedin: string
  github: string
}

export interface Template {
  id: number
  name: string
  thumbnail: string
  color: string
}
