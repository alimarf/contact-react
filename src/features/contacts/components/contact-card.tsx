import { motion } from 'framer-motion';
import { Mail, Phone, User, MoreHorizontal, Trash, Edit } from 'lucide-react';
import type { Contact } from '../../../infrastructure/api/types/contacts.types';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useContactsStore } from '../store/contacts.store';
import {
  Card,
  CardContent,
  // CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../../../components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../../components/ui/dropdown-menu';
import { Button } from '../../../components/ui/button';
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

interface ContactCardProps {
  contact: Contact;
  index: number;
}

export function ContactCard({ contact, index }: ContactCardProps) {
  const navigate = useNavigate();
  const { deleteContact } = useContactsStore();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  
  const handleEdit = () => {
    navigate(`/contacts/edit/${contact._id}`);
  };
  
  const handleDeleteClick = () => {
    setIsDeleteDialogOpen(true);
  };
  
  const handleDeleteConfirm = async () => {
    try {
      setIsDeleting(true);
      setDeleteError(null);
      await deleteContact(contact._id);
      setIsDeleteDialogOpen(false);
    } catch (error) {
      setDeleteError(error instanceof Error ? error.message : 'Failed to delete contact');
    } finally {
      setIsDeleting(false);
    }
  };
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.3, 
          delay: index * 0.1,
          type: 'spring',
          stiffness: 100,
          damping: 10
        }}
        whileHover={{ y: -5, transition: { duration: 0.2 } }}
        className="w-full"
      >
        <Card className="overflow-hidden border backdrop-blur-sm border-white/10 bg-white/5">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <div className="flex gap-2 items-center">
                <div className="flex justify-center items-center w-10 h-10 bg-gradient-to-br rounded-full backdrop-blur-sm from-blue-500/30 to-purple-500/30">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div>
                  <CardTitle className="text-lg text-white">{contact.name}</CardTitle>
                  {/* <CardDescription className="text-white/60">{contact._id}</CardDescription> */}
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-white/60 hover:text-white hover:bg-white/10">
                    <MoreHorizontal className="w-5 h-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="text-white bg-slate-800 border-white/10">
                  <DropdownMenuItem 
                    className="flex gap-2 items-center cursor-pointer hover:bg-white/10"
                    onClick={handleEdit}
                  >
                    <Edit className="w-4 h-4" /> Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    className="flex gap-2 items-center text-red-400 cursor-pointer hover:bg-white/10 hover:text-red-300"
                    onClick={handleDeleteClick}
                  >
                    <Trash className="w-4 h-4" /> Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>
          <CardContent className="pb-2">
            <div className="space-y-2">
              <div className="flex gap-2 items-center text-white/80">
                <Phone className="w-4 h-4 text-blue-400" />
                <span>{contact.phone}</span>
              </div>
              <div className="flex gap-2 items-center text-white/80">
                <Mail className="w-4 h-4 text-purple-400" />
                <span>{contact.email}</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="pt-2 text-xs text-white/40">
            Added on {new Date(contact.createdAt).toLocaleDateString()}
          </CardFooter>
        </Card>
      </motion.div>
      
      {/* Delete Confirmation Dialog - Moved outside motion.div to ensure proper centering */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the contact
              <span className="font-semibold"> {contact.name}</span>.
            </AlertDialogDescription>
          </AlertDialogHeader>
          
          {deleteError && (
            <div className="p-3 mb-4 text-sm text-red-700 bg-red-100 rounded border border-red-400">
              {deleteError}
            </div>
          )}
          
          <AlertDialogFooter>
            <AlertDialogCancel 
            className='text-white bg-white/10 hover:bg-white/20'
              disabled={isDeleting}
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              disabled={isDeleting}
              className="text-white bg-red-600 hover:bg-red-700"
            >
              {isDeleting ? (
                <>
                  <div className="mr-2 w-4 h-4 rounded-full border-2 border-white animate-spin border-t-transparent"></div>
                  Deleting...
                </>
              ) : (
                'Delete'
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
