# 🏏 Cricket Site (CPL Tournament)

A modern, high-performance web application designed for managing and tracking cricket tournaments. Built with a focus on real-time data handling and a premium user interface.

## 🚀 Key Features

- **🏆 Tournament Management**: Organize and track CPL (Cricket Premier League) tournaments with ease.
- **⚡ Real-time Data**: Powered by Supabase for instantaneous updates and state-of-the-art database management.
- **🎨 Modern UI**: Crafted with React and Tailwind CSS for a responsive, premium aesthetic.
- **🏗️ Scalable Architecture**: Modular design for future expansions and feature additions.

## 🛠️ Technology Stack

- **Frontend**: [React](https://react.dev/) (v19)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Database / Backend**: [Supabase](https://supabase.com/)
- **Build Tool**: [Vite](https://vitejs.dev/)

## 📦 Project Structure

```bash
.
├── cpl-tournament/       # Core project directory (React source)
│   ├── src/              # Application logic and components
│   ├── public/           # Static assets
│   └── vite.config.js    # Build configuration
├── package.json          # Root dependencies
└── .gitignore            # Git exclusion rules
```

## ⚙️ Getting Started

To get a local version up and running, follow these simple steps.

### Prerequisites

- [Node.js](https://nodejs.org/) (Latest LTS recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/ani18cs/Cricket-site.git
   cd Cricket-site/cpl-tournament
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up Environment Variables**:
   Create a `.env` file in the `cpl-tournament` directory and add your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Launch development server**:
   ```bash
   npm run dev
   ```

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.

---
Built with ❤️ for cricket fans.
