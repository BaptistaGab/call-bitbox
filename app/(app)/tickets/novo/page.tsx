"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Company = {
  id: string;
  name: string;
};

export default function NovoTicketPage() {
  const [loading, setLoading] = useState(false);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "MEDIUM",
    company: "",
  });

  useEffect(() => {
    async function loadCompanies() {
      const token = localStorage.getItem("access_token");

      const res = await fetch("http://127.0.0.1:8000/api/companies/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      // 🔒 Blindagem total
      if (Array.isArray(data)) {
        setCompanies(data);
      } else if (Array.isArray(data.results)) {
        setCompanies(data.results);
      } else {
        setCompanies([]);
      }
    }

    loadCompanies();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem("access_token");

    const res = await fetch("http://127.0.0.1:8000/api/tickets/create/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    });

    setLoading(false);

    if (!res.ok) {
      alert("Erro ao criar chamado");
      return;
    }

    alert("Chamado criado com sucesso!");
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Abrir Chamado</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              placeholder="Título do problema"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
            />

            <Textarea
              placeholder="Descreva o problema detalhadamente"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              required
            />

            <Select
              value={form.priority}
              onValueChange={(value) => setForm({ ...form, priority: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Prioridade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="LOW">Baixa</SelectItem>
                <SelectItem value="MEDIUM">Média</SelectItem>
                <SelectItem value="HIGH">Alta</SelectItem>
                <SelectItem value="CRITICAL">Crítica</SelectItem>
              </SelectContent>
            </Select>

            {/* ✅ SELECT DE EMPRESAS */}
            <Select
              value={form.company}
              onValueChange={(value) => setForm({ ...form, company: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione a empresa" />
              </SelectTrigger>
              <SelectContent>
                {companies.map((company) => (
                  <SelectItem key={company.id} value={company.id}>
                    {company.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button type="submit" disabled={loading}>
              {loading ? "Enviando..." : "Criar Ticket"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
