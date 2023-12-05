import { useState, useCallback } from "react";
import DataContext from "./dataContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function GlobalState(props) {
  const [user, setUser] = useState({});

  const successLoading = useCallback((message) => {
    toast.success(message || "Submitted Successfully");
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
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
}
