import React from "react";
import { Input, Button, Fab } from "@material-ui/core";
import {
  setProfileImage,
  getProfileImage,
  setPrivateImage,
  getPrivateImage,
} from "./storage";
import { newFile } from "./api";
import CloudUpload from "@material-ui/icons/CloudUpload";

const S3ImageUpload = ({ setFile }) => {
  const onChange = async (e) => {
    const file = e.target.files[0];
    const response = await setPrivateImage(file);
    const url = await getPrivateImage(response.key);
    const fileData = await newFile({ key: response.key, url });
    setFile(fileData);
  };

  return (
    <Fab component="label" color="primary" aria-label="add">
      <CloudUpload color="secondary" />
      <Input
        type="file"
        accept="image/*"
        onChange={(e) => onChange(e)}
        style={{ display: "none" }}
      />
    </Fab>
  );
};

export default S3ImageUpload;
