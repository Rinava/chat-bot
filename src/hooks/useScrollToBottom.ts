import { useCallback } from "react";

export function useScrollToBottom() {
  const scrollToBottom = useCallback((behavior: ScrollBehavior = "smooth") => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior,
    });
  }, []);

  return scrollToBottom;
}
