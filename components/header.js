import { AccountContext } from "@/context/account";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "../public/logo.png";
import Link from "next/link";
import React, { useContext, useState } from "react";

function Header({ isHomePage = false }) {
  const { user, logout, isLoggedIn } = useContext(AccountContext);
  const [toggleMenu, setToggleMenu] = useState(false);
  return (
    <nav
      className={`${
        isHomePage ? "text-white " : "text-black shadow-md"
      } flex justify-between pr-10 items-center p-3`}
    >
      <Link href={"/"}>
        <img src={logo.src} width={150} />
      </Link>
      {isLoggedIn ? (
        <div
          onClick={(e) => {
            setToggleMenu(!toggleMenu);
          }}
          className="flex gap-3 items-center relative cursor-pointer"
        >
          {user?.picture && (
            <img
              src={user.picture}
              width={40}
              height={40}
              className="rounded-full"
            />
          )}

          <h3>{user.name}</h3>
          <FontAwesomeIcon
            className={`${toggleMenu ? "rotate-180" : "rotate-0"} duration-300`}
            icon={faChevronDown}
          />
          {toggleMenu && (
            <ul className="absolute shadow-lg top-[135%] w-full right-0">
              <Link
                href={`/user/${user.sub}`}
                className={`p-2 inline-block w-full ${
                  isHomePage ? "hover:bg-blue-800" : "hover:bg-gray-300 "
                } `}
              >
                Dashboard
              </Link>
              <Link
                href={`/user/${user.sub}/settings`}
                className={`p-2 inline-block w-full ${
                  isHomePage ? "hover:bg-blue-800" : "hover:bg-gray-300 "
                } `}
              >
                Settings
              </Link>
              <li
                onClick={() => {
                  logout();
                }}
                className={`p-2 ${
                  isHomePage ? "hover:bg-blue-800" : "hover:bg-gray-300"
                } `}
              >
                Logout
              </li>
            </ul>
          )}
        </div>
      ) : (
        <div className="flex items-center gap-5">
          <Link href="/login" className="rounded-full bg-blue px-3 py-2">
            Login
          </Link>
          <Link
            href={"/signup"}
            className="rounded-full bg-white text-black px-3 py-2"
          >
            Sign Up
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Header;
