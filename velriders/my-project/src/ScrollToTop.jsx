import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    const timeout = setTimeout(() => {
      const container = document.querySelector('#main-scroll-container');
      if (container) {
        container.scrollTo(0, 0);
      } else {
        window.scrollTo(0, 0);
      }
    }, 100); // small delay to ensure DOM is ready

    return () => clearTimeout(timeout);
  }, [pathname]);

  return null;
}

export default ScrollToTop;
