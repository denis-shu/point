import React from "react";
import { withStyles } from "@material-ui/core/styles";

const NoContent = ({ classes }) => <div>NoContent</div>;

const styles = theme => ({
  root: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center"
  },
  icon: {
    margin: theme.spacing.unit,
    fontSize: "80px"
  }
});

export default withStyles(styles)(NoContent);
