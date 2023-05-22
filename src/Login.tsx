import React, { FormEvent } from "react";
import "./index.css";
import { useHistory } from "react-router-dom";
import usePaystackCognitoAuth from "./hooks/usePaystackCognitoAuth";
import styled from "@emotion/styled";

const PageWrapper = styled.div`
  background-color: #011b33;
  height: 100vh;
  padding-top: 50px;
`;

const DetailsWrapper = styled.div`
  background-color: white;
  width: 450px;
  margin: 0 auto;
  border-radius: 3px;
  padding: 35px;
  text-align: center;
`;

const StyledInput = styled.input`
  height: 50px;
  width: 100%;
  padding: 6px 12px;
  margin-bottom: 15px;
  border: 1px solid #dee5e7;
  border-radius: 2px;
`;

const StyledButton = styled.button`
  background-color: #3bb75e;
  padding: 12px;
  width: 100%;
  border: 1px solid #3bb75e;
  color: white;
  border-radius: 5px;
  cursor: pointer;
`;

function Login() {
  const { getLoginURL } = usePaystackCognitoAuth();
  const history = useHistory();

  // const handleSuccessfulLogin = (token?: string) => {
  //   if (!token) return;
  //   localStorage.setItem("service_token", token);
  //   // update API auth header
  //   history.push("/");
  // };

  // const loginToApp = async (event: FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();

  //   try {
  //     const { data: responseData } = await login({
  //       email: event.currentTarget["email"].value,
  //       password: event.currentTarget["password"].value,
  //     });

  //     if (responseData.is_require_password_change) {
  //       // ideally a consumer will route to a page where they can change their password.
  //       const userAttributes = { given_name: "Anthony", family_name: "Uche" };
  //       const { data } = await setNewPasswordOnFirstLogin({
  //         email: "alex@paystack.com",
  //         oldPassword: "Password123!",
  //         newPassword: "Password1234!",
  //         userAttributes,
  //       });
  //       handleSuccessfulLogin(data.access_token?.token);
  //       return;
  //     }

  //     console.log(responseData);

  //     handleSuccessfulLogin(responseData.access_token?.token);
  //   } catch (_error) {
  //     const error = _error as { message: string };
  //     // toast
  //     alert(error.message);
  //   }
  // };

  return (
    <PageWrapper>
      <DetailsWrapper>
        <p>Welcome</p>
        <StyledButton type="submit" onClick={() => window.location.replace(getLoginURL())}>
            Login with Okta
        </StyledButton>
        {/* <form onSubmit={loginToApp}>
          <StyledInput placeholder="Email Address" name="email" />
          <StyledInput placeholder="Password" name="password" />
          <StyledButton type="submit">
            {isLoading ? "Submitting..." : "Login"}
          </StyledButton>
        </form> */}
      </DetailsWrapper>
    </PageWrapper>
  );
}

export default Login;
