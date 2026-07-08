export function Footer() {
  return (
    <footer className="border-t border-border-subtle py-8 bg-zinc-950/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4 font-mono text-[10px] text-text-muted">
        <div>
          <p>Designed and developed by <span className="text-text-secondary font-semibold">Veera Bhadhra Rao</span>.</p>
        </div>
        <div className="flex flex-wrap gap-x-2 gap-y-1 justify-center md:justify-end items-center">
          <span>Built using:</span>
          <span className="text-text-secondary">Next.js</span>
          <span>•</span>
          <span className="text-text-secondary">TypeScript</span>
          <span>•</span>
          <span className="text-text-secondary">Tailwind CSS</span>
          <span>•</span>
          <span className="text-text-secondary">Framer Motion</span>
          <span>•</span>
          <span className="text-text-secondary">Three.js</span>
          <span>•</span>
          <span className="text-text-secondary">Python</span>
          <span>•</span>
          <span className="text-text-secondary">Operator v1.0</span>
        </div>
      </div>
    </footer>
  );
}
