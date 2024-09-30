import CompanyOverview from "../../components/aboutUs/CompanyOverview";
import TeamIntroduction from "../../components/aboutUs/TeamIntroduction";
import Testimonials from "../../components/aboutUs/Testimonials";
import Contact from "../Contact";

const AboutUs = () => {
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
