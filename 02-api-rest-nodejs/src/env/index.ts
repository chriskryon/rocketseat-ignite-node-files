import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
	NODE_ENV: z.enum(["development", "test", "production"]).default("production"),
	DATABASE_URL: z.string(),
	PORT: z.number().default(3333),
});

// O parse vai verificar se as variáveis de ambiente estão de acordo com o schema
// O safeParse vai verificar se as variáveis de ambiente estão de acordo com o schema e retornar um objeto com os valores ou um erro
const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
	console.error("Invalid environment variables.", _env.error.format());

	throw new Error("Invalid environment variables.");
}

export const env = _env.data;
