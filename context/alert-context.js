import { createContext, useState } from "react";

const AlertMessageContext = createContext();

function AlertMessageProvider({ children }) {
  const [message, setMessage] = useState(false);
  const [status, setStatus] = useState("warning");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  return (
    <AlertMessageContext.Provider
      value={{
        message,
        setMessage,
        status,
        setStatus,
        openSnackbar,
        setOpenSnackbar,
      }}
    >
      {children}
    </AlertMessageContext.Provider>
  );
}

export { AlertMessageContext, AlertMessageProvider };
