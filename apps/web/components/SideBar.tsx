function Sidebar({
  open,
  onClose,
  activeSection,
  onSelect,
}: {
  open: boolean;
  onClose: () => void;
  activeSection: string;
  onSelect: (id: string) => void;
}) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    'getting-started': true,
    payments: true,
    analytics: false,
    webhooks: false,
    errors: false,
  });
 
  const toggle = (id: string) =>
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
 
  const content = (
    <div className="flex flex-col h-full">
      {/* Sidebar header */}
      <div
        className="px-5 py-5 flex items-center justify-between"
        style={{ borderBottom: '1px solid rgba(250,250,250,0.06)' }}
      >
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4" style={{ color: '#FF5C00' }} />
          <span
            className="text-sm font-bold"
            style={{ fontFamily: 'Syne, sans-serif', letterSpacing: '-0.02em' }}
          >
            Docs
          </span>
        </div>
        <button
          onClick={onClose}
          className="lg:hidden p-1 rounded transition-colors"
          style={{ color: 'rgba(250,250,250,0.4)' }}
        >
          <X className="w-4 h-4" />
        </button>
      </div>
 
      {/* Search */}
      <div className="px-4 py-3" style={{ borderBottom: '1px solid rgba(250,250,250,0.06)' }}>
        <div
          className="flex items-center gap-2 px-3 py-2 rounded-lg"
          style={{ background: 'rgba(250,250,250,0.04)', border: '1px solid rgba(250,250,250,0.07)' }}
        >
          <Search className="w-3.5 h-3.5" style={{ color: 'rgba(250,250,250,0.25)' }} />
          <input
            placeholder="Search docs..."
            className="bg-transparent text-xs outline-none flex-1 placeholder:text-white/25"
            style={{ fontFamily: 'DM Mono, monospace', color: 'rgba(250,250,250,0.6)' }}
          />
          <kbd
            className="text-[10px] px-1.5 py-0.5 rounded"
            style={{
              background: 'rgba(250,250,250,0.06)',
              color: 'rgba(250,250,250,0.2)',
              fontFamily: 'DM Mono, monospace',
              border: '1px solid rgba(250,250,250,0.08)',
            }}
          >
            ⌘K
          </kbd>
        </div>
      </div>
 
      {/* Nav tree */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5">
        {sidebarSections.map((section) => (
          <div key={section.id}>
            {/* Section toggle */}
            <button
              onClick={() => toggle(section.id)}
              className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-semibold transition-colors duration-150 group"
              style={{
                fontFamily: 'Syne, sans-serif',
                color: expanded[section.id] ? 'rgba(250,250,250,0.8)' : 'rgba(250,250,250,0.4)',
              }}
            >
              <div className="flex items-center gap-2.5">
                <section.icon className="w-4 h-4 shrink-0" style={{ color: expanded[section.id] ? '#FF5C00' : 'rgba(250,250,250,0.3)' }} />
                {section.label}
              </div>
              <ChevronDown
                className="w-3.5 h-3.5 transition-transform duration-200"
                style={{
                  transform: expanded[section.id] ? 'rotate(0deg)' : 'rotate(-90deg)',
                  color: 'rgba(250,250,250,0.2)',
                }}
              />
            </button>
 
            {/* Children */}
            <AnimatePresence initial={false}>
              {expanded[section.id] && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <div className="ml-6 border-l pl-3 py-1 space-y-0.5" style={{ borderColor: 'rgba(250,250,250,0.07)' }}>
                    {section.children.map((child) => {
                      const isActive = activeSection === child.id;
                      return (
                        <button
                          key={child.id}
                          onClick={() => { onSelect(child.id); onClose(); }}
                          className="w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-150"
                          style={{
                            fontFamily: 'Syne, sans-serif',
                            background: isActive ? 'rgba(255,92,0,0.1)' : 'transparent',
                            color: isActive ? '#FF5C00' : 'rgba(250,250,250,0.4)',
                            borderLeft: isActive ? '2px solid #FF5C00' : '2px solid transparent',
                          }}
                        >
                          {child.label}
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </nav>
 
      {/* Footer */}
      <div className="px-4 py-4 space-y-2" style={{ borderTop: '1px solid rgba(250,250,250,0.06)' }}>
        <a
          href="#"
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors duration-150 w-full"
          style={{ color: 'rgba(250,250,250,0.35)', fontFamily: 'Syne, sans-serif' }}
        >
          <ExternalLink className="w-3.5 h-3.5" />
          Changelog
        </a>
        <a
          href="#"
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors duration-150 w-full"
          style={{ color: 'rgba(250,250,250,0.35)', fontFamily: 'Syne, sans-serif' }}
        >
          <Code2 className="w-3.5 h-3.5" />
          SDK Reference
        </a>
      </div>
    </div>
  );
 
  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className="hidden lg:flex flex-col sticky top-16 h-[calc(100vh-64px)] w-64 shrink-0"
        style={{ background: '#080808', borderRight: '1px solid rgba(250,250,250,0.06)' }}
      >
        {content}
      </aside>
 
      {/* Mobile sidebar drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 z-40 lg:hidden"
              style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)' }}
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-0 left-0 bottom-0 z-50 w-72 flex flex-col lg:hidden"
              style={{ background: '#080808', borderRight: '1px solid rgba(250,250,250,0.08)' }}
            >
              {content}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
