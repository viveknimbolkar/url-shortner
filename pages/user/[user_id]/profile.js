import RootLayout from "@/components/RootLayout";
import SettingsBar from "@/components/SettingsBar";
import isAuth from "@/components/isAuth";
import { AccountContext } from "@/context/account";
import {  Avatar, Button, TextField } from "@mui/material";
import { getNames } from "country-list";
import React, { useContext, useEffect, useState } from "react";

function Index() {
  const { user, updateUserDetails } = useContext(AccountContext);
  const countries = getNames();
  const [email, setEmail] = useState();
  const [name, setName] = useState();
  const [username, setUsername] = useState();

  useEffect(() => {
    setEmail(user.email);
    setName(user.name);
    setUsername(user["cognito:username"]);
  }, [user]);

  const handleSave = async () => {
    const updateUser = await updateUserDetails({
      name,
      email,
      username,
      city,
      state,
      country,
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
                setName(e.target.value);
              }}
              value={name}
            />
            <TextField
              id="outlined-basic"
              label="Email"
              className="w-9/12"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              variant="outlined"
              value={email}
            />
          </div>{" "}
          <div className="w-full flex gap-5 px-5 my-3">
            <TextField
              id="outlined-basic"
              label="Username"
              className="w-full"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              variant="outlined"
              value={username}
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
