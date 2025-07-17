export interface TemplateStyle {
  id: string
  name: string
  description: string
  thumbnail: string
  color: string
  headerStyle: "center" | "left" | "split"
  sectionStyle: "bordered" | "minimal" | "cards"
  colorScheme: {
    primary: string
    secondary: string
    accent: string
    text: string
    background: string
  }
  typography: {
    headingFont: string
    bodyFont: string
    headingSize: string
    bodySize: string
  }
}

export const TEMPLATE_STYLES: TemplateStyle[] = [
  {
    id: "modern-professional",
    name: "Modern Professional",
    description: "Clean and professional with blue accents",
    thumbnail: "/placeholder.svg?height=200&width=150",
    color: "bg-gradient-to-br from-blue-50 to-indigo-100",
    headerStyle: "center",
    sectionStyle: "bordered",
    colorScheme: {
      primary: "#1e40af",
      secondary: "#3b82f6",
      accent: "#dbeafe",
      text: "#1f2937",
      background: "#ffffff",
    },
    typography: {
      headingFont: "font-bold",
      bodyFont: "font-normal",
      headingSize: "text-xl",
      bodySize: "text-sm",
    },
  },
  {
    id: "creative-designer",
    name: "Creative Designer",
    description: "Vibrant and creative with purple gradients",
    thumbnail: "/placeholder.svg?height=200&width=150",
    color: "bg-gradient-to-br from-purple-50 to-pink-100",
    headerStyle: "left",
    sectionStyle: "cards",
    colorScheme: {
      primary: "#7c3aed",
      secondary: "#a855f7",
      accent: "#f3e8ff",
      text: "#1f2937",
      background: "#fefefe",
    },
    typography: {
      headingFont: "font-bold",
      bodyFont: "font-normal",
      headingSize: "text-lg",
      bodySize: "text-sm",
    },
  },
  {
    id: "tech-developer",
    name: "Tech Developer",
    description: "Modern tech-focused with green accents",
    thumbnail: "/placeholder.svg?height=200&width=150",
    color: "bg-gradient-to-br from-green-50 to-emerald-100",
    headerStyle: "split",
    sectionStyle: "minimal",
    colorScheme: {
      primary: "#059669",
      secondary: "#10b981",
      accent: "#d1fae5",
      text: "#1f2937",
      background: "#ffffff",
    },
    typography: {
      headingFont: "font-semibold",
      bodyFont: "font-normal",
      headingSize: "text-lg",
      bodySize: "text-sm",
    },
  },
  {
    id: "minimalist-clean",
    name: "Minimalist Clean",
    description: "Ultra-clean minimalist design",
    thumbnail: "/placeholder.svg?height=200&width=150",
    color: "bg-gradient-to-br from-gray-50 to-slate-100",
    headerStyle: "center",
    sectionStyle: "minimal",
    colorScheme: {
      primary: "#374151",
      secondary: "#6b7280",
      accent: "#f3f4f6",
      text: "#1f2937",
      background: "#ffffff",
    },
    typography: {
      headingFont: "font-medium",
      bodyFont: "font-normal",
      headingSize: "text-lg",
      bodySize: "text-sm",
    },
  },
  {
    id: "executive-formal",
    name: "Executive Formal",
    description: "Professional executive style with navy theme",
    thumbnail: "/placeholder.svg?height=200&width=150",
    color: "bg-gradient-to-br from-slate-50 to-blue-50",
    headerStyle: "left",
    sectionStyle: "bordered",
    colorScheme: {
      primary: "#1e293b",
      secondary: "#475569",
      accent: "#e2e8f0",
      text: "#1f2937",
      background: "#ffffff",
    },
    typography: {
      headingFont: "font-bold",
      bodyFont: "font-normal",
      headingSize: "text-xl",
      bodySize: "text-sm",
    },
  },
]
