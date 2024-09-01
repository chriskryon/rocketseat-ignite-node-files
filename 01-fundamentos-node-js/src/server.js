import http from "node:http";
import { json } from "./middleware/json.js";
import { Database } from "./database.js";
import { randomUUID } from "node:crypto";

/* 
HTTP:
  - Método HTTP
  - URL
*/

/*
Cabeçalhos (requisição e resposta) ==> metadados, são informações adicionais que
são enviadas junto com a requisição ou resposta, como por exemplo, o tipo de
conteúdo que está sendo enviado, o tamanho do conteúdo, o tipo de autenticação, etc.
*/
const database = new Database();

const server = http.createServer(async (request, response) => {
	const { method, url } = request;

	await json(request, response);

	if (method === "GET" && url === "/users") {
		const users = database.select("users");

		return response.end(JSON.stringify(users));
	}

	if (method === "POST" && url === "/users") {
		const { name, email } = request.body;
		const user = { id: randomUUID(), name, email };

		database.insert("users", user);

		return response.writeHead(201).end();
	}
	return response.writeHead(404).end("Not Found");
});

server.listen(3333);
