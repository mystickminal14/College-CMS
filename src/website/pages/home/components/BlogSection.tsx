import { ArrowRight, Calendar, Clock } from "lucide-react";
import decoration from "../../../../assets/decoration.png";
import Blog_Image_One from "../../../../assets/blog/blog_images.jpg";
import Blog_Image_Two from "../../../../assets/blog/blog_images_two.jpg";

import bg1 from '../../../../assets/decoration/background.png';

export default function Index() {
  const blogPosts = [
    {
      id: 1,
      title: "Real Stories from LBEF Students",
      category: "Success Stories",
      date: "September 9, 2025",
      readTime: "2 min read",
      description:
        "At LBEF, learning is not just about completing courses—it's about transforming lives, careers, and futures.",
      image: Blog_Image_One,
    },
    {
      id: 2,
      title: "How to Stay Motivated While Learning Online",
      category: "Learning Tips",
      date: "September 9, 2025",
      readTime: "2 min read",
      description:
        "Online learning offers flexibility, access to world-class educators, and the ability to learn at your own pace.",
      image: Blog_Image_Two,
    },
  ];

  return (
    <section className="py-8 px-4 sm:px-6 lg:px-20" style={{
      backgroundImage: `
      linear-gradient(
        to right,
        rgba(0, 102, 255, 0.8),
        rgba(0, 102, 255, 0.8)
      ),
      url(${bg1})
    `,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      backgroundAttachment: "fixed",
    }}>
      <div className="container mx-auto px-8 sm:px-24  py-10 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-6  items-center">

          {/* LEFT SECTION */}
          <div className="flex flex-col gap-6 lg:pt-16">
            <span className="text-sm font-medium text-white">
              Our Blog
            </span>

            <h1 className="text-4xl md:text-5xl text-white font-bold leading-tight">
              Insights & Ideas From{" "}
              <span className="relative inline-block text-white">
                The World
                <img
                  src={decoration}
                  alt=""
                  className="absolute left-1/2 -translate-x-1/2 bottom-0 w-full h-2 sm:h-3"
                />
              </span>{" "}
              Of Learning
            </h1>

            <p className="text-white text-base sm:text-lg max-w-lg">
              Stay informed, inspired, and ahead of the curve with expert
              articles, study tips, industry updates, and real success stories.
            </p>

            <div>
              <button className="inline-flex items-center gap-2 bg-white text-[#474AFF] cursor-pointer font-semibold px-6 py-3 rounded-lg transition">
                View All Insights
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* RIGHT SECTION */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
            {blogPosts.map((post) => (
              <article
                key={post.id}
                className="group cursor-pointer flex flex-col h-full"
              >
                {/* Image */}
                <div className="relative overflow-hidden rounded-xl bg-gray-200 h-44 sm:h-48 md:h-52 lg:h-56">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                {/* Content */}
                <div className="mt-4 flex flex-col flex-1">
                  <span className="text-xs font-medium text-white mb-2">
                    {post.category}
                  </span>

                  <h3 className="text-base sm:text-lg font-bold text-white mb-3 group-hover:text-white transition">
                    {post.title}
                  </h3>

                  <div className="flex flex-wrap items-center gap-4 sm:text-lg max-w-lg text-white mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {post.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {post.readTime}
                    </div>
                  </div>

                  <p className="sm:text-lg max-w-lg text-white leading-relaxed">
                    {post.description}
                  </p>
                </div>
              </article>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
