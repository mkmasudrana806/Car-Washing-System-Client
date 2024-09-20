import { useEffect } from "react";
import CompanyOverview from "../../components/aboutUs/CompanyOverview";
import TeamIntroduction from "../../components/aboutUs/TeamIntroduction";
import Testimonials from "../../components/aboutUs/Testimonials";
import Contact from "../Contact";
import { useLocation } from "react-router-dom";

const AboutUs = () => {
  const location = useLocation();

  useEffect(() => {
    const sectionId = location.hash.replace("#", ""); // Get the section from the URL hash
    if (sectionId) {
      const sectionElement = document.getElementById(sectionId);
      if (sectionElement) {
        sectionElement.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  return (
    <div>
      <div id="company-overview">
        <CompanyOverview />
      </div>
      <div id="team-introduction">
        <TeamIntroduction />
      </div>
      <div id="feedback">
        <Testimonials />
      </div>
      <div id="contact">
        <Contact />
      </div>
    </div>
  );
};

export default AboutUs;
