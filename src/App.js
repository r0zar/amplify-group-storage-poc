import React from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import ProTip from "./ProTip";
import S3ImageUpload from "./S3ImageUpload";

import Amplify, { API } from "aws-amplify";
import { withAuthenticator, AmplifySignOut } from "@aws-amplify/ui-react";
import awsconfig from "./aws-exports";
import { Button, Avatar, Box } from "@material-ui/core";
import { AvatarGroup } from "@material-ui/lab";
import { readFile } from "./api";

Amplify.configure(awsconfig);

export default withAuthenticator(function App() {
  const [files, setFiles] = React.useState([]);

  const getData = async (id) => {
    const file = await readFile(id);
    const blob = await API.get("apie12c9f73", "/files/" + file.s3Path, {
      responseType: "blob",
    });
    setFiles(files.concat({ id, src: await blob.text() }));
    return blob;
  };

  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Amplify Group-Authorized Storage
        </Typography>
        <Box display="flex" justifyContent="center">
          <AvatarGroup max={7} spacing="small">
            {files.map((file) => (
              <Avatar
                key={file.id}
                src={file.src}
                style={{ width: "100px", height: "100px" }}
              />
            ))}
          </AvatarGroup>
        </Box>
        <Box display="flex" justifyContent="center">
          <S3ImageUpload setFile={(file) => getData(file.id)} />
        </Box>
      </Box>
    </Container>
  );
});
