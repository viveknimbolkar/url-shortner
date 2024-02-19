import React, { useContext } from "react";
import SideBar from "./sidebar";
import { Snackbar } from "@mui/base";
import { Alert } from "@mui/material";
import { AlertMessageContext } from "@/context/alert-context";

function RootLayout({ children, heading }) {
  const { message, status, openSnackbar, setOpenSnackbar } =
    useContext(AlertMessageContext);
  return (
    <div className=" h-screen overflow-hidden md:flex">
      <SideBar />
      <div class="w-full p-5 font-bold bg-slate-300  h-screen overflow-y-auto">
        <h1 className="text-3xl mb-3">{heading}</h1>
        {children}
      </div>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={5000}
        onClose={(e) => {
          setOpenSnackbar(false);
        }}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity={status}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default RootLayout;
