import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import FolderIcon from "@material-ui/icons/Folder";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 752,
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
}));

const FileList = ({ files }) => {
  const classes = useStyles();
  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);
  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography variant="h6" className={classes.title}>
          Project Files and Documents
        </Typography>
        <div className={classes.demo}>
          <List dense={dense}>
            {files.map((file) => (
              <ListItem>
                <ListItemAvatar>
                  <Avatar src={file.src}>
                    <FolderIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={file.id}
                  secondary={secondary ? "Secondary text" : null}
                />
                {/* <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="delete">
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction> */}
              </ListItem>
            ))}
          </List>
        </div>
      </Grid>
    </Grid>
    // <Box display="flex" justifyContent="center">
    //   <AvatarGroup max={7} spacing="small">
    //     {files.map((file) => (
    //       <StyledBadge
    //         key={file.id}
    //         overlap="circle"
    //         anchorOrigin={{
    //           vertical: "bottom",
    //           horizontal: "right",
    //         }}
    //         badgeContent={file.viewers && (file.viewers.length || 1)}
    //       >
    //         <Avatar src={file.src} style={{ width: "100px", height: "100px" }}>
    //           <Description />
    //         </Avatar>
    //       </StyledBadge>
    //     ))}
    //   </AvatarGroup>
    // </Box>
  );
};

export default FileList;
