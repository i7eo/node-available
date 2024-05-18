import Fastify, { FastifyInstance, RouteShorthandOptions } from "fastify";
import { Server, IncomingMessage, ServerResponse } from "http";
import process from "node:process";

const server: FastifyInstance = Fastify({});

function a() {
  for (let i = 0; i < 1e8; i++) {}
}
function b() {
  for (let i = 0; i < 1e8; i++) {}
}

server.get("/", (request, reply) => {
  a();
  b();
  reply.send({});
});

server.listen({ port: 3000 }, () => {
  console.log("listen at: http://127.0.0.1:3000/");
});

process.on("SIGINT", function () {
  console.error("Caught SIGINT, shutting down.");
  server.close();
});

// const opts: RouteShorthandOptions = {
//   schema: {
//     response: {
//       200: {
//         type: 'object',
//         properties: {
//           pong: {
//             type: 'string'
//           }
//         }
//       }
//     }
//   }
// }

// server.get('/ping', opts, async (request, reply) => {
//   return { pong: 'it worked!' }
// })

// const start = async () => {
//   try {
//     await server.listen({ port: 3000 })

//     const address = server.server.address()
//     const port = typeof address === 'string' ? address : address?.port

//   } catch (err) {
//     server.log.error(err)
//     process.exit(1)
//   }
// }

// start()
