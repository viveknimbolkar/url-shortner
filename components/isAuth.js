import { AccountContext } from "@/context/account";
import Router from "next/router";
import React, { useContext, useEffect } from "react";

export default function isAuth(Component) {
  return function IsAuth(props) {
    const { isLoggedIn } = useContext(AccountContext);

    useEffect(() => {
      if (!isLoggedIn) {
        Router.push("/");
      }
    }, [isLoggedIn]);

    return <Component {...props} />;
  };
}
