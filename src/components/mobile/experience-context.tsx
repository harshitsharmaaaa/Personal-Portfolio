"use client";

import { createContext, useContext } from "react";

const MobileActiveContext = createContext(true);

export function MobileActiveProvider({
  active,
  children,
}: {
  active: boolean;
  children: React.ReactNode;
}) {
  return <MobileActiveContext.Provider value={active}>{children}</MobileActiveContext.Provider>;
}

export function useMobileActive() {
  return useContext(MobileActiveContext);
}
