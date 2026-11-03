import React from 'react';
import { SAMPLE_TRANSCRIPTS } from '../data/sampleTranscripts';
import { Sparkles, UploadCloud, RefreshCw, SlidersHorizontal, Cpu, FileText } from 'lucide-react';

export default function TranscriptInput({
  transcript,
  setTranscript,
  onAnalyze,
  isLoading,
  modelProvider,
  modelName,
  hasApiKey,
  onOpenSettings,
  progressStatus
}) {
  const handlePresetSelect = (key) => {
    const selected = SAMPLE_TRANSCRIPTS[key];
    if (selected) {
      setTranscript(selected.text);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result;
      if (typeof content === 'string') {
        setTranscript(content);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="bg-[#1a1c23] border border-[#2b2d38] rounded-2xl p-4 sm:p-5 shadow-xl space-y-3.5">
      {/* Top Bar: Title & Quick Scenario Chips */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-2.5 border-b border-[#2b2d38]">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-violet-400" />
          <h2 className="text-sm font-bold text-white">Meeting Transcript / Notes</h2>
        </div>

        {/* Preset Chips */}
        <div className="flex items-center flex-wrap gap-1.5">
          <span className="text-[11px] text-slate-400 font-medium">Try Scenario:</span>
          <button
            onClick={() => handlePresetSelect('psiSprint1Kickoff')}
            className="px-2.5 py-1 text-[11px] rounded-lg bg-[#131418] hover:bg-[#252834] text-slate-300 border border-[#2b2d38] hover:border-violet-500/50 hover:text-white transition font-medium"
          >
            Sprint 1 Kickoff
          </button>
          <button
            onClick={() => handlePresetSelect('psiRiskTriage')}
            className="px-2.5 py-1 text-[11px] rounded-lg bg-[#131418] hover:bg-[#252834] text-slate-300 border border-[#2b2d38] hover:border-violet-500/50 hover:text-white transition font-medium"
          >
            Risk Triage
          </button>
          <button
            onClick={() => handlePresetSelect('psiCeoScopeChange')}
            className="px-2.5 py-1 text-[11px] rounded-lg bg-[#131418] hover:bg-[#252834] text-slate-300 border border-[#2b2d38] hover:border-violet-500/50 hover:text-white transition font-medium"
          >
            CEO Scope Pivot
          </button>
        </div>
      </div>

      {/* Main Text Area */}
      <div className="relative">
        <textarea
          rows={7}
          value={transcript}
          onChange={(e) => setTranscript(e.target.value)}
          placeholder="Paste meeting transcript or unformatted notes here... (e.g. Alex: We decided to deploy Deepgram Nova-2 by Nov 12...)"
          className="w-full bg-[#0e0f12]/80 border border-[#2b2d38] rounded-xl p-3.5 text-xs sm:text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-violet-500/40 focus:border-violet-500 font-mono leading-relaxed resize-y"
        />

        <div className="flex items-center justify-between text-[11px] text-slate-500 px-1 mt-1">
          <span>{transcript.split('\n').filter(Boolean).length} lines &bull; {transcript.length} characters</span>
          <label className="cursor-pointer text-violet-400 hover:text-violet-300 flex items-center gap-1 transition">
            <UploadCloud className="w-3.5 h-3.5" />
            <span>Upload file (.txt, .md)</span>
            <input type="file" accept=".txt,.md" onChange={handleFileUpload} className="hidden" />
          </label>
        </div>
      </div>

      {/* Progress Status Bar (if loading) */}
      {isLoading && (
        <div className="p-3 bg-violet-600/10 border border-violet-500/30 rounded-xl flex items-center gap-2.5 animate-pulse text-xs text-violet-300 font-medium">
          <RefreshCw className="w-4 h-4 text-violet-400 animate-spin shrink-0" />
          <span>{progressStatus || "Analyzing meeting notes & generating deliverables..."}</span>
        </div>
      )}

      {/* Action Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
        {/* Quick Engine Indicator & Settings trigger */}
        <button
          type="button"
          onClick={onOpenSettings}
          className="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1.5 transition"
        >
          {hasApiKey ? (
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          ) : (
            <Cpu className="w-3.5 h-3.5 text-violet-400" />
          )}
          <span>Engine: <strong className="text-slate-300 font-semibold">{modelProvider === 'heuristic' ? 'Local NLP' : `${modelProvider.toUpperCase()} (${modelName})`}</strong></span>
          <span className="text-[10px] text-violet-400 hover:text-violet-300 underline ml-1">Change / API Key</span>
        </button>

        {/* Primary CTA */}
        <button
          onClick={onAnalyze}
          disabled={isLoading || !transcript.trim()}
          className="w-full sm:w-auto px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 hover:from-violet-500 hover:via-purple-500 hover:to-fuchsia-500 text-white shadow-lg shadow-purple-500/25 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin text-white" />
              <span>Processing...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 text-white" />
              <span>Generate Deliverables</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
