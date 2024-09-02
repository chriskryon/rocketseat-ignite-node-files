import fastify from 'fastify'
import { knex } from './database'
import test from 'node:test'

const app = fastify()

// GET, POST, PUT, PATCH, DELETE

app.get('/hello', async (request, response) => {
  const tables = await knex('sqlite_schema').select('*')
  return tables
})

app.listen({ port: 3333 }).then(() => {
  console.log('App is running on port 3333')
})
