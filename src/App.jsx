import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import TranscriptInput from './components/TranscriptInput';
import ActionItemsTable from './components/ActionItemsTable';
import DecisionsList from './components/DecisionsList';
import RisksAndFollowUps from './components/RisksAndFollowUps';
import PromptInspector from './components/PromptInspector';
import ExportModal from './components/ExportModal';
import SettingsModal from './components/SettingsModal';
import { SAMPLE_TRANSCRIPTS } from './data/sampleTranscripts';
import { processMeetingNotes } from './utils/nlpParser';
import { exportToExcel } from './utils/excelExporter';
import { CheckCircle2, AlertOctagon, Layers, Clock, FileSpreadsheet, Sparkles, CheckSquare, Award, ShieldAlert, FileText, LayoutGrid } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('workspace'); // 'workspace' | 'prompts'
  const [resultsSection, setResultsSection] = useState('all'); // 'all' | 'actions' | 'decisions' | 'risks' | 'summary'
  const [transcript, setTranscript] = useState(SAMPLE_TRANSCRIPTS.psiSprint1Kickoff.text);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [progressStatus, setProgressStatus] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [modelProvider, setModelProvider] = useState('gemini');
  const [modelName, setModelName] = useState('gemini-3.8-flash');
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Load from local storage
  useEffect(() => {
    const savedKey = localStorage.getItem('meetingpulse_llm_api_key');
    const savedProvider = localStorage.getItem('meetingpulse_llm_provider');
    if (savedKey) setApiKey(savedKey);
    if (savedProvider) {
      setModelProvider(savedProvider);
      if (savedProvider === 'gemini') setModelName('gemini-3.8-flash');
      else if (savedProvider === 'groq') setModelName('llama-3.3-70b-versatile');
      else if (savedProvider === 'openai') setModelName('gpt-4o-mini');
    }

    // Initial process
    handleProcess(SAMPLE_TRANSCRIPTS.psiSprint1Kickoff.text);
  }, []);

  const handleProcess = async (textToProcess = transcript) => {
    if (!textToProcess.trim()) return;
    setIsLoading(true);
    setProgressStatus('Initializing extraction engine...');
    try {
      const result = await processMeetingNotes(textToProcess, {
        apiKey: apiKey.trim(),
        modelProvider: apiKey.trim() ? modelProvider : 'heuristic',
        modelName,
        onProgress: (status) => setProgressStatus(status)
      });
      setData(result);
    } catch (err) {
      console.error("Processing error:", err);
    } finally {
      setIsLoading(false);
      setProgressStatus('');
    }
  };

  const handleDirectExcelDownload = () => {
    if (data) {
      exportToExcel(data);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onExportClick={() => setIsExportOpen(true)}
        onDirectExcel={handleDirectExcelDownload}
        onOpenSettings={() => setIsSettingsOpen(true)}
        modelProvider={modelProvider}
        modelName={modelName}
        hasApiKey={Boolean(apiKey.trim())}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 w-full space-y-5">
        {activeTab === 'prompts' ? (
          <PromptInspector />
        ) : (
          <>
            {/* Top Quick KPI Stats */}
            {data && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <button
                  onClick={() => setResultsSection('actions')}
                  className="bg-slate-900/80 hover:bg-slate-800/80 border border-slate-800 rounded-xl p-3.5 text-left transition flex items-center justify-between group"
                >
                  <div>
                    <div className="text-[10px] uppercase font-bold text-slate-400 group-hover:text-emerald-400 transition">Action Items</div>
                    <div className="text-xl font-black text-white mt-0.5">{data.actionItems?.length || 0}</div>
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                </button>

                <button
                  onClick={() => setResultsSection('actions')}
                  className="bg-slate-900/80 hover:bg-slate-800/80 border border-slate-800 rounded-xl p-3.5 text-left transition flex items-center justify-between group"
                >
                  <div>
                    <div className="text-[10px] uppercase font-bold text-slate-400 group-hover:text-rose-400 transition">P0/P1 Blockers</div>
                    <div className="text-xl font-black text-rose-400 mt-0.5">
                      {data.actionItems?.filter(a => a.priority === 'P0' || a.priority === 'P1').length || 0}
                    </div>
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-rose-500/10 text-rose-400 flex items-center justify-center">
                    <AlertOctagon className="w-4 h-4" />
                  </div>
                </button>

                <button
                  onClick={() => setResultsSection('decisions')}
                  className="bg-slate-900/80 hover:bg-slate-800/80 border border-slate-800 rounded-xl p-3.5 text-left transition flex items-center justify-between group"
                >
                  <div>
                    <div className="text-[10px] uppercase font-bold text-slate-400 group-hover:text-amber-400 transition">Key Decisions</div>
                    <div className="text-xl font-black text-amber-400 mt-0.5">{data.decisions?.length || 0}</div>
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center">
                    <Layers className="w-4 h-4" />
                  </div>
                </button>

                <button
                  onClick={() => setResultsSection('risks')}
                  className="bg-slate-900/80 hover:bg-slate-800/80 border border-slate-800 rounded-xl p-3.5 text-left transition flex items-center justify-between group"
                >
                  <div>
                    <div className="text-[10px] uppercase font-bold text-slate-400 group-hover:text-cyan-400 transition">Technical Risks</div>
                    <div className="text-xl font-black text-cyan-400 mt-0.5">{data.risks?.length || 0}</div>
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
                    <ShieldAlert className="w-4 h-4" />
                  </div>
                </button>
              </div>
            )}

            {/* Input Component */}
            <TranscriptInput
              transcript={transcript}
              setTranscript={setTranscript}
              onAnalyze={() => handleProcess(transcript)}
              isLoading={isLoading}
              modelProvider={modelProvider}
              modelName={modelName}
              hasApiKey={Boolean(apiKey.trim())}
              onOpenSettings={() => setIsSettingsOpen(true)}
              progressStatus={progressStatus}
            />

            {/* Notice if API fallback occurred */}
            {data?.apiNotice && (
              <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-xs text-amber-300 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{data.apiNotice}</span>
              </div>
            )}

            {/* Section Switcher Tabs (Simple, Clean, Intuitive Navigation) */}
            {data && (
              <div className="flex items-center justify-between border-b border-slate-800 pb-2 pt-1 overflow-x-auto">
                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => setResultsSection('all')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${
                      resultsSection === 'all'
                        ? 'bg-slate-800 text-white border border-slate-700 shadow-sm'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <LayoutGrid className="w-3.5 h-3.5" />
                    <span>All Deliverables</span>
                  </button>

                  <button
                    onClick={() => setResultsSection('actions')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${
                      resultsSection === 'actions'
                        ? 'bg-slate-800 text-emerald-400 border border-slate-700 shadow-sm'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <CheckSquare className="w-3.5 h-3.5" />
                    <span>Action Items ({data.actionItems?.length || 0})</span>
                  </button>

                  <button
                    onClick={() => setResultsSection('decisions')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${
                      resultsSection === 'decisions'
                        ? 'bg-slate-800 text-amber-400 border border-slate-700 shadow-sm'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Award className="w-3.5 h-3.5" />
                    <span>Decisions ({data.decisions?.length || 0})</span>
                  </button>

                  <button
                    onClick={() => setResultsSection('risks')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${
                      resultsSection === 'risks'
                        ? 'bg-slate-800 text-rose-400 border border-slate-700 shadow-sm'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <ShieldAlert className="w-3.5 h-3.5" />
                    <span>Risks & Blockers ({data.risks?.length || 0})</span>
                  </button>

                  <button
                    onClick={() => setResultsSection('summary')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${
                      resultsSection === 'summary'
                        ? 'bg-slate-800 text-cyan-400 border border-slate-700 shadow-sm'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Executive Briefing</span>
                  </button>
                </div>

                {/* Instant Excel Download Button */}
                <button
                  onClick={handleDirectExcelDownload}
                  className="px-2.5 py-1 text-xs font-semibold text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 rounded-lg flex items-center gap-1 transition"
                  title="Export complete workbook to Excel"
                >
                  <FileSpreadsheet className="w-3.5 h-3.5" />
                  <span>Download .xlsx</span>
                </button>
              </div>
            )}

            {/* Results Content Rendered Conditionally or All-in-One */}
            {data && (
              <div className="space-y-5">
                {/* Executive Summary Card (Shown in 'all' or 'summary') */}
                {(resultsSection === 'all' || resultsSection === 'summary') && data.executiveSummary && (
                  <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-full bg-emerald-500/5 blur-3xl pointer-events-none"></div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-emerald-400" />
                          Executive Briefing & Synthesis
                        </h3>
                        {data.isLiveLLM && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-500/15 text-purple-300 border border-purple-500/30">
                            Live {modelProvider.toUpperCase()}
                          </span>
                        )}
                      </div>
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

                {/* Extracted Action Items Table (Shown in 'all' or 'actions') */}
                {(resultsSection === 'all' || resultsSection === 'actions') && data.actionItems && (
                  <ActionItemsTable
                    actionItems={data.actionItems}
                    setActionItems={(newItems) => setData({ ...data, actionItems: typeof newItems === 'function' ? newItems(data.actionItems) : newItems })}
                    fullData={data}
                  />
                )}

                {/* Decisions List (Shown in 'all' or 'decisions') */}
                {(resultsSection === 'all' || resultsSection === 'decisions') && data.decisions && (
                  <DecisionsList decisions={data.decisions} />
                )}

                {/* Risks & Follow-Ups (Shown in 'all' or 'risks' or 'summary') */}
                {(resultsSection === 'all' || resultsSection === 'risks' || resultsSection === 'summary') && (
                  <RisksAndFollowUps
                    risks={data.risks}
                    followUps={data.followUps}
                    summary={data.executiveSummary}
                    health={data.overallHealth}
                  />
                )}
              </div>
            )}
          </>
        )}
      </main>

      {/* Settings Modal (Clean pop-up for API Key & Model Configuration) */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        apiKey={apiKey}
        setApiKey={setApiKey}
        modelProvider={modelProvider}
        setModelProvider={setModelProvider}
        modelName={modelName}
        setModelName={setModelName}
      />

      {/* Export Modal with Excel, Jira, Slack */}
      <ExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        data={data}
      />

      {/* Minimal Footer */}
      <footer className="border-t border-slate-900 py-4 text-center text-xs text-slate-500">
        PanScience Innovations (PSI) &bull; Technical Project Manager Evaluation &bull; MeetingPulse AI
      </footer>
    </div>
  );
}
