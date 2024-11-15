import fs from "fs";
import { join } from "path";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi, {
  type FastifySwaggerUiOptions,
} from "@fastify/swagger-ui";
import type { FastifyInstance, FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";
import { getPackageInfo } from "../../utils/get-package-info.js";

export const autoConfig: FastifySwaggerUiOptions = {};

export default fp(
  async (fastify: FastifyInstance, opts: FastifyPluginAsync) => {
    // Have to register the two plugins in the same file
    // because swaggerUi is dependent on Swagger
    await fastify.register(fastifySwagger, {
      openapi: {
        info: {
          title: "OGCIO Fastify Scaffolding API",
          description: "API for OGCIO Fastify Scaffolding",
          version: (await getPackageInfo()).version,
        },
        components: {
          securitySchemes: {
            bearerAuth: {
              type: "http",
              scheme: "bearer",
              bearerFormat: "JWT",
            },
          },
        },
        security: [
          {
            bearerAuth: [],
          },
        ],
      },
      ...opts,
    });
    fastify.register(fastifySwaggerUi, {
      routePrefix: "/docs",
      logo: {
        type: "image/png",
        content: Buffer.from(
          fs
            .readFileSync(join(fastify.dirname, "public", "logo.png"))
            .toString("base64"),
          "base64",
        ),
      },
      ...opts,
    });
  },
  { name: "fastifySwagger" },
);
