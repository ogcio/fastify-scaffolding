import { FastifyReply, FastifyRequest } from "fastify";

declare module "fastify" {
  export interface FastifyInstance {
    config: {
      PORT: number;
      FASTIFY_CLOSE_GRACE_DELAY: number;
      LOG_LEVEL: string;
    };
  }
}
