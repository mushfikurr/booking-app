import { SecretsManager } from "aws-sdk";
import { Config, NextjsSite, RDS } from "sst/constructs";
import { SSTConfig } from "sst";

export default {
  config(_input) {
    return {
      name: "booking-app",
      region: "us-east-1",
    };
  },
  stacks(app) {
    app.stack(async function Site({ stack }) {
      const db = new RDS(stack, "booking-app-db", {
        defaultDatabaseName: "BookingAppDb",
        engine: "mysql5.7",
      });

      const DATABASE_URL = new Config.Secret(stack, "DATABASE_URL");

      const site = new NextjsSite(stack, "site", {
        bind: [db, DATABASE_URL],
      });

      stack.addOutputs({
        SiteUrl: site.url,
        DBHost: db.clusterEndpoint.hostname,
      });
    });
  },
} satisfies SSTConfig;
