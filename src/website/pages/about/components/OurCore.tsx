import React from 'react';
import decoration from '../../../../assets/decoration.png';
import imageone from '../../../../assets/core/jalan.jpeg';
import imagetwo from '../../../../assets/core/prakash.png';
import bg1 from '../../../../assets/white_bg.jpg';
import { useNavigate } from 'react-router-dom';

const messages = [
  {
    id: 1,
    name: "Er. Pankaj Jalan",
    position: "Chairman",
    institution: "LBEF Group Of Institutions",
    message:
      "Dear Students,\nIt is my pleasure to extend a warm welcome to all prospective students. As a part of our student community, you are a large and diverse group, reflecting our wonderful regional character and diversity.",
    image: imageone,
  },
  {
    id: 2,
    name: "Er. Prakash Kumar Kejriwal",
    position: "Executive Director",
    institution: "LBEF Group of Institutions",
    message:
      "Dear Students,\nWelcome to LBEF College - the First IT College of Nepal! We are excited about your interest in joining our esteemed institution. At LBEF, we are dedicated to offering an exceptional educational experience that prepares you for ...",
    image: imagetwo,
  },
];

export default function OurCore() {
  const navigate = useNavigate();

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-20 overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60"
        style={{ backgroundImage: `url(${bg1})` }}
      />
      <div className="absolute inset-0 bg-[#474AFF] opacity-65" />

      <div className="relative max-w-7xl mx-auto">
        {/* Title */}
        <div className="text-center mb-6">
          <p className="text-white text-lg font-medium mb-2">
            Meet Our Leads
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Messages from{' '}
            <span className="relative inline-block text-white">
              Our Leads
              <img
                src={decoration}
                alt=""
                className="absolute left-1/2 -translate-x-1/2 w-full h-3"
              />
            </span>
          </h2>
        </div>

        {/* Cards – Responsive (NO SCROLL) */}
        <div className="flex flex-col lg:flex-row gap-12 justify-center items-center p-8">
          {messages.map((lead) => (
            <div
              key={lead.id}
              onClick={() => navigate(`/messages/${lead.id}`)}
              className="pl-10 w-full sm:w-[520px] relative bg-white rounded-2xl shadow-md transition-transform hover:scale-105 cursor-pointer"
            >
              <div className="flex items-center gap-4 pt-6 pl-6 pb-2 pr-6">
                <div className="w-20 h-20 rounded-full absolute top-5 -left-10 z-20 overflow-hidden border-4 border-[#474AFF]">
                  <img
                    src={lead.image}
                    alt={lead.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-900">
                    {lead.name}
                  </h3>
                  <p className="text-lg text-gray-600">
                    {lead.position}
                  </p>
                  <p className="text-sm text-gray-500">
                    {lead.institution}
                  </p>
                </div>
              </div>

              <div className="pt-2 pl-6 pb-6 pr-6 text-gray-700 whitespace-pre-line">
                {lead.message}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
