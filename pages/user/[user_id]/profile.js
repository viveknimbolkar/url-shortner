import cognitoPool from "@/aws/cognito-identity-client";
import RootLayout from "@/components/RootLayout";
import SettingsBar from "@/components/SettingsBar";
import isAuth from "@/components/isAuth";
import SideBar from "@/components/sidebar";
import { AccountContext } from "@/context/account";
import { AlertMessageContext } from "@/context/alert-context";
import { faTimes, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Alert,
  Autocomplete,
  Avatar,
  Button,
  IconButton,
  Snackbar,
  TextField,
} from "@mui/material";
import { CognitoUserAttribute } from "amazon-cognito-identity-js";
import { getNames } from "country-list";
import React, { useContext, useEffect, useState } from "react";

function Index() {
  const { user } = useContext(AccountContext);
  const countries = getNames();
  const [email, setEmail] = useState();
  const [name, setName] = useState();
  const [username, setUsername] = useState();
  const [city, setCity] = useState();
  const [state, setState] = useState();
  const [country, setCountry] = useState();
  const { setMessage, setStatus, setOpenSnackbar } =
    useContext(AlertMessageContext);

  useEffect(() => {
    setEmail(user.email);
    setName(user.name);
    setUsername(user["cognito:username"]);
    setCity(user["custon:city"]);
    setState(user["custon:state"]);
    setCountry(user["custon:country"]);
  }, [user]);

  const handleSave = () => {
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

    const currentUser = cognitoPool.getCurrentUser();
    console.log(currentUser);

    currentUser.updateAttributes(attributeList, (err, result) => {
      if (err) {
        console.log("err", err);
        setStatus("error");
        setMessage(err.message);
        setOpenSnackbar(true);
      } else {
        console.log("result", result);
        setStatus("success");
        setMessage("Profile Updated");
        setOpenSnackbar(true);
      }
    });
  };

  return (
    <RootLayout heading={"My Profile"}>
      <section className="flex gap-4 w-full">
        <SettingsBar currentPage={"profile"} />
        <div className="w-full rounded-md bg-white">
          <div className="flex items-center p-5 gap-10">
            <Avatar
              sx={{ width: 100, height: 100 }}
              alt="Remy Sharp"
              src={user.picture}
            />
            <Button variant="contained" className="bg-color-v2">
              Update
            </Button>
            <Button variant="outlined">Delete</Button>
          </div>
          <div className="w-full flex gap-5 px-5 my-3">
            <TextField
              id="outlined-basic"
              label="Name"
              className="w-9/12"
              variant="outlined"
              onChange={(e) => {
                console.log(e);
                setName(e.target.value);
              }}
              value={name}
            />
            <TextField
              id="outlined-basic"
              label="Email"
              className="w-9/12"
              onChange={(e) => {
                console.log(e);
                setEmail(e.target);
              }}
              variant="outlined"
              value={email}
            />
          </div>{" "}
          <div className="w-full flex gap-5 px-5 my-3">
            <TextField
              id="outlined-basic"
              label="Username"
              className="w-9/12"
              onChange={(e) => {
                console.log(e);
                setUsername(e.target);
              }}
              variant="outlined"
              value={username}
            />
            <TextField
              id="outlined-basic"
              label="City"
              className="w-9/12"
              variant="outlined"
              onChange={(e) => {
                console.log(e);
                setCity(e.target);
              }}
              value={city}
            />
          </div>
          <div className="w-full flex gap-5 px-5 my-3">
            <TextField
              id="outlined-basic"
              label="State"
              className="w-9/12"
              onChange={(e) => {
                console.log(e);
                setState(e.target);
              }}
              variant="outlined"
              value={state}
            />
            <Autocomplete
              disablePortal
              onChange={(e) => {
                console.log(e);
                setCountry(e.target);
              }}
              className="w-9/12"
              value={country}
              options={countries}
              renderInput={(params) => (
                <TextField {...params} label="Country" />
              )}
            />
          </div>
          <Button
            onClick={handleSave}
            variant="contained"
            className="bg-color-v2 m-5"
          >
            Save Changes
          </Button>
        </div>
      </section>
    </RootLayout>
  );
}

export default isAuth(Index);
