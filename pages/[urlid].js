import { incrementLinkVisitCount } from "@/api/api";
import InProgress from "@/components/InProgress";
import fetchLink from "@/utils/fetchLink";
import { useRouter } from "next/router";
import logo from "../public/logo.png";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Box, TextField, Button, Typography, styled } from "@mui/material";

function UrlID({ originalUrl, isPasswordProtected }) {
  const router = useRouter();
  const [askForPassword, setAskForPassword] = useState(false);

  if (originalUrl && typeof window !== "undefined") {
    // window.location.href = originalUrl;
  }

  const incrementVisitCount = async (linkID) => {
    await incrementLinkVisitCount(linkID);
  };

  useEffect(() => {
    incrementVisitCount(router.query.urlid);
  }, []);

  return (
    <div className="w-full h-screen flex items-center justify-center text-3xl">
      {/* {originalUrl === null ? (
        "Url dosen't exist :-("
      ) : (
        // <InProgress type="redirecting" />
        <div>Loading...</div>
      )} */}
      {!isPasswordProtected ? (
        <>
          <Box
            display={"flex"}
            flexDirection={"column"}
            width={"350px"}
            gap={3}
          >
            <Box sx={{ backgroundColor: "#000" }} width={"fit-content"}>
              <Image
                alt="ShortURL Logo"
                src={logo.src}
                width={150}
                height={150}
              />
            </Box>
            <Typography variant="h4" fontWeight={"600"}>
              Password Protected!
            </Typography>
            <Typography variant="subtitle1">
              This link is password protected. Please enter the password to
              continue to the site.
            </Typography>
            <TextField required label="Enter Password" type="password" />

            <Button variant="contained" sx={{ height: 50 }}>
              Visit Site
            </Button>
          </Box>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export async function getServerSideProps({ params }) {
  const endpoint = `/api/${params.urlid}`;

  const res = await fetch(process.env.NEXT_PUBLIC_DOMAIN + endpoint);

  const url = await res.json();

  return {
    props: {
      originalUrl: url.originalUrl || null,
      isPasswordProtected: url.isPasswordProtected || false,
    },
  };
}

export default UrlID;
