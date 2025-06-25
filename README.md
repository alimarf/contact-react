# Contact Management App

A modern, responsive contact management application built with React, TypeScript, and Vite. This application allows users to manage their contacts with full CRUD functionality, user authentication, and a clean, intuitive UI.

## 🚀 Features

- 🔐 User Authentication (Login/Register)
- 👥 Contact Management (Create, Read, Update, Delete)
- 🔍 Search and filter contacts
- 📱 Responsive design for all devices
- ✨ Modern UI with smooth animations
- 🛡️ Protected routes for authenticated users

## 🛠 Tech Stack

- **Frontend Framework**: React 18
- **Language**: TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Routing**: React Router
- **HTTP Client**: Axios
- **Form Handling**: React Hook Form
- **Icons**: Lucide Icons
- **Animation**: Framer Motion
- **Linting**: ESLint + Prettier
- **Code Formatting**: Prettier

## 📁 Project Structure

```
src/
├── app/                    # App root components
│   ├── app.tsx             # Main app component
│   └── router.tsx          # Application routes
├── components/             # Reusable UI components
│   └── ui/                 # Shadcn/ui components
├── features/               # Feature-based modules
│   ├── auth/               # Authentication feature
│   │   ├── components/     # Auth components
│   │   ├── pages/          # Auth pages
│   │   └── store/          # Auth state management
│   ├── contacts/           # Contacts feature
│   │   ├── components/     # Contact components
│   │   ├── pages/          # Contact pages
│   │   └── store/          # Contacts state management
│   └── home/               # Home feature
│       └── pages/          # Home pages
├── infrastructure/         # API and service layer
│   └── api/                # API clients and types
├── lib/                    # Utility functions
└── main.tsx                # Application entry point
```

## 🧠 State Management

The application uses **Zustand** for state management, providing a simple and scalable solution for managing global state. The state is organized by feature:

### Auth Store
- Manages user authentication state
- Handles login/logout functionality
- Persists user session

### Contacts Store
- Manages contacts data
- Handles CRUD operations
- Manages loading and error states

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/contact-react.git
   cd contact-react
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   ```

3. Create a `.env` file in the root directory and add your environment variables:
   ```env
   VITE_API_BASE_URL=http://localhost:3000/api
   ```

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:5173](http://localhost:5173) in your browser.

## 🧪 Running Tests

```bash
npm test
# or
yarn test
```

## 🏗 Building for Production

```bash
npm run build
# or
yarn build
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Made with ❤️ by [Your Name]
