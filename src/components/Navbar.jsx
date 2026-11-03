import React from 'react';
import { Sparkles, FileSpreadsheet, Download, SlidersHorizontal, Code2, LayoutDashboard, Cpu } from 'lucide-react';

export default function Navbar({
  activeTab,
  setActiveTab,
  onExportClick,
  onDirectExcel,
  onOpenSettings,
  modelProvider,
  modelName,
  hasApiKey
}) {
  return (
    <header className="border-b border-slate-800 bg-slate-900/90 backdrop-blur sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2">
        {/* Logo and Brand */}
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <Sparkles className="w-5 h-5 text-slate-950 font-bold" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-extrabold text-base sm:text-lg text-white tracking-tight">MeetingPulse AI</span>
              <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hidden xs:inline-block">
                PSI TPM
              </span>
            </div>
          </div>
        </div>

        {/* Center / Right Action Controls */}
        <div className="flex items-center space-x-2">
          {/* AI Engine Status Pill (Clickable Settings) */}
          <button
            onClick={onOpenSettings}
            className="px-2.5 py-1.5 rounded-lg text-xs font-medium bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700 hover:border-emerald-500/50 flex items-center space-x-1.5 transition"
            title="Click to configure AI Model and API Key"
          >
            {hasApiKey ? (
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            ) : (
              <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            )}
            <span className="hidden sm:inline font-mono text-[11px]">
              {modelProvider === 'heuristic' ? 'Local NLP' : `${modelProvider.toUpperCase()}: ${modelName}`}
            </span>
            <span className="sm:hidden font-mono text-[11px]">
              {modelProvider === 'heuristic' ? 'Local' : modelProvider.toUpperCase()}
            </span>
            <SlidersHorizontal className="w-3 h-3 text-slate-400 ml-1" />
          </button>

          {/* Quick Direct Excel Download */}
          <button
            onClick={onDirectExcel}
            className="px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-400 border border-emerald-500/30 flex items-center space-x-1.5 transition shadow-sm"
            title="Instant download multi-sheet Excel (.xlsx)"
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Export Excel</span>
            <span className="sm:hidden">.XLSX</span>
          </button>

          {/* Export All Modal (Jira CSV, Slack, MD) */}
          <button
            onClick={onExportClick}
            className="px-3 py-1.5 rounded-lg text-xs font-bold bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 flex items-center space-x-1.5 transition shadow-md shadow-emerald-500/20"
          >
            <Download className="w-3.5 h-3.5 text-slate-950" />
            <span className="hidden sm:inline">All Exports</span>
            <span className="sm:hidden">Exports</span>
          </button>

          {/* Prompt Inspector Tab Toggle */}
          <button
            onClick={() => setActiveTab(activeTab === 'workspace' ? 'prompts' : 'workspace')}
            className={`p-2 rounded-lg text-xs font-medium border transition ${
              activeTab === 'prompts'
                ? 'bg-slate-800 text-white border-slate-600'
                : 'text-slate-400 hover:text-slate-200 border-transparent hover:bg-slate-800/50'
            }`}
            title="Inspect AI System Prompt & Engineering Workflow"
          >
            {activeTab === 'prompts' ? (
              <LayoutDashboard className="w-4 h-4 text-emerald-400" />
            ) : (
              <Code2 className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
