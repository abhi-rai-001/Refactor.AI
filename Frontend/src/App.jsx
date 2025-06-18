import { useState, useEffect } from "react";
import "prismjs/themes/prism-okaidia.css";
import prism from "prismjs";
import Editor from "react-simple-code-editor";
import Markdown from "react-markdown";
import axios from "axios";
import { Sparkles, Play, Copy, Zap } from "lucide-react";
import Header from "./components/Header";

const App = () => {
  const [userCode, setUserCode] = useState(`function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(10));`);

  useEffect(() => {
    prism.highlightAll();
  });

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [review, setReview] = useState("");

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    const response = await axios.post("http://localhost:3000/ai/get-review", {
      code: userCode,
    });
    setReview(response.data);
    setIsAnalyzing(false);
  };
  const handleCopy = () => {
    navigator.clipboard.writeText(review);
    alert("Review copied to clipboard!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Header />

      <main className="flex gap-6 p-6 h-[calc(100vh-80px)]">
        {/* Left Panel*/}
        <div className="flex-1 flex flex-col bg-slate-900/60 backdrop-blur-sm rounded-2xl border border-slate-700/50 shadow-2xl overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 bg-slate-800/50 border-b border-slate-700/50">
            <div className="flex items-center gap-3">
              <div className="flex gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <span className="text-slate-300 font-medium ml-3">Code</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg text-white font-medium transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/25"
              >
                {isAnalyzing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4" />
                    Analyze Code
                  </>
                )}
              </button>
              <button className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors">
                <Play className="w-4 h-4 text-slate-400" />
              </button>
            </div>
          </div>

          {/* Code Editor */}
          <div className="flex-1 relative">
            <Editor
              value={userCode}
              onValueChange={setUserCode}
              highlight={(code) =>
                prism.highlight(code, prism.languages.javascript, "javascript")
              }
              padding={16}
              className="h-full bg-slate-800/50 text-slate-200 font-mono text-sm"
              style={{
                overflow: "auto",
                height: "100%",
                borderRadius: "0 0 16px 16px",
              }}
            />
          </div>

          <div className="flex items-center justify-between px-6 py-3 bg-gray-900/30 border-t border-slate-700/50">
            <div className="flex items-center gap-4 text-xs text-slate-400">
              <span>Lines: {userCode.split("\n").length}</span>
              <span>Characters: {userCode.length}</span>
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="flex-1 flex flex-col bg-gradient-to-r from-blue-500/10 to-cyan-500/10  border-blue-500/20 backdrop-blur-sm rounded-2xl border shadow-2xl overflow-y-auto">
          <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-purple-900/50 to-blue-900/50 border-b border-slate-700/50">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-100">AI Code Review</h3>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors">
                <Copy className="w-4 h-4 text-slate-400" onClick={handleCopy} />
              </button>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
          {isAnalyzing ? (
            <div className="flex items-center justify-center h-full">
              <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="Ai-editor p-5 text-white">
              <Markdown>{review}</Markdown>
            </div>
          )}
          </div>
          <div className="flex items-center justify-between px-6 py-3 bg-gray-900/30 mt-2 border-t border-slate-700/50">
            <div className="flex items-center gap-4 text-xs text-slate-400">
              <span>Lines: {review.split("\n").length}</span>
              <span>Characters: {review.length}</span>
            </div>
          </div>{" "}
        </div>
      </main>
    </div>
  );
};

export default App;
