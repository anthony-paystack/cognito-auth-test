import React, {useEffect} from "react";
import { useHistory, useLocation } from "react-router-dom";
import usePaystackCognitoAuth from "./hooks/usePaystackCognitoAuth";
import useLocalStorage from "./hooks/useLocalStorage";

function PostAuthRedirect() {
  const location = useLocation();
  const history = useHistory();
  const { getToken } = usePaystackCognitoAuth();
  const [, setAccessToken] = useLocalStorage('access_token', '');
  const [, setRefreshToken] = useLocalStorage('refresh_token', '');
  const [, setIdToken] = useLocalStorage('id_token', '');
  const [, setTokenExpiry] = useLocalStorage('token_expiry', '');

  const code = new URLSearchParams(location.search).get('code');

  useEffect(() => {
    if (!code) return;

    const fetchToken = async () => {
      try {
        const { access_token, refresh_token, id_token, expires_in } = await getToken(code);
        setAccessToken(access_token);
        setIdToken(id_token);
        setRefreshToken(refresh_token);
        setTokenExpiry(expires_in.toString());
        history.replace("/");
      } catch(error) {
        console.log(error);
      }
    }

    fetchToken();

  }, []);


  if (!code) {
    return <div>not supposed to be here</div>
  }

  return <div>signing in...</div>;
}

export default PostAuthRedirect;