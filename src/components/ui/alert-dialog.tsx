import * as React from "react";
import { cn } from "../../lib/utils";
import { buttonVariants } from "./button";

interface AlertDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

const AlertDialog: React.FC<AlertDialogProps> = ({ open, children }) => {
  React.useEffect(() => {
    // Prevent scrolling when dialog is open
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {children}
    </div>
  );
};

const AlertDialogContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ 
  className, 
  children,
  ...props 
}) => {
  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm animate-in fade-in-0 backdrop" />
      
      {/* Content */}
      <div
        className={cn(
          "fixed z-50 w-full max-w-lg p-6 animate-in fade-in-0 zoom-in-95",
          "grid gap-4 border border-white/10 bg-slate-900 shadow-lg sm:rounded-lg",
          "left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2",
          className
        )}
        {...props}
      >
        {children}
      </div>
    </>
  );
};

const AlertDialogHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ 
  className, 
  ...props 
}) => (
  <div
    className={cn(
      "flex flex-col space-y-2 text-center sm:text-left",
      className
    )}
    {...props}
  />
);

const AlertDialogFooter: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ 
  className, 
  ...props 
}) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    )}
    {...props}
  />
);

const AlertDialogTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({ 
  className, 
  ...props 
}) => (
  <h2
    className={cn("text-lg font-semibold text-white", className)}
    {...props}
  />
);

const AlertDialogDescription: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = ({ 
  className, 
  ...props 
}) => (
  <p
    className={cn("text-sm text-white/70", className)}
    {...props}
  />
);

const AlertDialogAction: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ 
  className, 
  ...props 
}) => (
  <button
    className={cn(buttonVariants(), className)}
    {...props}
  />
);

const AlertDialogCancel: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ 
  className, 
  ...props 
}) => (
  <button
    className={cn(
      buttonVariants({ variant: "outline" }),
      "mt-2 sm:mt-0 border-white/20 hover:bg-white/10 text-white",
      className
    )}
    {...props}
  />
);

export {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
}
