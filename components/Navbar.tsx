'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useAuth } from '@/hooks/useAuth';
import { Dumbbell, History, LogOut } from 'lucide-react';

export default function Navbar() {
  const { user } = useAuth();
  const pathname = usePathname();

  const handleSignOut = () => signOut(auth);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-[#0d0d0d]/90 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 text-white font-semibold tracking-tight">
          <Dumbbell size={18} className="text-emerald-400" />
          <span>ZeroShortcuts</span>
        </Link>

        {user && (
          <div className="flex items-center gap-1">
            <Link
              href="/"
              className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm transition-colors ${
                pathname === '/' ? 'bg-white/10 text-white' : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Dumbbell size={14} />
              Workouts
            </Link>
            <Link
              href="/history"
              className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm transition-colors ${
                pathname === '/history' ? 'bg-white/10 text-white' : 'text-neutral-400 hover:text-white'
              }`}
            >
              <History size={14} />
              History
            </Link>
            <button
              onClick={handleSignOut}
              className="ml-2 flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm text-neutral-400 transition-colors hover:text-white"
            >
              <LogOut size={14} />
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
