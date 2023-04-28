import { createContext, useState } from "react";
import { App, contextApp } from "../types/dto";

interface props { children:React.ReactNode };

export const appctx = createContext<contextApp>({
  app: {tableModal:false}, setApp: undefined
});

export const AppContext = ({ children }: props) => {

  const [app, setApp] = useState<App>({
    tableModal: false
  });

  return (
    <appctx.Provider value={{ app, setApp }}>
      {children}
    </appctx.Provider>
  );
}
