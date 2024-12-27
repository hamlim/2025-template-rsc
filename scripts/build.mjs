import { runBuild } from "hohoro/experimental";

// Build Source:
try {
  await runBuild({
    rootDirectory: process.cwd(),
    logger: console,
  });
} catch (error) {
  console.error(error);
}
