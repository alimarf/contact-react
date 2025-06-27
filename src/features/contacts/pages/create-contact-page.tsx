import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Button } from '../../../components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useContactsStore } from '../store/contacts.store';
import { Form, FormControl, FormField, FormItem, FormLabel } from '../../../components/ui/form';
import { Input } from '../../../components/ui/input';
import { useForm } from 'react-hook-form';
import type { CreateContactRequest } from '../../../infrastructure/api/types/contacts.types';

export function CreateContactPage() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const createContact = useContactsStore((state) => state.createContact);

  const form = useForm<CreateContactRequest>({
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      address: '',
    },
  });

  const onSubmit = async (data: CreateContactRequest) => {
    try {
      setIsSubmitting(true);
      setError(null);
      
      await createContact(data);
      
      // Navigate back to contacts list after successful creation
      navigate('/contacts');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create contact');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative flex min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 px-4 py-12">
      {/* Animated background elements */}
      <div className="absolute -top-40 -left-40 h-80 w-80 animate-pulse rounded-full bg-purple-600/20 blur-3xl filter"></div>
      <div className="absolute -bottom-40 -right-40 h-80 w-80 animate-pulse rounded-full bg-blue-600/20 blur-3xl filter"></div>
      <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 animate-slow-spin rounded-full bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 blur-3xl filter"></div>
      
      {/* Main content */}
      <div className="relative w-full max-w-lg mx-auto">
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-8 shadow-xl backdrop-blur-xl">
          <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-blue-500/30 blur-2xl filter"></div>
          <div className="absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-purple-500/30 blur-2xl filter"></div>
          
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center mb-6">
              <Button 
                variant="ghost" 
                size="sm" 
                className="mr-4 text-white/70 hover:text-white"
                onClick={() => navigate('/contacts')}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                  Create Contact
                </h1>
                <p className="mt-1 text-sm text-white/60">
                  Add a new contact to your list
                </p>
              </div>
            </div>
            
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white/70">Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter name" className="bg-white/10 border-white/20 text-white" {...field} required />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white/70">Phone</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter phone number" className="bg-white/10 border-white/20 text-white" {...field} required />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white/70">Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter email" type="email" className="bg-white/10 border-white/20 text-white" {...field} required />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white/70">Address</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter address" className="bg-white/10 border-white/20 text-white" {...field} required />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white mt-6"
                >
                  {isSubmitting ? 'Creating...' : 'Create Contact'}
                </Button>
              </form>
            </Form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
