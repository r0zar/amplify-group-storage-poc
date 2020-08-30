import Amplify, { Auth, API, graphqlOperation } from "aws-amplify";
import awsExports from "./aws-exports";
import { getFile } from "./graphql/queries";
import { createFile } from "./graphql/mutations";
Amplify.configure(awsExports);

export const newFile = async ({ key, url }) => {
  const credentials = await Auth.currentCredentials();
  const input = {
    name: key,
    description: "test",
    url: url,
    s3Path: `private/${credentials.identityId}/${key}`,
  };
  const { data, errors } = await API.graphql(
    graphqlOperation(createFile, { input })
  );
  console.log(data);
  return data.createFile;
};

export const readFile = async (id) => {
  const { data, errors } = await API.graphql(graphqlOperation(getFile, { id }));
  return data.getFile;
};
