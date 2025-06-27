import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, ArrowRight, AlertCircle } from 'lucide-react';
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

import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../../components/ui/form';
import { useAuthStore } from '../store/auth.store';

// Define form schema with Zod
const formSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

type LoginFormValues = z.infer<typeof formSchema>;

export function LoginForm() {
  const navigate = useNavigate();
  const { login, isLoading, error, clearError } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);

  // Initialize form with react-hook-form
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // Handle form submission
  const onSubmit = async (values: LoginFormValues) => {
    clearError();
    // Ensure email and password are always provided as required by LoginRequest
    await login({
      email: values.email || '',
      password: values.password || ''
    });
    // If login is successful, navigate to contacts page
    if (!error) {
      navigate('/contacts');
    }
  };

  return (
    <motion.div 
      className="space-y-8 w-full"
      initial="hidden"
      animate="show"
      variants={containerVariants}
    >
      {error && (
        <motion.div 
          className="p-4 text-sm text-red-400 rounded-lg border backdrop-blur-sm border-red-500/20 bg-red-500/10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        >
          <div className="flex gap-2 items-center">
            <AlertCircle className="w-4 h-4" />
            <span>{error}</span>
          </div>
        </motion.div>
      )}

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
            Welcome back! Please sign in to continue
          </p>
        </motion.div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <motion.div variants={itemVariants}>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Email</FormLabel>
                      <FormControl>
                        <motion.div 
                          className="relative"
                          whileHover={{ scale: 1.01 }}
                          transition={{ type: 'spring', stiffness: 300 }}
                        >
                          <Mail className="absolute left-3 top-1/2 w-4 h-4 text-gray-400 -translate-y-1/2" />
                          <Input
                            placeholder="name@example.com"
                            className="pl-10"
                            {...field}
                          />
                        </motion.div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex justify-between items-center">
                        <FormLabel className="text-white">Password</FormLabel>
                      </div>
                      <FormControl>
                        <motion.div 
                          className="relative"
                          whileHover={{ scale: 1.01 }}
                          transition={{ type: 'spring', stiffness: 300 }}
                        >
                          <Lock className="absolute left-3 top-1/2 w-4 h-4 text-gray-400 -translate-y-1/2" />
                          <Input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="••••••••"
                            className="pl-10"
                            {...field}
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-1 top-1/2 w-8 h-8 text-gray-400 -translate-y-1/2 hover:bg-transparent hover:text-blue-400"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <EyeOff className="w-4 h-4" />
                            ) : (
                              <Eye className="w-4 h-4" />
                            )}
                          </Button>
                        </motion.div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>
            </div>

            {/* <motion.div 
              className="flex justify-end items-center"
              variants={itemVariants}
            >
              <motion.a
                href="#"
                className="text-xs font-medium text-blue-400 hover:text-blue-300"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/forgot-password');
                }}
                whileHover={{ x: 2 }}
                whileTap={{ scale: 0.95 }}
              >
                Forgot password?
              </motion.a>
            </motion.div> */}

            <motion.div
              variants={itemVariants}
              whileHover={buttonHover}
              whileTap={buttonTap}
            >
              <Button 
                type="submit" 
                disabled={isLoading}
                className="overflow-hidden relative px-8 py-6 w-full text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg group disabled:opacity-70"
              >
                <motion.span 
                  className="flex relative z-10 gap-2 justify-center items-center font-medium"
                >
                  {isLoading ? "Logging in..." : "Sign In"}
                  <motion.span 
                    className="inline-block"
                    animate={isLoading ? { rotate: 360 } : {}}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </motion.span>
                </motion.span>
                <motion.span 
                  className="absolute inset-0 z-0 bg-gradient-to-r from-blue-700 to-purple-700 opacity-0"
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </Button>
            </motion.div>
          </form>
        </Form>
      </motion.div>

      <motion.div 
        className="text-sm text-center text-white/60"
        variants={itemVariants}
      >
        Don't have an account?{" "}
        <motion.a
          href="#"
          className="font-medium text-blue-400 cursor-pointer hover:text-blue-300"
          onClick={(e) => {
            e.preventDefault();
            navigate('/register');
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Sign up
        </motion.a>
      </motion.div>
    </motion.div>
  );
}
