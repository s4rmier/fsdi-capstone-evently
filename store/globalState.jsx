import { useState } from "react";
import DataContext from "./dataContext";

export default function GlobalState(props) {
  const [user, setUser] = useState({});
  return (
    <DataContext.Provider
      value={{
        user: user,
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
}
