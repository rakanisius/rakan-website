import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware(async (context, next) => {
  const response = await next();

  if (context.url.pathname.endsWith(".xml")) {
    response.headers.set("Content-Type", "application/xml; charset=utf-8");
  }

  return response;
});
