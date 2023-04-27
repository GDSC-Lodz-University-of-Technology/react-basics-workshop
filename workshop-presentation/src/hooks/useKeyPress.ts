import { useEffect } from "react";

export default function useKeyPress(targetKey: string, callback: () => void) {
  useEffect(() => {
    const downHandler = ({ key }: { key: string }) => {
      if (key === targetKey) {
        callback();
      }
    };

    window.addEventListener("keydown", downHandler);

    return () => {
      window.removeEventListener("keydown", downHandler);
    };
  }, [callback, targetKey]);
}
