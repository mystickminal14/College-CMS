import butterfiles from "../../../../assets/butterfiles.png"
import graduation from "../../../../assets/graduations.jpg"
export function HeroSection() {
  return (
    <>
      <section className="bg-white flex flex-col lg:flex-row items-center justify-center lg:justify-between p-4 md:p-6 lg:p-10 lg:pt-15">
        {/* Left line - hidden on mobile */}
        <div className="hidden lg:flex items-center">
          <div className="w-3 h-3 bg-[#0F183F] rotate-45"></div>
          <div className="h-0.5 bg-[#0F183F] w-[10vw]"></div>
        </div>

        {/* Main content */}
        <div
          className="
          font-bold
          text-[21px]
          [@media(min-width:380px)]:text-[7vw]
          text-center lg:text-left
          "
        >
          <div className="inline-block">
            <span className="relative inline-block">
              <span className="lg:text-[6vw]">Welcome</span>
              <span className="absolute text-[6px] md:text-[1vw] left-0 font-normal">The First IT College of Nepal</span>
            </span>
          </div>

          <span className="relative"><span className="lg:text-[6vw]"> to {""}</span>
            <span className="absolute text-[5px] md:text-[1vw] left-0 top-[0.5vw] font-normal">Your Future</span>
          </span>

          <span
            className="text-white pl-2 pr-2 sm:pl-3 sm:pr-3 inline-block relative mx-1 sm:mx-2"
            style={{
              backgroundColor: "#3040E5",
              borderTopRightRadius: "50px",
              borderBottomLeftRadius: "50px",
              padding: "0 8px sm:0 12px",
            }}
          >
            <span className="absolute h-[2vh] w-[2vw] left-[8.5vw] top-[1.5vw]">
              <img src={butterfiles} alt="Butterflies" />
            </span>
            LBEF
          </span>

          <span className="inline-block ml-1 sm:ml-2">{" "}</span>

          <span className="relative ">
            <span className="md:text-[5vw]">College</span>
            <span className="absolute text-[1vw] left-0 top-[7vw] font-normal">in IT</span>
          </span>
        </div>

        {/* Right line - hidden on mobile */}
        <div className="hidden lg:flex items-center">
          <div className="h-0.5 bg-[#0F183F] w-[10vw]"></div>
          <div className="w-3 h-3 bg-[#0F183F] rotate-45"></div>
        </div>
      </section>
      <section className="w-90vw h-[40vw] md:h-[22vw] relative overflow-hidden">
        <img
          src={graduation}
          alt="Graduation"
          className="w-full h-full object-cover object-center"
        />
      </section>
    </>
  );
}
