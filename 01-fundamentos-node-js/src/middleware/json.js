// o middleware é uma função que recebe a requisição e a resposta e pode fazer
// qualquer tipo de operação com esses objetos, como por exemplo, adicionar
// informações, modificar o corpo da requisição, etc.

// middleware nada mais é do que um interceptador, ou seja, uma função que é
// executada antes de outra função. No caso do Node.js, o middleware é uma
// função que é executada antes de uma rota.
// Eles sempre recebem os objetos request e response

export async function json(request, response) {
	const buffers = [];

	for await (const chunk of request) {
		buffers.push(chunk);
	}

	try {
		request.body = JSON.parse(Buffer.concat(buffers).toString());
	} catch (error) {
		request.body = null;
	}

	response.setHeader("Content-Type", "application/json");
}
