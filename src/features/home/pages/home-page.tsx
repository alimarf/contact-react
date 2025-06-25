import { useNavigate } from 'react-router-dom';
import { Button } from '../../../components/ui/button';
import { useAuthStore } from '../../auth/store/auth.store';
import { Contact, User } from 'lucide-react';

export function HomePage() {
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuthStore();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-md space-y-8 rounded-lg border border-border bg-card p-6 shadow-sm">
        <div className="space-y-4 text-center">
          <h1 className="text-3xl font-bold">Welcome to Auth App</h1>
          
          {isAuthenticated ? (
            <>
              <div className="flex items-center justify-center gap-2 mb-2">
                <User className="w-5 h-5 text-primary" />
                <p className="text-xl font-medium">Hello, {user?.name}!</p>
              </div>
              <p className="text-gray-500 dark:text-gray-400 mb-6">
                You are successfully logged in. Manage your contacts below.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={() => navigate('/contacts')} 
                  className="gap-2"
                >
                  <Contact className="w-4 h-4" />
                  View Contacts
                </Button>
                <Button 
                  onClick={handleLogout} 
                  variant="outline"
                >
                  Logout
                </Button>
              </div>
            </>
          ) : (
            <>
              <p className="text-gray-500 dark:text-gray-400">
                Please login or register to continue.
              </p>
              <div className="flex justify-center space-x-4 mt-4">
                <Button onClick={() => navigate('/login')}>
                  Login
                </Button>
                <Button onClick={() => navigate('/register')} variant="outline">
                  Register
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
