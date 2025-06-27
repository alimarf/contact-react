import { motion } from 'framer-motion';
import { Plus, LogOut, User } from 'lucide-react';
import { ContactsList } from '../components/contacts-list';
import { Button } from '../../../components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../auth/store/auth.store';
import { useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../../../components/ui/alert-dialog';

export function ContactsPage() {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  
  const handleLogoutClick = () => {
    setIsLogoutDialogOpen(true);
  };
  
  const handleLogoutConfirm = async () => {
    try {
      setIsLoggingOut(true);
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setIsLoggingOut(false);
      setIsLogoutDialogOpen(false);
    }
  };
  
  return (
    <div className="flex overflow-hidden relative px-4 py-12 min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950">
      {/* Animated background elements */}
      <div className="absolute -top-40 -left-40 w-80 h-80 rounded-full filter blur-3xl animate-pulse bg-purple-600/20"></div>
      <div className="absolute -right-40 -bottom-40 w-80 h-80 rounded-full filter blur-3xl animate-pulse bg-blue-600/20"></div>
      <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 animate-slow-spin rounded-full bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 blur-3xl filter"></div>
      
      {/* Main content */}
      <div className="relative mx-auto w-full max-w-6xl">
        {/* User header */}
        <div className="flex justify-between items-center mb-6 p-4 rounded-xl border shadow-lg backdrop-blur-xl border-white/10 bg-white/5">
          <div className="flex items-center gap-3">
            <div className="flex justify-center items-center w-10 h-10 bg-gradient-to-br from-blue-500/30 to-purple-500/30 rounded-full">
              <User className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-medium text-white">{user?.name || 'User'}</h2>
              <p className="text-sm text-white/60">{user?.email}</p>
            </div>
          </div>
          
          <Button 
            variant="ghost" 
            className="text-white/70 hover:text-white hover:bg-white/10"
            onClick={handleLogoutClick}
          >
            <LogOut className="mr-2 w-4 h-4" />
            Logout
          </Button>
        </div>
        
        {/* Main content */}
        <div className="overflow-hidden relative p-8 rounded-2xl border shadow-xl backdrop-blur-xl border-white/10 bg-white/5">
          <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full filter blur-2xl bg-blue-500/30"></div>
          <div className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full filter blur-2xl bg-purple-500/30"></div>
          
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                  Contacts
                </h1>
                <p className="mt-2 text-sm text-white/60">
                  Manage your contacts easily
                </p>
              </div>
              
              <Button 
                className="text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                onClick={() => navigate('/contacts/create')}
              >
                <Plus className="mr-2 w-4 h-4" />
                Add Contact
              </Button>
            </div>
            
            <ContactsList />
          </motion.div>
        </div>
      </div>
      
      {/* Logout Confirmation Dialog */}
      <AlertDialog open={isLogoutDialogOpen} onOpenChange={setIsLogoutDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to logout?</AlertDialogTitle>
            <AlertDialogDescription>
              You will be redirected to the login page.
            </AlertDialogDescription>
          </AlertDialogHeader>
          
          <AlertDialogFooter>
            <AlertDialogCancel 
              className='text-white bg-white/10 hover:bg-white/20'
              disabled={isLoggingOut}
              onClick={() => setIsLogoutDialogOpen(false)}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleLogoutConfirm}
              disabled={isLoggingOut}
              className="text-white bg-blue-600 hover:bg-blue-700"
            >
              {isLoggingOut ? (
                <>
                  <div className="mr-2 w-4 h-4 rounded-full border-2 border-white animate-spin border-t-transparent"></div>
                  Logging out...
                </>
              ) : (
                'Logout'
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
