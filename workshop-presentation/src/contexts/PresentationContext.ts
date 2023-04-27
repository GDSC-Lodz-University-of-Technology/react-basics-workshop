import { MDXProps } from "mdx/types";
import { createContext } from "react";

export interface PresentationContext {
  slide: number;
  slides: ((props: MDXProps) => JSX.Element)[];
  nextSlide: () => void;
  previousSlide: () => void;
}

export const PresentationContext = createContext<PresentationContext | null>(
  null
);
