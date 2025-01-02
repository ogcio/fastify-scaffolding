import type { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import fastify from "fastify";
import fp from "fastify-plugin";
import buildServer from "../server.js";

declare module "fastify" {
  interface FastifyInstance {}
}

// automatically build and tear down our instance
export async function build() {
  const app = fastify().withTypeProvider<TypeBoxTypeProvider>();

  app.register(fp(buildServer));

  return app;
}
