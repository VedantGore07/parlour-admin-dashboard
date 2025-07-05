'use client';
import LoginForm from '@/components/auth/LoginForm';
import { motion } from 'framer-motion';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1e1e2f] via-[#2a2a40] to-[#1c1c2b] flex items-center justify-center p-4">
      <motion.div
        className="bg-zinc-900 text-white shadow-xl rounded-xl p-10 w-full max-w-md text-center space-y-6 border border-zinc-800"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-3xl font-bold text-white tracking-tight">
          Parlour Admin Login
        </h1>
        <p className="text-zinc-400 text-sm">
          Enter your credentials to access the dashboard
        </p>
        <LoginForm />
      </motion.div>
    </div>
  );
}
