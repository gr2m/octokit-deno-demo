import { request } from "@octokit-next/request";
import githubAppJwt from "universal-github-app-jwt";
import dotenv from "dotenv";

dotenv.config();

const { token } = await githubAppJwt({
  id: process.env.GITHUB_APP_ID,
  privateKey: process.env.GITHUB_APP_PRIVATE_KEY,
});

const { data } = await request("GET /app", {
  headers: {
    authorization: `token ${token}`,
  },
});

console.log(data);
