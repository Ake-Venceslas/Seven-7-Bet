"use client";

import { useState } from "react";

import AdminSideBar from "./AdminSideBar";

export default function LayoutShell({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <AdminSideBar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      <div
        className={`
          min-h-screen flex flex-col
          transition-all duration-200
          ${isSidebarOpen ? "pl-44" : "pl-12"}
        `}
      >
        <main className="flex-1">{children}</main>
      </div>
    </>
  );
}
