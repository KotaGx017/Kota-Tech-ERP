"use client";

import Sidebar from "@/components/Sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="md:flex min-h-screen">
      <Sidebar />
      <section className="flex-1 p-4 md:p-8 overflow-x-hidden">
        {children}
      </section>
    </main>
  );
}
