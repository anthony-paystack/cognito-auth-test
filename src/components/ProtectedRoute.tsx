import { ReactNode, useEffect, useState } from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import usePaystackCognitoAuth from "../hooks/usePaystackCognitoAuth";
import useLocalStorage from "../hooks/useLocalStorage";

function ProtectedRoute({ children, ...rest }: RouteProps) {
  const { getLoginURL, refreshToken: refreshUserToken } = usePaystackCognitoAuth();
  const [accessToken, setAccessToken] = useLocalStorage("access_token", "");
  const [tokenExpiry, setTokenExpiry] = useLocalStorage("token_expiry", "");
  const [refreshToken] = useLocalStorage("refresh_token", "");

  const [isRefreshingToken, setIsRefreshingToken] = useState(true);

  console.log(tokenExpiry);

  const tokenExpiryDate = new Date(Number(tokenExpiry) * 1000);
  const isExpiredToken = new Date() > tokenExpiryDate;
  const isAuthenticated = accessToken && !isExpiredToken;

  console.log(tokenExpiryDate);
  console.log(getLoginURL());

  useEffect(() => {
    if (accessToken && isExpiredToken) {
      const refreshCurrentUserToken = async () => {
        try {
          setIsRefreshingToken(true);
          const token = await refreshUserToken(refreshToken);
          setAccessToken(token.access_token);
          setTokenExpiry(token.expires_in.toString());
          setIsRefreshingToken(false);
        } catch (error) {
          setIsRefreshingToken(false);
          console.log(error);
        }
      };

      refreshCurrentUserToken();
      return;
    }

    setIsRefreshingToken(false);
  }, [
    accessToken,
    isExpiredToken,
    refreshUserToken,
    refreshToken,
    setTokenExpiry,
    setAccessToken,
  ]);

  return (
    <Route
      {...rest}
      render={() => {
        if (isAuthenticated || (!isAuthenticated && isRefreshingToken)) {
          return children as ReactNode;
        }

        return <Redirect to={{ pathname: "/login" }} />;
      }}
    />
  );
}

export default ProtectedRoute;
