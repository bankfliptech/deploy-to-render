export enum DeployStatus {
  Created = "created",
  BuildInProgress = "build_in_progress",
  UpdateInProgress = "update_in_progress",
  Live = "live",
  Deactivated = "deactivated",
  Build_failed = "build_failed",
  Update_failed = "update_failed",
  Canceled = "canceled",
}

export const checkDeployStatus = async (apiKey: string, serviceId: string, deployId: string) => {
  const headers = new Headers();
  headers.append("Authorization", `Bearer ${apiKey}`);
  headers.append("Accept", "application/json");

  const result = await fetch(
    `https://api.render.com/v1/services/${serviceId}/deploys/${deployId}`,
    { method: "GET" },
  );
  if (result.status !== 200) {
    throw new Error();
  }

  const data = (await result.json()) as { id: string; status: DeployStatus };

  return data.status;
};
