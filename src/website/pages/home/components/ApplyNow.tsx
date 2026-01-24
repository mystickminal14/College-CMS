import { useEffect } from "react";
import arrow from "../../../../assets/arrow.webp";

declare global {
  interface Window {
    NpfWidgetsInit: (config: any) => void;
  }
}


export function ApplyNow() {
  useEffect(() => {
    if (document.getElementById("npf-script")) return;

    const script = document.createElement("script");
    script.id = "npf-script";
    script.src = "https://in8cdn.npfs.co/js/widget/npfwpopup.js";
    script.async = true;

    script.onload = () => {
      setTimeout(() => {
        window.NpfWidgetsInit?.({
          widgetId: "22c1142ae37bdbc283d1bdf26604a17f",
          baseurl: "widgets.in8.nopaperforms.com",
          formTitle: "Enquiry Form",
        });
      }, 300); // wait for React DOM
    };

    document.body.appendChild(script);
  }, []);




  return (
    <>
      {/* SECTION */}
      <section className="bg-white py-4 ms:py-10 md:py-8 lg:px-20 flex relative">
        <div className="max-w-6xl mx-auto flex flex-col items-center gap-12">

          {/* Arrow */}
          <div className="absolute left-[-5vw] -top-5">
            <img
              src={arrow}
              alt="Curved Dotted Arrow"
              className="hidden lg:block lg:w-[25vw]"
            />
          </div>

          {/* Content */}
          <div className="text-center lg:text-left flex-1">
            <p className="text-xs sm:text-[16px] p-1 md:text-[20px] text-center lg:text-xl text-[#19213DB2] leading-relaxed max-w-1xl">
              Together with our top-notch faculty, we  provide a nurturing environment to help students evolve into{" "}
              <br />
              leaders who think boldly, make effective choices and are well-equipped with{" "} <br />
              futuristic mindset and skills.
            </p>

            {/* Buttons */}
            <div className="mt-10 flex gap-4 justify-center">
              <button
                className="uppercase text-[12px] sm:text-[18px] rounded-full bg-[#474AFF] px-5 sm:px-12 py-4 text-white font-medium hover:bg-[#2535c7] shadow-lg npfWidgetButton npfWidget-22c1142ae37bdbc283d1bdf26604a17f"
              >
                Enquiry Now
              </button>

              <a
                href="https://apply.lbef.org/"
                target="_blank"
                rel="noreferrer"
                className="uppercase text-[12px] sm:text-[18px] rounded-full border-2 border-[#00000057] bg-white px-5 sm:px-12 py-4 text-[#050038] font-medium hover:bg-[#474AFF] hover:text-white"
              >
                Apply Now
              </a>
            </div>
          </div>
        </div>
      </section>
      <div id="popup-22c1142ae37bdbc283d1bdf26604a17f" className="npfPopup">
        <div id="popup-in-22c1142ae37bdbc283d1bdf26604a17f">
          <div className="npfTitle npfTitle-22c1142ae37bdbc283d1bdf26604a17f">
            Enquiry Form
            <img
              id="npfWdgclose-22c1142ae37bdbc283d1bdf26604a17f"
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABmJLR0QA/wD/AP+gvaeTAAABzUlEQVRYhe3Wy27TYBAF4A+2ZAkRECpuFeVdemFL6RMAZYHaF2FHEQ9QhRYJBDwILCo2sKDsoV2FEMzin8iRaxzbKeqiPZKl5J8zM8dje2Y4w2nHuYb8OdzDIm7Ef/iGr3iPN9g/LoFj9LCFIbIp1wh9XD+u5Cs4iOADbOM+FnAhrgWshm0Q3AMsz5r8iXRHmXRXN2v43MKOvBrrbZOvRIDfeNrCfyN8R1pUoicve5vkkyIy/MSVJo4v5WWfFbsRa6uuw5xUuoHyZ/4Q3ZLzbtiKuB2xhlJlp2JdUrxdYnsUtk8FEd04y4JTRL/CdgQfgrxaYptMNBZRdlbEWtjf1RHwOch3/mEvJpyWnNQnMuzVEXAY5E4F5xI+yrvfHi5X8DvBOywazpeQszoqS1A1V8Z5/tQJdOKP4MRfwsf+32dY1ieO4JrUNAbSYCmiaSOa17ARwQtJ8U5dhwq8jljPmzhdlQ+jjRmSb0aMH6o/01Isy8dxGxGb8nG82MIfaS6MF5JdabBMw7y87CPppZ4JS9I8H69kfTzAXanDdeL3Gl7hl7zsre+8iIt4pt5SOpRmf60FpOla3pNWtSVpV5hcy79Ia/lbfG8Y9wynGH8BHnKpr/YwVJ8AAAAASUVORK5CYII="
              alt="close"
            />
          </div>
          <div
            id="popup-message-22c1142ae37bdbc283d1bdf26604a17f"
            className="npfPopup-message"
          ></div>
        </div>
        <div id="popup-back-22c1142ae37bdbc283d1bdf26604a17f"></div>
      </div>
      {/* Animation */}
      <style>
        {`
          @keyframes scaleIn {
            from { transform: scale(0.9); opacity: 0 }
            to { transform: scale(1); opacity: 1 }
          }
          .animate-scaleIn {
            animation: scaleIn 0.25s ease-out;
          }
          .npfWidget-22c1142ae37bdbc283d1bdf26604a17f.npfWidgetButton {
            background-color: navy;
          border: none;
          padding: 12px 25px;
          color: #FFF;
          border-radius: 4px;
          position: relative;
          z-index: 11;
          cursor: pointer;
          font-size: 16px;
          font-weight: bold;
          text-decoration: none;
          display: inline-block;
          text-align: center;
          transition: all 0.3s ease;
        }

          .npfWidgetButton:hover, .npfWidgetButton:focus {
            outline: none;
          background-color: #001f66;
          transform: scale(1.05);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }

          /* Popup Styling */
          .npfTitle img {
            float: right;
          position: relative;
          top: -5px;
          cursor: pointer;
        }

          .npfTitle-22c1142ae37bdbc283d1bdf26604a17f {
            color: #FF0033;
          text-align: left;
          font-size: 18px;
          font-weight: 700;
          margin-bottom: 10px;
        }

          #popup-22c1142ae37bdbc283d1bdf26604a17f {
            position: fixed;
          z-index: 999999;
          top: 0;
          width: 100vw;
          height: 100vh;
          display: none;
        }

          #popup-back-22c1142ae37bdbc283d1bdf26604a17f {
            background-color: rgba(0, 0, 0, 0.75);
          position: fixed;
          top: 0;
          left: 0;
          bottom: 0;
          right: 0;
          z-index: 1;
        }

          #popup-in-22c1142ae37bdbc283d1bdf26604a17f {
            background: #ddd;
          width: 100%;
          padding: 20px;
          max-width: 500px;
          margin: 2rem auto;
          border-radius: 10px;
          text-align: center;
          z-index: 111;
          position: relative;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        }

          /* Body styling for demo */
          body {
            font-family: Arial, sans-serif;
          margin: 0;
          padding: 20px;
          background-color: #f5f5f5;
          display: flex;
          flex-direction: column;
          align-items: center;
          min-height: 100vh;
        }

          .container {
            max-width: 1200px;
          width: 100%;
          text-align: center;
        }

          h1 {
            color: #333;
          margin-bottom: 30px;
        }

          .demo-section {
            background: white;
          padding: 30px;
          border-radius: 10px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          margin-bottom: 30px;
        }

          .instructions {
            background: #e8f4fc;
          padding: 20px;
          border-radius: 8px;
          margin-top: 30px;
          text-align: left;
        }

          .instructions h3 {
            color: #0066cc;
          margin-top: 0;
        }

          .instructions ul {
            padding-left: 20px;
        }

          .instructions li {
            margin-bottom: 10px;
        }

          .button-container {
            margin: 40px 0;
          padding: 20px;
        }
        `}

      </style>
    </>
  );
}
