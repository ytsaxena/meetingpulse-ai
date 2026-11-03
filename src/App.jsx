import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import TranscriptInput from './components/TranscriptInput';
import ActionItemsTable from './components/ActionItemsTable';
import DecisionsList from './components/DecisionsList';
import RisksAndFollowUps from './components/RisksAndFollowUps';
import PromptInspector from './components/PromptInspector';
import ExportModal from './components/ExportModal';
import { SAMPLE_TRANSCRIPTS } from './data/sampleTranscripts';
import { processMeetingNotes } from './utils/nlpParser';
import { CheckCircle2, AlertOctagon, TrendingUp, Layers, Clock, Zap } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('workspace');
  const [transcript, setTranscript] = useState(SAMPLE_TRANSCRIPTS.psiSprint1Kickoff.text);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [isExportOpen, setIsExportOpen] = useState(false);

  // Initialize on mount
  useEffect(() => {
    handleProcess(SAMPLE_TRANSCRIPTS.psiSprint1Kickoff.text);
  }, []);

  const handleProcess = async (textToProcess = transcript) => {
    if (!textToProcess.trim()) return;
    setIsLoading(true);
    try {
      const result = await processMeetingNotes(textToProcess, {
        apiKey: apiKey.trim(),
        modelProvider: apiKey.trim() ? 'gemini' : 'heuristic'
      });
      setData(result);
    } catch (err) {
      console.error("Processing error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onExportClick={() => setIsExportOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full space-y-6">
        {activeTab === 'prompts' ? (
          <PromptInspector />
        ) : (
          <>
            {/* KPI Executive Summary Strip */}
            {data && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
                <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 shadow-lg flex items-center justify-between">
                  <div>
                    <div className="text-[11px] uppercase tracking-wider font-semibold text-slate-400">Action Items</div>
                    <div className="text-2xl font-black text-white mt-0.5">{data.actionItems?.length || 0}</div>
                    <div className="text-[10px] text-emerald-400 mt-0.5 font-medium">Auto-assigned to owners</div>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                </div>

                <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 shadow-lg flex items-center justify-between">
                  <div>
                    <div className="text-[11px] uppercase tracking-wider font-semibold text-slate-400">P0/P1 Blockers</div>
                    <div className="text-2xl font-black text-rose-400 mt-0.5">
                      {data.actionItems?.filter(a => a.priority === 'P0' || a.priority === 'P1').length || 0}
                    </div>
                    <div className="text-[10px] text-rose-400 mt-0.5 font-medium">Critical path tasks</div>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
                    <AlertOctagon className="w-5 h-5" />
                  </div>
                </div>

                <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 shadow-lg flex items-center justify-between">
                  <div>
                    <div className="text-[11px] uppercase tracking-wider font-semibold text-slate-400">Key Decisions</div>
                    <div className="text-2xl font-black text-amber-400 mt-0.5">{data.decisions?.length || 0}</div>
                    <div className="text-[10px] text-amber-400 mt-0.5 font-medium">Logged & approved</div>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                    <Layers className="w-5 h-5" />
                  </div>
                </div>

                <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 shadow-lg flex items-center justify-between">
                  <div>
                    <div className="text-[11px] uppercase tracking-wider font-semibold text-slate-400">TPM Time Saved</div>
                    <div className="text-2xl font-black text-cyan-400 mt-0.5">~45 min</div>
                    <div className="text-[10px] text-cyan-400 mt-0.5 font-medium">Instant ticket generation</div>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                    <Zap className="w-5 h-5" />
                  </div>
                </div>
              </div>
            )}

            {/* Input Section */}
            <TranscriptInput
              transcript={transcript}
              setTranscript={setTranscript}
              onAnalyze={() => handleProcess(transcript)}
              isLoading={isLoading}
              apiKey={apiKey}
              setApiKey={setApiKey}
            />

            {/* Executive Summary Card */}
            {data?.executiveSummary && (
              <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-full bg-emerald-500/5 blur-3xl pointer-events-none"></div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-emerald-400" />
                    Executive Briefing & Synthesis
                  </h3>
                  <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                    {data.overallHealth || 'Sprint Healthy'}
                  </span>
                </div>
                <h2 className="text-base font-bold text-white mb-2">{data.title}</h2>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                  {data.executiveSummary}
                </p>
              </div>
            )}

            {/* Extracted Action Items */}
            {data?.actionItems && (
              <ActionItemsTable
                actionItems={data.actionItems}
                setActionItems={(newItems) => setData({ ...data, actionItems: typeof newItems === 'function' ? newItems(data.actionItems) : newItems })}
              />
            )}

            {/* Decisions List */}
            {data?.decisions && (
              <DecisionsList decisions={data.decisions} />
            )}

            {/* Risks & Follow-Ups */}
            {data && (
              <RisksAndFollowUps
                risks={data.risks}
                followUps={data.followUps}
                summary={data.executiveSummary}
                health={data.overallHealth}
              />
            )}
          </>
        )}
      </main>

      {/* Export Modal */}
      <ExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        data={data}
      />

      {/* Footer */}
      <footer className="border-t border-slate-900 py-5 text-center text-xs text-slate-500">
        PanScience Innovations (PSI) &bull; Technical Project Manager Evaluation &bull; Developed by TPM Candidate
      </footer>
    </div>
  );
}
