import { createContext, useReducer } from "react";
import { initialGlobalState } from "./data_structures/globalState";
import globalReducer from "./reducers/globalReducer";

export const GlobalContext = createContext(initialGlobalState);

const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(globalReducer, initialGlobalState);

  return (
    <GlobalContext.Provider value={[state, dispatch]}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
