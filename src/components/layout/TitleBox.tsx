import React from "react";
import pcpsLogo from "../../assets/lbef_white.png";

interface TitleBoxProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
}

const TitleBox: React.FC<TitleBoxProps> = ({ title, subtitle, icon }) => {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-linear-to-r from-[#125DAA] to-[#1a7cd3] shadow-xl">
      {/* Shine effect */}
      <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-white/40 to-transparent"></div>
      
      {/* Corner accents */}
      <div className="absolute top-0 right-0 w-32 h-32 -mr-16 -mt-16 bg-white/5 rounded-full"></div>
      <div className="absolute bottom-0 left-0 w-40 h-40 -ml-20 -mb-20 bg-white/5 rounded-full"></div>
      
      <div className="relative z-10 p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex-1">
            {/* Main title */}
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2 drop-shadow-lg">
              {title}
            </h1>
            
            {/* Subtitle */}
            {subtitle && (
              <p className="text-blue-100/90 text-base max-w-2xl">
                {subtitle}
              </p>
            )}
          </div>
          
          <div className="shrink-0">
            {icon || (
              <div className="relative">
                {/* Circular image container */}
                <div className="flex w-42 items-center justify-center overflow-hidden">
                  <img 
                    src={pcpsLogo}
                    alt="Logo"
                    className=" object-cover"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TitleBox;