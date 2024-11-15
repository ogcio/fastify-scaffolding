import { getLoggingConfiguration } from "@ogcio/fastify-logging-wrapper";
import closeWithGrace from "close-with-grace";
import fastify from "fastify";
import fp from "fastify-plugin";
import buildServer from "./server.js";

async function init() {
  const server = fastify(getLoggingConfiguration());

  server.register(fp(buildServer));

  await server.ready();

  closeWithGrace(
    { delay: server.config.FASTIFY_CLOSE_GRACE_DELAY },
    async ({ err }) => {
      if (err != null) {
        server.log.error(err);
      }

      await server.close();
    },
  );

  try {
    await server.listen({
      port: server.config.PORT,
    });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
}

init();
