import React from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import ProTip from "./ProTip";
import S3ImageUpload from "./S3ImageUpload";

import Amplify, { API, Auth } from "aws-amplify";
import { withAuthenticator, AmplifySignOut } from "@aws-amplify/ui-react";
import awsconfig from "./aws-exports";
import {
  Button,
  Avatar,
  Box,
  Grid,
  Badge,
  TextField,
  Fab,
} from "@material-ui/core";
import CloudUpload from "@material-ui/icons/CloudUpload";
import { AvatarGroup } from "@material-ui/lab";
import { readFile, getMyFiles, updateMyFile } from "./api";
import { makeStyles, withStyles } from "@material-ui/core/styles";

Amplify.configure(awsconfig);

const StyledBadge = withStyles((theme) => ({
  badge: {
    backgroundColor: "#44b700",
    color: "white",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "$ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}))(Badge);

export default withAuthenticator(function App() {
  const [files, setFiles] = React.useState([]);

  const getBlob = async (id) => {
    const file = await readFile(id);
    const blob = await API.get("apie12c9f73", "/files/" + file.s3Path, {
      responseType: "blob",
    });
    console.log(file, blob);
    return blob;
  };

  const getData = async (file) => {
    const blob = await getBlob(file.id);
    setFiles(
      files.concat({
        id: file.id,
        src: await blob.text(),
        viewers: file.viewers,
      })
    );
  };

  const addViewer = async () => {
    const data = await updateMyFile({
      id: files[0].id,
      viewers: ["67ffa893-d20f-452a-a4a6-d7e48ce38a1c"],
    });
    loadMyFiles();
  };

  const loadMyFiles = async () => {
    const myFiles = await getMyFiles({});
    const fileList = myFiles.items.map(async (file) => {
      const blob = await getBlob(file.id);
      return { id: file.id, src: await blob.text(), viewers: file.viewers };
    });
    setFiles(await Promise.all(fileList));
  };

  return (
    <Container maxWidth="md">
      <Grid
        container
        direction="column"
        justify="space-around"
        style={{ height: "100vh" }}
      >
        <Grid item>
          <Typography align="center" variant="h4" component="h1" gutterBottom>
            Amplify Group-Authorized Storage
          </Typography>
        </Grid>
        <Grid item>
          <Box display="flex" justifyContent="center">
            <AvatarGroup max={7} spacing="small">
              {files.map((file) => (
                <StyledBadge
                  key={file.id}
                  overlap="circle"
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  badgeContent={file.viewers && (file.viewers.length || 1)}
                >
                  <Avatar
                    src={file.src}
                    style={{ width: "100px", height: "100px" }}
                  />
                </StyledBadge>
              ))}
            </AvatarGroup>
          </Box>
        </Grid>
        <Grid item>
          <Grid container justify="space-between">
            <Button
              variant="contained"
              onClick={async () => {
                await Auth.signOut();
                window.location.reload();
              }}
            >
              Sign Out
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => loadMyFiles()}
            >
              Load My Files
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => addViewer()}
            >
              Add viewer to File
            </Button>
            <S3ImageUpload setFile={(file) => getData(file)} />
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
});
