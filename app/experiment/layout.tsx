import './experiment.css';

export default function ExperimentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <header className="p-6 border-b border-slate-200 flex items-center justify-between">
        <h1 className="font-bold tracking-tight">Website Engine Experiment</h1>
      </header>
      <main>
        {children}
      </main>
    </div>
  );
}
