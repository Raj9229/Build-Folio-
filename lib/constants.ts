export const APP_CONFIG = {
  name: "BuildFolio",
  description: "Professional Portfolio & Resume Builder",
  version: "2.0.0",
  author: "Raj",
  contact: "https://linktr.ee/Raj9229",
} as const

export const PDF_CONFIG = {
  maxFileSize: 10 * 1024 * 1024, // 10MB
  quality: 0.92,
  scale: 2,
  format: "a4",
  timeout: 15000,
} as const

export const VALIDATION_RULES = {
  name: { min: 2, max: 100 },
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^[+]?[1-9][\d]{0,15}$/,
  url: /^https?:\/\/.+/,
  password: { min: 8, max: 128 },
} as const

export const ANIMATION_DURATION = {
  fast: 200,
  normal: 300,
  slow: 500,
} as const
