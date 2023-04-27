import { TerminalContext } from "../contexts/TerminalContext";
import { ReactNode } from "react";

type Props = {
  prompt: string;
  lines: ReactNode[];
};

export default function Terminal({ prompt, lines }: Props) {
  return (
    <div className="container h-3/4 w-3/4 rounded-lg bg-crust p-8">
      <pre className="flex h-full w-full flex-col items-start rounded-md bg-mantle p-4">
        <code>
          <TerminalContext.Provider
            value={{ prompt: <span className="text-mauve">{prompt} </span> }}
          >
            {lines.map((line, index) => (
              <div key={index}>{line}</div>
            ))}
          </TerminalContext.Provider>
        </code>
      </pre>
    </div>
  );
}
