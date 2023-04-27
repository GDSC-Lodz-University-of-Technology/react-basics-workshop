import { ReactNode, createContext } from "react";

export interface TerminalContext {
  prompt: ReactNode;
}

export const TerminalContext = createContext<TerminalContext | null>(null);
