# Quiz App - Backend NestJS + Frontend Next.js
# Gabriel Simões de Souza e 

Este projeto é um aplicativo de quiz que utiliza NestJS no backend (servidor) e Next.js no frontend(cliente).

As respostas se encontram no arquivo "respostas.txt"

## Estrutura do Projeto

```
lista_1/
├── back/aula-1/quiz-server/     # Backend NestJS
└── front/aula/                  # Frontend Next.js
```

## Como Executar

### 1. Backend (NestJS)

```bash
cd back/aula-1/quiz-server

# Instalar dependências
npm install

# Executar em modo desenvolvimento
npm run start:dev
```

O backend estará rodando em `http://localhost:3000`

### 2. Frontend (Next.js)

```bash
cd front/aula

# Instalar dependências
npm install

# Executar em modo desenvolvimento
npm run dev
```

O frontend estará rodando em `http://localhost:3001`

## Funcionalidades

### Backend
- **GET /questions** - Retorna todas as perguntas do quiz
- **POST /answers** - Verifica as respostas e retorna o score

### Frontend
- Página inicial com navegação para o quiz
- Página de perguntas com interface interativa
- Sistema de pontuação e feedback
- Design responsivo com Tailwind CSS

## Tecnologias Utilizadas

- **Backend**: NestJS, TypeScript
- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Comunicação**: REST API com CORS configurado

## Endpoints da API

- `GET /questions` - Lista todas as perguntas
- `POST /answers` - Envia respostas e recebe resultado

## Estrutura das Perguntas

```typescript
interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number; // Índice da opção correta
}
```

## Estrutura das Respostas

```typescript
interface Answer {
  id: number;      // ID da pergunta
  answer: number;  // Índice da opção selecionada
}
```

## Resultado do Quiz

```typescript
interface QuizResult {
  score: number;   // Pontuação total
  results: {       // Resultado de cada pergunta
    id: number;
    correct: boolean;
  }[];
}
```
