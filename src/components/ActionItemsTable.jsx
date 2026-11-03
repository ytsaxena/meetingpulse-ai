import React, { useState } from 'react';
import { CheckSquare, Square, AlertCircle, Calendar, User, Tag, Plus, Check, Copy, FileSpreadsheet } from 'lucide-react';
import { exportToExcel } from '../utils/excelExporter';

export default function ActionItemsTable({ actionItems, setActionItems, fullData }) {
  const [filterCategory, setFilterCategory] = useState('ALL');
  const [filterPriority, setFilterPriority] = useState('ALL');
  const [copiedId, setCopiedId] = useState(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newTask, setNewTask] = useState({
    task: '',
    owner: '',
    role: 'Engineer',
    priority: 'P1',
    category: 'Backend',
    dueDate: '2026-11-20'
  });

  const categories = ['ALL', 'Backend', 'AI/ML', 'Frontend', 'QA', 'DevOps', 'TPM'];
  const priorities = ['ALL', 'P0', 'P1', 'P2'];

  const toggleStatus = (id) => {
    setActionItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, status: item.status === 'Done' ? 'To Do' : 'Done' }
          : item
      )
    );
  };

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleAddNew = (e) => {
    e.preventDefault();
    if (!newTask.task.trim()) return;

    const item = {
      id: `act-${Date.now()}`,
      task: newTask.task,
      owner: newTask.owner || 'Unassigned',
      role: newTask.role,
      priority: newTask.priority,
      category: newTask.category,
      dueDate: newTask.dueDate,
      jiraKey: `AMA-${110 + actionItems.length}`,
      status: 'To Do'
    };

    setActionItems([item, ...actionItems]);
    setNewTask({
      task: '',
      owner: '',
      role: 'Engineer',
      priority: 'P1',
      category: 'Backend',
      dueDate: '2026-11-20'
    });
    setIsAddingNew(false);
  };

  const handleQuickExcel = () => {
    if (fullData) {
      exportToExcel(fullData);
    } else {
      exportToExcel({ actionItems });
    }
  };

  const filteredItems = actionItems.filter(item => {
    const matchCat = filterCategory === 'ALL' || item.category === filterCategory;
    const matchPri = filterPriority === 'ALL' || item.priority === filterPriority;
    return matchCat && matchPri;
  });

  const getPriorityBadge = (p) => {
    switch (p) {
      case 'P0':
        return 'bg-rose-500/10 text-rose-400 border border-rose-500/30';
      case 'P1':
        return 'bg-amber-500/10 text-amber-400 border border-amber-500/30';
      case 'P2':
        return 'bg-blue-500/10 text-blue-400 border border-blue-500/30';
      default:
        return 'bg-slate-700/50 text-slate-300 border border-slate-600';
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
      {/* Header and Filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <CheckSquare className="w-5 h-5 text-emerald-400" />
              Extracted Action Items & Sprint Tasks
            </h3>
            <span className="px-2 py-0.5 text-xs rounded-full bg-slate-800 text-slate-300 font-mono font-medium">
              {filteredItems.length} of {actionItems.length}
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Auto-assigned owners, due dates, Jira keys, and cross-functional workstreams.
          </p>
        </div>

        {/* Filter Controls & Excel Button */}
        <div className="flex items-center flex-wrap gap-2">
          {/* Priority filter */}
          <div className="flex items-center space-x-1 bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs">
            {priorities.map(p => (
              <button
                key={p}
                onClick={() => setFilterPriority(p)}
                className={`px-2 py-1 rounded font-medium transition ${
                  filterPriority === p ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {p}
              </button>
            ))}
          </div>

          {/* Quick Excel Export */}
          <button
            onClick={handleQuickExcel}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5 transition"
            title="Download formatted Excel (.xlsx) file"
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span>Export Excel</span>
          </button>

          {/* Add button */}
          <button
            onClick={() => setIsAddingNew(!isAddingNew)}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center gap-1 transition"
          >
            <Plus className="w-3.5 h-3.5 text-emerald-400" />
            <span>Add Item</span>
          </button>
        </div>
      </div>

      {/* Add New Item Drawer */}
      {isAddingNew && (
        <form onSubmit={handleAddNew} className="p-4 bg-slate-950/90 border border-slate-800 rounded-xl space-y-3">
          <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">Add Manual Action Item</div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-2.5">
            <input
              type="text"
              required
              placeholder="Action item task description..."
              value={newTask.task}
              onChange={(e) => setNewTask({ ...newTask, task: e.target.value })}
              className="md:col-span-2 bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
            <input
              type="text"
              placeholder="Assignee (e.g. Alex)"
              value={newTask.owner}
              onChange={(e) => setNewTask({ ...newTask, owner: e.target.value })}
              className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
            <div className="flex gap-2">
              <select
                value={newTask.priority}
                onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                className="bg-slate-900 border border-slate-700 rounded-lg px-2 py-1.5 text-xs text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="P0">P0 (Blocker)</option>
                <option value="P1">P1 (High)</option>
                <option value="P2">P2 (Medium)</option>
              </select>
              <select
                value={newTask.category}
                onChange={(e) => setNewTask({ ...newTask, category: e.target.value })}
                className="bg-slate-900 border border-slate-700 rounded-lg px-2 py-1.5 text-xs text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="Backend">Backend</option>
                <option value="AI/ML">AI/ML</option>
                <option value="Frontend">Frontend</option>
                <option value="QA">QA</option>
                <option value="DevOps">DevOps</option>
                <option value="TPM">TPM</option>
              </select>
              <button
                type="submit"
                className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-lg text-xs"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      )}

      {/* Action Items Table */}
      <div className="overflow-x-auto rounded-xl border border-slate-800">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-950/80 text-slate-400 font-semibold uppercase tracking-wider border-b border-slate-800">
            <tr>
              <th className="py-3 px-3 w-10">Done</th>
              <th className="py-3 px-3">Task Description</th>
              <th className="py-3 px-3">Owner / Role</th>
              <th className="py-3 px-3">Priority</th>
              <th className="py-3 px-3">Domain</th>
              <th className="py-3 px-3">Due Date</th>
              <th className="py-3 px-3">Jira Key</th>
              <th className="py-3 px-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 bg-slate-900/40">
            {filteredItems.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-8 text-center text-slate-500">
                  No action items match current filters.
                </td>
              </tr>
            ) : (
              filteredItems.map((item) => {
                const isDone = item.status === 'Done';
                return (
                  <tr
                    key={item.id}
                    className={`hover:bg-slate-800/40 transition ${isDone ? 'opacity-50 line-through' : ''}`}
                  >
                    <td className="py-3 px-3">
                      <button
                        onClick={() => toggleStatus(item.id)}
                        className="text-slate-400 hover:text-emerald-400 transition"
                      >
                        {isDone ? (
                          <CheckSquare className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <Square className="w-4 h-4" />
                        )}
                      </button>
                    </td>

                    <td className="py-3 px-3 font-medium text-slate-200 max-w-sm">
                      {item.task}
                    </td>

                    <td className="py-3 px-3 whitespace-nowrap">
                      <div className="flex items-center space-x-1.5">
                        <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-[10px] uppercase">
                          {item.owner.slice(0, 2)}
                        </div>
                        <div>
                          <div className="font-semibold text-slate-300">{item.owner}</div>
                          {item.role && <div className="text-[10px] text-slate-500">{item.role}</div>}
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-3 whitespace-nowrap">
                      <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${getPriorityBadge(item.priority)}`}>
                        {item.priority}
                      </span>
                    </td>

                    <td className="py-3 px-3 whitespace-nowrap">
                      <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700 text-[11px]">
                        {item.category}
                      </span>
                    </td>

                    <td className="py-3 px-3 whitespace-nowrap font-mono text-slate-400">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-slate-500" />
                        <span>{item.dueDate}</span>
                      </div>
                    </td>

                    <td className="py-3 px-3 whitespace-nowrap font-mono font-semibold text-emerald-400">
                      {item.jiraKey}
                    </td>

                    <td className="py-3 px-3 text-right whitespace-nowrap">
                      <button
                        onClick={() => copyToClipboard(`[${item.jiraKey}] ${item.task} (Owner: @${item.owner}, Due: ${item.dueDate})`, item.id)}
                        title="Copy formatted Jira ticket text"
                        className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition"
                      >
                        {copiedId === item.id ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
