import React, { useState } from 'react';
import { SAMPLE_TRANSCRIPTS } from '../data/sampleTranscripts';
import { Play, Sparkles, UploadCloud, RefreshCw, Key, ChevronDown, ChevronUp, FileCode } from 'lucide-react';

export default function TranscriptInput({
  transcript,
  setTranscript,
  onAnalyze,
  isLoading,
  apiKey,
  setApiKey
}) {
  const [showApiSettings, setShowApiSettings] = useState(false);

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
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-800">
        <div>
          <h2 className="text-base font-semibold text-white flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
            Raw Meeting Notes / Transcript Input
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Paste unformatted meeting transcripts, audio logs, or load pre-built PSI scenario templates.
          </p>
        </div>

        {/* Preload Scenario Buttons */}
        <div className="flex items-center flex-wrap gap-1.5">
          <span className="text-xs text-slate-400 font-medium mr-1">Load PSI Scenarios:</span>
          <button
            onClick={() => handlePresetSelect('psiSprint1Kickoff')}
            className="px-2.5 py-1 text-xs rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 hover:border-emerald-500/50 transition"
          >
            Sprint 1 Kickoff (Arch)
          </button>
          <button
            onClick={() => handlePresetSelect('psiRiskTriage')}
            className="px-2.5 py-1 text-xs rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 hover:border-emerald-500/50 transition"
          >
            Mid-Sprint Risk Triage
          </button>
          <button
            onClick={() => handlePresetSelect('psiCeoScopeChange')}
            className="px-2.5 py-1 text-xs rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 hover:border-emerald-500/50 transition"
          >
            CEO Scope Change
          </button>
        </div>
      </div>

      {/* Textarea */}
      <div className="relative">
        <textarea
          rows={10}
          value={transcript}
          onChange={(e) => setTranscript(e.target.value)}
          placeholder="Paste meeting transcript or raw notes here... Example:
[00:01:15] Alex (Backend): We need to implement the Google Calendar OAuth flow by Nov 12.
[00:02:30] Priya (PM): Decision: We will use Deepgram Nova-2 for real-time speech transcription."
          className="w-full bg-slate-950/70 border border-slate-800 rounded-xl p-3.5 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 font-mono leading-relaxed resize-y"
        />

        <div className="flex items-center justify-between text-xs text-slate-500 px-1 mt-1.5">
          <span>{transcript.split('\n').filter(Boolean).length} lines &bull; {transcript.length} characters</span>
          <label className="cursor-pointer text-emerald-400 hover:text-emerald-300 flex items-center gap-1 transition">
            <UploadCloud className="w-3.5 h-3.5" />
            <span>Upload .txt or .md</span>
            <input type="file" accept=".txt,.md" onChange={handleFileUpload} className="hidden" />
          </label>
        </div>
      </div>

      {/* Action Bar */}
      <div className="mt-4 pt-3 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
        <button
          onClick={() => setShowApiSettings(!showApiSettings)}
          className="text-xs text-slate-400 hover:text-slate-300 flex items-center gap-1.5 transition"
        >
          <Key className="w-3.5 h-3.5 text-amber-400" />
          <span>API Configuration (Optional live LLM)</span>
          {showApiSettings ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>

        <button
          onClick={onAnalyze}
          disabled={isLoading || !transcript.trim()}
          className="w-full sm:w-auto px-6 py-2.5 rounded-xl font-semibold text-sm bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 shadow-lg shadow-emerald-500/25 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Analyzing Notes & Extracting Actions...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              <span>Extract Decisions, Actions & Jira Tickets</span>
            </>
          )}
        </button>
      </div>

      {/* Optional API Settings Drawer */}
      {showApiSettings && (
        <div className="mt-3 p-3.5 bg-slate-950/80 border border-slate-800 rounded-xl text-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-slate-300">Bring Your Own Key (Optional):</span>
            <span className="text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
              Offline NLP Engine Active by Default (Zero Setup Needed)
            </span>
          </div>
          <p className="text-slate-400">
            If left blank, MeetingPulse AI uses its high-accuracy deterministic semantic parsing engine. You may optionally enter a Gemini API Key to run dynamic LLM inference.
          </p>
          <input
            type="password"
            placeholder="AIzaSy... (Gemini API Key)"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
        </div>
      )}
    </div>
  );
}
