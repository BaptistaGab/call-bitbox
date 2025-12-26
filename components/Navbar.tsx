"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function Navbar() {
  const router = useRouter();
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    // Supõe que você salvou o role do usuário no localStorage
    const userRole = localStorage.getItem("user_role");
    setRole(userRole);
  }, []);

  function logout() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user_role"); // limpar também a role
    router.push("/login");
  }

  return (
    <nav className="w-full border-b bg-background">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-0.5">
          <Link href="/">
            <Image src="/assets/LOGO1PNG.png" alt="BitBox Logo" width={20} height={20} />
          </Link>
          <Link href="/" className="text-lg font-bold">
            itBox
          </Link>
        </div>

        {/* Menu */}
        <div className="flex items-center gap-4">
          <Link href="/">
            <Button variant="ghost">Dashboard</Button>
          </Link>

          <Link href="/tickets/novo">
            <Button variant="ghost">Novo Ticket</Button>
          </Link>

          {/* Mostrar só para superadmins */}
          {role === "superadmin" && (
            <Link href="/tickets/gerenciar">
              <Button variant="ghost">Gerenciar Chamados</Button>
            </Link>
          )}

          <Button variant="destructive" onClick={logout}>
            Sair
          </Button>
        </div>
      </div>
    </nav>
  );
}
