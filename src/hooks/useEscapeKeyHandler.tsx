import { useEffect, useCallback } from "react";

const useEscapeKeyHandler = (callback: () => void) => {
  // Memoize the callback to ensure a stable reference
  const stableCallback = useCallback(callback, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        stableCallback();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [stableCallback]);
};

export default useEscapeKeyHandler;
