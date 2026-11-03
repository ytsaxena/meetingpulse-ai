# ⚡ MeetingPulse AI

> **AI Meeting Notes, Decisions & Jira Ticket Engine for Technical Project Managers**  
> *Developed for PanScience Innovations (PSI) – Technical Project Manager Assignment (Part 11)*

[![React](https://img.shields.io/badge/React-18.3-blue.svg)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5.4-purple.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC.svg)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

---

## 📌 What is MeetingPulse AI?

**MeetingPulse AI** is a lightweight, high-productivity web tool built specifically for **Technical Project Managers (TPMs)**. 

TPMs frequently spend 4 to 6 hours every week listening to recorded meetings, extracting action items, following up with engineers, and manually creating Jira tickets. MeetingPulse AI automates this entire process: paste or upload any meeting transcript, and get back prioritized tasks, formal architectural decisions, and exportable deliverables in seconds.

---

## 🚀 Key Features (At a Glance)

- **📝 Automated Action Items:**
  - Extracts clear task descriptions with assigned owners and engineering roles.
  - Automatically sizes priority (**P0 Blocker, P1 High, P2 Medium**).
  - Assigns target due dates and generates formatted Jira ticket IDs (`AMA-101`, `AMA-102`, etc.).
  - Interactive checkboxes to mark items complete or add manual tasks inline.

- **🏆 Architectural Decisions Log:**
  - Isolates binding technical choices and architectural consensus from discussions.
  - Documents the technical rationale and affected engineering workstreams (AI/ML, Backend, DevOps, Frontend, QA).

- **⚠️ Risk & Blocker Flagging:**
  - Automatically identifies external dependencies, API limits, and infrastructure bottlenecks.
  - Pairs each risk with a recommended technical mitigation strategy.

- **📊 Multi-Sheet Excel Export (`.xlsx`):**
  - Download a formatted Microsoft Excel workbook with dedicated sheets for **Action Items**, **Decisions**, **Risks**, and **Executive Briefing**.

- **🔗 1-Click Tool Integrations:**
  - **Jira Cloud CSV:** Ready to import straight into your Jira project backlog.
  - **Slack Digest:** Formatted markdown summary ready to paste into team channels.
  - **Confluence Markdown:** Clean meeting minutes document for documentation wikis.
  - **Raw JSON:** Standardized schema for webhooks and CI/CD pipelines.

- **⚡ Real-Time Live LLM API + Offline Mode:**
  - **Live Inference:** Connect your **Google Gemini** (`gemini-1.5-flash`), **OpenAI** (`gpt-4o-mini`), or **Groq** (`llama-3.3-70b`) API key for live real-time analysis.
  - **Offline Local Engine:** Works instantly out of the box with zero setup, zero cost, and zero API keys needed.

- **🧪 Preloaded PSI Scenarios:**
  - **Sprint 1 Kickoff:** Deepgram vs Whisper ASR, AWS ECS recording bots, Google OAuth blockers.
  - **Mid-Sprint Risk Triage:** AWS GPU instance quotas and Chromium memory leak triage.
  - **Sprint 3 Scope Pivot:** CEO feature expansion trade-offs (Multi-language, Voice cloning, CRM).

---

## 🛠️ Tech Stack

- **Frontend Framework:** React 18 + Vite
- **Styling:** Tailwind CSS (Dark Mode SaaS aesthetic)
- **Icons:** Lucide React
- **Spreadsheet Generation:** SheetJS (`xlsx`)
- **AI Engine:** Google Gemini API / OpenAI API / Groq + Local Deterministic Semantic Parser

---

## 💻 How to Run Locally

### 1. Clone the repository
```bash
git clone https://github.com/ytsaxena/meetingpulse-ai.git
cd meetingpulse-ai
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start development server
```bash
npm run dev
```
Open **`http://localhost:3000`** in your browser.

### 4. Build for production
```bash
npm run build
npm run preview
```

---

## 📖 Quick Demo Walkthrough

1. Open `http://localhost:3000`.
2. Click any of the **PSI Scenario** buttons (e.g. *Sprint 1 Kickoff*).
3. Click **"Generate Meeting Deliverables"**.
4. Browse your deliverables using the clean tabs:
   - **Action Items:** Review tasks, filter by priority, or click **"Export Excel"**.
   - **Decisions:** Review locked architecture choices and team impacts.
   - **Risks:** Check flagged P0 blockers and mitigations.
5. Click **"All Exports"** in the top navigation to download **Jira CSV** or copy the **Slack Digest**.
6. Click the model pill in the header to enter an API key or change models anytime.

---

## 📂 Project Structure

```
meetingpulse-ai/
├── src/
│   ├── components/
│   │   ├── ActionItemsTable.jsx   # Interactive task matrix with filters & Excel
│   │   ├── DecisionsList.jsx      # Architectural decisions log
│   │   ├── ExportModal.jsx        # Multi-format exporter (Excel, Jira, Slack, MD)
│   │   ├── Navbar.jsx             # Clean header with quick actions
│   │   ├── PromptInspector.jsx    # AI prompt engineering architecture tab
│   │   ├── RisksAndFollowUps.jsx  # Technical blockers & follow-up checklist
│   │   ├── SettingsModal.jsx      # Clean AI model & API key configuration
│   │   └── TranscriptInput.jsx    # Clean transcript input with scenario chips
│   ├── data/
│   │   └── sampleTranscripts.js   # Preloaded PSI scenario transcripts
│   ├── utils/
│   │   ├── excelExporter.js       # Multi-sheet .xlsx generation via SheetJS
│   │   └── nlpParser.js           # Live LLM API + Offline semantic parser
│   ├── App.jsx                    # Core application layout & tab navigation
│   ├── index.css                  # Tailwind styles
│   └── main.jsx                   # React entry point
├── package.json
└── README.md
```

---

## 👤 Author
**Candidate Submission for PanScience Innovations (PSI)**  
Role: **Technical Project Manager**  
Repository: [https://github.com/ytsaxena/meetingpulse-ai](https://github.com/ytsaxena/meetingpulse-ai)
