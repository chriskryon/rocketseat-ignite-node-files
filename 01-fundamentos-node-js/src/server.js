import http from "node:http";

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
const users = [];

const server = http.createServer(async (request, response) => {
	const { method, url } = request;

	const buffers = [];

	for await (const chunk of request) {
		buffers.push(chunk);
	}

	// const body = JSON.parse(Buffer.concat(buffers).toString());
	try {
		// O Buffer.concat concatena todos os buffers que foram passados para ele
		// ou seja, ele vai concatenar todos os pedaços de dados que foram passados
		request.body = JSON.parse(Buffer.concat(buffers).toString());
	} catch (error) {
		request.body = null;
	}

	if (method === "GET" && url === "/users") {
		return response
			.setHeader("Content-Type", "application/json")
			.end(JSON.stringify(users));
	}

	if (method === "POST" && url === "/users") {
		const { name, email } = request.body;
		users.push({ id: 1, name, email });

		return response.writeHead(201).end();
	}
	return response.writeHead(404).end("Not Found");
});

server.listen(3333);
