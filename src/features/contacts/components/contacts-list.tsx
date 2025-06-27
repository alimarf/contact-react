import { useEffect, useState } from 'react';
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
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter contacts based on search query
  const filteredContacts = contacts.filter(contact => 
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

  // Show empty state when there are no contacts at all
  if (contacts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-white/60">
        <p className="text-lg">No contacts found</p>
        <p className="text-sm mt-2">Add a new contact to get started</p>
      </div>
    );
  }
  
  // Show empty state when search returns no results
  const hasSearchResults = filteredContacts.length > 0;
  const isSearching = searchQuery.trim() !== '';

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
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      {isSearching && !hasSearchResults ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <Search className="w-12 h-12 mb-4 text-gray-500" />
          <h3 className="text-lg font-medium text-white">No contacts found</h3>
          <p className="mt-1 text-gray-400">
            We couldn't find any contacts matching "{searchQuery}"
          </p>
          <button
            onClick={() => setSearchQuery('')}
            className="mt-4 px-4 py-2 text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors"
          >
            Clear search
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredContacts.map((contact, index) => (
            <ContactCard key={contact._id} contact={contact} index={index} />
          ))}
        </div>
      )}
    </motion.div>
  );
}
