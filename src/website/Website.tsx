import { OurPartners } from "./pages/home/components/OurPartners";
import { EmailSubscribe } from "./pages/home/components/EmailSubscribe";
import { LatestInslight } from "./pages/home/components/LatestInslight";
import { Testimonial } from "./pages/home/components/Testimonial";
import { JoinStudents } from "./pages/home/components/JoinStudents";
import { WhyChooseLBEF } from "./pages/home/components/WhyChooseLBEF";
import { VideoSection } from "./pages/home/components/VideoSection";
import { University } from "./pages/home/components/University";
import { OurCourses } from "./pages/home/components/OurCourses";
import { ApplyNow } from "./pages/home/components/ApplyNow";
import { HeroSection } from "./pages/home/components/HeroSection";
import { NavBar } from "./pages/home/components/NavBar";

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