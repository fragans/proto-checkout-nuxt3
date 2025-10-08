import { joinURL } from "ufo";

// For Apply Proxy on every request with prefix /api
export default defineEventHandler(async (event) => {
  const proxyUrl = process.env.API_BASE_ORDER as string;

  const path = event.path.replace(/^\/api\/order/, "");
  const target = joinURL(proxyUrl, path);
  // console.log("target=", target);
  
  return proxyRequest(event, target);
});
