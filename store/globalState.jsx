import { useState, useCallback } from "react";
import DataContext from "./dataContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function GlobalState(props) {
  const [user, setUser] = useState({});

  const successLoading = useCallback((message) => {
    toast.success(message || "Submitted Successfully");
  });

  const warningNotice = useCallback((message) => {
    toast.warning(message || "Warning");
  });

  const errorLoading = useCallback((message) =>
    toast.error(message || "Error communicating with the server")
  );

  return (
    <DataContext.Provider
      value={{
        user: user,
        successLoading: successLoading,
        errorLoading: errorLoading,
        warningNotice: warningNotice,
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
}
