'use client'

import { Header } from "@/src/components/header";
import { AppSidebar } from "@/src/components/sideBar";
import { SidebarProvider } from "@/src/components/ui/sidebar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated' && session?.user.role !== 'ADMIN') {
      router.replace('/dashboard');
    } else if (status === 'unauthenticated') {
      router.push('/auth');
    }
  }, [session, status, router]);

  if (!session || session.user.role !== 'ADMIN') return null;

  return (
    <SidebarProvider className="flex w-full"    >
      <AppSidebar />
      <main className="flex-1">
        <Header />
        {children}
      </main>
    </SidebarProvider>
  );
}
