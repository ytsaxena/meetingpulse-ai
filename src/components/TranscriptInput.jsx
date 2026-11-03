import React, { useState, useEffect } from 'react';
import { SAMPLE_TRANSCRIPTS } from '../data/sampleTranscripts';
import { Play, Sparkles, UploadCloud, RefreshCw, Key, ChevronDown, ChevronUp, Cpu, Eye, EyeOff, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function TranscriptInput({
  transcript,
  setTranscript,
  onAnalyze,
  isLoading,
  apiKey,
  setApiKey,
  modelProvider,
  setModelProvider,
  modelName,
  setModelName,
  progressStatus
}) {
  const [showApiSettings, setShowApiSettings] = useState(false);
  const [showKeyText, setShowKeyText] = useState(false);

  // Load API key from localStorage if present
  useEffect(() => {
    const savedKey = localStorage.getItem('meetingpulse_llm_api_key');
    const savedProvider = localStorage.getItem('meetingpulse_llm_provider');
    if (savedKey && !apiKey) setApiKey(savedKey);
    if (savedProvider && !modelProvider) setModelProvider(savedProvider);
  }, []);

  const handleKeyChange = (val) => {
    setApiKey(val);
    localStorage.setItem('meetingpulse_llm_api_key', val);
  };

  const handleProviderChange = (val) => {
    setModelProvider(val);
    localStorage.setItem('meetingpulse_llm_provider', val);
    if (val === 'gemini') setModelName('gemini-1.5-flash');
    else if (val === 'openai') setModelName('gpt-4o-mini');
    else if (val === 'groq') setModelName('llama-3.3-70b-versatile');
  };

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
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
      {/* Header and Presets */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Meeting Transcript & LLM Input
            </h2>
            {apiKey.trim() ? (
              <span className="px-2 py-0.5 text-[11px] font-semibold rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-emerald-400" />
                Live {modelProvider.toUpperCase()} Active
              </span>
            ) : (
              <span className="px-2 py-0.5 text-[11px] font-semibold rounded-full bg-slate-800 text-slate-300 border border-slate-700 flex items-center gap-1">
                <Cpu className="w-3 h-3 text-cyan-400" />
                Local NLP Active
              </span>
            )}
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Paste raw audio transcripts or select a PSI take-home scenario template.
          </p>
        </div>

        {/* Preload Scenario Buttons */}
        <div className="flex items-center flex-wrap gap-1.5">
          <span className="text-xs text-slate-400 font-medium mr-1">Load PSI Scenarios:</span>
          <button
            onClick={() => handlePresetSelect('psiSprint1Kickoff')}
            className="px-2.5 py-1 text-xs rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 hover:border-emerald-500/50 transition font-medium"
          >
            Sprint 1 Kickoff (Arch)
          </button>
          <button
            onClick={() => handlePresetSelect('psiRiskTriage')}
            className="px-2.5 py-1 text-xs rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 hover:border-emerald-500/50 transition font-medium"
          >
            Mid-Sprint Risk Triage
          </button>
          <button
            onClick={() => handlePresetSelect('psiCeoScopeChange')}
            className="px-2.5 py-1 text-xs rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 hover:border-emerald-500/50 transition font-medium"
          >
            CEO Scope Change
          </button>
        </div>
      </div>

      {/* Real-time LLM Configuration Panel */}
      <div className="p-3.5 bg-slate-950/80 border border-slate-800 rounded-xl space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Key className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-bold text-slate-200">LLM Engine Configuration:</span>
          </div>

          <div className="flex items-center gap-2">
            {/* Provider Selector */}
            <select
              value={modelProvider}
              onChange={(e) => handleProviderChange(e.target.value)}
              className="bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1 text-xs text-white focus:outline-none focus:border-emerald-500 font-medium"
            >
              <option value="gemini">Google Gemini (Recommended)</option>
              <option value="openai">OpenAI (GPT-4o)</option>
              <option value="groq">Groq (Llama 3.3 70B)</option>
              <option value="heuristic">Offline Local NLP Engine</option>
            </select>

            {/* Model Name Selector */}
            {modelProvider === 'gemini' && (
              <select
                value={modelName}
                onChange={(e) => setModelName(e.target.value)}
                className="bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1 text-xs text-slate-300 focus:outline-none focus:border-emerald-500"
              >
                <option value="gemini-1.5-flash">gemini-1.5-flash (Fast)</option>
                <option value="gemini-1.5-pro">gemini-1.5-pro (Deep reasoning)</option>
                <option value="gemini-2.0-flash">gemini-2.0-flash</option>
              </select>
            )}

            {modelProvider === 'openai' && (
              <select
                value={modelName}
                onChange={(e) => setModelName(e.target.value)}
                className="bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1 text-xs text-slate-300 focus:outline-none focus:border-emerald-500"
              >
                <option value="gpt-4o-mini">gpt-4o-mini</option>
                <option value="gpt-4o">gpt-4o</option>
              </select>
            )}

            {modelProvider === 'groq' && (
              <select
                value={modelName}
                onChange={(e) => setModelName(e.target.value)}
                className="bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1 text-xs text-slate-300 focus:outline-none focus:border-emerald-500"
              >
                <option value="llama-3.3-70b-versatile">llama-3.3-70b-versatile</option>
                <option value="llama-3.1-8b-instant">llama-3.1-8b-instant</option>
              </select>
            )}
          </div>
        </div>

        {/* API Key Input */}
        {modelProvider !== 'heuristic' && (
          <div className="relative">
            <input
              type={showKeyText ? "text" : "password"}
              placeholder={`Paste your ${modelProvider.toUpperCase()} API Key for live real-time analysis (Optional - falls back to Local NLP if empty)`}
              value={apiKey}
              onChange={(e) => handleKeyChange(e.target.value)}
              className="w-full bg-slate-900/90 border border-slate-800 rounded-lg pl-3 pr-10 py-2 text-xs text-slate-200 placeholder-slate-500 font-mono focus:outline-none focus:border-emerald-500"
            />
            <button
              type="button"
              onClick={() => setShowKeyText(!showKeyText)}
              className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-200 transition"
              title={showKeyText ? "Hide key" : "Show key"}
            >
              {showKeyText ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            </button>
          </div>
        )}

        <div className="flex items-center justify-between text-[11px] text-slate-400">
          <span className="flex items-center gap-1 text-slate-400">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            Keys are stored strictly in your local browser storage; never sent to third-party tracking.
          </span>
          {apiKey.trim() ? (
            <span className="text-emerald-400 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Real-time API ready
            </span>
          ) : (
            <span className="text-cyan-400">
              Zero-setup local engine active
            </span>
          )}
        </div>
      </div>

      {/* Textarea */}
      <div className="relative">
        <textarea
          rows={9}
          value={transcript}
          onChange={(e) => setTranscript(e.target.value)}
          placeholder="Paste meeting transcript or raw notes here..."
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

      {/* Progress Status Bar (if loading) */}
      {isLoading && (
        <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl flex items-center gap-3 animate-pulse">
          <RefreshCw className="w-4 h-4 text-emerald-400 animate-spin shrink-0" />
          <span className="text-xs text-emerald-300 font-medium">
            {progressStatus || "Analyzing transcript & generating real-time deliverables..."}
          </span>
        </div>
      )}

      {/* CTA Button */}
      <div className="pt-2 flex justify-end">
        <button
          onClick={onAnalyze}
          disabled={isLoading || !transcript.trim()}
          className="w-full sm:w-auto px-7 py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 shadow-lg shadow-emerald-500/25 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Running {modelProvider.toUpperCase()} Inference...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 text-slate-950" />
              <span>{apiKey.trim() ? `Run Real-Time ${modelProvider.toUpperCase()} Extraction` : 'Extract Decisions, Actions & Jira Tickets'}</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
