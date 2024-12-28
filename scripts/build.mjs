// import { runBuild } from "hohoro/experimental";

// // Build Source:
// try {
//   await runBuild({
//     rootDirectory: process.cwd(),
//     logger: console,
//   });
// } catch (error) {
//   console.error(error);
// }

import { build } from "rolldown";

// build writes to disk by default
await build({
  input: "src/rsc-server.tsx",
  platform: "node",
  resolve: {
    conditionNames: ["react-server", "import"],
  },
  output: {
    file: "dist/rsc-server.mjs",
    format: "esm",
  },
});
