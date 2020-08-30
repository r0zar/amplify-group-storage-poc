import React from "react";
import { Input, Button } from "@material-ui/core";
import {
  setProfileImage,
  getProfileImage,
  setPrivateImage,
  getPrivateImage,
} from "./storage";
import { newFile } from "./api";

const S3ImageUpload = ({ setFile }) => {
  const onChange = async (e) => {
    const file = e.target.files[0];
    const response = await setPrivateImage(file);
    const url = await getPrivateImage(response.key);
    console.log(response.key);
    const fileData = await newFile({ key: response.key, url });
    setFile(fileData);
  };

  return (
    <Button component="label">
      Upload Image File
      <Input
        type="file"
        accept="image/*"
        onChange={(e) => onChange(e)}
        style={{ display: "none" }}
      />
    </Button>
  );
};

export default S3ImageUpload;
