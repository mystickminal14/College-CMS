import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft  } from "lucide-react";
import { useState } from "react";
import useGetSlug from "./hooks/useGetSlug";
import { APP_URL, IMAGE_URL } from "../../constants";
import Seo from "../../context/seo";

const PreviewBlog = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const { data, isLoading, isError } = useGetSlug(slug || "");

  const blog = data?.data;

  const toggleFaq = (index:any) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        <div className="animate-pulse">Loading blog...</div>
      </div>
    );
  }

  if (isError || !blog) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-gray-500">
        <p>Blog not found</p>
        <button
          onClick={() => navigate("/")}
          className="mt-3 text-blue-600 underline"
        >
          Go back
        </button>
      </div>
    );
  }

  // Calculate read time (approx 200 words per minute)
  const readTime = Math.max(1, Math.ceil((blog.content?.length || 0) / 2000));

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Seo
        title={blog.metaTitle}
        description={blog.metaDescription}
        url={`${APP_URL}/blogs/${blog.slug}`}
      />

      {/* Medium-style sticky header */}
      <div className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-6 py-3">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft size={18} />
            Back
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8 md:py-12">
      
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-6">
          {blog.title}
        </h1>

        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-8 pb-4 border-b border-gray-100">
         
          
          {blog.publishDate && (
            <>
              <span>•</span>
              <span>{new Date(blog.publishDate).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric'
              })}</span>
            </>
          )}
          
          <span>•</span>
          <span>{readTime} min read</span>
        </div>

        {/* Featured Image - Fixed size */}
        {blog.featuredImage && (
          <div className="mb-10 -mx-6 md:mx-0">
            <img
              src={IMAGE_URL + blog.featuredImage}
              alt={blog.featuredImageAlt || blog.title}
              className="w-full h-auto max-h-125 object-cover rounded-2xl shadow-lg"
            />
            {blog.featuredImageAlt && (
              <p className="text-sm text-gray-500 text-center mt-3 italic">
                {blog.featuredImageAlt}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Blog content styles - Medium inspired */}
      <style>{`
        .blog-content {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;
          font-size: 1.125rem;
          line-height: 1.8;
          color: #242424;
        }
        
        .blog-content h1 {
          font-size: 2.5rem;
          font-weight: 700;
          margin: 2rem 0 1rem;
          line-height: 1.2;
          letter-spacing: -0.02em;
        }
        
        .blog-content h2 {
          font-size: 1.875rem;
          font-weight: 700;
          margin: 2rem 0 1rem;
          line-height: 1.3;
          letter-spacing: -0.01em;
        }
        
        .blog-content h3 {
          font-size: 1.5rem;
          font-weight: 600;
          margin: 1.5rem 0 0.75rem;
        }
        
        .blog-content p {
          margin: 1.25rem 0;
          line-height: 1.8;
        }
        
        .blog-content ul, .blog-content ol {
          margin: 1.25rem 0;
          padding-left: 2rem;
        }

        .blog-content ul {
          list-style-type: disc;
        }

        .blog-content ol {
          list-style-type: decimal;
        }

        .blog-content li {
          margin: 0.5rem 0;
          line-height: 1.7;
          display: list-item;
        }

        .blog-content li::marker {
          color: #242424;
        }
        
        .blog-content blockquote {
          border-left: 4px solid #e5e7eb;
          padding-left: 1.5rem;
          margin: 1.5rem 0;
          font-style: italic;
          color: #4b5563;
        }
        
        .blog-content table {
          width: 100%;
          margin: 1.5rem 0;
          border-collapse: collapse;
          font-size: 0.875rem;
        }
        
        .blog-content th {
          background-color: #f9fafb;
          border: 1px solid #e5e7eb;
          padding: 0.75rem;
          font-weight: 600;
          text-align: left;
        }
        
        .blog-content td {
          border: 1px solid #e5e7eb;
          padding: 0.75rem;
        }
        
        .blog-content img {
          max-width: 100%;
          height: auto;
          border-radius: 0.75rem;
          margin: 1.5rem 0;
        }
        
        .blog-content a {
          color: #2563eb;
          text-decoration: underline;
          text-underline-offset: 2px;
        }
        
        .blog-content a:hover {
          color: #1d4ed8;
        }
        
        .blog-content hr {
          margin: 2rem 0;
          border: 0;
          height: 1px;
          background: linear-gradient(to right, transparent, #e5e7eb, transparent);
        }
      `}</style>

      {/* Main content */}
      <div className="max-w-3xl mx-auto px-6">
        <div
          className="blog-content"
          dangerouslySetInnerHTML={{ __html: blog.content || "" }}
        />

      
        {/* FAQs - Your design integrated */}
        {blog.faqs && blog.faqs.length > 0 && (
          <div className="mt-12 mb-16">
            <div className="text-start mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Frequently Asked{' '}
                <span className="relative inline-block text-[#474AFF]">
                  Questions
                  <svg className="absolute left-1/2 -translate-x-1/2 bottom-0 w-full h-3" viewBox="0 0 200 10" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 5 Q50 0 100 5 Q150 10 200 5" stroke="#474AFF" strokeWidth="2" fill="none" opacity="0.3"/>
                  </svg>
                </span>
              </h2>
            </div>

            <div className="space-y-4">
              {blog.faqs.map((faq, index) => {
                const isOpen = openFaqIndex === index;
                
                return (
                  <div key={index} className="rounded-lg overflow-hidden border border-gray-200">
                    <button
                      onClick={() => toggleFaq(index)}
                      className={`w-full px-6 py-4 flex justify-between items-center text-left font-medium text-lg transition-all duration-200 ${
                        isOpen ? 'bg-[#474AFF] text-white' : 'bg-white hover:bg-gray-50 text-gray-900'
                      }`}
                    >
                      <span className="pr-4">{faq.question}</span>
                      <span className="text-2xl font-bold shrink-0 ml-4">
                        {isOpen ? '−' : '+'}
                      </span>
                    </button>

                    {isOpen && (
                      <div className="px-6 py-5 bg-gray-50 text-gray-700 border-t border-gray-200">
                        <div className="leading-relaxed">
                          {faq.answer}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Schema markup for SEO */}
            <script type="application/ld+json">
              {JSON.stringify({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "mainEntity": blog.faqs.map(faq => ({
                  "@type": "Question",
                  "name": faq.question,
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": faq.answer
                  }
                }))
              })}
            </script>
          </div>
        )}
      </div>

      {/* Footer CTA */}
      <div className="bg-gray-50 mt-12 py-12">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h3 className="text-2xl font-bold mb-3">Enjoyed this read?</h3>
          <p className="text-gray-600 mb-6">
            Stay in touch for more insights and updates from LBEF
          </p>
          <button
            onClick={() => navigate("/blogs")}
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#474AFF] text-white rounded-full hover:bg-gray-800 transition-colors"
          >
            Explore More Articles
            <ArrowLeft size={18} className="rotate-180" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PreviewBlog;