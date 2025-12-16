import { University } from "./components/University";
import { ApplyNow } from "./components/ApplyNow";
import { HeroSection } from "./components/HeroSection";
import { OurCourses } from "./components/OurCourses";
import { VideoSection } from "./components/VideoSection";
import { WhyChooseLBEF } from "./components/WhyChooseLBEF";
import { JoinStudents } from "./components/JoinStudents";
import { Testimonial } from "./components/Testimonial";
import { LatestInslight } from "./components/LatestInslight";
import { EmailSubscribe } from "./components/EmailSubscribe";
import { OurPartners } from "./components/OurPartners";
import BlogSection from "./components/BlogSection";
import Events from "./components/EventSection";

export function HomePage() {
  return (
    <>
      <HeroSection />
      <ApplyNow />
      <OurCourses />
      <University />
      <VideoSection />
      <WhyChooseLBEF />
      <JoinStudents />
      <Testimonial />
      {/* <LatestInslight /> */}
      {/* <OurPartners /> */}
      <BlogSection />
      <Events />
      <EmailSubscribe />

    </>
  )
}