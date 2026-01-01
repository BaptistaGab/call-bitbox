# 🎫 Sistema de Tickets — Frontend & Backend

Bem-vindo ao **Sistema de Tickets** 🚀  
Este projeto é uma aplicação completa para **gestão de chamados**, composta por:

- 🖥 **Frontend** em **Next.js (App Router)**
- ⚙️ **Backend** em **Django + Django REST Framework**
- 🔐 Autenticação via **JWT**
- 🎨 Interface moderna com **shadcn/ui**, **Tailwind CSS** e **styled-components**

---

## ✨ Funcionalidades

### 🔐 Autenticação
- Login com usuário e senha
- Tokens **JWT (access / refresh)**
- Proteção de rotas autenticadas

### 📊 Dashboard
- Resumo visual dos tickets por status
- Listagem de tickets recentes
- Indicadores rápidos:
  - Abertos
  - Em atendimento
  - Aguardando cliente
  - Fechados

### 🎫 Tickets
- Criação de novos tickets
- Visualização em tabela estilizada
- Status dinâmicos com cores
- Prioridade configurável

---

## 🧱 Tecnologias Utilizadas

### Frontend
- **Next.js 13+ (App Router)**
- **React**
- **TypeScript**
- **Tailwind CSS**
- **shadcn/ui**
- **styled-components**

### Backend
- **Python**
- **Django**
- **Django REST Framework**
- **Simple JWT**

---

## 📂 Estrutura do Projeto (Frontend)

```bash
app/
├── (auth)/
│   └── login/
│       └── page.tsx
├── (app)/
│   ├── layout.tsx
│   └── page.tsx  # Dashboard
├── tickets/
│   └── novo/
│       └── page.tsx
├── layout.tsx
└── globals.css

components/
├── ui/               # shadcn/ui
├── Navbar.tsx
└── TicketsTable.styles.ts
```

---

## 🔑 Autenticação JWT (Fluxo)

1. Usuário faz login
2. Backend retorna:
   - `access_token`
   - `refresh_token`
3. Tokens são salvos no **localStorage**
4. Requisições autenticadas enviam:

```http
Authorization: Bearer SEU_ACCESS_TOKEN
```

---

## 🔌 Consumo da API

### Buscar tickets do dashboard

```ts
const token = localStorage.getItem("access_token");

fetch("http://127.0.0.1:8000/api/dashboard/tickets/", {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
```

---

## 🎨 Tabela de Tickets (styled-components)

A tabela utiliza **styled-components** para melhor organização visual e manutenção.

### Vantagens
- Estilos isolados
- Fácil customização
- Cores dinâmicas por status
- Código JSX mais limpo

Exemplo de status com badge:

- 🔵 OPEN
- 🟠 IN_PROGRESS
- 🟣 WAITING
- 🟢 CLOSED

---

## 🚀 Como Rodar o Projeto

### Frontend

```bash
npm install
npm run dev
```

Acesse:  
👉 http://localhost:3000

---

### Backend

```bash
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

Acesse:  
👉 http://127.0.0.1:8000

---

## ⚠️ Problemas Comuns

### ❌ Erro 401 Unauthorized

Possíveis causas:
- Token não enviado no header
- Token expirado
- Endpoint protegido sem permissão correta

✅ Solução:
- Verificar `Authorization: Bearer TOKEN`
- Garantir `IsAuthenticated` no backend

---

## 📈 Próximas Melhorias

- 🔍 Filtro por status e prioridade
- 📄 Paginação
- 🧩 Página de detalhes do ticket
- 📱 Responsividade mobile
- 🌙 Dark mode

---

## 👨‍💻 Autor

**Gabriel Baptista**  
Desenvolvedor Full Stack  

---

## ⭐ Considerações Finais

Este projeto foi estruturado seguindo **boas práticas modernas**, com foco em:
- Organização
- Escalabilidade
- Experiência do usuário

