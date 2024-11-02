'use client';

import { useUserStore } from "@/src/store/userStore";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";


export default function InternalLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data: session, status } = useSession();
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    if (session?.user) {
      setUser({
        id: session.user.id,
        name: session.user.name,
        email: session.user.email,
        avatarUrl: session.user.avatarUrl,
        role: session.user.role,
        accessToken: session.user.accessToken,
      });
    }
  }, [session, setUser]);

  if (status === "loading") return <AiOutlineLoading3Quarters className="animate-spin"/>;
  if (!session) redirect('/auth');

  return (
    <div className="w-full min-h-screen flex flex-col items-center">
      {children}
    </div>
  );
}
