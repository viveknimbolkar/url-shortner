import React, { useContext, useState } from "react";
import {
  Alert,
  Backdrop,
  Box,
  Button,
  Fade,
  Modal,
  Snackbar,
} from "@mui/material";
import { AccountContext } from "@/context/account";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChrome,
  faEdge,
  faFirefoxBrowser,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import {
  faCopy,
  faEye,
  faEyeSlash,
  faTimes,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import fetchLinksOfUser from "@/utils/fetchLinksOfUser";
import RootLayout from "@/components/RootLayout";
import isAuth from "@/components/isAuth";
import { useRouter } from "next/router";

function Links({ links }) {
  const { user } = useContext(AccountContext);

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [open, setOpen] = useState(true);
  const [index, setIndex] = useState(undefined);
  const router = useRouter();

  const CopyToClipBoardAction = (
    <>
      <FontAwesomeIcon
        className="pr-4 cursor-pointer"
        size="lg"
        icon={faTimes}
        onClick={() => setOpenSnackbar(false)}
      />
    </>
  );
  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  return (
    <>
      <RootLayout heading={"My Links"}>
        {
          <table className="w-full border-2">
            <thead>
              <tr className="bg-color-v4 text-white w-full">
                <th className="p-3 border-2 w-[200px]">Name</th>
                <th className="p-3 border-2 w-[300px]">Short URL</th>
                <th className="p-3 border-2 w-[600px]">Original URL</th>
                <th className="p-3 border-2">Visited</th>
              </tr>
            </thead>
            <tbody>
              {links.length > 0 &&
                links.map((link, i) => {
                  return (
                    <tr
                      className={
                        "hover:bg-color-v2 hover:text-white duration-300 cursor-pointer font-normal border-b-2"
                      }
                      onClick={(e) => {
                        // setIndex(i);
                        // setOpen(true);
                        router.push(`/user/${user.sub}/link/${link.link_id.S}`);
                      }}
                      key={`link-${i}`}
                    >
                      <td className="p-3">
                        <p className="w-[200px] overflow-hidden text-ellipsis">
                          {link.name.S}
                        </p>
                      </td>
                      <td className="p-3">
                        <p className="">{link.short_url.S}</p>
                      </td>
                      <td className="p-3">
                        <p className="block w-[600px]  text-center text-ellipsis overflow-hidden ">
                          {link.original_url.S}
                        </p>
                      </td>
                      <td className="p-3">
                        <p className="text-center">{link.total_visits.N}</p>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        }

        {links && index >= 0 ? (
          <LinkModal
            link={links.length > 0 ? links[index] : {}}
            open={open}
            setOpen={setOpen}
            openSnackbar={openSnackbar}
            setOpenSnackbar={setOpenSnackbar}
          />
        ) : (
          <></>
        )}
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
        >
          <Alert
            onClose={handleSnackbarClose}
            severity="success"
            variant="filled"
          >
            Copied to clipboard!
          </Alert>
        </Snackbar>
      </RootLayout>
    </>
  );
}

function LinkModal({ open, setOpen, link, openSnackbar, setOpenSnackbar }) {
  const [showPassword, setShowPassword] = useState(false);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "100%",
    boxShadow: 24,
    backgroundColor: "white",
    outline: "none",
    borderRadius: "10px",
    display: "flex",
    gap: "20px",
    p: 4,
  };

  const socialMedia = [
    {
      id: 1,
      name: "Whatsapp",
      icon: faWhatsapp,
      color: "green-500",
    },
  ];

  const browsers = [
    {
      name: "Chrome",
      icon: faChrome,
      color: "#3EAA5B",
    },
    {
      name: "Firefox",
      icon: faFirefoxBrowser,
      color: "#FF6535",
    },
    {
      name: "Edge",
      icon: faEdge,
      color: "#127CD7",
    },
    {
      name: "Total Visits",
      icon: faUser,
      color: "#4B5563",
    },
  ];
  const handleOriginalLinkCopy = () => {
    navigator.clipboard.writeText(link.original_url.S);
    setOpenSnackbar(true);
  };

  const handleShortLinkCopy = () => {
    navigator.clipboard.writeText(link.short_url.S);
    setOpenSnackbar(true);
  };

  const handleDownloadQRCode = () => {
    const canvas = document.querySelector("canvas");
    const image = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = image;
    a.download = "qrcode.png";
    a.click();
  };
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={() => setOpen(false)}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={open}>
        <Box sx={style}>
          <div>
            <Button
              onClick={handleDownloadQRCode}
              variant="contained"
              className="w-full  !my-4"
            >
              Download
            </Button>
            <h2 className="my-3 font-bold text-xl">Share on </h2>
            <div className="flex justify-start items-center">
              {socialMedia.map((media, i) => {
                return (
                  <div
                    key={`media-${i}`}
                    title={media.name}
                    className={`w-10 h-10 cursor-pointer flex bg-${media.color} rounded-md items-center justify-center`}
                  >
                    <FontAwesomeIcon
                      size="xl"
                      icon={media.icon}
                      color="white"
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="w-full ">
            <h1 className="font-bold text-2xl">{link.name.S}</h1>
            <div className="flex items-center gap-4 my-4">
              <h4 className="font-bold">Original Link :</h4>
              <a
                className="hover:text-color-v4 hover:underline"
                href={link.original_url.S}
              >
                {link.original_url.S}
              </a>
              <span
                onClick={handleOriginalLinkCopy}
                className="w-8 h-8 flex items-center justify-center rounded-md cursor-pointer text-white bg-color-v3 hover:bg-color-v4 duration-200"
              >
                <FontAwesomeIcon icon={faCopy} />
              </span>
            </div>
            <div className="flex gap-4 my-4">
              <h4 className="font-bold">Short Link :</h4>
              <a
                className="hover:text-color-v4 hover:underline"
                href={link.short_url.S}
              >
                {link.short_url.S}
              </a>
              <span
                onClick={handleShortLinkCopy}
                className="w-8 h-8 flex items-center justify-center rounded-md cursor-pointer text-white bg-color-v3 hover:bg-color-v4 duration-200"
              >
                <FontAwesomeIcon icon={faCopy} />
              </span>
            </div>
            <div className="flex gap-4 items-center justify-between my-2">
              <div className="flex gap-4 items-center">
                <h4 className="font-bold">Created At :</h4>
                <p>{link.created_at.S}</p>
              </div>
              <div className="flex gap-4 items-center">
                <h4 className="font-bold">Expire At :</h4>
                <p>{link.expire_at.S}</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 my-2">
                <h4 className="font-bold">Password Protected :</h4>
                <p>{link.is_password_protected.S ? "Yes" : "No"}</p>
              </div>
              {link.is_password_protected.S ? (
                <>
                  <div className="flex items-center gap-4 my-2">
                    <h4 className="font-bold">Password :</h4>
                    <p>
                      {showPassword ? (
                        link.is_password_protected.S
                      ) : (
                        <>
                          &bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;
                        </>
                      )}
                    </p>
                    {showPassword ? (
                      <FontAwesomeIcon
                        onClick={() => setShowPassword(false)}
                        className="cursor-pointer"
                        icon={faEyeSlash}
                      />
                    ) : (
                      <FontAwesomeIcon
                        onClick={() => setShowPassword(true)}
                        className="cursor-pointer"
                        icon={faEye}
                      />
                    )}
                  </div>
                </>
              ) : (
                <></>
              )}
            </div>
            <div className="items-center flex gap-4">
              <h4 className="font-bold">Expire After Views: </h4>
              <p>{link.expire_after_views.N}</p>
            </div>
            <div className="flex items-center justify-between ">
              {browsers.map((browser, i) => {
                return (
                  <div
                    key={`browser-${i}`}
                    className="w-28 h-24 flex flex-col gap-3 rounded-md shadow-md items-center justify-center"
                  >
                    <h1 className="font-bold text-2xl">0</h1>
                    <FontAwesomeIcon
                      icon={browser.icon}
                      color={browser.color}
                      size="2x"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </Box>
      </Fade>
    </Modal>
  );
}
export default isAuth(Links);

export async function getServerSideProps(context) {
  const { user_id } = context.params;

  const links = await fetchLinksOfUser(user_id);

  return {
    props: { links },
  };
}
