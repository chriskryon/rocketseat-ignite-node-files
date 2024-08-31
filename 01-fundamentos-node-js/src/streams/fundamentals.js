// Tudo no nodejs é stream, ou seja, é um fluxo de dados, seja de entrada ou saída.

import { Readable, Writable, Transform } from "node:stream";

process.stdin.pipe(process.stdout);

class OneToHundredStream extends Readable {
	index = 1;

	_read() {
		const i = this.index++;

		setTimeout(() => {
			if (i > 100) {
				this.push(null);
			} else {
				const buffer = Buffer.from(`${String(i)} `);

				this.push(buffer);
			}
		}, 50);
	}
}

class MultiplyByTenStream extends Writable {
	// o chunk é um buffer, ou seja, um array de bytes, é um pedaço de dados
	// o encoding é a codificação do buffer
	// o callback é a função que deve ser chamada quando o processamento do chunk for finalizado
	_write(chunk, encoding, callback) {
		const number = Number.parseInt(chunk.toString());
		const result = number * 10;

		console.log(result);

		callback();
	}
}

class InverseNumberStream extends Transform {
	_transform(chunk, encoding, callback) {
		const number = Number.parseInt(chunk.toString());
		const result = number * -1;

		this.push(result.toString());

		callback(null, Buffer.from(result.toString()));
	}
}

new OneToHundredStream()
	.pipe(new InverseNumberStream())
	.pipe(new MultiplyByTenStream());
