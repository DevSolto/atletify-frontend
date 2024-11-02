// app/not-found.tsx
"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/src/components/ui/button";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="flex h-screen items-center justify-center flex-col">
      <h1 className="text-4xl font-bold">404 - Página não encontrada</h1>
      <p className="mt-2 text-lg text-gray-600">
        A página que você procura não foi encontrada.
      </p>
      <div className="mt-4">
        <Button onClick={() => router.push("/")}>Voltar para a Home</Button>
        <Link href="/dashboard">
          <Button className="ml-2" variant="outline">
            Ir para o Dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
}
