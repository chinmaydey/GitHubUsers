import auth0 from "auth0-js";
import { AUTH_CONFIG } from "./AuthConfig";

const AuthService = () => {
  const auth = new auth0.WebAuth({
    domain: AUTH_CONFIG.domain,
    clientID: AUTH_CONFIG.clientID,
    redirectUri: AUTH_CONFIG.redirectUri,
    audience: AUTH_CONFIG.audience,
    responseType: "token id_token",
    scope: "openid",
  });

  const Login = () => {
    auth.authorize();
  };
};

export default AuthService;
