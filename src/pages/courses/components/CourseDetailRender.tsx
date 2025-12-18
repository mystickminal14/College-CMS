import { BlockType, type CourseDetailBlock } from "../model/CourseDetailModel";


interface Props {
  blocks: CourseDetailBlock[];
  sectionRefs: React.MutableRefObject<Record<string, HTMLElement | null>>;
}

const CourseDetailRenderer = ({ blocks, sectionRefs }: Props) => {
  return (
    <>
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
                  className="mb-12 scroll-mt-24"
                >
                  <h2 className="text-2xl md:text-3xl font-bold bg-blue-100 text-blue-600 px-4 py-3 rounded-lg mb-6">
                    {block.title}
                  </h2>

                  {block.children?.length > 0 && (
                    <CourseDetailRenderer
                      blocks={block.children}
                      sectionRefs={sectionRefs}
                    />
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
                  className="mb-8 scroll-mt-24"
                >
                  <h3 className="text-xl md:text-2xl font-semibold bg-blue-50 text-blue-800 px-3 py-2 rounded-md mb-4">
                    {block.title}
                  </h3>

                  {block.children?.length > 0 && (
                    <CourseDetailRenderer
                      blocks={block.children}
                      sectionRefs={sectionRefs}
                    />
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
                  className="text-gray-700 mb-4 leading-relaxed whitespace-pre-line"
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
                  className="list-disc pl-6 space-y-2 mb-6 text-gray-700"
                >
                  {(block.content ?? []).map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              );

            default:
              return null;
          }
        })}
    </>
  );
};

export default CourseDetailRenderer;
