import { useNavigate } from 'react-router-dom';
import { Button } from '../../../components/ui/button';
import { useAuthStore } from '../../auth/store/auth.store';
import { Contact, User, LogOut } from 'lucide-react';
import type { Variants } from 'framer-motion';
import { motion } from 'framer-motion';

// Animation variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      type: 'spring',
      stiffness: 100,
      damping: 10
    } 
  },
};

const buttonHover = {
  scale: 1.02 as const,
  boxShadow: '0 0 20px rgba(99, 102, 241, 0.4)' as const,
  transition: {
    type: 'spring' as const,
    stiffness: 400,
    damping: 10
  }
};

const buttonTap = {
  scale: 0.98,
  boxShadow: '0 0 10px rgba(99, 102, 241, 0.2)'
};

export function HomePage() {
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuthStore();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-black px-4 py-12">
      <motion.div 
        className="w-full max-w-md space-y-8 rounded-lg border border-gray-800 bg-gray-900/50 p-8 shadow-lg backdrop-blur-sm"
        initial="hidden"
        animate="show"
        variants={containerVariants}
      >
        <motion.div variants={itemVariants}>
          <motion.div 
            className="mb-8 text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              ContactME
            </h1>
            <p className="mt-2 text-sm text-white/60">
              Your personal contact management app
            </p>
          </motion.div>
          
          {isAuthenticated ? (
            <motion.div className="space-y-6" variants={itemVariants}>
              <motion.div 
                className="flex items-center justify-center gap-3 p-4 rounded-lg border border-blue-500/20 bg-blue-500/10 backdrop-blur-sm"
                variants={itemVariants}
              >
                <User className="w-5 h-5 text-blue-400" />
                <p className="text-xl font-medium text-white">Hello, {user?.name}!</p>
              </motion.div>
              
              <motion.p 
                className="text-white/60 text-center"
                variants={itemVariants}
              >
                You are successfully logged in. Manage your contacts below.
              </motion.p>
              
              <motion.div 
                className="flex flex-col gap-4 mt-6"
                variants={itemVariants}
              >
                <motion.div
                  whileHover={buttonHover}
                  whileTap={buttonTap}
                >
                  <Button 
                    onClick={() => navigate('/contacts')} 
                    className="overflow-hidden relative px-8 py-6 w-full text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg group"
                  >
                    <motion.span className="flex relative z-10 gap-2 justify-center items-center font-medium">
                      View Contacts
                      <Contact className="w-4 h-4" />
                    </motion.span>
                    <motion.span 
                      className="absolute inset-0 z-0 bg-gradient-to-r from-blue-700 to-purple-700 opacity-0"
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </Button>
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  variants={itemVariants}
                >
                  <Button 
                    onClick={handleLogout} 
                    variant="outline"
                    className="w-full py-6 border-gray-700 text-gray-300 hover:text-white hover:bg-gray-800/50 flex items-center justify-center gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div className="space-y-6" variants={itemVariants}>
              <motion.p 
                className="text-white/60 text-center"
                variants={itemVariants}
              >
                Please login or register to continue.
              </motion.p>
              
              <motion.div 
                className="flex flex-col gap-4 mt-6"
                variants={itemVariants}
              >
                <motion.div
                  whileHover={buttonHover}
                  whileTap={buttonTap}
                >
                  <Button 
                    onClick={() => navigate('/login')} 
                    className="overflow-hidden relative px-8 py-6 w-full text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg group"
                  >
                    <motion.span className="flex relative z-10 gap-2 justify-center items-center font-medium">
                      Login
                    </motion.span>
                    <motion.span 
                      className="absolute inset-0 z-0 bg-gradient-to-r from-blue-700 to-purple-700 opacity-0"
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </Button>
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  variants={itemVariants}
                >
                  <Button 
                    onClick={() => navigate('/register')} 
                    variant="outline"
                    className="w-full py-6 border-gray-700 text-gray-300 hover:text-white hover:bg-gray-800/50"
                  >
                    Register
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}
