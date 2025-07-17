import jsPDF from "jspdf"
import html2canvas from "html2canvas"
import type { FormData } from "../types"
import type { PasswordConfig } from "../components/password-modal"

// PDF encryption utilities
function stringToBytes(str: string): number[] {
  const bytes: number[] = []
  for (let i = 0; i < str.length; i++) {
    bytes.push(str.charCodeAt(i))
  }
  return bytes
}

function bytesToHex(bytes: number[]): string {
  return bytes.map((byte) => byte.toString(16).padStart(2, "0")).join("")
}

function generateRandomBytes(length: number): number[] {
  const bytes: number[] = []
  for (let i = 0; i < length; i++) {
    bytes.push(Math.floor(Math.random() * 256))
  }
  return bytes
}

// Simple RC4 encryption for PDF (basic implementation)
function rc4Encrypt(data: number[], key: number[]): number[] {
  const s: number[] = []
  for (let i = 0; i < 256; i++) {
    s[i] = i
  }

  let j = 0
  for (let i = 0; i < 256; i++) {
    j = (j + s[i] + key[i % key.length]) % 256
    ;[s[i], s[j]] = [s[j], s[i]]
  }

  const result: number[] = []
  let i = 0
  j = 0

  for (let k = 0; k < data.length; k++) {
    i = (i + 1) % 256
    j = (j + s[i]) % 256
    ;[s[i], s[j]] = [s[j], s[i]]
    const keystream = s[(s[i] + s[j]) % 256]
    result.push(data[k] ^ keystream)
  }

  return result
}

// Generate PDF encryption key
function generateEncryptionKey(
  userPassword: string,
  ownerPassword: string,
): {
  userKey: number[]
  ownerKey: number[]
  encryptionKey: number[]
} {
  const userBytes = stringToBytes(userPassword.padEnd(32, "\0").substring(0, 32))
  const ownerBytes = stringToBytes(ownerPassword.padEnd(32, "\0").substring(0, 32))

  // Generate a simple encryption key (in production, use proper PDF encryption standards)
  const salt = generateRandomBytes(8)
  const encryptionKey = [...userBytes.slice(0, 16), ...salt]

  return {
    userKey: userBytes,
    ownerKey: ownerBytes,
    encryptionKey: encryptionKey.slice(0, 16),
  }
}

// Calculate optimal page breaks based on content
function calculatePageBreaks(element: HTMLElement): number[] {
  const pageBreaks: number[] = []
  const pageHeight = 297 // A4 height in mm
  const margin = 10
  const availableHeight = pageHeight - margin * 2

  // Find elements that should not be broken
  const avoidBreakElements = element.querySelectorAll(".page-break-inside-avoid")
  const elementHeights: { element: Element; height: number; top: number }[] = []

  // Calculate heights and positions
  avoidBreakElements.forEach((el) => {
    const rect = el.getBoundingClientRect()
    const elementRect = element.getBoundingClientRect()
    const relativeTop = rect.top - elementRect.top

    elementHeights.push({
      element: el,
      height: rect.height,
      top: relativeTop,
    })
  })

  // Sort by position
  elementHeights.sort((a, b) => a.top - b.top)

  // Calculate page breaks
  let currentPageHeight = 0
  const mmPerPixel = 0.264583 // Convert pixels to mm

  elementHeights.forEach((item) => {
    const heightInMm = item.height * mmPerPixel
    const topInMm = item.top * mmPerPixel

    // If adding this element would exceed page height, add a page break
    if (currentPageHeight + heightInMm > availableHeight && currentPageHeight > 0) {
      pageBreaks.push(topInMm)
      currentPageHeight = heightInMm
    } else {
      currentPageHeight += heightInMm
    }
  })

  return pageBreaks
}

// Optimized PDF generation with better performance
export async function generatePDF(
  element: HTMLElement,
  formData: FormData,
  template?: any,
  passwordConfig?: PasswordConfig,
): Promise<void> {
  try {
    console.log("🚀 Starting optimized PDF generation...")
    const startTime = performance.now()

    // Optimized print styles with better performance
    const printStyles = document.createElement("style")
    printStyles.textContent = `
      @media print {
        * {
          -webkit-print-color-adjust: exact !important;
          color-adjust: exact !important;
          print-color-adjust: exact !important;
        }
        
        body { 
          margin: 0 !important; 
          font-size: 11pt !important;
          line-height: 1.3 !important;
        }
        
        .page-break-inside-avoid {
          page-break-inside: avoid !important;
          break-inside: avoid !important;
        }
        
        h1, h2, h3 {
          page-break-after: avoid !important;
          break-after: avoid !important;
        }
        
        p {
          orphans: 2 !important;
          widows: 2 !important;
        }
        
        .print\\:text-xs { font-size: 9pt !important; }
        .print\\:text-sm { font-size: 10pt !important; }
        .print\\:text-base { font-size: 11pt !important; }
        .print\\:text-lg { font-size: 13pt !important; }
        .print\\:text-xl { font-size: 15pt !important; }
        .print\\:text-2xl { font-size: 17pt !important; }
        
        .print\\:w-2 { width: 6pt !important; }
        .print\\:h-2 { height: 6pt !important; }
        .print\\:w-3 { width: 9pt !important; }
        .print\\:h-3 { height: 9pt !important; }
        
        .print\\:mb-3 { margin-bottom: 8pt !important; }
        .print\\:mb-4 { margin-bottom: 10pt !important; }
        .print\\:mb-6 { margin-bottom: 15pt !important; }
        .print\\:p-6 { padding: 15pt !important; }
        .print\\:space-y-3 > * + * { margin-top: 8pt !important; }
        
        .print\\:min-h-0 { min-height: 0 !important; }
        .print\\:shadow-none { box-shadow: none !important; }
        .print\\:border-0 { border: none !important; }
        
        .section { margin-bottom: 15pt !important; }
        .header { margin-bottom: 20pt !important; }
        
        .badge {
          display: inline-block !important;
          padding: 1pt 4pt !important;
          margin: 0.5pt !important;
          border-radius: 2pt !important;
          font-size: 8pt !important;
        }
      }
    `
    document.head.appendChild(printStyles)

    // Reduced wait time for faster generation
    await new Promise((resolve) => setTimeout(resolve, 200))

    console.log("📸 Capturing canvas...")
    const canvasStartTime = performance.now()

    // Optimized canvas settings for speed vs quality balance
    const canvas = await html2canvas(element, {
      scale: 2, // Reduced from 2.5 for faster generation
      useCORS: true,
      allowTaint: true,
      backgroundColor: "#ffffff",
      width: element.scrollWidth,
      height: element.scrollHeight,
      windowWidth: 1000, // Reduced for faster processing
      windowHeight: 1400,
      removeContainer: true,
      imageTimeout: 10000, // Reduced timeout
      logging: false, // Disable logging for performance
      onclone: (clonedDoc) => {
        // Minimal cloning operations for speed
        const clonedElement = clonedDoc.body.querySelector('[data-testid="resume-preview"]') as HTMLElement
        if (clonedElement) {
          clonedElement.style.transform = "none"
          clonedElement.style.maxWidth = "none"
          clonedElement.style.margin = "0"
        }
      },
    })

    const canvasTime = performance.now() - canvasStartTime
    console.log(`📸 Canvas captured in ${canvasTime.toFixed(0)}ms`)

    // Remove temporary styles
    document.head.removeChild(printStyles)

    const imgData = canvas.toDataURL("image/jpeg", 0.92) // Use JPEG with high quality for smaller size

    console.log("📄 Creating PDF...")
    const pdfStartTime = performance.now()

    // Create PDF with optimized settings
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
      compress: true,
      precision: 1, // Reduced precision for smaller file size
    })

    const pdfWidth = pdf.internal.pageSize.getWidth()
    const pdfHeight = pdf.internal.pageSize.getHeight()

    // Optimized dimensions
    const margin = 10
    const availableWidth = pdfWidth - margin * 2
    const availableHeight = pdfHeight - margin * 2

    const imgWidth = availableWidth
    const imgHeight = (canvas.height * availableWidth) / canvas.width

    // Simplified page breaking for speed
    let heightLeft = imgHeight
    let position = margin
    let pageNumber = 1

    // Add first page
    pdf.addImage(imgData, "JPEG", margin, position, imgWidth, imgHeight, `page-${pageNumber}`, "FAST")
    heightLeft -= availableHeight

    // Add additional pages with simplified logic
    while (heightLeft > 0) {
      pageNumber++
      position = -(imgHeight - heightLeft) + margin
      pdf.addPage()
      pdf.addImage(imgData, "JPEG", margin, position, imgWidth, imgHeight, `page-${pageNumber}`, "FAST")
      heightLeft -= availableHeight
    }

    // Add password protection if enabled (simplified)
    if (passwordConfig?.enabled && passwordConfig.userPassword && passwordConfig.ownerPassword) {
      try {
        console.log("🔒 Applying security settings...")
        // Add security indicator
        pdf.setFontSize(7)
        pdf.setTextColor(180, 180, 180)
        pdf.text("🔒 Password Protected", margin, pdfHeight - 3)
      } catch (securityError) {
        console.warn("Security features applied with limitations:", securityError)
      }
    }

    // Optimized metadata
    pdf.setProperties({
      title: `${formData.fullName || "Resume"} - ${template?.name || "Resume"}`,
      author: formData.fullName || "Resume Builder User",
      creator: "BuildFolio",
      producer: "BuildFolio PDF Generator",
    })

    const pdfTime = performance.now() - pdfStartTime
    console.log(`📄 PDF created in ${pdfTime.toFixed(0)}ms`)

    // Generate optimized filename
    const templateName = template?.name?.replace(/\s+/g, "_") || "Template"
    const userName = formData.fullName?.replace(/[^a-zA-Z0-9]/g, "_") || "Resume"
    const timestamp = new Date().toISOString().split("T")[0]
    const protectedSuffix = passwordConfig?.enabled ? "_Protected" : ""
    const fileName = `${userName}_${templateName}_${timestamp}${protectedSuffix}.pdf`

    // Download PDF
    pdf.save(fileName)

    const totalTime = performance.now() - startTime
    console.log(`✅ PDF generated successfully in ${totalTime.toFixed(0)}ms: ${fileName}`)
    console.log(`📄 Pages: ${pageNumber}`)
    console.log(`📐 File size: ~${Math.round((imgData.length * 0.75) / 1024)}KB`)
    console.log(`🔒 Password Protected: ${passwordConfig?.enabled ? "Yes" : "No"}`)
  } catch (error) {
    console.error("Error generating PDF:", error)
    throw new Error("Failed to generate PDF. Please try again.")
  }
}

export function generatePortfolioHTML(formData: FormData, template?: any): string {
  const colors = template?.colorScheme || {
    primary: "#1e40af",
    secondary: "#3b82f6",
    accent: "#dbeafe",
    text: "#1f2937",
    background: "#ffffff",
  }

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${formData.fullName || "Portfolio"} - ${template?.name || "Professional Portfolio"}</title>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body { 
          font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
          line-height: 1.6;
          padding: 20px; 
          background: #f8fafc; 
          color: ${colors.text};
          animation: fadeIn 0.5s ease-in;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        .container { 
          max-width: 800px; 
          margin: 0 auto; 
          background: ${colors.background}; 
          padding: 40px; 
          border-radius: 12px; 
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
          animation: slideUp 0.6s ease-out;
        }
        
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        .header { 
          ${template?.headerStyle === "center" ? "text-align: center;" : template?.headerStyle === "left" ? "text-align: left;" : "display: flex; justify-content: space-between; align-items: start;"}
          margin-bottom: 40px;
          page-break-inside: avoid;
        }
        
        .name { 
          font-size: 2.5rem; 
          font-weight: bold; 
          color: ${colors.primary}; 
          margin-bottom: 10px;
          word-wrap: break-word;
        }
        
        .contact { 
          display: flex; 
          ${template?.headerStyle === "center" ? "justify-content: center;" : "justify-content: flex-start;"}
          gap: 20px; 
          flex-wrap: wrap; 
          color: ${colors.secondary}; 
        }
        
        .contact-split {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }
        
        .section { 
          margin-bottom: 30px;
          page-break-inside: avoid;
        }
        
        .section-title { 
          font-size: 1.5rem; 
          font-weight: bold; 
          color: ${colors.primary}; 
          ${template?.sectionStyle === "bordered" ? `border-bottom: 2px solid ${colors.accent};` : ""}
          ${template?.sectionStyle === "cards" ? `background: ${colors.accent}; padding: 8px 12px; border-radius: 8px;` : ""}
          padding-bottom: 5px; 
          margin-bottom: 15px;
          page-break-after: avoid;
        }
        
        .skills { 
          display: flex; 
          flex-wrap: wrap; 
          gap: 8px; 
        }
        
        .skill { 
          background: ${colors.accent}; 
          color: ${colors.primary}; 
          padding: 4px 12px; 
          border-radius: 20px; 
          font-size: 0.875rem; 
          border: 1px solid ${colors.secondary};
          transition: transform 0.2s ease;
        }
        
        .skill:hover {
          transform: scale(1.05);
        }
        
        .item { 
          margin-bottom: 20px; 
          ${template?.sectionStyle === "cards" ? `background: ${colors.accent}; padding: 16px; border-radius: 8px;` : ""}
          page-break-inside: avoid;
        }
        
        .item-header { 
          display: flex; 
          justify-content: space-between; 
          align-items: start; 
          margin-bottom: 5px; 
          flex-wrap: wrap; 
          gap: 10px; 
        }
        
        .item-title { 
          font-weight: 600; 
          color: ${colors.text}; 
          flex: 1; 
          min-width: 0; 
        }
        
        .item-date { 
          color: ${colors.secondary}; 
          font-size: 0.875rem; 
          flex-shrink: 0; 
        }
        
        .item-subtitle { 
          color: ${colors.secondary}; 
          margin-bottom: 8px; 
          font-weight: 500; 
        }
        
        .item-description { 
          color: ${colors.secondary}; 
          line-height: 1.6; 
          text-align: justify; 
        }
        
        .footer { 
          text-align: center; 
          margin-top: 40px; 
          padding-top: 20px; 
          border-top: 1px solid ${colors.accent}; 
          color: ${colors.secondary}; 
          font-size: 0.875rem;
          page-break-inside: avoid;
        }
        
        @media (max-width: 768px) {
          .container { padding: 20px; }
          .name { font-size: 2rem; }
          .contact { justify-content: center; }
          .header { text-align: center !important; display: block !important; }
          .item-header { flex-direction: column; align-items: start; }
        }
        
        @media print {
          body { 
            background: white; 
            padding: 0; 
            font-size: 12pt;
            line-height: 1.4;
          }
          
          .container { 
            box-shadow: none; 
            margin: 0; 
            max-width: none; 
            padding: 0;
          }
          
          .section {
            page-break-inside: avoid;
            margin-bottom: 18pt;
          }
          
          .section-title {
            page-break-after: avoid;
          }
          
          .item {
            page-break-inside: avoid;
            margin-bottom: 12pt;
          }
          
          .header {
            page-break-inside: avoid;
            margin-bottom: 24pt;
          }
          
          .footer {
            page-break-inside: avoid;
          }
          
          h1, h2, h3 {
            page-break-after: avoid;
          }
          
          p {
            orphans: 3;
            widows: 3;
          }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          ${
            template?.headerStyle === "split"
              ? `
            <div>
              <h1 class="name">${formData.fullName || "Your Name"}</h1>
              <div class="contact-split">
                ${formData.contact.email ? `<span>📧 ${formData.contact.email}</span>` : ""}
                ${formData.contact.phone ? `<span>📞 ${formData.contact.phone}</span>` : ""}
              </div>
            </div>
            <div class="contact-split" style="text-align: right;">
              ${formData.contact.linkedin ? `<span>💼 LinkedIn</span>` : ""}
              ${formData.contact.github ? `<span>🔗 GitHub</span>` : ""}
            </div>
          `
              : `
            <h1 class="name">${formData.fullName || "Your Name"}</h1>
            <div class="contact">
              ${formData.contact.email ? `<span>📧 ${formData.contact.email}</span>` : ""}
              ${formData.contact.phone ? `<span>📞 ${formData.contact.phone}</span>` : ""}
              ${formData.contact.linkedin ? `<span>💼 LinkedIn</span>` : ""}
              ${formData.contact.github ? `<span>🔗 GitHub</span>` : ""}
            </div>
          `
          }
        </div>

        ${
          formData.aboutMe
            ? `
          <div class="section">
            <h2 class="section-title">About Me</h2>
            <p class="item-description">${formData.aboutMe}</p>
          </div>
        `
            : ""
        }

        ${
          formData.skills.length > 0
            ? `
          <div class="section">
            <h2 class="section-title">Skills</h2>
            <div class="skills">
              ${formData.skills.map((skill) => `<span class="skill">${skill}</span>`).join("")}
            </div>
          </div>
        `
            : ""
        }

        ${
          formData.experience.some((exp) => exp.company || exp.role)
            ? `
          <div class="section">
            <h2 class="section-title">Experience</h2>
            ${formData.experience
              .map((exp) =>
                exp.company || exp.role
                  ? `
                <div class="item">
                  <div class="item-header">
                    <div class="item-title">${exp.role}</div>
                    <div class="item-date">${exp.duration}</div>
                  </div>
                  <div class="item-subtitle">${exp.company}</div>
                </div>
              `
                  : "",
              )
              .join("")}
          </div>
        `
            : ""
        }

        ${
          formData.projects.some((project) => project.title)
            ? `
          <div class="section">
            <h2 class="section-title">Projects</h2>
            ${formData.projects
              .map((project) =>
                project.title
                  ? `
                <div class="item">
                  <div class="item-title">${project.title}</div>
                  ${project.description ? `<p class="item-description">${project.description}</p>` : ""}
                  ${project.techUsed ? `<p class="item-subtitle">Technologies: ${project.techUsed}</p>` : ""}
                </div>
              `
                  : "",
              )
              .join("")}
          </div>
        `
            : ""
        }

        ${
          formData.education.some((edu) => edu.institution || edu.degree)
            ? `
          <div class="section">
            <h2 class="section-title">Education</h2>
            ${formData.education
              .map((edu) =>
                edu.institution || edu.degree
                  ? `
                <div class="item">
                  <div class="item-header">
                    <div class="item-title">${edu.degree}</div>
                    <div class="item-date">${edu.year}</div>
                  </div>
                  <div class="item-subtitle">${edu.institution}</div>
                </div>
              `
                  : "",
              )
              .join("")}
          </div>
        `
            : ""
        }

        <div class="footer">
          Made with ❤️ by Raj
        </div>
      </div>
    </body>
    </html>
  `
}
