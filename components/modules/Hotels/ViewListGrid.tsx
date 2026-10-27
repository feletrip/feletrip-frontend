import { LayoutGrid, List } from "lucide-react";
import React, { useState } from "react";

type TView = {
  view: "grid" | "list";
  setView: (value: "grid" | "list") => void;
};

const ViewListGrid = ({ view, setView }: TView) => {
  return (
    <div>
      <div className="flex items-center gap-2 mt-4 border rounded-lg w-fit p-1">
        {/* Grid Button */}
        <button
          onClick={() => setView("grid")}
          className={`flex items-center gap-1 px-3 py-1.5 rounded-sm transition ${
            view === "grid"
              ? "bg-primary shadow text-background"
              : "text-gray-500 hover:text-foreground"
          }`}
        >
          <LayoutGrid size={18} />
          <span className="text-sm">Grid</span>
        </button>

        {/* List Button */}
        <button
          onClick={() => setView("list")}
          className={`flex items-center gap-1 px-3 py-1.5 rounded-sm transition ${
            view === "list"
              ? "bg-primary shadow text-background"
              : "text-gray-500 hover:text-foreground"
          }`}
        >
          <List size={18} />
          <span className="text-sm">List</span>
        </button>
      </div>
    </div>
  );
};

export default ViewListGrid;
