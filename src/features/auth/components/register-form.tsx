import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, User, Mail, Lock, ArrowRight, AlertCircle } from 'lucide-react';

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

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
} as const;

const itemVariants = {
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
} as const;

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
  scale: 0.98 as const,
  boxShadow: '0 0 10px rgba(99, 102, 241, 0.2)' as const
} as const;

// Define form schema with Zod
const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
  confirmPassword: z.string().min(6, { message: 'Password must be at least 6 characters' }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type RegisterFormValues = z.infer<typeof formSchema>;

export function RegisterForm() {
  const navigate = useNavigate();
  const { register, isLoading, error, clearError } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Initialize form with react-hook-form
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  // Handle form submission
  const onSubmit = async (values: RegisterFormValues) => {
    clearError();
    const { name, email, password } = values;
    await register({ name, email, password });
    // If registration is successful, navigate to home page
    if (!error) {
      navigate('/');
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
            Create Account
          </h1>
          <p className="mt-2 text-sm text-white/60">
            Join us and start your journey
          </p>
        </motion.div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <motion.div variants={itemVariants}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Name</FormLabel>
                    <FormControl>
                      <motion.div 
                        className="relative"
                        whileHover={{ scale: 1.01 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                      >
                        <User className="absolute left-3 top-1/2 w-4 h-4 text-gray-400 -translate-y-1/2" />
                        <Input
                          placeholder="John Doe"
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

            <motion.div variants={itemVariants}>
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Confirm Password</FormLabel>
                    <FormControl>
                      <motion.div 
                        className="relative"
                        whileHover={{ scale: 1.01 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                      >
                        <Lock className="absolute left-3 top-1/2 w-4 h-4 text-gray-400 -translate-y-1/2" />
                        <Input
                          type={showConfirmPassword ? 'text' : 'password'}
                          placeholder="••••••••"
                          className="pl-10"
                          {...field}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-1 top-1/2 w-8 h-8 text-gray-400 -translate-y-1/2 hover:bg-transparent hover:text-blue-400"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          {showConfirmPassword ? (
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

          <motion.div variants={itemVariants}>
            <Button 
              type="submit" 
              className="py-6 w-full font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:from-blue-700 hover:to-purple-700"
              disabled={isLoading}
            >
              <motion.span 
                className="flex gap-2 justify-center items-center"
                whileHover={buttonHover}
                whileTap={buttonTap}
              >
                {isLoading ? 'Creating account...' : 'Register'}
                {!isLoading && <ArrowRight className="w-4 h-4" />}
              </motion.span>
            </Button>
          </motion.div>
        </form>
      </Form>

      <motion.div 
        className="mt-4 text-sm text-center text-white/60"
        variants={itemVariants}
      >
        Already have an account?{" "}
        <a
          href="#"
          className="font-medium text-blue-400 cursor-pointer hover:text-blue-300"
          onClick={(e) => {
            e.preventDefault();
            navigate('/login');
          }}
        >
          Login
        </a>
      </motion.div>
    </motion.div>
    </motion.div>
  );
}
