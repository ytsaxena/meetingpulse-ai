import * as XLSX from 'xlsx';

export function exportToExcel(data, customFilename = null) {
  if (!data) return;

  const { title = "Meeting Summary", executiveSummary = "", decisions = [], actionItems = [], risks = [], followUps = [] } = data;

  const wb = XLSX.utils.book_new();

  // 1. Sheet: Action Items
  const actionItemsData = actionItems.map((item, idx) => ({
    "No.": idx + 1,
    "Jira Key": item.jiraKey || `AMA-${101 + idx}`,
    "Task Description": item.task,
    "Assignee / Owner": item.owner,
    "Role": item.role || "Engineer",
    "Priority": item.priority,
    "Domain / Workstream": item.category,
    "Due Date": item.dueDate,
    "Status": item.status || "To Do"
  }));

  const wsActionItems = XLSX.utils.json_to_sheet(actionItemsData);
  // Auto-size columns
  wsActionItems['!cols'] = [
    { wch: 6 },   // No.
    { wch: 12 },  // Jira Key
    { wch: 55 },  // Task
    { wch: 18 },  // Assignee
    { wch: 18 },  // Role
    { wch: 10 },  // Priority
    { wch: 16 },  // Domain
    { wch: 14 },  // Due Date
    { wch: 12 },  // Status
  ];
  XLSX.utils.book_append_sheet(wb, wsActionItems, "Action Items");

  // 2. Sheet: Decisions Log
  const decisionsData = decisions.map((dec, idx) => ({
    "Decision #": idx + 1,
    "Decision Title": dec.decision,
    "Rationale & Architectural Context": dec.rationale,
    "Impacted Workstreams": (dec.impactedTeams || []).join(", "),
    "Lead Owner": dec.owner,
    "Status": dec.status || "Approved"
  }));

  const wsDecisions = XLSX.utils.json_to_sheet(decisionsData);
  wsDecisions['!cols'] = [
    { wch: 12 },
    { wch: 45 },
    { wch: 60 },
    { wch: 25 },
    { wch: 20 },
    { wch: 14 }
  ];
  XLSX.utils.book_append_sheet(wb, wsDecisions, "Decisions Log");

  // 3. Sheet: Risks & Blockers
  const risksData = risks.map((r, idx) => ({
    "Risk #": idx + 1,
    "Identified Technical Risk": r.risk,
    "Potential Impact": r.impact,
    "Severity": r.severity,
    "Mitigation Strategy": r.mitigation
  }));

  const wsRisks = XLSX.utils.json_to_sheet(risksData);
  wsRisks['!cols'] = [
    { wch: 10 },
    { wch: 40 },
    { wch: 45 },
    { wch: 14 },
    { wch: 55 }
  ];
  XLSX.utils.book_append_sheet(wb, wsRisks, "Risks & Blockers");

  // 4. Sheet: Executive Summary & Overview
  const summaryRows = [
    { "Project Attribute": "Meeting Title", "Details": title },
    { "Project Attribute": "Extraction Date", "Details": new Date().toLocaleString() },
    { "Project Attribute": "Overall Health Status", "Details": data.overallHealth || "Healthy" },
    { "Project Attribute": "Total Action Items", "Details": actionItems.length },
    { "Project Attribute": "Critical P0/P1 Tasks", "Details": actionItems.filter(a => a.priority === 'P0' || a.priority === 'P1').length },
    { "Project Attribute": "Approved Decisions", "Details": decisions.length },
    { "Project Attribute": "Executive Briefing", "Details": executiveSummary },
    { "Project Attribute": "Follow-Up Questions", "Details": followUps.join(" | ") }
  ];
  const wsSummary = XLSX.utils.json_to_sheet(summaryRows);
  wsSummary['!cols'] = [{ wch: 25 }, { wch: 80 }];
  XLSX.utils.book_append_sheet(wb, wsSummary, "Executive Summary");

  // Generate filename
  const filename = customFilename || `PSI_Meeting_Assistant_${new Date().toISOString().split('T')[0]}.xlsx`;

  // Write and trigger browser download
  XLSX.writeFile(wb, filename);
}
