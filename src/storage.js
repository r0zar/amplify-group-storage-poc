import Amplify, { Storage } from "aws-amplify";
import awsExports from "./aws-exports";

export const getProfileImage = (fileName) => {
  return Storage.get(fileName, { level: "protected" });
};

export const setProfileImage = (file) => {
  return Storage.put(file.name, file, {
    level: "protected",
    contentType: file.type,
  });
};

export const getPrivateImage = (fileName) => {
  return Storage.get(fileName, { level: "private" });
};

export const setPrivateImage = (file) => {
  return Storage.put(file.name, file, {
    level: "private",
    contentType: file.type,
  });
};
