# ContactME - Modern Contact Management

A sleek, responsive contact management application built with React 18, TypeScript, and Vite. This application provides a seamless experience for managing your contacts with full CRUD operations, user authentication, and an intuitive interface.

## 🚀 Features

- 🔐 Secure Authentication (Login/Register with JWT)
- 👥 Complete Contact Management (Create, Read, Update, Delete)
- 🔍 Real-time Search by Name
- 📱 Fully Responsive Design
- ✨ Modern UI with Framer Motion Animations
- 🛡️ Protected Routes & Authentication Guards
- 📝 Form Validation with React Hook Form & Zod
- 🔄 Real-time State Management with Zustand
- 🎨 Beautiful UI with Tailwind CSS & Shadcn/ui Components

## 🛠 Tech Stack

- **Frontend Framework**: React 18
- **Language**: TypeScript 5.x
- **Build Tool**: Vite 5.x
- **Styling**: 
  - Tailwind CSS 3.x
  - CSS Modules
  - Class Variance Authority (CVA)
- **UI Components**: Shadcn/ui
- **State Management**: 
  - Zustand 4.x
  - React Query (for server state)
- **Routing**: React Router 6.x
- **Form Handling**: 
  - React Hook Form 7.x
  - Zod (Schema Validation)
- **Icons**: Lucide React
- **Animation**: Framer Motion 11.x
- **HTTP Client**: Axios
- **Linting & Formatting**:
  - ESLint
  - Prettier
  - TypeScript ESLint

## 📁 Project Structure

```
src/
├── app/                    # App routing and layout
│   ├── app.tsx             # Root layout component
│   └── router.tsx          # Application routes configuration
│
├── components/            # Shared UI components
│   ├── ui/                 # Shadcn/ui components
│   └── shared/             # App-wide shared components
│
├── features/              # Feature-based modules
│   ├── auth/               # Authentication
│   │   ├── components/     # Login/Register forms
│   │   ├── pages/          # Auth pages
│   │   └── store/          # Auth state & logic
│   │
│   └── contacts/         # Contacts feature
│       ├── components/     # Contact components
│       ├── pages/          # Contact pages (list, create, edit)
│       └── store/          # Contacts state & API calls
│
├── infrastructure/        # API and service layer
│   ├── api/                # API clients
│   └── config/             # App configuration
│
├── lib/                   # Utility functions
│   ├── hooks/              # Custom React hooks
│   └── utils/              # Helper functions
│
├── types/                 # Global TypeScript types
└── main.tsx                # App entry point
```

## 🧠 State Management

The application leverages **Zustand** for client-side state management, providing a simple yet powerful solution. The state is organized into feature-specific stores:

### Auth Store
- Manages user authentication state and session
- Handles login/logout flows with JWT
- Persists user session across page reloads
- Provides user profile information

### Contacts Store
- Centralized management of contacts data
- Implements CRUD operations with optimistic updates
- Handles loading, error, and success states
- Manages search and filtering functionality
- Provides real-time updates to the UI

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

## 🧪 Testing Strategy

The application uses Jest and React Testing Library for comprehensive testing:

### Unit Tests

- **Components**: Tests for individual UI components to ensure they render correctly and respond to user interactions
- **Stores**: Tests for Zustand stores to verify state management logic
- **Hooks**: Tests for custom React hooks to validate their behavior

### Regression Tests

- **User Flows**: End-to-end tests for critical user journeys like login, contact management, and logout
- **Integration**: Tests for interactions between components and stores

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode during development
npm run test:watch

# Generate test coverage report
npm run test:coverage
```

### Test Structure

Tests are organized alongside the code they test:

```
src/
├── features/
│   ├── auth/
│   │   ├── __tests__/       # Auth flow tests
│   │   ├── components/
│   │   │   └── __tests__/   # Auth component tests
│   │   └── store/
│   │       └── __tests__/   # Auth store tests
│   └── contacts/
│       ├── __tests__/       # Contact flow tests
│       ├── components/
│       │   └── __tests__/   # Contact component tests
│       └── store/
│           └── __tests__/   # Contact store tests
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

## 📸 Screenshots

![Contacts List](/screenshots/contacts-list.png)
*Contacts list with search functionality*

![Add Contact](/screenshots/add-contact.png)
*Add new contact form*

## 🛠 Development

### Available Scripts

- `dev` - Start development server
- `build` - Build for production
- `preview` - Preview production build
- `test` - Run tests
- `lint` - Run eslint
- `format` - Format code with prettier

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=http://localhost:3000/api
VITE_APP_TITLE=ContactME
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
by alimarf

