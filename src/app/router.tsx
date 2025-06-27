import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { useAuthStore } from "../features/auth/store/auth.store";
import { LoginPage } from "../features/auth/pages/login-page";
import { RegisterPage } from "../features/auth/pages/register-page";
import { ContactsPage } from "../features/contacts/pages/contacts-page";
import { CreateContactPage } from "../features/contacts/pages/create-contact-page";
import { EditContactPage } from "../features/contacts/pages/edit-contact-page";

// Protected route wrapper component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

// Public route wrapper component (redirects to home if already authenticated)
const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuthStore();

  if (isAuthenticated) {
    return <Navigate to="/contacts" replace />;
  }

  return <>{children}</>;
};

export function AppRouter() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <ContactsPage />
        </ProtectedRoute>
      ),
    },
    {
      path: "/contacts",
      element: (
        <ProtectedRoute>
          <ContactsPage />
        </ProtectedRoute>
      ),
    },
    {
      path: "/contacts/create",
      element: (
        <ProtectedRoute>
          <CreateContactPage />
        </ProtectedRoute>
      ),
    },
    {
      path: "/contacts/edit/:id",
      element: (
        <ProtectedRoute>
          <EditContactPage />
        </ProtectedRoute>
      ),
    },
    {
      path: "/login",
      element: (
        <PublicRoute>
          <LoginPage />
        </PublicRoute>
      ),
    },
    {
      path: "/register",
      element: (
        <PublicRoute>
          <RegisterPage />
        </PublicRoute>
      ),
    },
    {
      path: "*",
      element: <Navigate to="/" replace />,
    },
  ]);

  return <RouterProvider router={router} />;
}
