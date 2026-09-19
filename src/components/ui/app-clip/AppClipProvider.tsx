"use client";

import React, { createContext, useContext, useState, ReactNode, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import { AppClipRegistry } from "./AppClipRegistry";

interface AppClipState {
  id: string;
  payload?: any;
}

interface AppClipContextType {
  open: (clipId: string, payload?: any) => void;
  close: () => void;
  isOpen: boolean;
  activeClip: string | null;
}

const AppClipContext = createContext<AppClipContextType | null>(null);

export const useAppClip = () => {
  const context = useContext(AppClipContext);
  if (!context) throw new Error("useAppClip must be used within AppClipProvider");
  return context;
};

export function AppClipProvider({ children }: { children: ReactNode }) {
  const [activeClipState, setActiveClipState] = useState<AppClipState | null>(null);

  const open = useCallback((clipId: string, payload?: any) => {
    setActiveClipState({ id: clipId, payload });
  }, []);

  const close = useCallback(() => {
    setActiveClipState(null);
  }, []);

  const ActiveComponent = activeClipState?.id ? AppClipRegistry[activeClipState.id] : null;

  return (
    <AppClipContext.Provider
      value={{
        open,
        close,
        isOpen: !!activeClipState,
        activeClip: activeClipState?.id || null,
      }}
    >
      {children}
      <AnimatePresence>
        {ActiveComponent && (
          <ActiveComponent onClose={close} payload={activeClipState?.payload} />
        )}
      </AnimatePresence>
    </AppClipContext.Provider>
  );
}
