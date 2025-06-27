import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Button } from '../../../components/ui/button';
import { useNavigate, useParams } from 'react-router-dom';
import { useContactsStore } from '../store/contacts.store';
import { Form, FormControl, FormField, FormItem, FormLabel } from '../../../components/ui/form';
import { Input } from '../../../components/ui/input';
import { useForm } from 'react-hook-form';
import type { UpdateContactRequest } from '../../../infrastructure/api/types/contacts.types';

export function EditContactPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { updateContact, getContactById, fetchContacts } = useContactsStore();

  const form = useForm<UpdateContactRequest>();

  // Fetch contact data when the page loads
  useEffect(() => {
    const loadContact = async () => {
      try {
        setIsLoading(true);
        
        // Try to get contact from store first
        let contact = getContactById(id!);
        
        // If not found in store, fetch all contacts
        if (!contact) {
          await fetchContacts();
          contact = getContactById(id!);
        }
        
        // If still not found, show error
        if (!contact) {
          setError('Contact not found');
          return;
        }
        
        // Pre-populate form with contact data
        form.reset({
          name: contact.name,
          phone: contact.phone,
          email: contact.email,
          // Since this is a new field, try to handle cases where it might not exist
          address: contact.address || '',
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load contact');
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      loadContact();
    }
  }, [id, getContactById, fetchContacts, form]);

  const onSubmit = async (data: UpdateContactRequest) => {
    if (!id) return;
    
    try {
      setIsSubmitting(true);
      setError(null);
      
      await updateContact(id, data);
      
      // Navigate back to contacts list after successful update
      navigate('/contacts');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update contact');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex overflow-hidden relative px-4 py-12 min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950">
      {/* Animated background elements */}
      <div className="absolute -top-40 -left-40 w-80 h-80 rounded-full filter blur-3xl animate-pulse bg-purple-600/20"></div>
      <div className="absolute -right-40 -bottom-40 w-80 h-80 rounded-full filter blur-3xl animate-pulse bg-blue-600/20"></div>
      <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 animate-slow-spin rounded-full bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 blur-3xl filter"></div>
      
      {/* Main content */}
      <div className="relative mx-auto w-full max-w-lg">
        <div className="overflow-hidden relative p-8 rounded-2xl border shadow-xl backdrop-blur-xl border-white/10 bg-white/5">
          <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full filter blur-2xl bg-blue-500/30"></div>
          <div className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full filter blur-2xl bg-purple-500/30"></div>
          
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
                <ArrowLeft className="mr-2 w-4 h-4" />
                Back
              </Button>
              
              <div>
                <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                  Edit Contact
                </h1>
                <p className="mt-1 text-sm text-white/60">
                  Update contact information
                </p>
              </div>
            </div>
            
            {error && (
              <div className="p-4 mb-4 text-red-700 bg-red-100 border border-red-400 rounded">
                {error}
              </div>
            )}
            
            {isLoading ? (
              <div className="p-8 text-center text-white/70">
                <div className="w-6 h-6 mx-auto mb-3 border-2 border-t-transparent border-white/30 rounded-full animate-spin"></div>
                Loading contact information...
              </div>
            ) : (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white/70">Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter name" className="text-white bg-white/10 border-white/20" {...field} required />
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
                          <Input placeholder="Enter phone number" className="text-white bg-white/10 border-white/20" {...field} required />
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
                          <Input placeholder="Enter email" type="email" className="text-white bg-white/10 border-white/20" {...field} required />
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
                          <Input placeholder="Enter address" className="text-white bg-white/10 border-white/20" {...field} required />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full mt-6 text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    {isSubmitting ? 'Updating...' : 'Update Contact'}
                  </Button>
                </form>
              </Form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
