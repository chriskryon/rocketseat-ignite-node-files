import http from "node:http";
import { json } from "./middleware/json.js";
import { routes } from "./routes.js";
import { extractQueryParams } from "./utils/extract-query-params.js";

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

// Formas de enviar dados para o servidor:
// - Query params: parametros que são enviados na URL: exemplo: /users?name=Chris
// - Route params: exemplo: /users/:id
// - Body: corpo da requisição, onde são enviados os dados

// Os query params sao para informacoes nao sensíveis, como filtros, ordenacao, etc
// Os route params sao parametros nao nomeados, como id, por exemplo, identificadores de recursos
// O body é para enviar dados sensíveis, como senhas, por exemplo

const server = http.createServer(async (request, response) => {
	const { method, url } = request;

	await json(request, response);

	const route = routes.find(
		(route) => route.method === method && route.path.test(url),
	);

	if (route) {
		const routeParams = request.url.match(route.path);

		const { query, ...params } = routeParams.groups;

		request.params = params;
		request.query = query ? extractQueryParams(query) : {};

		return route.handler(request, response);
	}

	return response.writeHead(404).end("Not Found");
});

server.listen(3333);
