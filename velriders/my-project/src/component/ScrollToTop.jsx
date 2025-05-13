import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Delay scroll to allow animations or content load
    const timeout = setTimeout(() => {
      const container = document.querySelector('#main-scroll-container');

      if (container) {
        container.scrollTop = 0; // Scroll the container
      } else {
        window.scrollTo(0, 0); // Fallback scroll
      }
    }, 100);

    return () => clearTimeout(timeout);
  }, [pathname]);

  return null;
}

export default ScrollToTop;
