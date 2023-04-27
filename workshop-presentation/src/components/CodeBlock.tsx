import Prism from "prismjs";
import { useEffect, useRef, ReactNode } from "react";

type Props = {
  children?: ReactNode;
  language: string;
};

export default function CodeBlock({ children, language }: Props) {
  const ref = useRef<HTMLPreElement>(null);

  useEffect(() => {
    if (ref.current) {
      Prism.highlightElement(ref.current);
    }
  }, []);

  return (
    <pre>
      <code ref={ref} className={`language-${language}`}>
        {children}
      </code>
    </pre>
  );
}
