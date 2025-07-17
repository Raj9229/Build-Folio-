# 🚀 Build-Folio: Professional Portfolio & Resume Builder

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/rajgupta807633-gmailcoms-projects/v0-custom-portfolio-builder)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.dev-black?style=for-the-badge)](https://v0.dev/chat/projects/HDY0nlP8Z5L)
[![Next.js](https://img.shields.io/badge/Next.js-15.2.4-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

> A modern, intuitive portfolio and resume builder that helps professionals create stunning, customizable portfolios and generate high-quality PDF resumes with real-time preview.

## ✨ Features

### 🎨 **Template Variety**
- Multiple professional template designs
- Real-time template switching
- Responsive layouts optimized for all devices

### 📝 **Interactive Form Builder**
- **Personal Information**: Name, contact details, professional summary
- **Education**: Multiple education entries with institutions and dates
- **Work Experience**: Detailed work history with descriptions
- **Projects**: Showcase your best work with descriptions and links
- **Skills**: Tag-based skill management system

### 🔧 **Advanced Functionality**
- **Real-time Preview**: See changes instantly as you type
- **PDF Generation**: High-quality PDF export with progress tracking
- **Local Storage**: Auto-save functionality to prevent data loss
- **Form Validation**: Comprehensive validation with helpful error messages
- **Password Protection**: Secure your portfolios with custom passwords
- **Dark/Light Mode**: Theme switching for better user experience

### 🛡️ **Security & Performance**
- Client-side data processing for privacy
- Optimized bundle size with code splitting
- Progressive Web App (PWA) capabilities
- Responsive design for mobile and desktop

## 🚀 Live Demo

**[View Live Application](https://v0-custom-portfolio-builder-5brrzspym.vercel.app/)**

## 🛠️ Tech Stack

- **Framework**: [Next.js 15.2.4](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/) with custom styling
- **Form Management**: [React Hook Form](https://react-hook-form.com/) with validation
- **PDF Generation**: [jsPDF](https://github.com/parallax/jsPDF) with HTML2Canvas
- **Icons**: [Lucide React](https://lucide.dev/)
- **Package Manager**: [pnpm](https://pnpm.io/)

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- pnpm (recommended) or npm

### Quick Start

```bash
# Clone the repository
git clone https://github.com/Raj9229/Build-Folio-.git
cd Build-Folio-

# Install dependencies
pnpm install

# Start development server
pnpm dev

# Open your browser
# Navigate to http://localhost:3000
```

### Alternative Installation Methods

```bash
# Using npm
npm install && npm run dev

# Using yarn
yarn install && yarn dev
```

## 🎯 Usage

### Creating Your Portfolio

1. **Personal Information**: Fill in your basic details and professional summary
2. **Education**: Add your educational background with institutions and dates
3. **Experience**: Detail your work history with descriptions and achievements
4. **Projects**: Showcase your portfolio projects with descriptions and links
5. **Skills**: Add relevant skills using the tag-based system

### Template Selection
- Browse available templates in the template section
- Click on any template to see a real-time preview
- Switch between templates without losing your data

### PDF Export
- Click the "Generate PDF" button
- Monitor progress with the built-in progress tracker
- Download your professionally formatted resume

### Data Management
- Your data is automatically saved to local storage
- Use the save/load functionality for data persistence
- Export your data for backup purposes

## 🏗️ Project Structure

```
Build-Folio-/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Main application page
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── form-section.tsx  # Form management
│   ├── hero-section.tsx  # Landing section
│   ├── navigation.tsx    # Navigation bar
│   ├── template-*.tsx    # Template components
│   └── ...
├── hooks/                # Custom React hooks
│   ├── useFormData.ts    # Form state management
│   ├── usePDFGeneration.ts # PDF generation logic
│   └── use-toast.ts      # Toast notifications
├── lib/                  # Utility libraries
│   ├── constants.ts      # App configuration
│   ├── utils.ts          # Helper functions
│   └── validation.ts     # Form validation schemas
├── types/                # TypeScript type definitions
├── utils/                # Utility functions
│   └── pdf-generator.ts  # PDF generation utilities
└── public/               # Static assets
```

## 🧩 Available Scripts

```bash
# Development
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint

# Utility Scripts
pnpm type-check   # TypeScript type checking
pnpm format       # Code formatting
```

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file for local development:

```env
# Add any environment-specific variables here
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Customization
- **Templates**: Add new templates in `types/templates.ts`
- **Styling**: Modify Tailwind configuration in `tailwind.config.ts`
- **Components**: Extend UI components in `components/ui/`

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit your changes**: `git commit -m 'Add amazing feature'`
4. **Push to the branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Development Guidelines
- Follow TypeScript best practices
- Maintain consistent code formatting
- Add tests for new features
- Update documentation as needed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [v0.dev](https://v0.dev) for rapid prototyping
- UI components powered by [Radix UI](https://www.radix-ui.com/)
- Icons from [Lucide](https://lucide.dev/)
- Hosted on [Vercel](https://vercel.com/)

## 🐛 Issues & Support

- **Bug Reports**: [Create an issue](https://github.com/Raj9229/Build-Folio-/issues)
- **Feature Requests**: [Start a discussion](https://github.com/Raj9229/Build-Folio-/discussions)
- **Documentation**: Check the [Wiki](https://github.com/Raj9229/Build-Folio-/wiki)

## 🔮 Roadmap

- [ ] Additional template designs
- [ ] Export to multiple formats (JSON, XML)
- [ ] Social media integration
- [ ] Template marketplace
- [ ] Advanced PDF customization
- [ ] Multi-language support
- [ ] Real-time collaboration features

---

<div align="center">

**[⭐ Star this repository](https://github.com/Raj9229/Build-Folio-)** if you find it helpful!

Made with ❤️ by [Raj Gupta](https://github.com/Raj9229)

</div>
