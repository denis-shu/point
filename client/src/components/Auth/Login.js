import React, {
  useContext
} from "react";
import {
  GoogleLogin
} from "react-google-login";
import {
  withStyles
} from "@material-ui/core/styles";
import {
  GraphQLClient
} from 'graphql-request';
import Context from '../../context';

import Typography from '@material-ui/core/Typography';

import {ME_QUERY} from '../../graphql/queries';



const Login = ({
  classes
}) => {

  const {
    dispatch
  } = useContext(Context);
  const onSuccess = async googleUser => {

    try {
      const idToken = googleUser.getAuthResponse().id_token;
      console.log(idToken);
      const client = new GraphQLClient('http://localhost:4000/graphql', {
        headers: {
          authorization: idToken
        }
      })
      const { me } = await client.request(ME_QUERY);
  
      dispatch({type: "LOGIN", payload: me});
    }
    catch(err) {
      onFailure(err)
    }
   
  };

  const onFailure = err => {
    console.error('Error', err);
  }

  return (
    <div className={classes.root}>

    <Typography
    component="h1"
    variant="h3"
    gutterBottom
    noWrap
    style={{color: "rgb(66, 133, 244)"}}
    >
      Hi
    </Typography>
   <GoogleLogin clientId = "770971871331-4hgt46cdr9p27l98hfu0aa9mfmr5kkam.apps.googleusercontent.com"
  onSuccess = {
    onSuccess
  }
  onFailure={onFailure}
  isSignedIn = {
    true
  }
  theme="dark"
  />;
  </div>
  );
};

const styles = {
  root: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center"
  }
};

export default withStyles(styles)(Login);