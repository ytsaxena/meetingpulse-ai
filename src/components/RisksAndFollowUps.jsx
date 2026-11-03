import React from 'react';
import { AlertTriangle, HelpCircle, ArrowRight, ShieldAlert, CheckCircle } from 'lucide-react';

export default function RisksAndFollowUps({ risks, followUps, summary, health }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* Flagged Risks */}
      <div className="bg-[#1a1c23] border border-[#2b2d38] rounded-2xl p-5 shadow-xl space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-[#2b2d38]">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-rose-400" />
            Flagged Technical Risks & Blockers
          </h3>
          <span className="text-[11px] font-semibold text-rose-400 bg-rose-500/15 px-2 py-0.5 rounded border border-rose-500/30">
            {risks?.length || 0} Open Items
          </span>
        </div>

        <div className="space-y-2.5">
          {(!risks || risks.length === 0) ? (
            <p className="text-xs text-slate-500 py-4 text-center">No high-severity risks identified in this session.</p>
          ) : (
            risks.map((r) => (
              <div key={r.id} className="p-3 bg-[#131418] border border-[#2b2d38] rounded-xl space-y-1.5 hover:border-[#383b4a] transition">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-rose-300 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping"></span>
                    {r.risk}
                  </span>
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded uppercase border ${
                    r.severity === 'High' ? 'bg-rose-500/20 text-rose-300 border-rose-500/30' : 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                  }`}>
                    {r.severity} Severity
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">
                  <span className="text-slate-300 font-medium">Impact:</span> {r.impact}
                </p>
                <div className="text-[11px] text-violet-300 bg-violet-600/10 p-2 rounded-lg border border-violet-500/20 flex items-start gap-1.5">
                  <span className="font-semibold text-violet-400 shrink-0">Mitigation:</span>
                  <span>{r.mitigation}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Follow-Ups & Open Questions */}
      <div className="bg-[#1a1c23] border border-[#2b2d38] rounded-2xl p-5 shadow-xl space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-[#2b2d38]">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-violet-400" />
            Follow-Ups & Open Inquiries
          </h3>
          <span className="text-[11px] font-semibold text-violet-300 bg-violet-600/15 px-2 py-0.5 rounded border border-violet-500/30">
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
                className="p-2.5 bg-[#131418] border border-[#2b2d38] rounded-xl flex items-start gap-2.5 text-xs text-slate-300 hover:border-violet-500/40 transition"
              >
                <div className="w-4 h-4 rounded-full bg-violet-600/20 text-violet-300 border border-violet-500/30 flex items-center justify-center shrink-0 font-bold text-[10px] mt-0.5">
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
