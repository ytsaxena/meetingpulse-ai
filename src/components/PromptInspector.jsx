import React, { useState } from 'react';
import { Terminal, Copy, Check, Sparkles, Layers, Sliders, ShieldCheck } from 'lucide-react';

export default function PromptInspector() {
  const [copiedPrompt, setCopiedPrompt] = useState(false);

  const promptText = `You are an elite Technical Project Manager AI Assistant for PanScience Innovations (PSI).
Your responsibility is to analyze raw meeting transcripts and extract high-precision, actionable technical outputs.

Extraction Rules & Behavioral Guardrails:
1. DECISIONS: Extract only firm agreements, architectural choices, and scope boundaries. Include the rationale and impacted engineering teams.
2. ACTION ITEMS: Every task must have:
   - Specific action-oriented verb (e.g. "Implement", "Benchmark", "Deploy")
   - Clear individual Owner and Domain role
   - Priority sizing: P0 (Blocker/Critical path), P1 (High/Must have), P2 (Medium/Should have)
   - Domain categorization: Backend, AI/ML, Frontend, QA, DevOps, or TPM
   - Concrete Due Date or target milestone sprint
   - Jira-compatible summary format
3. RISKS & DEPENDENCIES: Surface any technical debt, third-party API latency (e.g., Google OAuth approvals, AWS GPU quotas), or resource bottlenecks with pragmatic mitigations.
4. STRICT SCHEMA: Output ONLY valid JSON adhering strictly to the provided TypeScript interface. No markdown wrapping or extra commentary.`;

  const copyPrompt = () => {
    navigator.clipboard.writeText(promptText);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Overview Card */}
      <div className="bg-[#1a1c23] border border-[#2b2d38] rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-violet-600/15 border border-violet-500/30 flex items-center justify-center text-violet-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">AI Engineering & Prompt Architecture</h2>
              <p className="text-xs text-slate-400">
                Detailed TPM prompt engineering workflow, structured JSON schemas, and deterministic fallbacks.
              </p>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full bg-violet-600/15 text-violet-300 border border-violet-500/30 text-xs font-semibold">
            Zero Hallucination Guardrails
          </span>
        </div>

        {/* Workflow Diagram */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 pt-2">
          <div className="p-3.5 bg-[#131418] border border-[#2b2d38] rounded-xl space-y-1">
            <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Step 1</div>
            <div className="text-xs font-bold text-white">Input Ingestion</div>
            <p className="text-[11px] text-slate-400">Raw meeting audio transcript, diarized speaker turns, or notes.</p>
          </div>

          <div className="p-3.5 bg-[#131418] border border-[#2b2d38] rounded-xl space-y-1">
            <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Step 2</div>
            <div className="text-xs font-bold text-violet-400">Semantic Parsing</div>
            <p className="text-[11px] text-slate-400">NLP regex patterns for dates/owners + few-shot prompt context.</p>
          </div>

          <div className="p-3.5 bg-[#131418] border border-[#2b2d38] rounded-xl space-y-1">
            <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Step 3</div>
            <div className="text-xs font-bold text-fuchsia-400">JSON Schema Extraction</div>
            <p className="text-[11px] text-slate-400">Strict temperature=0.2 inference ensuring deterministic fields.</p>
          </div>

          <div className="p-3.5 bg-[#131418] border border-[#2b2d38] rounded-xl space-y-1">
            <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Step 4</div>
            <div className="text-xs font-bold text-emerald-400">Tool Delivery</div>
            <p className="text-[11px] text-slate-400">ClickUp / Jira CSV format, Slack markdown, and Confluence docs.</p>
          </div>
        </div>
      </div>

      {/* System Prompt View */}
      <div className="bg-[#1a1c23] border border-[#2b2d38] rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Terminal className="w-4 h-4 text-violet-400" />
            Core TPM Extraction System Prompt
          </h3>
          <button
            onClick={copyPrompt}
            className="px-3 py-1 bg-[#252834] hover:bg-[#2b2d38] text-slate-300 rounded-lg text-xs font-medium border border-[#2b2d38] flex items-center gap-1.5 transition"
          >
            {copiedPrompt ? <Check className="w-3.5 h-3.5 text-violet-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedPrompt ? 'Copied' : 'Copy Prompt'}</span>
          </button>
        </div>

        <pre className="p-4 bg-[#0e0f12] rounded-xl border border-[#2b2d38] text-xs text-slate-300 font-mono leading-relaxed overflow-x-auto whitespace-pre-wrap">
          {promptText}
        </pre>
      </div>

      {/* Parameters & Guardrails */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-5 bg-[#1a1c23] border border-[#2b2d38] rounded-2xl space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Sliders className="w-4 h-4 text-violet-400" />
            Hyperparameters & Inference Settings
          </h4>
          <ul className="space-y-2 text-xs text-slate-300">
            <li className="flex justify-between border-b border-[#2b2d38] pb-1.5">
              <span className="text-slate-400">Model Temperature:</span>
              <span className="font-mono text-violet-400 font-bold">0.2 (Low variance / deterministic)</span>
            </li>
            <li className="flex justify-between border-b border-[#2b2d38] pb-1.5">
              <span className="text-slate-400">Response MIME Type:</span>
              <span className="font-mono text-fuchsia-400">application/json</span>
            </li>
            <li className="flex justify-between border-b border-[#2b2d38] pb-1.5">
              <span className="text-slate-400">Target Latency:</span>
              <span className="font-mono text-amber-400">&lt; 1,800 ms</span>
            </li>
            <li className="flex justify-between">
              <span className="text-slate-400">Offline Fallback:</span>
              <span className="font-mono text-violet-300 font-bold">Semantic Heuristic Regex Pipeline</span>
            </li>
          </ul>
        </div>

        <div className="p-5 bg-[#1a1c23] border border-[#2b2d38] rounded-2xl space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-violet-400" />
            TPM Value Proposition for PSI
          </h4>
          <p className="text-xs text-slate-300 leading-relaxed">
            By automating transcript ingestion and Jira/ClickUp ticket generation, Technical Project Managers save an estimated <strong>4 to 6 hours per week</strong> across Sprint ceremonies, cross-functional risk triages, and leadership reporting. This tool accelerates team velocity and ensures zero dropped action items.
          </p>
        </div>
      </div>
    </div>
  );
}
