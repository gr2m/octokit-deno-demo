// app.ts
import { config } from "https://deno.land/x/dotenv/mod.ts";
import { request, githubAppJwt } from "./deno-bundle.js";

const env = config();

const { token } = await githubAppJwt({
  appId: env.GITHUB_APP_ID,
  privateKey: env.GITHUB_APP_PRIVATE_KEY,
});

const { data } = await request("GET /app", {
  headers: {
    authorization: `Bearer ${token}`,
  },
});

console.log(data);
