import { AccountContext } from "@/context/account";
import { faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext } from "react";

function SettingsBar({ currentPage }) {
  const { user } = useContext(AccountContext);
  const menu = [
    {
      name: "Profile",
      icon: faUser,
      link: `/user/${user.sub}/profile`,
      id: 1,
    },
    {
      name: "Change Password",
      icon: faLock,
      link: `/user/${user.sub}/change-password`,
      id: 2,
    },
  ];
  const router = useRouter();
  return (
    <List className="bg-white w-1/3 h-fit p-0 rounded-md">
      {menu.map((item) => {
        return (
          <Link key={item.id} href={item.link}>
            <ListItem
              key={item.id}
              disablePadding
              className={`${
                router.pathname === item.link
                  ? "border-l-4 border-color-v3"
                  : "border-l-4"
              }`}
            >
              <ListItemButton className="p-2 px-4">
                <ListItemIcon>
                  <FontAwesomeIcon size="sm" icon={item.icon} />
                </ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          </Link>
        );
      })}
    </List>
  );
}

export default SettingsBar;
