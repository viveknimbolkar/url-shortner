import { incrementLinkVisitCount } from "@/api/api";
import InProgress from "@/components/InProgress";
import fetchLink from "@/utils/fetchLink";
import { useRouter } from "next/router";
import logo from "../public/logo.png";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";

function UrlID({ originalUrl, isPasswordProtected }) {
  const router = useRouter();
  const [password, setPassword] = useState("");
  console.log(originalUrl, isPasswordProtected);
  // redirect to original url if not password protected
  if (!isPasswordProtected && originalUrl && typeof window !== "undefined") {
    window.location.href = originalUrl;
  }

  const incrementVisitCount = async (linkID) => {
    await incrementLinkVisitCount(linkID);
  };

  const handlePassword = async () => {
    const sendPassword = await fetch(`/api/${router.query.urlid}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password: password }),
    });
    const data = await sendPassword.json();

    if (data.originalUrl) {
      router.push(data.originalUrl);
    }
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
      {isPasswordProtected ? (
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
            <TextField
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              label="Enter Password"
              type="password"
            />

            <Button
              onClick={handlePassword}
              variant="contained"
              sx={{ height: 50 }}
            >
              Visit Site
            </Button>
          </Box>
        </>
      ) : !originalUrl ? (
        <h1>Url dosen&apos;t exist :-</h1>
      ) : (
        <InProgress type="redirecting" />
      )}
    </div>
  );
}

export async function getServerSideProps({ params }) {
  const endpoint = `/api/${params.urlid}`;

  const res = await fetch(process.env.NEXT_PUBLIC_DOMAIN + endpoint);
  const url = await res.json();
  console.log(url);
  return {
    props: url,
  };
}

export default UrlID;
