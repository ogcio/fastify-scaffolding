import path from "node:path";
import fastifyAutoload from "@fastify/autoload";
import fastifyEnv from "@fastify/env";
import { initializeErrorHandler } from "@ogcio/fastify-error-handler";
import { initializeLoggingHooks } from "@ogcio/fastify-logging-wrapper";
import type { FastifyInstance, FastifyPluginOptions } from "fastify";
import { envSchema } from "./config.js";

export default async function buildServer(
  server: FastifyInstance,
  options: FastifyPluginOptions,
) {
  initializeLoggingHooks(server);
  initializeErrorHandler(server);

  await server.register(fastifyAutoload, {
    dir: path.join(import.meta.dirname, "plugins/external"),
    options: { ...options },
  });

  server.register(fastifyEnv, {
    schema: envSchema,
    dotenv: true,
    ...options,
  });

  server.register(fastifyAutoload, {
    dir: path.join(import.meta.dirname, "routes"),
    autoHooks: true,
    cascadeHooks: true,
    options: { ...options },
  });
}
