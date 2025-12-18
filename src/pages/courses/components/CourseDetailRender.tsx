import { BlockType, type CourseDetailBlock } from "../model/CourseDetailModel";

interface Props {
  blocks: CourseDetailBlock[];
  sectionRefs: React.MutableRefObject<Record<string, HTMLElement | null>>;
}

const CourseDetailRenderer = ({ blocks, sectionRefs }: Props) => {
  return (
    <div className="space-y-8">
      {blocks
        ?.slice()
        .sort((a, b) => a.order - b.order)
        .map(block => {
          switch (block.type) {
            /* ================= HEADING ================= */
            case BlockType.HEADING:
              return (
                <section
                  key={block.id}
                  id={`heading-${block.id}`}
                  ref={el => {
                    sectionRefs.current[`heading-${block.id}`] = el;
                  }}
                  className="mb-10 scroll-mt-24 pt-4"
                >
                  <div className="relative">
                    {/* Left accent line */}
                    <div className="absolute -left-4 top-0 bottom-0 w-1 bg-linear-to-b from-blue-500 to-blue-400 rounded-full" />
                    
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 ml-3 mb-6">
                      <span className="bg-linear-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
                        {block.title}
                      </span>
                    </h2>
                  </div>

                  {block.children?.length > 0 && (
                    <div className="ml-3">
                      <CourseDetailRenderer
                        blocks={block.children}
                        sectionRefs={sectionRefs}
                      />
                    </div>
                  )}
                </section>
              );

            /* ================= SUBHEADING ================= */
            case BlockType.SUBHEADING:
              return (
                <section
                  key={block.id}
                  id={`subheading-${block.id}`}
                  ref={el => {
                    sectionRefs.current[`subheading-${block.id}`] = el;
                  }}
                  className="mb-4 scroll-mt-24 pt-2"
                >
                  <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4">
                    <span className="text-blue-600 mr-2">#</span>
                    {block.title}
                  </h3>

                  {block.children?.length > 0 && (
                    <div className="ml-4 border-l border-gray-200 pl-4">
                      <CourseDetailRenderer
                        blocks={block.children}
                        sectionRefs={sectionRefs}
                      />
                    </div>
                  )}
                </section>
              );

            /* ================= PARAGRAPH ================= */
            case BlockType.PARAGRAPH: {
              const content = Array.isArray(block.content)
                ? block.content.join(" ")
                : block.content;

              return (
                <p
                  key={block.id}
                  className="text-gray-700 mb-3 leading-relaxed text-base md:text-lg"
                >
                  {content}
                </p>
              );
            }

            /* ================= LIST ================= */
            case BlockType.LIST:
              return (
                <ul
                  key={block.id}
                  className="space-y-3 mb-3 text-gray-700"
                >
                  {(block.content ?? []).map((item, idx) => (
                    <li key={idx} className="flex items-start">
                      <div className="shrink-0 w-2 h-2 mt-2 mr-3 bg-blue-500 rounded-full" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              );

            default:
              return null;
          }
        })}
    </div>
  );
};

export default CourseDetailRenderer;