import { ArrowRight, Calendar, Clock } from "lucide-react";
import decoration from '../../../../assets/decoration.png';
import Blog_Image_One from '../../../../assets/blog_images.jpg';
import Blog_Image_Two from '../../../../assets/blog_images_two.jpg';

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
      image:
        Blog_Image_One,
    },
    {
      id: 2,
      title: "How to Stay Motivated While Learning Online",
      category: "Learning Tips",
      date: "September 9, 2025",
      readTime: "2 min read",
      description:
        "Online learning offers flexibility, access to world-class educators, and the ability to learn at your own pace.",
      image:
        Blog_Image_Two
    },
  ];

  return (
    <div className=" bg-[#0066FF0A]">
      {/* Main Content */}
      <div className="container mx-auto px-4 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left Section */}
          <div className="flex flex-col justify-start md:mt-20">
            {/* Label */}
            <div className="mb-6">
              <span className="text-sm font-medium text-blue-600">
                Our Blog
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl lg:text-5xl font-bold leading-tight mb-6 md:w-140">
              Insights & Ideas From <span className="relative inline-block">
                The World
                <img
                  src={decoration}
                  alt="Decoration"
                  className="absolute left-1/2 -translate-x-1/2 w-full h-3 "
                />
              </span>{" "}Of{" "}
              Learning
            </h1>

            {/* Description */}
            <p className="text-gray-600 text-base leading-relaxed mb-8 max-w-md">
              Stay informed, inspired, and ahead of the curve with
              expert articles, study tips, industry updates, and real
              success stories.
            </p>

            {/* CTA Button */}
            <div>
              <button className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200">
                View All Insights
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Section - Blog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-y-10">

            {blogPosts.map((post) => (
              <article
                key={post.id}
                className={`group cursor-pointer h-full flex flex-col `}
              >
                {/* Image Container */}
                <div className="relative overflow-hidden rounded-xl mb-4 bg-gray-200 h-48 md:h-86">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                {/* Category Badge */}
                <div className="mb-3">
                  <span className="text-xs font-medium text-blue-600">
                    {post.category}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-gray-900 mb-3 leading-snug group-hover:text-blue-600 transition-colors">
                  {post.title}
                </h3>

                {/* Meta Info */}
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{post.readTime}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-600 text-sm leading-relaxed">
                  {post.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
