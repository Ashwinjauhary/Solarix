# SolarFlow Viz 🌞⚡

An interactive 3D visualization platform for solar energy workflow monitoring and analytics. Built with React, Three.js, and TypeScript, this application provides real-time visualization of solar panel data flow from light capture to energy output.

![Solar Energy Workflow](https://img.shields.io/badge/Solar-Energy-yellow?style=for-the-badge)
![React](https://img.shields.io/badge/React-18.3.1-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue?style=for-the-badge&logo=typescript)
![Three.js](https://img.shields.io/badge/Three.js-0.160.1-black?style=for-the-badge&logo=three.js)

## ✨ Features

### 🎨 Interactive 3D Visualization
- **Real-time 3D Scene**: Immersive visualization of solar energy workflow components
- **Interactive Controls**: Drag to rotate, scroll to zoom, and explore the 3D environment
- **Full-Screen Mode**: Maximize the 3D view for detailed analysis
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices

### 📊 Workflow Monitoring
- **Step-by-Step Visualization**: Track energy flow through multiple stages:
  - Solar Input (Light Capture)
  - Sensor Reading (Voltage & Current)
  - Arduino Processing
  - Power Output
  - Analytics & Efficiency Calculation
- **Real-time Sensor Data**: Live fluctuating sensor readings with realistic noise simulation
- **Progress Tracking**: Visual progress indicators for each workflow step

### 📈 Analytics Dashboard
- **Multi-View Interface**: Switch between Dashboard, Analytics, Health, and Future views
- **Live Metrics**: Real-time monitoring of:
  - Light Intensity (Lux)
  - Voltage (V)
  - Current (A)
  - Power Output (W)
  - System Efficiency (%)
- **Data Visualization**: Charts and graphs powered by Recharts

### 🎯 Modern UI/UX
- **Glassmorphism Design**: Modern glass-panel aesthetic with backdrop blur effects
- **Neon Accents**: Cyberpunk-inspired neon text and glowing elements
- **Dark Theme**: Eye-friendly dark mode with customizable themes via next-themes
- **Smooth Animations**: GSAP-powered transitions and micro-interactions

## 🚀 Tech Stack

### Core Framework
- **React 18.3.1** - UI library
- **TypeScript 5.8.3** - Type-safe development
- **Vite 5.4.19** - Fast build tool and dev server

### 3D Graphics
- **Three.js 0.160.1** - 3D rendering engine
- **@react-three/fiber 8.18.0** - React renderer for Three.js
- **@react-three/drei 9.122.0** - Useful helpers for R3F
- **@react-three/postprocessing 2.19.1** - Post-processing effects

### UI Components
- **Radix UI** - Accessible component primitives
- **shadcn/ui** - Beautiful, customizable components
- **Tailwind CSS 3.4.17** - Utility-first CSS framework
- **Lucide React** - Icon library

### State Management & Data
- **React Context API** - Workflow state management
- **TanStack Query 5.83.0** - Server state management
- **React Hook Form 7.61.1** - Form handling
- **Zod 3.25.76** - Schema validation

### Additional Libraries
- **Recharts 2.15.4** - Data visualization
- **date-fns 3.6.0** - Date utilities
- **Sonner** - Toast notifications
- **next-themes** - Theme management

## 📦 Installation

### Prerequisites
- Node.js 18+ or Bun
- npm, yarn, or bun package manager

### Setup

1. **Clone the repository**
```bash
git clone <repository-url>
cd solarflow-viz-main
```

2. **Install dependencies**
```bash
npm install
# or
bun install
```

3. **Start development server**
```bash
npm run dev
# or
bun dev
```

4. **Open in browser**
```
http://localhost:5173
```

## 🛠️ Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build production bundle |
| `npm run build:dev` | Build with development mode |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint for code quality |

## 📁 Project Structure

```
solarflow-viz-main/
├── src/
│   ├── components/
│   │   ├── 3d/              # 3D components (Scene, Arduino, Sensor, LCD)
│   │   ├── dashboard/       # Dashboard view components
│   │   ├── layout/          # Layout components (Header, Sidebar)
│   │   └── ui/              # Reusable UI components
│   ├── context/
│   │   └── WorkflowContext.tsx  # Workflow state management
│   ├── hooks/               # Custom React hooks
│   ├── lib/                 # Utility functions
│   ├── pages/               # Page components
│   ├── types/               # TypeScript type definitions
│   ├── App.tsx              # Main app component
│   └── main.tsx             # Entry point
├── public/                  # Static assets
├── index.html              # HTML template
├── vite.config.ts          # Vite configuration
├── tailwind.config.ts      # Tailwind CSS configuration
└── tsconfig.json           # TypeScript configuration
```

## 🎮 Usage

### Navigation
- **Sidebar Menu**: Access different views (Dashboard, Workflow, Analytics, Health, Future)
- **Mobile Menu**: Tap the menu icon on mobile devices to open the sidebar
- **Full-Screen Toggle**: Click the maximize icon in the 3D view for immersive experience

### Workflow Control
1. Navigate to the **Workflow** tab
2. Click **Start Workflow** to begin the simulation
3. Watch as energy flows through each component:
   - Solar panels capture light
   - Sensors measure voltage and current
   - Arduino processes the data
   - System calculates power output and efficiency
4. Use **Reset** to restart the workflow
5. Monitor real-time sensor data in the Analytics Panel

### 3D Scene Interaction
- **Rotate**: Click and drag to rotate the camera
- **Zoom**: Scroll to zoom in/out
- **Full-Screen**: Click the maximize button for full-screen view

## 🎨 Customization

### Theme Configuration
The project uses Tailwind CSS with custom theme configuration in `tailwind.config.ts`. Modify colors, fonts, and animations to match your preferences.

### 3D Components
3D components are located in `src/components/3d/`. You can customize:
- Component models and geometries
- Materials and textures
- Lighting and camera positions
- Animations and effects

### Workflow Steps
Modify workflow steps in `src/types/workflow.ts` and update the context in `src/context/WorkflowContext.tsx` to add or remove stages.

## 🚢 Deployment

### Build for Production
```bash
npm run build
```

The optimized build will be in the `dist/` directory.

### Deploy to Vercel
This project includes a `vercel.json` configuration file for easy deployment to Vercel:

```bash
vercel deploy
```

### Other Platforms
The static build can be deployed to:
- Netlify
- GitHub Pages
- AWS S3 + CloudFront
- Any static hosting service

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- **Three.js** - Amazing 3D library
- **React Three Fiber** - React renderer for Three.js
- **shadcn/ui** - Beautiful component library
- **Radix UI** - Accessible primitives
- **Tailwind CSS** - Utility-first CSS framework

## 📧 Contact

For questions, suggestions, or issues, please open an issue on GitHub.

---

**Built with ❤️ using React, Three.js, and TypeScript**
