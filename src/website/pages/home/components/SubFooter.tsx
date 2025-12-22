import subfooterone from '../../../../assets/six_path.png';
import subfootertwo from '../../../../assets/subfootertwo.png';

export default function SubFooter() {
  return (
    <div className="w-full bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="w-full text-center">
          <div className="w-full inline-block">
            <img
              src={subfootertwo}
              alt="Illustration part two"
              className="
                w-full
                max-w-7xl
                h-auto
                object-contain
                mx-auto
                block
                rounded-xl
      
              "
            />
          </div>
          <div className="w-full inline-block">
            <img
              src={subfooterone}
              alt="Illustration part one"
              className="
                w-full
                max-w-7xl
                h-auto
                object-contain
                mx-auto
                block
                rounded-xl
      
              "
            />
          </div>
        </div>
      </div>
    </div>
  );
}