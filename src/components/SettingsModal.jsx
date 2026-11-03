import React, { useState, useEffect } from 'react';
import { X, Key, ShieldCheck, CheckCircle2, Eye, EyeOff, Sparkles, Cpu } from 'lucide-react';

export default function SettingsModal({
  isOpen,
  onClose,
  apiKey,
  setApiKey,
  modelProvider,
  setModelProvider,
  modelName,
  setModelName
}) {
  if (!isOpen) return null;

  const [showKey, setShowKey] = useState(false);

  const handleProviderSelect = (provider) => {
    setModelProvider(provider);
    localStorage.setItem('meetingpulse_llm_provider', provider);
    if (provider === 'gemini') setModelName('gemini-1.5-flash');
    else if (provider === 'openai') setModelName('gpt-4o-mini');
    else if (provider === 'groq') setModelName('llama-3.3-70b-versatile');
  };

  const handleKeySave = (val) => {
    setApiKey(val);
    localStorage.setItem('meetingpulse_llm_api_key', val);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Key className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-white">AI Engine & API Settings</h3>
              <p className="text-[11px] text-slate-400">Configure real-time LLM inference or offline engine</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-4">
          {/* Provider Selection */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Choose AI Provider:</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleProviderSelect('gemini')}
                className={`p-3 rounded-xl border text-left transition flex flex-col justify-between ${
                  modelProvider === 'gemini'
                    ? 'bg-emerald-500/10 border-emerald-500 text-white'
                    : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="font-bold text-xs">Google Gemini</span>
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                </div>
                <span className="text-[10px] text-slate-400 mt-1">Recommended &bull; Fast</span>
              </button>

              <button
                type="button"
                onClick={() => handleProviderSelect('heuristic')}
                className={`p-3 rounded-xl border text-left transition flex flex-col justify-between ${
                  modelProvider === 'heuristic'
                    ? 'bg-emerald-500/10 border-emerald-500 text-white'
                    : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="font-bold text-xs">Offline Local NLP</span>
                  <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                </div>
                <span className="text-[10px] text-slate-400 mt-1">Zero Key &bull; Instant</span>
              </button>

              <button
                type="button"
                onClick={() => handleProviderSelect('openai')}
                className={`p-3 rounded-xl border text-left transition flex flex-col justify-between ${
                  modelProvider === 'openai'
                    ? 'bg-emerald-500/10 border-emerald-500 text-white'
                    : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="font-bold text-xs">OpenAI</span>
                  <span className="text-[10px] text-slate-400">GPT-4o</span>
                </div>
                <span className="text-[10px] text-slate-400 mt-1">API Key required</span>
              </button>

              <button
                type="button"
                onClick={() => handleProviderSelect('groq')}
                className={`p-3 rounded-xl border text-left transition flex flex-col justify-between ${
                  modelProvider === 'groq'
                    ? 'bg-emerald-500/10 border-emerald-500 text-white'
                    : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="font-bold text-xs">Groq Cloud</span>
                  <span className="text-[10px] text-slate-400">Llama 3.3</span>
                </div>
                <span className="text-[10px] text-slate-400 mt-1">Sub-second inference</span>
              </button>
            </div>
          </div>

          {/* Model Specific Selection */}
          {modelProvider === 'gemini' && (
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Gemini Model:</label>
              <select
                value={modelName}
                onChange={(e) => setModelName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="gemini-1.5-flash">gemini-1.5-flash (Fast & Deterministic)</option>
                <option value="gemini-1.5-pro">gemini-1.5-pro (In-depth analysis)</option>
                <option value="gemini-2.0-flash">gemini-2.0-flash (Latest Preview)</option>
              </select>
            </div>
          )}

          {/* API Key Input */}
          {modelProvider !== 'heuristic' && (
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-300">
                  {modelProvider.toUpperCase()} API Key:
                </label>
                {apiKey.trim() && (
                  <span className="text-[10px] text-emerald-400 font-medium flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Key saved locally
                  </span>
                )}
              </div>
              <div className="relative">
                <input
                  type={showKey ? "text" : "password"}
                  placeholder={`Paste your ${modelProvider.toUpperCase()} key here...`}
                  value={apiKey}
                  onChange={(e) => handleKeySave(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-3 pr-10 py-2 text-xs text-white placeholder-slate-600 font-mono focus:outline-none focus:border-emerald-500"
                />
                <button
                  type="button"
                  onClick={() => setShowKey(!showKey)}
                  className="absolute right-2.5 top-2.5 text-slate-400 hover:text-white"
                >
                  {showKey ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          )}

          <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-xl text-[11px] text-slate-400 flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span>
              Your API key is stored strictly in your browser's private local storage. If no key is entered, MeetingPulse AI seamlessly uses its high-accuracy local semantic parser.
            </span>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 border-t border-slate-800 bg-slate-950/60 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
