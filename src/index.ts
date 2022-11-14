import * as core from "@actions/core";
import { DeployStatus } from "./check-deploy-status";
import { loadConfig } from "./config";
import { deployCurrentRef } from "./deploy-current-ref";
import { waitForDeployment } from "./wait-for-deployment";

const run = async () => {
  core.info(`Starting Deploy to Render workflow v0.0.8`);
  try {
    const config = loadConfig();

    core.info(
      `Starting deployment of reference ${process.env.GITHUB_SHA} for service ${config.serviceId}`,
    );
    const deployId = await deployCurrentRef(config.apiKey, config.deployHookURL);
    core.info(`Successfully created deployment ${deployId}`);

    const status = await waitForDeployment(config.apiKey, config.serviceId, deployId);

    if (status !== DeployStatus.Live) {
      throw new Error(`Unsuccessful deployment status: ${status}`);
    }

    core.info(`Deployment of service ${config.serviceId} completed successfully`);
    core.setOutput("success", true);
  } catch (err) {
    core.setFailed(`Deployment failed: ${err.message ?? err}`);
    core.setOutput("success", false);
  }
};

run();
