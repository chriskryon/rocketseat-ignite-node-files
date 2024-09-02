import type { FastifyInstance } from "fastify";
import { knex } from "../database";
import { randomUUID } from "node:crypto";

export async function transactionsRoutes(app: FastifyInstance) {
	app.get("/create", async () => {
		const transaction = await knex("transactions")
			.insert({
				id: randomUUID(),
				title: "Transação de Teste",
				amount: Math.random() * 1000,
				created_at: new Date(),
				session_id: randomUUID(),
			})
			.returning("*");

		return transaction;
	});

	app.get("/transactions", async () => {
		const transaction = await knex("transactions").select("*");

		return transaction;
	});
}
