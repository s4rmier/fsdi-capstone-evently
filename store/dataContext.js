import { createContext } from "react";

const DataContext = createContext({
  user: {},
  errorLoading: () => {},
  successLoading: () => {},
  warningNotice: () => {},
});

export default DataContext;
