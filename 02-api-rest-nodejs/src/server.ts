import fastify from 'fastify';
import { knex } from './database';
import test from 'node:test';
import { randomUUID } from 'node:crypto';

const app = fastify();

// GET, POST, PUT, PATCH, DELETE

app.get('/create', async (request, response) => {
  const transaction = await knex('transactions')
    .insert({
      id: randomUUID(),
      title: 'Transação de Teste',
      amount: Math.random() * 1000,
      created_at: new Date(),
      session_id: randomUUID(),
    })
    .returning('*');

  return transaction;
});

app.get('/transactions', async (request, response) => {
  const transaction = await knex('transactions').select('*');

  return transaction;
});

app.listen({ port: 3333 }).then(() => {
  console.log('App is running on port 3333');
});
