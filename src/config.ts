import * as core from "@actions/core";

export const loadConfig = () => {
  const deployHookURL = core.getInput("deployHookURL");
  if (!deployHookURL) {
    throw new Error("The DeployHook URL is missing from the workflow file.");
  }

  const apiKey = core.getInput("apiKey");
  if (!apiKey) {
    throw new Error("The API Key is missing from the workflow file.");
  }

  const serviceId = core.getInput("serviceId");
  if (!serviceId) {
    throw new Error("The Service ID is missing from the workflow file.");
  }

  return {
    deployHookURL,
    apiKey,
    serviceId,
  };
};
