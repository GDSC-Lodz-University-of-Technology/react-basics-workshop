import { PresentationContext } from "../contexts/PresentationContext";
import { useContext } from "react";

export default function usePresentation() {
  const context = useContext(PresentationContext);
  if (!context) {
    throw new Error(
      "usePresentation must be used within a PresentationContextProvider"
    );
  }
  return context;
}
