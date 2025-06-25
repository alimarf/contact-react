import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useContactsStore } from '../store/contacts.store';
import { ContactCard } from './contact-card';
import { Loader2, AlertCircle, Search } from 'lucide-react';
import { Input } from '../../../components/ui/input';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

export function ContactsList() {
  const { contacts, isLoading, error, fetchContacts } = useContactsStore();

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-white/60">
        <Loader2 className="w-8 h-8 animate-spin mb-2" />
        <p>Loading contacts...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-red-400">
        <AlertCircle className="w-8 h-8 mb-2" />
        <p>{error}</p>
      </div>
    );
  }

  if (contacts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-white/60">
        <p className="text-lg">No contacts found</p>
        <p className="text-sm mt-2">Add a new contact to get started</p>
      </div>
    );
  }

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={containerVariants}
      className="space-y-6"
    >
      <div className="relative">
        <Search className="absolute left-3 top-1/2 w-4 h-4 text-gray-400 -translate-y-1/2" />
        <Input 
          placeholder="Search contacts..." 
          className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/40 focus-visible:ring-blue-500"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {contacts.map((contact, index) => (
          <ContactCard key={contact._id} contact={contact} index={index} />
        ))}
      </div>
    </motion.div>
  );
}
