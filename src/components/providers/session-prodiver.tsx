"use client";
import { Session } from "next-auth";
import React, { createContext } from "react";

const SessionContext = createContext<Session | null>(null);

const SessionProdiver = ({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session | null;
}) => {
  return (
    <SessionContext.Provider value={session}>
      {children}
    </SessionContext.Provider>
  );
};

export default SessionProdiver;
