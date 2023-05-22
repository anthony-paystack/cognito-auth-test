import React, { useState, useEffect } from "react";
import usePaystackCognitoAuth from "../../hooks/usePaystackCognitoAuth";
import { User } from "../../paystack-cognito";
import {
  PageWrapper,
  Navbar,
  QuickLinksContainer,
  Panel,
  DropdownContent,
} from "./Home.sc";
import useLocalStorage from "../../hooks/useLocalStorage";

function Home() {
  const { getLogoutURL, getUserData } = usePaystackCognitoAuth();
  const [accessToken, , deleteAccessToken] = useLocalStorage("access_token", "");
  const [idToken, ,deleteIdToken] = useLocalStorage('id_token', '');
  const [,,deleteRefreshToken] = useLocalStorage("refresh_token", "");
  const [,,deleteTokenExpiry] = useLocalStorage("token_expiry", "");

  console.log(accessToken, 'access token');
  console.log(idToken, 'id token');


  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userDropdownIsOpen, setUserDropdownIsOpen] = useState(false);

  const fetchResource = (
    server: "watchtower" | "paystack",
    resourcePath: string
  ) => {
    const serverHostMap = {
      watchtower: "https://ilh1llczrg.execute-api.us-east-2.amazonaws.com/v1",
      paystack: "https://34vcqz1zh9.execute-api.us-east-2.amazonaws.com/v1",
    };

    return fetch(`${serverHostMap[server]}/${resourcePath}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  };

  const fetchTransfers = async () => {
    try {
      await fetchResource("watchtower", "transfers");
    } catch (error) {}
  };

  const fetchTransactions = async () => {
    try {
      await fetchResource("watchtower", "transactions");
    } catch (error) {}
  };

  const fetchBanks = async () => {
    try {
      await fetchResource("paystack", "banks");
    } catch (error) {}
  };

  const quickLinks = [
    {
      title: "Transfers",
      description: "Fetch transfers",
      getResource: fetchTransfers,
    },
    {
      title: "Transactions",
      description: "Fetch transactions",
      getResource: fetchTransactions,
    },
    {
      title: "Banks",
      description: "Fetch banks from paystack server",
      getResource: fetchBanks,
    },
  ];

  const logoutOfApp = async () => {
    // await logoutUser();
    deleteAccessToken();
    deleteIdToken();
    deleteTokenExpiry();
    deleteRefreshToken();
    window.location.replace(getLogoutURL());
  };

  useEffect(() => {
    const getUser = async () => {
      try {
        const userData = await getUserData(accessToken);
        setCurrentUser(userData);
      } catch (_error) {
        const error = _error as Error;
        console.log(error.message);
      }
    }

    getUser();

  }, []);

  return (
    <PageWrapper>
      <Navbar>
        <div></div>
        <div style={{ position: "relative" }}>
          <div
            onClick={() => setUserDropdownIsOpen(!userDropdownIsOpen)}
            style={{ cursor: "pointer" }}
          >
            {currentUser?.first_name}
            <i className="fa fa-caret"></i>
          </div>
          {userDropdownIsOpen && (
            <DropdownContent>
              <div>
                <p>Logged in as</p>
                <p>{currentUser?.email}</p>
              </div>
              <div style={{ marginTop: "10px" }}>Edit profile</div>
              <div>Change password</div>
              <div onClick={() => logoutOfApp()}>Logout</div>
            </DropdownContent>
          )}
        </div>
      </Navbar>

      <QuickLinksContainer>
        <div style={{ marginBottom: "30px" }}>
          <h3>Welcome, {currentUser?.first_name}</h3>
          <p>
            Here are some quick links to get started. To access other dummy
            watchtower pages, use the top menu
          </p>
        </div>

        <div>
          {quickLinks.map(({ title, description, getResource }) => (
            <Panel key={title} onClick={() => getResource?.()}>
              <p>{title}</p>
              <p>{description}</p>
            </Panel>
          ))}
        </div>
      </QuickLinksContainer>
    </PageWrapper>
  );
}

export default Home;
