import Amplify, { Auth, API, graphqlOperation } from "aws-amplify";
import awsExports from "./aws-exports";
import { getFile, listFiles } from "./graphql/queries";
import { createFile, updateFile } from "./graphql/mutations";
Amplify.configure(awsExports);

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
