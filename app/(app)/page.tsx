"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  TableWrapper,
  Table,
  Th,
  Td,
  Tr,
  StatusBadge,
} from "@/components/TicketsTable.styles";

type Ticket = {
  id: string;
  title: string;
  status: string;
  priority: string;
  company_name: string;
  created_at: string;
};

export default function DashboardPage() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTickets() {
      const token = localStorage.getItem("access_token");

      const res = await fetch("http://127.0.0.1:8000/api/dashboard/tickets/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        console.error("Erro ao buscar tickets");
        return;
      }

      const data = await res.json();
      setTickets(data);
      setLoading(false);
    }

    loadTickets();
  }, []);

  if (loading) {
    return <div className="p-6">Carregando...</div>;
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <Link href="/tickets/novo">
          <Button>Novo Ticket</Button>
        </Link>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Abertos</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold">
            {tickets.filter((t) => t.status === "OPEN").length}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Em Atendimento</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold">
            {tickets.filter((t) => t.status === "IN_PROGRESS").length}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Aguardando Cliente</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold">
            {tickets.filter((t) => t.status === "WAITING").length}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Fechados</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold">
            {tickets.filter((t) => t.status === "CLOSED").length}
          </CardContent>
        </Card>
      </div>

      {/* Lista */}
      <Card>
        <CardHeader>
          <CardTitle>Tickets Recentes</CardTitle>
        </CardHeader>

        <CardContent>
          <TableWrapper>
            <Table>
              <thead>
                <tr>
                  <Th>Título</Th>
                  <Th>Status</Th>
                  <Th>Prioridade</Th>
                  <Th>Cliente</Th>
                  <Th>Data</Th>
                </tr>
              </thead>

              <tbody>
                {tickets.map((ticket) => (
                  <Tr key={ticket.id}>
                    <Td>{ticket.title}</Td>
                    <Td>
                      <StatusBadge status={ticket.status}>
                        {ticket.status}
                      </StatusBadge>
                    </Td>
                    <Td>{ticket.priority}</Td>
                    <Td>{ticket.company_name}</Td>
                    <Td>
                      {new Date(ticket.created_at).toLocaleDateString("pt-BR")}
                    </Td>
                  </Tr>
                ))}
              </tbody>
            </Table>
          </TableWrapper>
        </CardContent>
      </Card>
    </div>
  );
}
