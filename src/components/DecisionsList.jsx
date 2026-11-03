import React from 'react';
import { Award, CheckCircle2, Users, FileCheck } from 'lucide-react';

export default function DecisionsList({ decisions }) {
  if (!decisions || decisions.length === 0) {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 text-center text-slate-500 text-xs">
        No formal decisions detected in this transcript.
      </div>
    );
  }

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            Decisions Log & Architectural Consensus
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Binding architectural choices, scope boundaries, and cross-functional agreements.
          </p>
        </div>
        <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs font-semibold">
          {decisions.length} Approved Decisions
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {decisions.map((dec) => (
          <div
            key={dec.id}
            className="p-4 bg-slate-950/60 border border-slate-800/80 rounded-xl hover:border-slate-700 transition space-y-2.5 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-2">
                <h4 className="text-sm font-semibold text-slate-100 leading-snug">
                  {dec.decision}
                </h4>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 whitespace-nowrap">
                  <CheckCircle2 className="w-3 h-3" />
                  {dec.status || 'Approved'}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                <span className="font-semibold text-slate-300">Rationale: </span>
                {dec.rationale}
              </p>
            </div>

            <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-400">
              <div className="flex items-center gap-1.5 flex-wrap">
                <Users className="w-3.5 h-3.5 text-slate-500" />
                <span className="text-[11px] text-slate-400">Impact:</span>
                {(dec.impactedTeams || ['Engineering']).map((team, idx) => (
                  <span
                    key={idx}
                    className="px-1.5 py-0.5 bg-slate-900 text-slate-300 rounded text-[10px] border border-slate-800"
                  >
                    {team}
                  </span>
                ))}
              </div>
              <span className="text-[11px] font-medium text-slate-400">
                Lead: <span className="text-slate-200">{dec.owner}</span>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
