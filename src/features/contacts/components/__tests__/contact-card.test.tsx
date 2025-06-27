/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { ContactCard } from '../contact-card';
import { useContactsStore } from '../../store/contacts.store';

// Mock the contacts store
jest.mock('../../store/contacts.store', () => ({
  useContactsStore: jest.fn(),
}));

// Mock react-router-dom's Link but keep the real useNavigate
jest.mock('react-router-dom', () => {
  const originalModule = jest.requireActual('react-router-dom');
  return {
    ...originalModule,
    Link: ({ children, to }: any) => <a href={to}>{children}</a>,
  };
});

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, variants, initial, animate, whileHover, transition, ...props }: any) => <div {...props}>{children}</div>,
    button: ({ children, variants, initial, animate, whileHover, transition, ...props }: any) => <button {...props}>{children}</button>,
  },
  AnimatePresence: ({ children }: any) => children,
}));

// Mock the AlertDialog component
jest.mock('../../../../components/ui/alert-dialog', () => ({
  AlertDialog: ({ children, open, onOpenChange, ...props }: any) => (
    <div data-testid="alert-dialog" data-open={open} {...props}>
      {children}
    </div>
  ),
  AlertDialogContent: ({ children }: any) => <div data-testid="alert-dialog-content">{children}</div>,
  AlertDialogHeader: ({ children }: any) => <div data-testid="alert-dialog-header">{children}</div>,
  AlertDialogFooter: ({ children }: any) => <div data-testid="alert-dialog-footer">{children}</div>,
  AlertDialogTitle: ({ children }: any) => <div data-testid="alert-dialog-title">{children}</div>,
  AlertDialogDescription: ({ children }: any) => <div data-testid="alert-dialog-description">{children}</div>,
  AlertDialogCancel: ({ children, ...props }: any) => (
    <button data-testid="alert-dialog-cancel" {...props}>
      {children}
    </button>
  ),
  AlertDialogAction: ({ children, ...props }: any) => (
    <button data-testid="alert-dialog-action" {...props}>
      {children}
    </button>
  ),
}));

// Mock the Button component
jest.mock('../../../../components/ui/button', () => ({
  Button: ({ children, onClick, ...props }: any) => (
    <button onClick={onClick} {...props}>
      {children}
    </button>
  ),
}));

describe('ContactCard', () => {
  const mockContact = {
    id: '1',
    _id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '123-456-7890',
    user: 'user123',
    createdAt: '2023-01-01T00:00:00.000Z',
    updatedAt: '2023-01-01T00:00:00.000Z',
    __v: 0
  };

  const mockDeleteContact = jest.fn();
  
  beforeEach(() => {
    jest.clearAllMocks();
    
    (useContactsStore as unknown as jest.Mock).mockImplementation(() => ({
      deleteContact: jest.fn(),
    }));
  });

  test('renders contact information correctly', () => {
    render(
      <BrowserRouter>
        <ContactCard contact={mockContact} index={0} />
      </BrowserRouter>
    );
    
    // Use more specific queries to avoid duplicate matches
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
    expect(screen.getByText('123-456-7890')).toBeInTheDocument();
    
    // Check that the name is in the document (using a more specific query)
    const nameElement = screen.getByText('John Doe', { selector: '.font-semibold' });
    expect(nameElement).toBeInTheDocument();
  });

  test('opens delete confirmation dialog when delete button is clicked', () => {
    render(
      <BrowserRouter>
        <ContactCard contact={mockContact} index={0} />
      </BrowserRouter>
    );
    
    fireEvent.click(screen.getByText('Delete'));
    
    expect(screen.getByTestId('alert-dialog')).toHaveAttribute('data-open', 'true');
    expect(screen.getByText('Are you sure you want to delete this contact?')).toBeInTheDocument();
  });

  test('calls deleteContact when confirmation is approved', async () => {
    const deleteContactMock = jest.fn();
    (useContactsStore as unknown as jest.Mock).mockImplementation(() => ({
      deleteContact: deleteContactMock,
    }));
    
    render(
      <BrowserRouter>
        <ContactCard contact={mockContact} index={0} />
      </BrowserRouter>
    );
    
    // Open the delete dialog
    const deleteButton = screen.getByText(/delete/i);
    fireEvent.click(deleteButton);
    
    // Click the confirm button
    const confirmButton = screen.getByTestId('alert-dialog-action');
    fireEvent.click(confirmButton);
    
    // Verify deleteContact was called with the correct ID
    await waitFor(() => {
      expect(deleteContactMock).toHaveBeenCalledWith(mockContact.id);
    });
  });

  test('closes the dialog without deleting when cancel is clicked', () => {
    render(
      <BrowserRouter>
        <ContactCard contact={mockContact} index={0} />
      </BrowserRouter>
    );
    
    // Open the delete dialog
    const deleteButton = screen.getByText(/delete/i);
    fireEvent.click(deleteButton);
    
    // Click the cancel button
    const cancelButton = screen.getByTestId('alert-dialog-cancel');
    fireEvent.click(cancelButton);
    
    // Check that deleteContact was not called
    expect(mockDeleteContact).not.toHaveBeenCalled();
  });
});
