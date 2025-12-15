import { University } from "./components/University";
import { ApplyNow } from "./components/ApplyNow";
import { HeroSection } from "./components/HeroSection";
import { NavBar } from "./components/NavBar";
import { OurCourses } from "./components/OurCourses";
import { VideoSection } from "./components/VideoSection";
import { WhyChooseLBEF } from "./components/WhyChooseLBEF";
import { JoinStudents } from "./components/JoinStudents";
import { Testimonial } from "./components/Testimonial";
import { LatestInslight } from "./components/LatestInslight";
import { EmailSubscribe } from "./components/EmailSubscribe";
import { OurPartners } from "./components/OurPartners";

export function HomePage() {
  return (
    <>
      <NavBar />
      <HeroSection />
      <ApplyNow />
      <OurCourses />
      <University />
      <VideoSection />
      <WhyChooseLBEF />
      <JoinStudents />
      <Testimonial />
      <LatestInslight />
      <EmailSubscribe />
      <OurPartners />
    </>
  )
}