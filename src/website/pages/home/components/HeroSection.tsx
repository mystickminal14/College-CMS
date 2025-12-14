import butterfiles from "../../../../assets/butterfiles.png"
import graduation from "../../../../assets/graduations.jpg"
export function HeroSection() {
  return (
    <>
      <section className=" bg-white flex lg:justify-between md:justify-center p-10 pt-15">
        <div className="hidden lg:flex items-center">
          <div className="w-3 h-3 bg-[#0F183F] rotate-45"></div>
          <div className="h-0.5 bg-[#0F183F] w-[10vw]"></div>
        </div>
        <div className="font-bold text-[5.5vw]">
          <span className="relative">Welcome
            <span className="absolute text-[1vw] left-0 font-normal">The First IT College of Nepal</span>
          </span>
          <span className="relative"> to {""}
            <span className="absolute text-[1vw] left-0 top-[0.5vh] font-normal">Your Future</span>
          </span>
          <span
            className="text-white pl-3 pr-3 inline-block relative"
            style={{
              backgroundColor: "#3040E5",
              borderTopRightRadius: "50px",
              borderBottomLeftRadius: "50px",
              padding: "0 12px",
            }}
          >
            <span className="absolute h-[2vh] w-[2vw] left-[7vw] top-[1.5vh]">
              <img src={butterfiles} alt="Butterflies" />
            </span>
            LBEF
          </span>
          {" "}
          <span className="relative">
            College
            <span className="absolute text-[1vw] left-0 top-[11vh] font-normal">in IT</span>
          </span>
        </div>
        <div className=" hidden lg:flex items-center">
          <div className="h-0.5 bg-[#0F183F] w-[10vw]"></div>
          <div className="w-3 h-3 bg-[#0F183F] rotate-45"></div>
        </div>
      </section>
      <section className="w-90vw h-[30vw] relative overflow-hidden">
        <img
          src={graduation}
          alt="Graduation"
          className="w-full h-full object-cover object-center"
        />
      </section>
    </>
  );
}