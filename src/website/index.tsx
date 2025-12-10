import logo from "../assets/lbef_white.png"
import butterfiles from "../assets/butterfiles.png"
import graduation from "../assets/graduations.jpg"
export function HomePage() {
  return (
    <div>
      <div className="flex items-center justify-around pt-6">
        <div style={{ width: "150px" }}><img src={logo} alt="LBEF Logo" className="object-cover" /></div>
        <div className="uppercase font-inter">
          <ul className="flex gap-15 text-[0.85vw] font-medium" style={{ color: "#050038" }} >
            <li>home</li>
            <li className=" flex gap-1 items-center">about<i className="fa-solid fa-angle-down"></i></li>
            <li className=" flex gap-1 items-center">students<i className="fa-solid fa-angle-down"></i></li>

            <li className=" flex gap-1 items-center">admission<i className="fa-solid fa-angle-down"></i></li>


            <li className=" flex gap-1 items-center">media<i className="fa-solid fa-angle-down"></i></li>

            <li className=" flex gap-1 items-center">Blogs<i className="fa-solid fa-angle-down"></i></li>

            <li>ugc</li>
          </ul>
        </div>
        <div className="">
          <a href="#" style={{ backgroundColor: "#3040E5" }} className="capitalize text-[1vw] text-white px-4 py-2 rounded-2xl">Enroll Now</a>
        </div>
      </div>
      <div className="flex justify-between p-10 pt-15">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-[#0F183F] rotate-45"></div>
          <div className="h-0.5 bg-[#0F183F] w-40"></div>
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
            <span className="absolute h-[2vh] w-[2vw] left-[7vw] top-[2vh]">
              <img src={butterfiles} alt="Butterflies" />
            </span>
            LBEF
          </span>
          {" "}
          <span className="relative">
            College
            <span className="absolute text-[1vw] left-0 top-[12vh] font-normal">in IT</span>
          </span>
        </div>
        <div className="flex items-center">
          <div className="h-0.5 bg-[#0F183F] w-40"></div>
          <div className="w-3 h-3 bg-[#0F183F] rotate-45"></div>
        </div>
      </div>
      <div>
        <img src={graduation} style={{ width: "100vw", height: "25vw", objectFit: "cover", filter: "brightness(0.5)" }} alt="Graduation" />
      </div>
    </div >
  )
}