import { useState, useEffect, useCallback } from "react";

// Manage mobile menu state
// and detects outside click events in order to close it
const useMobileMenu = (elementRef, initialState) => {
  const [isOpen, setIsOpen] = useState(initialState);

  useEffect(() => {
    const handlePageClick = (event) => {
      if (elementRef.current) {
        // If the menu element does not contain the target,
        // it means we clicked outside and we want to close the menu
        if (!elementRef.current.contains(event.target)) {
          setIsOpen(false);
        }
      }
    };

    // When the element is active, listen for clicks anywhere on the page
    if (isOpen) {
      window.addEventListener("click", handlePageClick);
    }

    // Cleanup on unmount
    return () => {
      window.removeEventListener("click", handlePageClick);
    };
  });

  const toggle = useCallback(() => setIsOpen(!isOpen), [isOpen]);

  return [isOpen, toggle];
};

export default useMobileMenu;
