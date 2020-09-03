import Amplify, { Auth, API, graphqlOperation } from "aws-amplify";
import awsExports from "./aws-exports";
import { getFile, listFiles } from "./graphql/queries";
import { createFile, updateFile } from "./graphql/mutations";
Amplify.Auth.configure(awsExports);
Amplify.API.configure({
  endpoints: [
    {
      name: "apie12c9f73",
      endpoint: "https://oo3l0vmo46.execute-api.us-east-1.amazonaws.com/dev",
      custom_header: async () => {
        return {
          "Authorization-Pool": `Bearer ${(await Auth.currentSession())
            .getAccessToken()
            .getJwtToken()}`,
        };
      },
    },
  ],
});

export const newFile = async ({ key, url }) => {
  const credentials = await Auth.currentCredentials();
  const input = {
    id: `private/${credentials.identityId}/${key}`,
    name: key,
    description: "test",
  };
  const { data, errors } = await API.graphql(
    graphqlOperation(createFile, { input })
  );
  return data.createFile;
};

export const readFile = async (id) => {
  const { data, errors } = await API.graphql(graphqlOperation(getFile, { id }));
  return data.getFile;
};

export const getMyFiles = async (variables) => {
  const { data, errors } = await API.graphql(
    graphqlOperation(listFiles, variables)
  );
  return data.listFiles;
};

export const updateMyFile = async (input) => {
  const { data, errors } = await API.graphql(
    graphqlOperation(updateFile, { input })
  );
  return data.updateFile;
};

export const uploadFile = (file) => {
  return API.post("apie12c9f73", "/files/", {
    body: file,
  });
};
