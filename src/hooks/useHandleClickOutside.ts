import { useEffect, RefObject } from "react";

function useHandleClickOutside(
  elementRef: RefObject<HTMLElement>,
  handleOpen: (value: boolean) => void,
) {
  useEffect(() => {
    const handleClickOutside = function (e: MouseEvent) {
      if (
        elementRef.current &&
        !elementRef.current.contains(e.target as Node)
      ) {
        handleOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
}

export default useHandleClickOutside;
