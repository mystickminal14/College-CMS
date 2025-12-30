import ring from '../../assets/ring.png';
interface BreadcrumbItem {
  label: string;
}

interface CustomBreadcrumbProps {
  bgImage: string;
  title: string;
  breadcrumbs: BreadcrumbItem[];
  objectPosition?: string; // e.g. "50%_40%"
}

const CustomBreadcrumb = ({
  bgImage,
  title,
  breadcrumbs,
  objectPosition = "50%_40%",
}: CustomBreadcrumbProps) => {
  return (
    <section className="relative w-full h-[200px] md:h-[290px] overflow-hidden">
      {/* Background Image */}
      <img
        src={bgImage}
        alt={title}
        className={`absolute inset-0 w-full h-full object-cover md:object-[${objectPosition}]`}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Decorative Rings */}
      <img
        src={ring}
        alt="Decorative circle"
        className="hidden md:block absolute left-40 top-1/2 -translate-y-1/2 w-32 lg:w-42 opacity-65"
      />
      <img
        src={ring}
        alt="Decorative circle"
        className="hidden md:block absolute right-40 top-1/2 -translate-y-1/2 w-32 lg:w-42 opacity-65"
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
        <h1 className="text-2xl md:text-5xl font-bold">{title}</h1>

        <div className="mt-6 flex items-center gap-3 md:gap-4 text-xs md:text-sm opacity-90">
          {breadcrumbs.map((item, index) => (
            <div key={index} className="flex items-center gap-3">
              <span
                className={
                  index === breadcrumbs.length - 1
                    ? "font-medium"
                    : ""
                }
              >
                {item.label}
              </span>
              {index !== breadcrumbs.length - 1 && <span>›</span>}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Center Bump */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
        <svg
          viewBox="0 0 300 40"
          preserveAspectRatio="none"
          className="w-[120px] h-10"
        >
          <path
            d="
              M0,40
              L0,25
              C0,15 60,10 150,10
              C250,10 300,15 300,25
              L300,40
              Z
            "
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
};

export default CustomBreadcrumb;
