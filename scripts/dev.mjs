import { runBuild } from "hohoro/experimental";

try {
  await runBuild({
    rootDirectory: process.cwd(),
    logger: console,
  });
} catch (error) {
  console.error(error);
}
