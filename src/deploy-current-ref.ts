import fetch from "node-fetch";

export const deployCurrentRef = async (apiKey: string, deployHookURL: string) => {
  const result = await fetch(`${deployHookURL}?ref=${process.env.GITHUB_SHA}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      Accept: "application/json",
    },
  });
  if (result.status !== 200) {
    throw new Error(
      `Something went wrong when trying to create a new deployment: HTTP status code ${
        result.status
      }, ${await result.text()}`,
    );
  }

  const data = (await result.json()) as { id: string; status: string };

  return data.id;
};
