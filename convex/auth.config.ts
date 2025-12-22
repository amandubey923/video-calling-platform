import { AuthConfig } from "convex/server";

export default {
  providers: [
    {
      
      domain: "https://integral-chamois-45.clerk.accounts.dev",
      applicationID: "convex",
    },
  ]
} satisfies AuthConfig;