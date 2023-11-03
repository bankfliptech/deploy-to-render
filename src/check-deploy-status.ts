import fetch from "node-fetch";

export enum DeployStatus {
  Created = "created",
  BuildInProgress = "build_in_progress",
  UpdateInProgress = "update_in_progress",
  PreDeployInProgress = "pre_deploy_in_progress",
  Live = "live",
  Deactivated = "deactivated",
  Build_failed = "build_failed",
  Update_failed = "update_failed",
  Canceled = "canceled",
}

export const checkDeployStatus = async (apiKey: string, serviceId: string, deployId: string) => {
  const result = await fetch(
    `https://api.render.com/v1/services/${serviceId}/deploys/${deployId}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        Accept: "application/json",
      },
    },
  );
  if (result.status !== 200) {
    throw new Error();
  }

  const data = (await result.json()) as { id: string; status: DeployStatus };

  return data.status;
};
