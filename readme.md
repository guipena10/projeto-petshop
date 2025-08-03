
# Calculadora de Petshop

Este projeto foi feito como solução para o desafio de estágio da dti digital.  
A proposta é descobrir qual petshop oferece o melhor custo para dar banho em cães, considerando:

- Data do banho
- Quantidade de cães pequenos
- Quantidade de cães grandes

Em caso de empate nos preços, o critério de desempate é a distância.

---

## Como rodar o projeto

O projeto é dividido em duas partes: **backend (Node.js)** e **frontend (React)**.  
Abaixo está o passo a passo usado para fazer funcionar.

### Terminal 1 - Backend:

```bash
cd petshop/backend
npm init -y
npm install express cors
node app.js
```

### Terminal 2 - Frontend:

```bash
cd petshop/frontend
npx create-react-app .
npm install axios
npm start
```

---

## O que o sistema faz

- O usuário informa a data, a quantidade de cães pequenos e grandes.
- A aplicação mostra o petshop com menor custo e sua distância.
- A lógica considera os preços diferenciados para dias úteis e finais de semana.

---

## Premissas

- A data deve estar no formato DD/MM/AAAA.
- Todos os campos precisam estar preenchidos.
- O sistema não tem validação avançada, é focado no funcionamento básico.

---

## Observações

- Todo o cálculo e regra de decisão está no backend.
- O frontend apenas envia os dados e exibe o resultado.
- A aplicação foi feita de forma simples, para mostrar que entendi o problema e consegui implementar a lógica proposta.
