import React from "react";
import { withStyles } from "@material-ui/core/styles";

const Comments = ({ classes }) => <div>Comments</div>;

const styles = theme => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper
  },
  inline: {
    display: "inline"
  }
});

export default withStyles(styles)(Comments);
