import { RegisterForm } from '../components/register-form';

export function RegisterPage() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 px-4 py-12">
      {/* Animated background elements */}
      <div className="absolute -top-40 -left-40 h-80 w-80 animate-pulse rounded-full bg-purple-600/20 blur-3xl filter"></div>
      <div className="absolute -bottom-40 -right-40 h-80 w-80 animate-pulse rounded-full bg-blue-600/20 blur-3xl filter"></div>
      <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 animate-slow-spin rounded-full bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 blur-3xl filter"></div>
      
      {/* Card with glass effect */}
      <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-8 shadow-xl backdrop-blur-xl md:max-w-lg lg:max-w-xl">
        <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-blue-500/30 blur-2xl filter"></div>
        <div className="absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-purple-500/30 blur-2xl filter"></div>
        
        <RegisterForm />
      </div>
    </div>
  );
}
