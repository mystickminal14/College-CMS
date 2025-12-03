import React from "react";
interface TitleBoxProps {
  title: string;
  subtitle?: string;

}

const TitleBox: React.FC<TitleBoxProps> = ({ title, subtitle,  }) => {
  return (
    <div
      className="
        relative 
        w-full 
        h-20
       bg-linear-to-r from-blue-500 to-purple-600
        rounded-xl 
        flex 
        items-center 
        overflow-hidden
        px-6
      "
    >
      {/* Text */}
      <div className="z-10">
        <h1 className="text-2xl font-bold text-white">{title}</h1>
        {subtitle && (
          <p className="text-blue-100 text-sm mt-1">{subtitle}</p>
        )}
      </div>

     
    </div>
  );
};

export default TitleBox;
