import React from 'react';
import { AlertTriangle, HelpCircle, ArrowRight, ShieldAlert, CheckCircle } from 'lucide-react';

export default function RisksAndFollowUps({ risks, followUps, summary, health }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* Flagged Risks */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-rose-400" />
            Flagged Technical Risks & Blockers
          </h3>
          <span className="text-[11px] font-semibold text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">
            {risks?.length || 0} Open Items
          </span>
        </div>

        <div className="space-y-2.5">
          {(!risks || risks.length === 0) ? (
            <p className="text-xs text-slate-500 py-4 text-center">No high-severity risks identified in this session.</p>
          ) : (
            risks.map((r) => (
              <div key={r.id} className="p-3 bg-slate-950/70 border border-slate-800/80 rounded-xl space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-rose-300 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                    {r.risk}
                  </span>
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded uppercase ${
                    r.severity === 'High' ? 'bg-rose-500/20 text-rose-300' : 'bg-amber-500/20 text-amber-300'
                  }`}>
                    {r.severity} Severity
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">
                  <span className="text-slate-300 font-medium">Impact:</span> {r.impact}
                </p>
                <div className="text-[11px] text-emerald-400 bg-emerald-500/5 p-2 rounded border border-emerald-500/20 flex items-start gap-1.5">
                  <span className="font-semibold text-emerald-300 shrink-0">Mitigation:</span>
                  <span>{r.mitigation}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Follow-Ups & Open Questions */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-cyan-400" />
            Follow-Ups & Open Inquiries
          </h3>
          <span className="text-[11px] font-semibold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
            {followUps?.length || 0} Follow-Ups
          </span>
        </div>

        <div className="space-y-2">
          {(!followUps || followUps.length === 0) ? (
            <p className="text-xs text-slate-500 py-4 text-center">No open follow-up questions noted.</p>
          ) : (
            followUps.map((item, idx) => (
              <div
                key={idx}
                className="p-2.5 bg-slate-950/60 border border-slate-800/80 rounded-xl flex items-start gap-2.5 text-xs text-slate-300 hover:border-slate-700 transition"
              >
                <div className="w-4 h-4 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0 font-bold text-[10px] mt-0.5">
                  {idx + 1}
                </div>
                <span className="leading-relaxed">{item}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
