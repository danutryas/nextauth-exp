"use client";
import { SessionProvider } from "next-auth/react";
import { PropsWithChildren } from "react";
import TanStackQueryProvider from "./TanStackQueryContext";

const ContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default ContextProvider;
