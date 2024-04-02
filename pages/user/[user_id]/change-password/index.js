import SettingsBar from "@/components/SettingsBar";
import SideBar from "@/components/sidebar";
import { AccountContext } from "@/context/account";
import { TextField, Button } from "@mui/material";
import React, { useContext, useState } from "react";

function Index() {
  const { changePassword, user } = useContext(AccountContext);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChangePassword = async () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      alert("All fields are required");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("Password does not match");
      return;
    }

    const result = await changePassword(user.email, oldPassword, newPassword);
  };
  return (
    <div className="relative h-screen overflow-hidden md:flex">
      <SideBar />
      <div className="flex-1 p-5  h-screen overflow-y-auto bg-gray-200">
        <h1 className="text-3xl mb-10">Change Password</h1>
        <section className="flex gap-4 w-full">
          <SettingsBar currentPage={"profile"} />
          <div className="w-9/12  bg-white p-4 rounded-md">
            <TextField
              type="password"
              label="Old Password"
              variant="outlined"
              className="w-[49%] "
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />

            <div className="flex gap-5 items-center ">
              <TextField
                label="New Password"
                variant="outlined"
                type="password"
                className="w-1/2"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <TextField
                label="Confirm Password"
                type="password"
                variant="outlined"
                className="w-1/2 my-3"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <Button
              onClick={handleChangePassword}
              variant="contained"
              className="bg-color-v2"
            >
              Change Password
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Index;
