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


const ME = `{
  me{
   _id,
   email,
   name,
   picture   
    } 
 }`

const Login = ({
  classes
}) => {

  const {
    dispatch
  } = useContext(Context);
  const onSuccess = async googleUser => {
    const idToken = googleUser.getAuthResponse().id_token;
    console.log(idToken);
    const client = new GraphQLClient('http://localhost:4000/graphql', {
      headers: {
        authorization: idToken
      }
    })
    const data = await client.request(ME);

    console.log(data);
    dispatch({type: "LOGIN", payload: data.me});
  };
  return <GoogleLogin clientId = "770971871331-4hgt46cdr9p27l98hfu0aa9mfmr5kkam.apps.googleusercontent.com"
  onSuccess = {
    onSuccess
  }
  isSignedIn = {
    true
  }
  />;
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