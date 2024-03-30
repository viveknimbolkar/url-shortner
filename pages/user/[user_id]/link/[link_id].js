import RootLayout from "@/components/RootLayout";
import fetchLink from "@/utils/fetchLink";
import QRCode from "react-qr-code";
import React, { useContext, useState } from "react";

import {
  Backdrop,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fade,
  Modal,
  Switch,
  TextField,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCopy,
  faEye,
  faEyeSlash,
  faPen,
  faTrash,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import {
  faChrome,
  faEdge,
  faFirefoxBrowser,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import { deleteLink } from "@/components/api";
import InProgress from "@/components/InProgress";
import axios from "axios";
import path from "@/components/constants/path";
import { AccountContext } from "@/context/account";
import { useRouter } from "next/router";
import {
  LinkedinIcon,
  LinkedinShareButton,
  TelegramIcon,
  TelegramShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";
import toast from "react-hot-toast";

export default function Link({ link }) {
  const [showPassword, setShowPassword] = useState(false);
  const [open, setOpen] = useState(false);
  const [confirmDeleteDialog, setConfirmDeleteDialog] = useState(false);
  const { user } = useContext(AccountContext);
  const router = useRouter();

  // if (link.length === 0) return <InProgress />;
  if (link.length === 0) return <h1>Loading...</h1>;

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

  const handleDelete = async () => {
    const response = await deleteLink({
      user_id: link.user_id.S,
      link_id: link.link_id.S,
    });
    if (response.status === 200) {
      toast.success("Link deleted successfully");
      router.push(path(user, "MY_LINKS"));
    } else {
      toast.error("Failed to delete link");
    }
    setConfirmDeleteDialog(false);
  };
  const handleDownloadQRCode = () => {
    const canvas = document.querySelector("#qr-code");
    const image = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = image;
    a.download = "qrcode.png";
    a.click();
  };

  return (
    <RootLayout heading={"Link Details"}>
      <div className="flex gap-5 shadow-md rounded-md p-5 h-fit bg-white">
        <div>
          <QRCode value={link?.short_url?.S} />
          <Button
            onClick={handleDownloadQRCode}
            variant="contained"
            className="w-full bg-color-v3 mt-4"
          >
            Download
          </Button>
          <h2 className="my-3 font-bold text-xl">Share on </h2>
          <div className="flex justify-start gap-4 items-center">
            <WhatsappShareButton
              url={link?.short_url?.S}
              title={link?.name?.S}
              separator=":: "
            >
              <WhatsappIcon size={36} className="rounded-md" />
            </WhatsappShareButton>
            <TelegramShareButton url={link?.short_url?.S} title={link?.name?.S}>
              <TelegramIcon size={36} className="rounded-md" />
            </TelegramShareButton>
            <LinkedinShareButton title={link?.name?.S} url={link?.short_url?.S}>
              <LinkedinIcon size={36} className="rounded-md" />
            </LinkedinShareButton>
          </div>
        </div>
        <div className="w-full overflow-hidden">
          <div className="flex justify-between items-center">
            <h1 className="font-bold text-2xl w-1/2 text-ellipsis overflow-hidden">
              {link?.name?.S}
            </h1>
            <div className="flex items-center gap-4 ">
              <Button
                variant="contained"
                onClick={() => setOpen(true)}
                className="bg-color-v3"
              >
                <FontAwesomeIcon icon={faPen} /> &nbsp;&nbsp;Edit
              </Button>
              <Button
                onClick={() => setConfirmDeleteDialog(true)}
                variant="contained"
                color="error"
                className="bg-red-500"
              >
                <FontAwesomeIcon icon={faTrash} /> &nbsp;&nbsp;Delete
              </Button>
            </div>
          </div>
          <div className="flex items-center gap-4 my-4">
            <h4 className="font-bold">Original Link :</h4>
            <a
              target="_blank"
              className="hover:text-color-v4 hover:underline text-ellipsis font-normal overflow-hidden "
              href={link?.original_url?.S}
            >
              {link?.original_url?.S}
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
              target="_blank"
              className="hover:text-color-v4 hover:underline font-normal"
              href={link?.short_url?.S}
            >
              {link?.short_url?.S}
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
              <p className="font-normal">
                {link?.created_at?.S.toString().split("T")[0]}
              </p>
            </div>
            {link?.expire_at.S ? (
              <div className="flex gap-4 items-center">
                <h4 className="font-bold">Expire At :</h4>
                <p>{link?.expire_at?.S}</p>
              </div>
            ) : (
              <></>
            )}
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 my-2">
              <h4 className="font-bold">Password Protected :</h4>
              <p
                className={`font-bold ${
                  link?.is_password_protected?.BOOL
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {link?.is_password_protected?.BOOL ? "Yes" : "No"}
              </p>
            </div>
            {link?.is_password_protected?.BOOL ? (
              <>
                <div className="flex items-center gap-4 my-2">
                  <h4 className="font-bold">Password :</h4>
                  <p>
                    {showPassword ? (
                      link?.is_password_protected?.BOOL
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
          <div className="items-center flex gap-4 my-2">
            <h4 className="font-bold">Expire After Views: </h4>
            <p className="font-normal">{link?.expire_after_views?.N}</p>
          </div>
          <div className="flex items-center my-4 gap-5 w-fit shadow-md rounded-md p-4">
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
      </div>
      <Dialog
        open={confirmDeleteDialog}
        onClose={(e) => setConfirmDeleteDialog(false)}
      >
        <DialogTitle>Delete Link Confirmation</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this link? This action cannot be
          undone. Once deleted, the link will be permanently removed from the
          system and no one will be able to access it.
        </DialogContent>
        <DialogActions className="p-4">
          <Button
            variant="contained"
            className="bg-color-v3"
            onClick={(e) => setConfirmDeleteDialog(false)}
          >
            Disagree
          </Button>
          <Button color="error" onClick={handleDelete} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
      <EditModal link={link} open={open} setOpen={setOpen} />
    </RootLayout>
  );
}

function EditModal({
  open,
  setOpen,
  link,
  confirmDeleteDialog,
  setConfirmDeleteDialog,
}) {
  const [name, setName] = useState(link.name.S);
  const [shortenURL, setshortURL] = useState(link.short_url.S);
  const [originalUrl, setOriginalUrl] = useState(link.original_url.S);
  const [expireAt, setExpireAt] = useState(link.expire_at.S);
  const [expireAfterViews, setExpireAfterViews] = useState(
    link.expire_after_views.N,
  );
  const [isPasswordProtected, setIsPasswordProtected] = useState(
    link.is_password_protected.BOOL,
  );
  const [password, setPassword] = useState(link.password.S);
  const [confirmPassword, setConfirmPassword] = useState();

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "fit-content",
    backgroundColor: "white",
    outline: "none",
    borderRadius: "10px",
    p: 3.5,
  };

  const handleSave = async () => {
    if (isPasswordProtected && password !== confirmPassword) {
      setStatus("error");
      setMessage("Password and Confirm Password do not match");
      setOpenSnackbar(true);
      return;
    }
    axios
      .post("/api/user/update", {
        userID: link.user_id.S,
        linkID: link.link_id.S,
        name: name,
        originalUrl: originalUrl,
        expireAt: expireAt,
        expireAfterView: expireAfterViews,
        password: password ?? "",
      })
      .then((res) => {
        setOpen(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Modal
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
            <h1 className="font-bold text-2xl mb-6 ">Edit Link</h1>
            <div className="flex gap-5 items-center">
              <TextField
                value={name}
                label={"Name"}
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                value={originalUrl}
                label={"Original URL"}
                onChange={(e) => setOriginalUrl(e.target.value)}
              />
              <TextField
                disabled
                value={shortenURL}
                label={"Short URL"}
                onChange={(e) => setshortURL(e.target.value)}
              />
            </div>
            <div className="flex gap-5 items-end my-4  ">
              <div>
                <div>Expire at</div>
                <input
                  type="date"
                  value={expireAt}
                  label={"Expire At"}
                  onChange={(e) => setExpireAt(e.target.value)}
                  className="p-3 border-[1px] border-slate-400 rounded-md"
                />
              </div>
              <TextField
                type="number"
                value={expireAfterViews}
                label={"Expire After View"}
                InputProps={{ inputProps: { min: 0 } }}
                onChange={(e) => setExpireAfterViews(e.target.value)}
              />
              <div className="flex items-center border-[1px] p-2 rounded-md w-1/3 border-slate-300 justify-between">
                <label>Password :</label>
                <Switch
                  value={isPasswordProtected}
                  onChange={(e) => {
                    setIsPasswordProtected(e.target.checked);
                    setPassword("");
                    setConfirmPassword("");
                  }}
                />
              </div>
            </div>
            {isPasswordProtected ? (
              <div className="flex items-center gap-4 my-4">
                <TextField
                  value={password}
                  placeholder="Password"
                  label={"Password"}
                  type="password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
                <TextField
                  value={confirmPassword}
                  label={"Confirm Password"}
                  type="password"
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                  }}
                />
              </div>
            ) : (
              <></>
            )}

            <div className="flex gap-3 my-4 items-center">
              <Button
                className="bg-color-v3"
                onClick={handleSave}
                variant="contained"
              >
                Save
              </Button>
              <Button
                onClick={(e) => {
                  setOpen(false);
                }}
                variant="contained"
                color="warning"
                className="bg-slate-500"
              >
                Cancel
              </Button>
            </div>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}

export async function getServerSideProps(context) {
  try {
    const linkDetails = await fetchLink({
      user_id: context.params.user_id,
      link_id: context.params.link_id,
    });
    return {
      props: {
        link: linkDetails.link ?? [],
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        link: [],
      },
    };
  }
}
