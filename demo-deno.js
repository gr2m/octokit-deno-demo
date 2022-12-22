// app.ts
import { config } from "https://deno.land/x/dotenv/mod.ts";
import {
  request,
  githubAppJwt,
  getWebFlowAuthorizationUrl,
} from "./deno-bundle.js";

const env = config();

const { token } = await githubAppJwt({
  id: env.GITHUB_APP_ID,
  privateKey: env.GITHUB_APP_PRIVATE_KEY,
});

const { data } = await request("GET /app", {
  headers: {
    authorization: `Bearer ${token}`,
  },
});

console.log("Authenticated as %s", data.slug);

const { url } = getWebFlowAuthorizationUrl({
  clientType: "github-app",
  clientId: "1234567890abcdef1234",
  scopes: ["repo"],
});

console.log("Open %s", url);
