"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sparkles, List, Brain, User, Plus } from "lucide-react";

type UserType = {
  name?: string;
  email?: string;
};

export default function NavbarClient({ user }: { user: UserType | null }) {
  const pathname = usePathname();
  // console.log(user)

  const navItem = (
    href: string,
    label: string,
    Icon: React.ElementType
  ) => {
    const active = pathname === href;

    return (
      <Link
        href={href}
        className={`relative flex items-center gap-1.5 text-sm font-medium transition-colors
          ${
            active
              ? "text-slate-900"
              : "text-slate-500 hover:text-slate-900"
          }
        `}
      >
        <Icon size={16} />
        {label}

        {active && (
          <span className="absolute -bottom-[21px] left-0 h-[2px] w-full rounded-full bg-blue-600" />
        )}
      </Link>
    );
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/70 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        
        {/* Brand/Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white transition-transform group-hover:scale-105">
            <Sparkles size={16} />
          </div>
          <span className="font-bold tracking-tight text-slate-900">
            ShopBuddy
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navItem("/lists", "Lists", List)}
          {navItem("/ai", "AI Assistant", Brain)}
        </nav>

        {/* Action Area */}
        <div className="flex items-center gap-4">
          {user ? (
            <>
              {/* Add Button - Only visible if logged in */}
              <Link
                href="/add"
                className="hidden sm:flex items-center gap-1.5 rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors shadow-sm"
              >
                <Plus size={16} />
                New list
              </Link>

              {/* User Profile Badge */}
              <Link 
                href="/profile" 
                className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50/50 p-1 pr-3 hover:bg-slate-100 transition-colors"
              >
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-900 text-[10px] font-bold text-white uppercase">
                  {user.name?.[0] || <User size={14} />}
                </div>
                <span className="hidden text-xs font-semibold text-slate-700 lg:block">
                  {user.name?.split(" ")[0] || "Account"}
                </span>
              </Link>
            </>
          ) : (
            /* Login State */
            <Link
              href="/login"
              className="rounded-full bg-slate-900 px-5 py-2 text-sm font-medium text-white hover:bg-slate-800 transition-colors"
            >
              Log in
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}