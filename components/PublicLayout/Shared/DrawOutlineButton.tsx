const DrawOutlineButton = ({ children }: { children: React.ReactNode }) => (
  <span className="group relative inline-flex items-center justify-center px-4 py-2 font-medium text-slate-100 transition-colors duration-300 hover:text-indigo-300 overflow-hidden">
    {children}
    {/* Outline spans scoped to this group only */}
    <span className="absolute left-0 top-0 h-0.5 w-0 bg-indigo-300 transition-all duration-100 group-hover:w-full" />
    <span className="absolute right-0 top-0 h-0 w-0.5 bg-indigo-300 transition-all delay-100 duration-100 group-hover:h-full" />
    <span className="absolute bottom-0 right-0 h-0.5 w-0 bg-indigo-300 transition-all delay-200 duration-100 group-hover:w-full" />
    <span className="absolute bottom-0 left-0 h-0 w-0.5 bg-indigo-300 transition-all delay-300 duration-100 group-hover:h-full" />
  </span>
);

export default DrawOutlineButton;
