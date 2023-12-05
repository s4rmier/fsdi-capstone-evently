import { createContext } from "react";

const DataContext = createContext({
  user: {},
  errorLoading: () => {},
  successLoading: () => {},
});

export default DataContext;
