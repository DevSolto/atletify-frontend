'use client'

// import { getServerSession } from "next-auth"
import { useSession } from "next-auth/react";

export default function Clubs() {

  const { data: session } = useSession();

  return (
    <div>
      Olá, {session?.user.name}
    </div>
  )
}