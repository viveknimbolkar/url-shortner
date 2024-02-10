import { AccountContext } from "@/context/account";
import { faArrowDown, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
        <h1 className="font-bold text-3xl ">ShortURL</h1>
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
              <li
                className={`p-2  ${
                  isHomePage ? "hover:bg-blue-800" : "hover:bg-gray-300 "
                } `}
              >
                <Link href={"/dashboard"} className="w-full ">Dashboard</Link>
              </li>
              <li
                className={`p-2 ${
                  isHomePage ? "hover:bg-blue-800" : "hover:bg-gray-300"
                } `}
              >
                Account Setting
              </li>
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
