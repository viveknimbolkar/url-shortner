import React, { useContext } from "react";
import logo from "../public/logo.png";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGear,
  faHome,
  faInfo,
  faInfoCircle,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { AccountContext } from "@/context/account";
function SideBar() {
  const { logout, user } = useContext(AccountContext);
  const menuList = [
    {
      name: "Home",
      icon: faHome,
      link: `/user/${user.sub}`,
    },
    {
      name: "Links",
      icon: faInfoCircle,
      link: `/user/${user.sub}/links`,
    },
    {
      name: "Profile",
      icon: faGear,
      link: `/user/${user.sub}/profile`,
    },
    {
      name: "Logout",
      icon: faRightFromBracket,
      link: "/",
      onClick: () => {
        logout();
      },
    },
  ];
  return (
    <>
      <div class="bg-gray-800 text-gray-100 flex justify-between md:hidden">
        <a href="#" class="block p-4 text-white font-bold">
          ShortURL
        </a>

        <button
          onClick={() => {
            document
              .querySelector(".sidebar")
              .classList.toggle("-translate-x-full");
          }}
          class="mobile-menu-button p-4 focus:outline-none focus:bg-gray-700"
        >
          <svg
            class="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      <div class="sidebar bg-color-v1 text-blue-100 w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out">
        <Link href={"/"} class="text-white flex items-center space-x-2 px-4">
          <Image alt="ShortURL Logo" src={logo.src} width={150} />
        </Link>

        <nav>
          {menuList.map((item, i) => (
            <Link
              onClick={item?.onClick}
              href={item.link}
              key={`item-${i}`}
              class="block py-2.5 px-4 rounded transition duration-200 hover:bg-color-v3 hover:text-white"
            >
              <FontAwesomeIcon icon={item.icon} />
              &nbsp;&nbsp;&nbsp; {item.name}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}

export default SideBar;
