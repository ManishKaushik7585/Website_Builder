import { Link } from '@/components/ui/Link';
import { getTransitionName } from '@/utils/transitions';

export default function PageB() {
  return (
    <div className="p-12 max-w-6xl mx-auto flex flex-col md:flex-row gap-12">
      <div className="w-full md:w-1/2">
        <div 
          style={{ viewTransitionName: getTransitionName('hero-image', 'main') }}
          className="w-full h-96 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-3xl shadow-2xl"
        >
          Hero Image Area (Expanded)
        </div>
      </div>

      <div className="w-full md:w-1/2 flex flex-col justify-center">
        <h1 
          style={{ viewTransitionName: getTransitionName('hero-title', 'main') }}
          className="text-4xl font-bold tracking-tight mb-4 text-blue-900"
        >
          Premium Experience (Detailed)
        </h1>
        
        <p className="text-lg text-slate-600 mb-8">
          This is Page B. The image and title use deterministic view-transition-names. The navigation is powered by the hardened central UI Link component.
        </p>

        <div className="space-y-4 mb-12">
          {[1, 2].map((i) => (
            <div key={i} className="p-4 bg-slate-100 rounded-lg">
              <p className="text-slate-700">Detailed list item {i} describing the feature in depth.</p>
            </div>
          ))}
        </div>

        <div>
          <Link
            href="/experiment/page-a"
            enableViewTransition
            variant="button"
            className="bg-white text-slate-900 border-2 border-slate-200 hover:bg-slate-50"
          >
            &larr; Back to Page A
          </Link>
        </div>
      </div>
    </div>
  );
}
