import useTerminal from "../hooks/useTerminal";
import { ReactNode } from "react";

type Props = {
  withPrompt?: boolean;
  children: ReactNode;
};

export default function TerminalLine({ children, withPrompt }: Props) {
  const { prompt } = useTerminal();
  return (
    <>
      {withPrompt && prompt}
      {children}
    </>
  );
}
