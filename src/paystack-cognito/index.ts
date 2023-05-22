import { useState } from "react";
import {
  CognitoUserPool,
  CognitoUser,
  AuthenticationDetails,
  CognitoUserSession,
} from "amazon-cognito-identity-js";

type Config = {
  userPoolId: string;
  userPoolDomain?: string;
  clientId: string;
  redirectURI?: string;
  logoutURI?: string;
};

export type Token = {
  access_token: string;
  id_token: string;
  refresh_token: string;
  expires_in: number;
};

export type User = {
  first_name: string;
  last_name: string;
  email: string;
  id: string;
};

type CognitoTokenError = {
  error:
    | "invalid_request"
    | "invalid_client"
    | "invalid_grant"
    | "unauthorized_client"
    | "unsupported_grant_type";
};

type CognitoUserInfoError = { error: "invalid_request" | "invalid_token" };

function useCognitoAuth(config: Config) {
  // const [isLoading, setIsLoading] = useState(false);

  // const getUserPool = () => {
  //   return new CognitoUserPool({
  //     UserPoolId: config.userPoolId,
  //     ClientId: config.clientId,
  //   });
  // };

  // const getUser = (username: string) => {
  //   return new CognitoUser({
  //     Username: username,
  //     Pool: getUserPool(),
  //   });
  // };

  // const currentUser = getUserPool().getCurrentUser();

  // const refreshToken = async (handleTokenRefresh: (token: string) => void) => {
  //   currentUser?.getSession(
  //     (error: Error | null, session: CognitoUserSession) => {
  //       if (error) {
  //         console.log(error);
  //       }

  //       const refreshToken = session.getRefreshToken();

  //       currentUser.refreshSession(
  //         refreshToken,
  //         (error, session: CognitoUserSession) => {
  //           if (error) {
  //             console.log(error);
  //           }

  //           const sessionDetails = {
  //             access_token: {
  //               token: session.getAccessToken().getJwtToken(),
  //               expiry: session.getAccessToken().getExpiration(),
  //               payload: session.getAccessToken().decodePayload(),
  //             },
  //             id_token: {
  //               token: session.getIdToken().getJwtToken(),
  //               expiry: session.getIdToken().getExpiration(),
  //               payload: session.getIdToken().decodePayload(),
  //             },
  //           };

  //           console.log(sessionDetails);
  //           handleTokenRefresh(session.getAccessToken().getJwtToken());
  //         }
  //       );
  //     }
  //   );
  // };

  // const login = async ({
  //   email,
  //   password,
  // }: {
  //   email: string;
  //   password: string;
  // }) => {
  //   setIsLoading(true);
  //   const authData = new AuthenticationDetails({
  //     Username: email,
  //     Password: password,
  //   });

  //   const cognitoUser = getUser(email);

  //   const session: CognitoUserSession | null = await new Promise(
  //     (resolve, reject) => {
  //       cognitoUser.authenticateUser(authData, {
  //         onSuccess: (userSession) => {
  //           setIsLoading(false);
  //           resolve(userSession);
  //         },
  //         onFailure: (error) => {
  //           setIsLoading(false);
  //           reject(error);
  //         },
  //         newPasswordRequired: () => {
  //           setIsLoading(true);
  //           resolve(null);
  //         },
  //       });
  //     }
  //   );

  //   if (session == null)
  //     return {
  //       status: false,
  //       message: "Password change required",
  //       data: { is_require_password_change: true },
  //     };

  //   return {
  //     status: true,
  //     message: "Login successful",
  //     data: {
  //       access_token: {
  //         token: session.getAccessToken().getJwtToken(),
  //         expiry: session.getAccessToken().getExpiration(),
  //         payload: session.getAccessToken().decodePayload(),
  //       },
  //       id_token: {
  //         token: session.getIdToken().getJwtToken(),
  //         expiry: session.getIdToken().getExpiration(),
  //         payload: session.getIdToken().decodePayload(),
  //       },
  //       refresh_token: session.getRefreshToken().getToken(),
  //     },
  //   };
  // };

  // const setNewPasswordOnFirstLogin = async ({
  //   email,
  //   oldPassword,
  //   newPassword,
  //   userAttributes,
  // }: {
  //   email: string;
  //   oldPassword: string;
  //   newPassword: string;
  //   userAttributes: Record<string, string>;
  // }) => {
  //   setIsLoading(true);
  //   const authData = new AuthenticationDetails({
  //     Username: email,
  //     Password: oldPassword,
  //   });

  //   const cognitoUser = getUser(email);

  //   const session: CognitoUserSession = await new Promise((resolve, reject) => {
  //     cognitoUser.authenticateUser(authData, {
  //       onSuccess: (response) => {
  //         setIsLoading(false);
  //         resolve(response);
  //       },
  //       onFailure: (error) => {
  //         setIsLoading(false);
  //         reject(error);
  //       },
  //       newPasswordRequired: () => {
  //         setIsLoading(true);
  //         cognitoUser.completeNewPasswordChallenge(
  //           newPassword,
  //           userAttributes,
  //           {
  //             onSuccess: (response) => {
  //               setIsLoading(false);
  //               resolve(response);
  //             },
  //             onFailure: (error) => {
  //               setIsLoading(false);
  //               reject(error);
  //             },
  //           }
  //         );
  //       },
  //     });
  //   });

  //   return {
  //     status: true,
  //     message: "Login successful",
  //     data: {
  //       token: session.getAccessToken().getJwtToken(),
  //       access_token: {
  //         token: session.getAccessToken().getJwtToken(),
  //         expiry: session.getAccessToken().getExpiration(),
  //       },
  //       id_token: {
  //         token: session.getIdToken().getJwtToken(),
  //         expiry: session.getIdToken().getExpiration(),
  //       },
  //     },
  //   };
  // };

  // const logout = async () => {
  //   return getUser("anthony@paystack.com").signOut();
  // };

  // const getAuthIdpURL = () => {
  //   const oktaURL = "https://dev-59207309.okta.com/oauth2/default";
  //   const oktaAppIntegrationClientId = "0oa94eulkhZoazng25d7";
  //   const redirectURI = `${config.userPoolDomain}/oauth2/idpresponse`;

  //   return `${oktaURL}/v1/authorize?client_id=${oktaAppIntegrationClientId}&redirect_uri=${redirectURI}&response_type=code`;
  // };

  const loginRedirectURL = `response_type=code&redirect_uri=${config.redirectURI}&identity_provider=Okta`

  const getLoginURL = () => {
    return `${config.userPoolDomain}/oauth2/authorize?client_id=${config.clientId}&${loginRedirectURL}`;
  };

  const getUserPoolToken = async (
    identifier: string,
    grantType: "authorization_code" | "refresh_token" = "authorization_code"
  ) => {

    const response = await fetch(`${config.userPoolDomain}/oauth2/token`, {
      method: "POST",
      headers: new Headers({
        "content-type": "application/x-www-form-urlencoded",
      }),
      body: Object.entries({
        grant_type: grantType,
        client_id: config.clientId,
        ...(grantType === "authorization_code" && {
          code: identifier,
          redirect_uri: config.redirectURI,
        }),
        ...(grantType === "refresh_token" && { refresh_token: identifier }),
      })
        .map(([key, value]) => `${key}=${value}`)
        .join("&"),
    });

    const data = await response.json();

    if (!response.ok) {
      const { error }: CognitoTokenError = data; // 400 errors
      const errorMessageMap = {
        invalid_request: "",
        invalid_client: "",
        invalid_grant: "",
        unauthorized_client: "",
        unsupported_grant_type: "",
      };

      // log to rollbar
      throw new Error(errorMessageMap[error]);
    }

    return data;
  };

  const getToken = async (authorizationCode: string) => {
    const data = await getUserPoolToken(authorizationCode);

    const token: Token = {
      access_token: data.access_token,
      id_token: data.id_token,
      expires_in: (Date.now() + data.expires_in * 1000) / 1000,
      refresh_token: data.refresh_token
    }

    return token;
  }

  const refreshToken = async (refreshToken: string) => {
    const data = await getUserPoolToken(refreshToken, 'refresh_token');

    const token: Omit<Token, 'refresh_token'> = {
      access_token: data.access_token,
      id_token: data.id_token,
      expires_in: (Date.now() + data.expires_in * 1000) / 1000,
    }

    return token;
  }

  const getUserData = async (token: string) => {
    const response = await fetch(`${config.userPoolDomain}/oauth2/userInfo`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      const { error }: CognitoUserInfoError = data;
      const errorMessageMap = {
        invalid_request: "Invalid request",
        invalid_token: "Invalid token",
      };

      // log to rollbar
      throw new Error(errorMessageMap[error]);
    }

    const user: User = {
      first_name: data.given_name,
      last_name: data.family_name,
      email: data.email,
      id: data.username,
    }

    return user
  };

  const getLogoutURL = () => {
    const redirectURL = !!config.logoutURI ? `logout_uri=${config.logoutURI}` : `${loginRedirectURL}`
    return `${config.userPoolDomain}/logout?client_id=${config.clientId}&${redirectURL}`
  };

  return {
    // login,
    // logout,
    // setNewPasswordOnFirstLogin,
    // isLoading,
    // currentUser,
    // getAuthIdpURL,
    getLoginURL,
    getLogoutURL,
    getUserData,
    getToken,
    refreshToken
  };
}

export { useCognitoAuth };
