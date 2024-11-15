export const envSchema = {
  type: "object",
  required: ["PORT"],
  properties: {
    PORT: { type: "number" },
    FASTIFY_CLOSE_GRACE_DELAY: { type: "number", default: 500 },
    LOG_LEVEL: { type: "string", default: "INFO" },
  },
};
