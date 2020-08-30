import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import ProTip from './ProTip';
import S3ImageUpload from './S3ImageUpload';

import Amplify, { API } from 'aws-amplify';
import awsconfig from './aws-exports';
import { Button, Avatar } from '@material-ui/core';

Amplify.configure(awsconfig);

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function App() {

  const [data, setData] = React.useState('');

  const getData = async () => { 

  const blob = await API.get('apie12c9f73', '/files/123', { 'responseType': 'blob' });

  console.log(blob)

  setData(await blob.text())
  
  return blob
}

  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Create React App v4-beta example
        </Typography>
        <Avatar src={data} />
        <Button onClick={getData}> GET DATA</Button>
        <S3ImageUpload />
        <ProTip />
        <Copyright />
      </Box>
    </Container>
  );
}
