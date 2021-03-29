import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";
import loginImg from "../images/login-img.svg";
import AuthService from "../auth/AuthService";
const Login = () => {
  const { loginWithRedirect, getAccessTokenSilently } = useAuth0();

  return (
    <Wrapper>
      <div className="container">
        <img src={loginImg}></img>
        <button className="btn" onClick={loginWithRedirect}>
          Login
        </button>
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.section`
  min-height: 100vh;
  display: grid;
  place-items: center;
  .container {
    width: 100vw;
    max-width: 400px;
    text-align: center;
  }
  img {
    margin-bottom: 2rem;
    margin-left: 2rem;
  }
  h1 {
    margin-bottom: 1.5rem;
  }
`;
export default Login;
