import { RefObject, useEffect } from "react";

export const useOutsideClick = ({
  ref,
  onClose,
  trendingSearchRef, // Added new ref for trending search container
}: {
  ref: RefObject<HTMLElement>;
  trendingSearchRef: RefObject<HTMLElement>; // Reference for trending search items
  onClose: () => void;
}) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Check if the click is outside both the dropdown and the trending search items
      if (
        ref.current && !ref.current.contains(event.target as Node) &&
        trendingSearchRef.current && !trendingSearchRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [ref, trendingSearchRef, onClose]); // Add `trendingSearchRef` as a dependency
};
