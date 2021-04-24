import { useState, useEffect } from "react";

// Detect clicks on the page in order to toggle mobile menu
const useDetectPageClick = (elementRef, initialState) => {
  const [isActive, setIsActive] = useState(initialState);

  useEffect(() => {
    const handlePageClick = (event) => {
      if (elementRef.current) {
        // If the menu element does not contain the target,
        // it means we clicked outside and we want to close the menu
        if (!elementRef.current.contains(event.target)) {
          setIsActive(false);
        }
      }
    };

    // When the element is active, listen for clicks anywhere on the page
    if (isActive) {
      window.addEventListener("click", handlePageClick);
    }

    // Cleanup on unmount
    return () => {
      window.removeEventListener("click", handlePageClick);
    };
  });

  return [isActive, setIsActive];
};

export default useDetectPageClick;
