import React from 'react';
import { Input, Button } from '@material-ui/core';
import { setProfileImage, getProfileImage, setPrivateImage, getPrivateImage } from './storage';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';

const S3ImageUpload = () => {

  const onChange = async (e) => {
    const file = e.target.files[0];
    const response = await setPrivateImage(file);
    const url = await getPrivateImage(response.key);
    // updateMe({ profileImage: response.key, profileImageURL: url });
  }

  return (
    <Button component="label">
      Change My Profile Photo
      <Input type="file" accept="image/*" onChange={e => onChange(e)} style={{ display: 'none' }} />
    </Button>
  );
}

export default withAuthenticator(S3ImageUpload);
