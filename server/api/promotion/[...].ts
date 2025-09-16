import { joinURL } from "ufo";

// For Apply Proxy on every request with prefix /api
export default defineEventHandler(async (event) => {
  const proxyUrl = process.env.API_BASE_PROMOTION as string;

  const path = event.path.replace(/^\/api\/promotion/, "");
  const target = joinURL(proxyUrl, path);
  // ("target=", target);
  
  return proxyRequest(event, target);
});
