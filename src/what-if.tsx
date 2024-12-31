// what-if.tsx
import { Hono } from "hono";

// what if we had a manifest of all the pages?
// imagine this being written out to `./dist/page-manifest.json`
let manifest = {
  "/": {
    // in src these would end with `.tsx` or `.ts`
    // in dist they will end with `.mjs` most likely
    serverPath: "/app/index.page",
    clientPath: "/app/index.page.client",
  },
  "/about": {
    serverPath: "/app/about.page",
    clientPath: "/app/about.page.client",
  },
  "/@not-found": {
    serverPath: "/app/not-found.page",
    clientPath: "/app/not-found.page.client",
  },
  "/api/hello": {
    serverPath: "/app/api/hello.api",
    clientPath: "/app/api/hello.api.client",
  },
  "/name/[name]": {
    serverPath: "/app/name/[name].page",
    clientPath: "/app/name/[name].page.client",
  },
};

type Route = {
  serverPath: string;
  clientPath: string;
};

function findRoute(
  manifest: Record<string, Route>,
  pathname: string,
): Route | undefined {
  return manifest[pathname];
}

function findNearestRouteOfType(
  manifest: Record<string, Route>,
  pathname: string,
  type: "not-found",
): Route | undefined {
  return manifest[`/${type}`];
}

// then in our server entrypoint:
let app = new Hono();

app.get("*", async (c) => {
  let { pathname } = new URL(c.req.url);
  // hand wavey - need to handle actual route matching
  let route = findRoute(manifest, pathname);
  if (!route) {
    route = findNearestRouteOfType(manifest, pathname, "not-found");
    if (!route) {
      return c.text("Not Found", 404);
    }
  }
  let { serverPath, clientPath } = route;

  let mod = await import(serverPath);
  let handler = mod.default;

  return handler(c);
});
