import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// scroll to top when any page is visited means if route or pathname is changes
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
