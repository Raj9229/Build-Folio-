import { VALIDATION_RULES } from "./constants"
import type { FormData } from "../types"

export interface ValidationError {
  field: string
  message: string
}

export class FormValidator {
  private errors: ValidationError[] = []

  validate(data: FormData): ValidationError[] {
    this.errors = []

    this.validateName(data.fullName)
    this.validateEmail(data.contact.email)
    this.validatePhone(data.contact.phone)
    this.validateUrls(data)

    return this.errors
  }

  private validateName(name: string): void {
    if (!name.trim()) {
      this.addError("fullName", "Full name is required")
      return
    }

    if (name.length < VALIDATION_RULES.name.min) {
      this.addError("fullName", `Name must be at least ${VALIDATION_RULES.name.min} characters`)
    }

    if (name.length > VALIDATION_RULES.name.max) {
      this.addError("fullName", `Name must not exceed ${VALIDATION_RULES.name.max} characters`)
    }
  }

  private validateEmail(email: string): void {
    if (email && !VALIDATION_RULES.email.test(email)) {
      this.addError("email", "Please enter a valid email address")
    }
  }

  private validatePhone(phone: string): void {
    if (phone && !VALIDATION_RULES.phone.test(phone)) {
      this.addError("phone", "Please enter a valid phone number")
    }
  }

  private validateUrls(data: FormData): void {
    const urlFields = [
      { value: data.contact.linkedin, field: "linkedin" },
      { value: data.contact.github, field: "github" },
      ...data.projects.map((project, index) => ({
        value: project.githubLink,
        field: `projects.${index}.githubLink`,
      })),
    ]

    urlFields.forEach(({ value, field }) => {
      if (value && !VALIDATION_RULES.url.test(value)) {
        this.addError(field, "Please enter a valid URL (must start with http:// or https://)")
      }
    })
  }

  private addError(field: string, message: string): void {
    this.errors.push({ field, message })
  }
}

export const validator = new FormValidator()
