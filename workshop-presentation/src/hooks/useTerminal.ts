import { TerminalContext } from "../contexts/TerminalContext";
import { useContext } from "react";

export default function useTerminal() {
  const context = useContext(TerminalContext);
  if (!context) {
    throw new Error(
      "useTerminal must be used within a TerminalContextProvider"
    );
  }
  return context;
}
