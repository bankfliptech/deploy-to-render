import * as core from "@actions/core";
import { checkDeployStatus, DeployStatus } from "./check-deploy-status";

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const waitForDeployment = async (apiKey: string, serviceId: string, deployId: string) => {
  const timeout = setTimeout(() => {
    throw new Error("Timed out while waiting for deployment to finish");
  }, 30 * 60 * 1000); // 10 minutes

  let status = await checkDeployStatus(apiKey, serviceId, deployId);
  const inProgressStatusCodes = [
    DeployStatus.Created,
    DeployStatus.BuildInProgress,
    DeployStatus.UpdateInProgress,
    DeployStatus.PreDeployInProgress,
  ];
  while (inProgressStatusCodes.includes(status)) {
    core.info(`Waiting for deployment ${deployId} to finish processing... (${status})`);
    await delay(5000);
    status = await checkDeployStatus(apiKey, serviceId, deployId);
  }

  clearTimeout(timeout);
  return status;
};
