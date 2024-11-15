import type { FastifyInstance } from "fastify";
import { getPackageInfo } from "../utils/get-package-info.js";

export default async function healthCheck(app: FastifyInstance) {
  app.get(
    "/health",
    {
      schema: {
        tags: ["Health"],
        hide: true,
        description:
          "It checks the current health status of the APIs, pinging all the related items",
      },
    },
    async () => {
      const { name, version } = await getPackageInfo();
      return { [name]: version };
    },
  );
}
