 import { Code2} from "lucide-react";



const Header = () => (
  <header className="flex items-center justify-between px-8 py-4 bg-slate-900/50 backdrop-blur-sm border-b border-slate-700/50">
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-black rounded-lg flex items-center justify-center">
        <Code2 className="w-6 h-6 text-white" />
      </div>
      <div>
        <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Refactr AI
        </h1>
        <p className="text-xs text-slate-400">Intelligent Code Review</p>
      </div>
    </div>
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/10 text-green-400 rounded-full text-sm">
        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
        AI Ready
      </div>
    </div>
  </header>
);

export default Header
