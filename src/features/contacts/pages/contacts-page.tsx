import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { ContactsList } from '../components/contacts-list';
import { Button } from '../../../components/ui/button';

export function ContactsPage() {
  return (
    <div className="relative flex min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 px-4 py-12">
      {/* Animated background elements */}
      <div className="absolute -top-40 -left-40 h-80 w-80 animate-pulse rounded-full bg-purple-600/20 blur-3xl filter"></div>
      <div className="absolute -bottom-40 -right-40 h-80 w-80 animate-pulse rounded-full bg-blue-600/20 blur-3xl filter"></div>
      <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 animate-slow-spin rounded-full bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 blur-3xl filter"></div>
      
      {/* Main content */}
      <div className="relative w-full max-w-6xl mx-auto">
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-8 shadow-xl backdrop-blur-xl">
          <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-blue-500/30 blur-2xl filter"></div>
          <div className="absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-purple-500/30 blur-2xl filter"></div>
          
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                  Contacts
                </h1>
                <p className="mt-2 text-sm text-white/60">
                  Manage your contacts easily
                </p>
              </div>
              
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                <Plus className="w-4 h-4 mr-2" />
                Add Contact
              </Button>
            </div>
            
            <ContactsList />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
