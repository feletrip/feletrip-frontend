import { FaSearch } from "react-icons/fa";


interface BlogSearchProps {
  query: string;
  setQuery: (query: string) => void;
  tag: string;
  setTag: (tag: string) => void;
}

export default function BlogSearch({
  query,
  setQuery,
}: BlogSearchProps) {
  return (
    <div className="space-y-3 mt-8">
      {/* Search Input */}
         <div className="flex items-center border border-primary/60 bg-background overflow-hidden rounded-2xl my-4">
          <input
            type="text"
            placeholder="Search Here"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 px-3 py-2 text-sm tracking-wide text-gray-600 placeholder-gray-300 outline-none"
          />
          <button className="bg-primary hover:bg-primary/90 cursor-pointer px-4 py-3 transition-colors duration-200 flex items-center justify-content">
            <FaSearch className="text-white text-sm" />
          </button>
        </div>
      </div>
  );
}