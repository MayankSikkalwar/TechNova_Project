import { Activity, Plus, Search } from "lucide-react";
import { useState } from "react";

/**
 * Left market watch panel for stock selection.
 * Props:
 * - stocks: list of available ticker symbols.
 * - selectedStock: active ticker from App-level state.
 * - onStockChange: callback to update active ticker in App.
 * - onAddStock: callback to add a new ticker to the list.
 */
export default function Sidebar({ stocks, selectedStock, onStockChange, onAddStock }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleAdd = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onAddStock(searchTerm.trim().toUpperCase());
      setSearchTerm("");
    }
  };

  return (
    <aside className="flex h-full w-full flex-col bg-[#0d121b] lg:border-r lg:border-slate-800">
      <div className="hidden h-10 items-center gap-2 border-b border-slate-800 px-3 lg:flex">
        <Activity className="h-3.5 w-3.5 text-slate-400" />
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Watchlist</p>
      </div>

      {/* Search Input */}
      <div className="p-3 border-b border-slate-800">
        <form onSubmit={handleAdd} className="relative flex items-center">
          <input
            type="text"
            placeholder="Search Ticker or Name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-sm py-1.5 pl-8 pr-10 text-xs text-slate-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition-all placeholder:text-slate-600"
          />
          <Search className="absolute left-2.5 h-3.5 w-3.5 text-slate-500" />
          <button
            type="submit"
            className="absolute right-1 p-1 hover:bg-slate-800 rounded text-slate-400 hover:text-blue-400 transition"
          >
            <Plus className="h-3.5 w-3.5" />
          </button>
        </form>
      </div>

      <div className="flex gap-2 overflow-x-auto px-2 py-2 lg:flex-1 lg:flex-col lg:gap-0 lg:overflow-y-auto lg:px-0 lg:py-1 scrollbar-thin scrollbar-thumb-slate-800">
        {stocks.map((stock) => {
          const isActive = stock === selectedStock;
          return (
            <button
              key={stock}
              onClick={() => onStockChange(stock)}
              className={`shrink-0 rounded-sm border border-slate-700 px-3 py-2 text-left text-xs transition lg:flex lg:w-full lg:items-center lg:justify-between lg:rounded-none lg:border-0 ${isActive
                ? "bg-slate-800/40 text-white lg:border-l-2 lg:border-blue-500 lg:bg-slate-800/30"
                : "text-slate-400 hover:bg-slate-800/50 hover:text-white lg:border-l-2 lg:border-transparent"
                }`}
            >
              <span>{stock}</span>
              <span className={`ml-2 hidden lg:inline ${isActive ? "text-emerald-400" : "text-slate-500"}`}>
                {stock.endsWith(".NS") ? "NSE" : "NASDAQ"}
              </span>
            </button>
          );
        })}
      </div>
    </aside>
  );
}

