import { Link } from '@/components/ui/Link';
import { getTransitionName } from '@/utils/transitions';

export default function PageA() {
  return (
    <div className="p-12 max-w-4xl mx-auto">
      {/* Shared Element: Title via deterministic name */}
      <h1 
        style={{ viewTransitionName: getTransitionName('hero-title', 'main') }}
        className="text-5xl font-extrabold tracking-tight mb-6"
      >
        Premium Experience
      </h1>

      <p className="text-xl text-slate-600 mb-12 max-w-2xl">
        This is Page A. We are testing how native View Transitions handle route navigation, shared elements, and staggering using the hardened integration.
      </p>

      {/* Shared Element: Image Container via deterministic name */}
      <div 
        style={{ viewTransitionName: getTransitionName('hero-image', 'main') }}
        className="w-full h-64 bg-blue-500 rounded-3xl mb-12 flex items-center justify-center text-white font-bold text-2xl shadow-xl"
      >
        Hero Image Area
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
            <h3 className="font-bold text-lg mb-2">Feature {i}</h3>
            <p className="text-slate-500 text-sm">Static content on Page A.</p>
          </div>
        ))}
      </div>

      <div className="mt-12">
        <Link
          href="/experiment/page-b"
          enableViewTransition
          variant="button"
        >
          Navigate to Page B &rarr;
        </Link>
      </div>
    </div>
  );
}
