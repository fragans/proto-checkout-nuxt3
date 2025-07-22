import { joinURL } from "ufo";

// For Apply Proxy on every request with prefix /api
export default defineEventHandler(async (event) => {
  const proxyUrl = process.env.API_BASE_ACCOUNT_SSR as string;

  const path = event.path.replace(/^\/api\/account/, "");
  const target = joinURL(proxyUrl, path);
  console.log("target=", target);
  
  return proxyRequest(event, target);
});
