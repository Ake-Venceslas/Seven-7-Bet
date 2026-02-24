"use client";

import Image from "next/image";
import {
  Wallet,
  ArrowDownToLine,
  ArrowUpFromLine,
  Ticket,
  Tv,
  Settings,
} from "lucide-react";

export default function AdminSideBar({ isOpen, setIsOpen }) {
  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  const handleMouseLeave = () => {};

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <aside
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`
        fixed left-0 top-0 z-40 h-full
        bg-[#3C8A8E] border-r border-slate-800
        text-slate-200 text-[11px]
        flex flex-col justify-between
        transition-all duration-200 ease-out
        ${isOpen ? "w-44" : "w-12"}
      `}
    >
      {/* Top section: logo + menu */}
      <div className="flex flex-col gap-4 px-2 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <div className="h-6 w-6 rounded">
              <Image
                src="/logo.jpeg"
                alt="logo"
                width={24}
                height={24}
                className="object-cover"
              />
            </div>
            {isOpen && (
              <span className="text-[11px] font-semibold tracking-tight">
                SEVEN 7 BET
              </span>
            )}
          </div>
          {isOpen && (
            <button
              onClick={handleClose}
              className="text-slate-400 hover:text-slate-200 text-[11px]"
            >
              X
            </button>
          )}
        </div>

        <nav className="mt-2 space-y-1">
          <SidebarItem
            label="Add Sport"
            href="/admin/sports"
            isOpen={isOpen}
            icon={Ticket}
          />
          <SidebarItem
            label="Add Category"
            href="/admin/categories"
            isOpen={isOpen}
            icon={ArrowDownToLine}
          />
          <SidebarItem
            label="Add League"
            href="/admin/leagues"
            isOpen={isOpen}
            icon={ArrowDownToLine}
          />
          <SidebarItem
            label="Add Match"
            href="/admin/matches"
            isOpen={isOpen}
            icon={ArrowUpFromLine}
          />
          <SidebarItem
            label="View Bets"
            href="#"
            isOpen={isOpen}
            icon={Wallet}
          />
          <SidebarItem
            label="Live matches"
            href="#"
            isOpen={isOpen}
            icon={Tv}
          />
        </nav>
      </div>

      {/* Bottom user info */}
      <div className="border-t border-slate-800 px-2 py-3">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 overflow-hidden rounded-full bg-slate-700">
            <Image
              src="/logo.png"
              alt="User"
              width={28}
              height={28}
              className="h-full w-full object-cover"
            />
          </div>
          {isOpen && (
            <div className="flex flex-col">
              <span className="text-[11px] font-semibold">Supreme</span>
              <button className="text-[10px] text-red-400 hover:text-red-300 text-left">
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}

function SidebarItem({ label, href, isOpen, icon: Icon }) {
  return (
    <a
      href={href}
      className="flex items-center gap-2 w-full rounded-md px-1.5 py-1 hover:bg-slate-800 text-left"
    >
      {/* Logo / icon */}
      {Icon && <Icon className="h-3.5 w-3.5 text-emerald-400" />}
      {isOpen && <span className="truncate text-[11px]">{label}</span>}
    </a>
  );
}
