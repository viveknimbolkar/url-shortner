import React, { createContext, useEffect, useState } from "react";
import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserAttribute,
} from "amazon-cognito-identity-js";
import cognitoPool from "@/aws/cognito-identity-client";
import axios from "axios";
const AccountContext = new createContext();

function AccountProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [idToken, setIdToken] = useState("");
  const [user, setUser] = useState({});
  console.log("isLoggdIn", isLoggedIn);
  
  useEffect(() => {
    getSession()
      .then((data) => {
        setIsLoggedIn(true);
      })
      .catch((err) => {
        setIsLoggedIn(false);
      });
  }, []);

  const logout = () => {
    const currentUser = cognitoPool.getCurrentUser();
    if (currentUser) {
      currentUser.signOut();
      setIsLoggedIn(false);
      setIdToken("");
      setUser({});
    }
  };

  const getSession = () => {
    return new Promise((resolve, reject) => {
      const currentUserSession = cognitoPool.getCurrentUser();
      currentUserSession.getSession((err, session) => {
        if (err) {
          console.error(err);
          setIsLoggedIn(false);
          setIdToken("");
          setUser({});

          return;
        }
        setIsLoggedIn(true);
        setIdToken(session.getIdToken().getJwtToken());
        setUser(session.getIdToken().payload);
      });
    });
  };

  const signUp = async (username, password, email, name) => {
    if (!email || !name || !password) {
      alert("Please fill all the fields");
      return false;
    }

    return new Promise((resolve, reject) => {
      const attributeList = [];
      let emailAttribute = new CognitoUserAttribute({
        Name: "email",
        Value: email,
      });
      let nameAttribute = new CognitoUserAttribute({
        Name: "name",
        Value: name,
      });
      let avatarAttribute = new CognitoUserAttribute({
        Name: "picture",
        Value: `https://ui-avatars.com/api/?name=${name}length=2&rounded=true&background=d0e37f`,
      });

      attributeList.push(emailAttribute);
      attributeList.push(nameAttribute);
      attributeList.push(avatarAttribute);

      cognitoPool.signUp(
        username,
        password,
        attributeList,
        null,
        (err, data) => {
          if (err) {
            console.error(err);
            alert(err.message);
            reject(err.message);
          } else {
            console.log(data);
            resolve(true);
          }
        }
      );
    });
  };

  const signIn = (email, password) => {
    return new Promise((resolve, reject) => {
      const authenticationData = {
        Username: email,
        Password: password,
      };
      const authenticationDetails = new AuthenticationDetails(
        authenticationData
      );
      const userData = {
        Username: email,
        Pool: cognitoPool,
      };
      const cognitoUser = new CognitoUser(userData);
      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: (result) => {
          getSession();
          resolve(result);
        },
        onFailure: (err) => {
          console.error(err);
          alert(err.message || JSON.stringify(err));
          reject(err.message);
        },
      });
    });
  };
  return (
    <AccountContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        idToken,
        signIn,
        signUp,
        user,
        logout,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
}

export { AccountProvider, AccountContext };
