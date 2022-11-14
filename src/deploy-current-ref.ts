export const deployCurrentRef = async (apiKey: string, deployHookURL: string) => {
  const headers = new Headers();
  headers.append("Authorization", `Bearer ${apiKey}`);
  headers.append("Content-Type", "application/json");
  headers.append("Accept", "application/json");

  const result = await fetch(`${deployHookURL}?ref=${process.env.GITHUB_SHA}`, {
    method: "POST",
    headers,
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
