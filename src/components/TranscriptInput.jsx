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
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xl space-y-3.5">
      {/* Top Bar: Title & Quick Scenario Chips */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-2.5 border-b border-slate-800/80">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-emerald-400" />
          <h2 className="text-sm font-bold text-white">Meeting Transcript / Notes</h2>
        </div>

        {/* Preset Chips */}
        <div className="flex items-center flex-wrap gap-1.5">
          <span className="text-[11px] text-slate-500 font-medium">Try PSI Demo:</span>
          <button
            onClick={() => handlePresetSelect('psiSprint1Kickoff')}
            className="px-2.5 py-1 text-[11px] rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 hover:border-emerald-500/50 transition font-medium"
          >
            Sprint 1 Kickoff
          </button>
          <button
            onClick={() => handlePresetSelect('psiRiskTriage')}
            className="px-2.5 py-1 text-[11px] rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 hover:border-emerald-500/50 transition font-medium"
          >
            Risk Triage
          </button>
          <button
            onClick={() => handlePresetSelect('psiCeoScopeChange')}
            className="px-2.5 py-1 text-[11px] rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 hover:border-emerald-500/50 transition font-medium"
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
          className="w-full bg-slate-950/70 border border-slate-800/80 rounded-xl p-3.5 text-xs sm:text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 font-mono leading-relaxed resize-y"
        />

        <div className="flex items-center justify-between text-[11px] text-slate-500 px-1 mt-1">
          <span>{transcript.split('\n').filter(Boolean).length} lines &bull; {transcript.length} characters</span>
          <label className="cursor-pointer text-emerald-400 hover:text-emerald-300 flex items-center gap-1 transition">
            <UploadCloud className="w-3.5 h-3.5" />
            <span>Upload file (.txt, .md)</span>
            <input type="file" accept=".txt,.md" onChange={handleFileUpload} className="hidden" />
          </label>
        </div>
      </div>

      {/* Progress Status Bar (if loading) */}
      {isLoading && (
        <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl flex items-center gap-2.5 animate-pulse text-xs text-emerald-300 font-medium">
          <RefreshCw className="w-4 h-4 text-emerald-400 animate-spin shrink-0" />
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
            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
          )}
          <span>Engine: <strong className="text-slate-300 font-semibold">{modelProvider === 'heuristic' ? 'Local NLP' : `${modelProvider.toUpperCase()} (${modelName})`}</strong></span>
          <span className="text-[10px] text-emerald-400 underline ml-1">Change / API Key</span>
        </button>

        {/* Primary CTA */}
        <button
          onClick={onAnalyze}
          disabled={isLoading || !transcript.trim()}
          className="w-full sm:w-auto px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 shadow-lg shadow-emerald-500/20 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Processing...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 text-slate-950" />
              <span>Generate Meeting Deliverables</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
