import Header from "@/components/header";
import { AccountContext } from "@/context/account";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";

function DashBoard() {
  const { logout, isLoggedIn } = useContext(AccountContext);
  const router = useRouter();
  // useEffect(() => {
  //   setTimeout(() => {
  //     if (!isLoggedIn) {
  //       router.push("/login");
  //     }
  //   }, 1000);
  // }, []);

  return (
    <>
      <Header />
      <section className="p-4">
        <div className="shadow-md rounded-md bg-yellow-400 p-4  w-fit">
          <h1 className="font-bold text-2xl">45</h1>
          <h1 className="text-stone-500">
            <FontAwesomeIcon icon={faUser} /> &nbsp; Visited
          </h1>
        </div>
      </section>
    </>
  );
}

export default DashBoard;
