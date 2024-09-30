import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// scroll to specifie section of a web page by id.
const ScrollToSepcificSection = () => {
  const location = useLocation();

  useEffect(() => {
    const sectionId = location.hash.replace("#", "");
    if (sectionId) {
      const sectionElement = document.getElementById(sectionId);
      if (sectionElement) {
        sectionElement.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  return null;
};

export default ScrollToSepcificSection;
