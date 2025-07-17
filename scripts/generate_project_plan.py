from reportlab.lib.pagesizes import letter, A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.lib.colors import HexColor, black, white
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak
from reportlab.platypus.tableofcontents import TableOfContents
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_JUSTIFY
from datetime import datetime
import os

def create_project_plan_pdf():
    # Create the PDF document
    filename = "Portfolio_Resume_Builder_Project_Plan.pdf"
    doc = SimpleDocTemplate(filename, pagesize=A4, topMargin=0.5*inch, bottomMargin=0.5*inch)
    
    # Get sample styles and create custom styles
    styles = getSampleStyleSheet()
    
    # Custom styles
    title_style = ParagraphStyle(
        'CustomTitle',
        parent=styles['Title'],
        fontSize=24,
        spaceAfter=30,
        textColor=HexColor('#1e40af'),
        alignment=TA_CENTER
    )
    
    heading1_style = ParagraphStyle(
        'CustomHeading1',
        parent=styles['Heading1'],
        fontSize=18,
        spaceAfter=12,
        spaceBefore=20,
        textColor=HexColor('#1e40af'),
        borderWidth=1,
        borderColor=HexColor('#dbeafe'),
        borderPadding=8,
        backColor=HexColor('#f0f9ff')
    )
    
    heading2_style = ParagraphStyle(
        'CustomHeading2',
        parent=styles['Heading2'],
        fontSize=14,
        spaceAfter=8,
        spaceBefore=12,
        textColor=HexColor('#1f2937'),
        leftIndent=10
    )
    
    body_style = ParagraphStyle(
        'CustomBody',
        parent=styles['Normal'],
        fontSize=11,
        spaceAfter=6,
        alignment=TA_JUSTIFY,
        leftIndent=20
    )
    
    bullet_style = ParagraphStyle(
        'BulletStyle',
        parent=styles['Normal'],
        fontSize=10,
        spaceAfter=4,
        leftIndent=30,
        bulletIndent=20
    )
    
    # Story list to hold all content
    story = []
    
    # Title Page
    story.append(Paragraph("Custom Portfolio & Resume Builder", title_style))
    story.append(Spacer(1, 0.3*inch))
    story.append(Paragraph("Complete Development Guide", styles['Heading2']))
    story.append(Spacer(1, 0.2*inch))
    story.append(Paragraph(f"Generated on: {datetime.now().strftime('%B %d, %Y')}", styles['Normal']))
    story.append(Spacer(1, 0.5*inch))
    
    # Project Overview
    story.append(Paragraph("📋 Project Overview", heading1_style))
    story.append(Paragraph("""
    This comprehensive guide outlines the step-by-step development process for creating a modern, 
    responsive Custom Portfolio & Resume Builder web application. The project is designed for 
    students and job seekers who need professional portfolios and resumes.
    """, body_style))
    
    story.append(Paragraph("🎯 Key Features:", heading2_style))
    features = [
        "Responsive web interface with modern design",
        "Real-time preview functionality",
        "PDF generation and download",
        "HTML portfolio publishing",
        "Multiple professional templates",
        "Form validation and error handling",
        "Mobile-first responsive design"
    ]
    
    for feature in features:
        story.append(Paragraph(f"• {feature}", bullet_style))
    
    story.append(PageBreak())
    
    # Phase 1: Project Setup
    story.append(Paragraph("Phase 1: Project Setup & Foundation", heading1_style))
    
    story.append(Paragraph("Step 1.1: Environment Setup", heading2_style))
    story.append(Paragraph("Set up the development environment and initialize the project.", body_style))
    
    setup_tasks = [
        "Install Node.js (v18 or higher) and npm",
        "Create new Next.js project: `npx create-next-app@latest portfolio-builder`",
        "Install required dependencies: Tailwind CSS, shadcn/ui components",
        "Set up TypeScript configuration",
        "Configure ESLint and Prettier for code formatting",
        "Initialize Git repository and create initial commit"
    ]
    
    for task in setup_tasks:
        story.append(Paragraph(f"• {task}", bullet_style))
    
    story.append(Paragraph("Step 1.2: Project Structure", heading2_style))
    story.append(Paragraph("Organize the project with a clean, scalable folder structure.", body_style))
    
    structure_items = [
        "Create `/components` folder for reusable UI components",
        "Create `/types` folder for TypeScript interfaces",
        "Create `/utils` folder for utility functions",
        "Create `/hooks` folder for custom React hooks",
        "Set up `/public` folder for static assets",
        "Configure `/styles` folder for global CSS"
    ]
    
    for item in structure_items:
        story.append(Paragraph(f"• {item}", bullet_style))
    
    story.append(Paragraph("⏱️ Estimated Time: 2-3 hours", body_style))
    story.append(Spacer(1, 0.2*inch))
    
    # Phase 2: UI Components
    story.append(Paragraph("Phase 2: Core UI Components Development", heading1_style))
    
    story.append(Paragraph("Step 2.1: Navigation Component", heading2_style))
    story.append(Paragraph("Build the responsive navigation bar with logo and menu items.", body_style))
    
    nav_tasks = [
        "Create responsive navigation component",
        "Implement mobile hamburger menu",
        "Add logo and branding elements",
        "Style with Tailwind CSS utilities",
        "Add hover effects and transitions",
        "Test responsiveness across devices"
    ]
    
    for task in nav_tasks:
        story.append(Paragraph(f"• {task}", bullet_style))
    
    story.append(Paragraph("Step 2.2: Hero Section", heading2_style))
    story.append(Paragraph("Design an engaging hero section with compelling copy and call-to-action.", body_style))
    
    hero_tasks = [
        "Create hero component with gradient background",
        "Add compelling headline with gradient text",
        "Implement call-to-action button",
        "Add responsive typography",
        "Optimize for mobile devices",
        "Add subtle animations"
    ]
    
    for task in hero_tasks:
        story.append(Paragraph(f"• {task}", bullet_style))
    
    story.append(Paragraph("Step 2.3: Template Cards", heading2_style))
    story.append(Paragraph("Build template showcase cards with preview functionality.", body_style))
    
    template_tasks = [
        "Design template card components",
        "Add hover effects and animations",
        "Implement preview and use buttons",
        "Create responsive grid layout",
        "Add template thumbnails",
        "Style with modern card design"
    ]
    
    for task in template_tasks:
        story.append(Paragraph(f"• {task}", bullet_style))
    
    story.append(Paragraph("⏱️ Estimated Time: 6-8 hours", body_style))
    story.append(PageBreak())
    
    # Phase 3: Form Components
    story.append(Paragraph("Phase 3: Form Components & Data Management", heading1_style))
    
    story.append(Paragraph("Step 3.1: TypeScript Interfaces", heading2_style))
    story.append(Paragraph("Define comprehensive type definitions for form data.", body_style))
    
    type_tasks = [
        "Create FormData interface with all sections",
        "Define interfaces for Education, Projects, Experience",
        "Add ContactInfo interface",
        "Create Template interface",
        "Export all types from index file",
        "Add JSDoc comments for documentation"
    ]
    
    for task in type_tasks:
        story.append(Paragraph(f"• {task}", bullet_style))
    
    story.append(Paragraph("Step 3.2: Form Sections", heading2_style))
    story.append(Paragraph("Build individual form sections with proper validation.", body_style))
    
    form_tasks = [
        "Personal Information form (name, about me)",
        "Skills input with tag functionality",
        "Education section with multiple entries",
        "Projects section with GitHub links",
        "Experience section with company details",
        "Contact information form",
        "Add form validation and error handling"
    ]
    
    for task in form_tasks:
        story.append(Paragraph(f"• {task}", bullet_style))
    
    story.append(Paragraph("Step 3.3: State Management", heading2_style))
    story.append(Paragraph("Implement efficient state management for form data.", body_style))
    
    state_tasks = [
        "Set up React useState for form data",
        "Create update functions with useCallback",
        "Implement add/remove functionality for arrays",
        "Add form reset functionality",
        "Optimize re-renders with React.memo",
        "Add local storage persistence"
    ]
    
    for task in state_tasks:
        story.append(Paragraph(f"• {task}", bullet_style))
    
    story.append(Paragraph("⏱️ Estimated Time: 8-10 hours", body_style))
    story.append(Spacer(1, 0.2*inch))
    
    # Phase 4: Preview System
    story.append(Paragraph("Phase 4: Real-time Preview System", heading1_style))
    
    story.append(Paragraph("Step 4.1: Preview Component", heading2_style))
    story.append(Paragraph("Build the live preview component that updates in real-time.", body_style))
    
    preview_tasks = [
        "Create ResumePreview component with forwardRef",
        "Design professional resume layout",
        "Implement conditional rendering for sections",
        "Add proper typography and spacing",
        "Style with print-friendly CSS",
        "Add responsive design for mobile preview"
    ]
    
    for task in preview_tasks:
        story.append(Paragraph(f"• {task}", bullet_style))
    
    story.append(Paragraph("Step 4.2: Real-time Updates", heading2_style))
    story.append(Paragraph("Ensure preview updates instantly as user types.", body_style))
    
    realtime_tasks = [
        "Connect form data to preview component",
        "Optimize rendering performance",
        "Add debouncing for smooth updates",
        "Handle empty states gracefully",
        "Add loading states where needed",
        "Test real-time functionality"
    ]
    
    for task in realtime_tasks:
        story.append(Paragraph(f"• {task}", bullet_style))
    
    story.append(Paragraph("⏱️ Estimated Time: 4-6 hours", body_style))
    story.append(PageBreak())
    
    # Phase 5: PDF Generation
    story.append(Paragraph("Phase 5: PDF Generation & Export", heading1_style))
    
    story.append(Paragraph("Step 5.1: PDF Library Setup", heading2_style))
    story.append(Paragraph("Install and configure PDF generation libraries.", body_style))
    
    pdf_setup_tasks = [
        "Install jsPDF and html2canvas libraries",
        "Add TypeScript definitions",
        "Create PDF utility functions",
        "Set up error handling",
        "Configure PDF page settings",
        "Test basic PDF generation"
    ]
    
    for task in pdf_setup_tasks:
        story.append(Paragraph(f"• {task}", bullet_style))
    
    story.append(Paragraph("Step 5.2: PDF Generation Logic", heading2_style))
    story.append(Paragraph("Implement the core PDF generation functionality.", body_style))
    
    pdf_logic_tasks = [
        "Create generatePDF utility function",
        "Implement html2canvas conversion",
        "Handle multi-page PDF generation",
        "Add custom filename generation",
        "Implement download functionality",
        "Add progress indicators",
        "Handle errors gracefully"
    ]
    
    for task in pdf_logic_tasks:
        story.append(Paragraph(f"• {task}", bullet_style))
    
    story.append(Paragraph("Step 5.3: Portfolio HTML Export", heading2_style))
    story.append(Paragraph("Create standalone HTML portfolio export functionality.", body_style))
    
    html_export_tasks = [
        "Create HTML template generator",
        "Add embedded CSS styling",
        "Implement responsive design",
        "Add professional typography",
        "Create download functionality",
        "Test cross-browser compatibility"
    ]
    
    for task in html_export_tasks:
        story.append(Paragraph(f"• {task}", bullet_style))
    
    story.append(Paragraph("⏱️ Estimated Time: 6-8 hours", body_style))
    story.append(Spacer(1, 0.2*inch))
    
    # Phase 6: Optimization
    story.append(Paragraph("Phase 6: Performance Optimization", heading1_style))
    
    story.append(Paragraph("Step 6.1: Component Optimization", heading2_style))
    story.append(Paragraph("Optimize React components for better performance.", body_style))
    
    optimization_tasks = [
        "Implement React.memo for expensive components",
        "Use useCallback for event handlers",
        "Optimize re-renders with useMemo",
        "Split large components into smaller ones",
        "Implement lazy loading where appropriate",
        "Add performance monitoring"
    ]
    
    for task in optimization_tasks:
        story.append(Paragraph(f"• {task}", bullet_style))
    
    story.append(Paragraph("Step 6.2: Bundle Optimization", heading2_style))
    story.append(Paragraph("Optimize the application bundle size and loading performance.", body_style))
    
    bundle_tasks = [
        "Analyze bundle size with webpack-bundle-analyzer",
        "Implement code splitting",
        "Optimize images and assets",
        "Remove unused dependencies",
        "Configure Next.js optimization settings",
        "Add compression and caching"
    ]
    
    for task in bundle_tasks:
        story.append(Paragraph(f"• {task}", bullet_style))
    
    story.append(Paragraph("⏱️ Estimated Time: 4-5 hours", body_style))
    story.append(PageBreak())
    
    # Phase 7: Testing & Quality
    story.append(Paragraph("Phase 7: Testing & Quality Assurance", heading1_style))
    
    story.append(Paragraph("Step 7.1: Unit Testing", heading2_style))
    story.append(Paragraph("Write comprehensive unit tests for components and utilities.", body_style))
    
    testing_tasks = [
        "Set up Jest and React Testing Library",
        "Write tests for form components",
        "Test PDF generation functionality",
        "Add tests for utility functions",
        "Test state management logic",
        "Achieve 80%+ code coverage"
    ]
    
    for task in testing_tasks:
        story.append(Paragraph(f"• {task}", bullet_style))
    
    story.append(Paragraph("Step 7.2: Integration Testing", heading2_style))
    story.append(Paragraph("Test the complete user workflow and integration points.", body_style))
    
    integration_tasks = [
        "Test complete form submission flow",
        "Test PDF generation end-to-end",
        "Test responsive design on devices",
        "Validate accessibility compliance",
        "Test browser compatibility",
        "Performance testing and optimization"
    ]
    
    for task in integration_tasks:
        story.append(Paragraph(f"• {task}", bullet_style))
    
    story.append(Paragraph("⏱️ Estimated Time: 6-8 hours", body_style))
    story.append(Spacer(1, 0.2*inch))
    
    # Phase 8: Deployment
    story.append(Paragraph("Phase 8: Deployment & Launch", heading1_style))
    
    story.append(Paragraph("Step 8.1: Production Build", heading2_style))
    story.append(Paragraph("Prepare the application for production deployment.", body_style))
    
    build_tasks = [
        "Configure production environment variables",
        "Optimize build settings",
        "Test production build locally",
        "Set up error monitoring",
        "Configure analytics tracking",
        "Prepare deployment scripts"
    ]
    
    for task in build_tasks:
        story.append(Paragraph(f"• {task}", bullet_style))
    
    story.append(Paragraph("Step 8.2: Deployment", heading2_style))
    story.append(Paragraph("Deploy the application to production hosting.", body_style))
    
    deployment_tasks = [
        "Set up Vercel deployment",
        "Configure custom domain",
        "Set up SSL certificates",
        "Configure CDN and caching",
        "Set up monitoring and alerts",
        "Test production deployment"
    ]
    
    for task in deployment_tasks:
        story.append(Paragraph(f"• {task}", bullet_style))
    
    story.append(Paragraph("⏱️ Estimated Time: 3-4 hours", body_style))
    story.append(PageBreak())
    
    # Technical Requirements
    story.append(Paragraph("🛠️ Technical Requirements", heading1_style))
    
    story.append(Paragraph("Frontend Technologies:", heading2_style))
    frontend_tech = [
        "Next.js 14+ (React framework)",
        "TypeScript (type safety)",
        "Tailwind CSS (styling)",
        "shadcn/ui (component library)",
        "Lucide React (icons)",
        "jsPDF (PDF generation)",
        "html2canvas (HTML to image conversion)"
    ]
    
    for tech in frontend_tech:
        story.append(Paragraph(f"• {tech}", bullet_style))
    
    story.append(Paragraph("Development Tools:", heading2_style))
    dev_tools = [
        "Node.js 18+ and npm",
        "VS Code or preferred IDE",
        "Git for version control",
        "ESLint and Prettier",
        "Jest and React Testing Library",
        "Chrome DevTools"
    ]
    
    for tool in dev_tools:
        story.append(Paragraph(f"• {tool}", bullet_style))
    
    # Project Timeline
    story.append(Paragraph("📅 Project Timeline", heading1_style))
    
    timeline_data = [
        ['Phase', 'Duration', 'Key Deliverables'],
        ['Phase 1: Setup', '2-3 hours', 'Project structure, dependencies'],
        ['Phase 2: UI Components', '6-8 hours', 'Navigation, hero, templates'],
        ['Phase 3: Forms', '8-10 hours', 'All form sections, validation'],
        ['Phase 4: Preview', '4-6 hours', 'Real-time preview system'],
        ['Phase 5: PDF Export', '6-8 hours', 'PDF and HTML generation'],
        ['Phase 6: Optimization', '4-5 hours', 'Performance improvements'],
        ['Phase 7: Testing', '6-8 hours', 'Unit and integration tests'],
        ['Phase 8: Deployment', '3-4 hours', 'Production deployment'],
        ['Total', '39-52 hours', 'Complete application']
    ]
    
    timeline_table = Table(timeline_data, colWidths=[2*inch, 1.5*inch, 2.5*inch])
    timeline_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), HexColor('#1e40af')),
        ('TEXTCOLOR', (0, 0), (-1, 0), white),
        ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('FONTSIZE', (0, 0), (-1, 0), 12),
        ('BOTTOMPADDING', (0, 0), (-1, 0), 12),
        ('BACKGROUND', (0, 1), (-1, -2), HexColor('#f8fafc')),
        ('BACKGROUND', (0, -1), (-1, -1), HexColor('#dbeafe')),
        ('FONTNAME', (0, -1), (-1, -1), 'Helvetica-Bold'),
        ('GRID', (0, 0), (-1, -1), 1, black)
    ]))
    
    story.append(timeline_table)
    story.append(Spacer(1, 0.3*inch))
    
    # Best Practices
    story.append(Paragraph("💡 Best Practices & Tips", heading1_style))
    
    story.append(Paragraph("Code Quality:", heading2_style))
    quality_tips = [
        "Use TypeScript for type safety and better developer experience",
        "Follow consistent naming conventions (camelCase, PascalCase)",
        "Write self-documenting code with clear variable names",
        "Add JSDoc comments for complex functions",
        "Use ESLint and Prettier for consistent code formatting",
        "Implement proper error handling and user feedback"
    ]
    
    for tip in quality_tips:
        story.append(Paragraph(f"• {tip}", bullet_style))
    
    story.append(Paragraph("Performance:", heading2_style))
    performance_tips = [
        "Use React.memo and useCallback to prevent unnecessary re-renders",
        "Implement lazy loading for heavy components",
        "Optimize images and use appropriate formats",
        "Minimize bundle size by removing unused dependencies",
        "Use Next.js built-in optimizations (Image, Link components)",
        "Monitor Core Web Vitals and performance metrics"
    ]
    
    for tip in performance_tips:
        story.append(Paragraph(f"• {tip}", bullet_style))
    
    story.append(Paragraph("User Experience:", heading2_style))
    ux_tips = [
        "Implement responsive design for all screen sizes",
        "Add loading states and progress indicators",
        "Provide clear error messages and validation feedback",
        "Use consistent spacing and typography",
        "Ensure accessibility compliance (WCAG guidelines)",
        "Test on multiple devices and browsers"
    ]
    
    for tip in ux_tips:
        story.append(Paragraph(f"• {tip}", bullet_style))
    
    # Conclusion
    story.append(PageBreak())
    story.append(Paragraph("🎉 Conclusion", heading1_style))
    story.append(Paragraph("""
    This comprehensive project plan provides a structured approach to building a professional 
    Custom Portfolio & Resume Builder. By following these phases and best practices, you'll 
    create a modern, performant, and user-friendly application that helps students and job 
    seekers create outstanding portfolios and resumes.
    
    Remember to test thoroughly at each phase, gather user feedback, and iterate on the design 
    and functionality. The estimated timeline of 39-52 hours can be spread over 2-3 weeks 
    depending on your availability and experience level.
    
    Good luck with your project development!
    """, body_style))
    
    # Build the PDF
    doc.build(story)
    print(f"✅ Project plan PDF generated successfully: {filename}")
    return filename

# Generate the PDF
if __name__ == "__main__":
    filename = create_project_plan_pdf()
    print(f"📄 PDF saved as: {filename}")
