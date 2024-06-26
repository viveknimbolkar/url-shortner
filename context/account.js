import React, { createContext, useEffect, useState } from "react";
import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserAttribute,
} from "amazon-cognito-identity-js";
import cognitoPool from "@/aws/cognito-identity-client";
const AccountContext = new createContext();

function AccountProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [idToken, setIdToken] = useState("");
  const [user, setUser] = useState({});
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
    if (!email || !name || !password || !username) {
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
        async (err, data) => {
          if (err) {
            console.error(err);
            alert(err.message);
            reject(err.message);
          } else {
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

  const changePassword = (email, oldPassword, newPassword) => {
    return new Promise(async (resolve, reject) => {
      const authenticationData = {
        Username: email,
        Password: oldPassword,
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
          cognitoUser.changePassword(
            oldPassword,
            newPassword,
            (err, result) => {
              if (err) {
                alert(err.message);
                reject(err.message);
              }
              alert("Password changed successfully");
              resolve(result);
            }
          );
        },
        onFailure: (err) => {
          alert(err.message);
          reject(err.message);
        },
      });
    });
  };

  const updateUserDetails = async ({
    username,
    name,
    email,
    country,
    city,
    state,
  }) => {
    const attributeList = [];

    if (email !== user.email) {
      const emailAttribute = new CognitoUserAttribute({
        Name: "email",
        Value: email,
      });
      attributeList.push(emailAttribute);
    }

    if (name !== user.name) {
      const nameAttribute = new CognitoUserAttribute({
        Name: "name",
        Value: name,
      });
      attributeList.push(nameAttribute);
    }

    if (username !== user["cognito:username"]) {
      const usernameAttribute = new CognitoUserAttribute({
        Name: "preferred_username",
        Value: username,
      });
      attributeList.push(usernameAttribute);
    }

    if (city !== user["custon:city"]) {
      const cityAttribute = new CognitoUserAttribute({
        Name: "custom:city",
        Value: city,
      });
      attributeList.push(cityAttribute);
    }

    if (state !== user["custon:state"]) {
      const stateAttribute = new CognitoUserAttribute({
        Name: "custom:state",
        Value: state,
      });
      attributeList.push(stateAttribute);
    }

    if (country !== user["custon:country"]) {
      const countryAttribute = new CognitoUserAttribute({
        Name: "custom:country",
        Value: country,
      });
      attributeList.push(countryAttribute);
    }

    return new Promise(async (resolve, reject) => {
      const isAuthenticated = await authUser(user["cognito:username"]);

      if (isAuthenticated) {
        currentUser.updateAttributes(attributeList, (err, result) => {
          if (err) {
            reject(err.message);
          } else {
            resolve(result);
          }
        });
      } else {
        reject("User not authenticated");
      }
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
        getSession,
        changePassword,
        updateUserDetails,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
}

export { AccountProvider, AccountContext };
