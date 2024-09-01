import http from "node:http";
import { Transform } from "node:stream";

class InverseNumberStream extends Transform {
	_transform(chunk, encoding, callback) {
		const number = Number.parseInt(chunk.toString());
		const result = number * -1;

		this.push(result.toString());
		console.log(result);

		callback(null, Buffer.from(result.toString()));
	}
}

const server = http.createServer(async (req, res) => {
	const buffers = [];

	for await (const chunk of req) {
		buffers.push(chunk);
	}

	const fullStreamContent = Buffer.concat(buffers).toString();
	console.log(fullStreamContent);

	return res.end(fullStreamContent);
});

server.listen(3334);
