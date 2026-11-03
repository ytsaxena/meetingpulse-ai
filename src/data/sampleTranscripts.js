export const SAMPLE_TRANSCRIPTS = {
  psiSprint1Kickoff: {
    id: "psiSprint1Kickoff",
    title: "PSI Sprint 1 Kickoff: AI Meeting Assistant Architecture & MVP Scope",
    date: "2026-11-05",
    attendees: [
      "Sachin (TPM)",
      "Priya (Product Manager)",
      "Alex (Lead Backend)",
      "Marcus (AI/ML Lead)",
      "Elena (Frontend Lead)",
      "Rohan (QA Lead)"
    ],
    text: `[00:00:05] Sachin (TPM): Welcome everyone to the Sprint 1 Kickoff for the AI Meeting Assistant. We have a strict 12-week timeline for our MVP release. Today we must lock in the recording architecture, our ASR selection, and our Jira integration baseline. Priya, let's align on MVP core scope.

[00:00:48] Priya (PM): Thanks Sachin. For the 12-week MVP, the 9 non-negotiables are: meeting recording, automated transcription, AI summaries, action item extraction, speaker diarization, historical search, and integrations with Google Calendar, Slack, and Jira. Multi-language and voice cloning are strictly Out-of-Scope for MVP.

[00:02:15] Alex (Backend): On the meeting recording pipeline: we evaluated building a native WebRTC client vs deploying headless meeting bots for Zoom and Google Meet. We decided to use headless Chromium recording bots running on AWS ECS Fargate. It bypasses complex client-side permissions. I will finalize the containerized recorder proof-of-concept by Thursday next week (Nov 12).

[00:04:10] Marcus (AI/ML): On transcription and diarization: we benchmarked OpenAI Whisper Large v3 vs Deepgram Nova-2. Decision: we are selecting Deepgram Nova-2 for real-time streaming transcription because it gives sub-300ms latency and built-in diarization at 40% lower compute cost. I will build the audio streaming ingestion pipeline and benchmark Word Error Rate (WER) by Nov 14. We must ensure WER stays below 8%.

[00:06:30] Sachin (TPM): That's a critical decision. Marcus, please document the WER benchmark results in Confluence so leadership has paper trail. What about our LLM summarization pipeline?

[00:07:05] Marcus (AI/ML): We'll use Claude 3.5 Sonnet / Gemini 1.5 Pro with structured JSON schema output for summary and action items. I will draft the prompt template and test hallucinations on 50 sample meeting transcripts by Nov 18.

[00:08:45] Elena (Frontend): On the UI side, the team needs Figma wireframes approved before we start building the meeting canvas and historical search interface. Right now, design approvals are pending. Elena to follow up with our UI/UX designer today to expedite the Sprint 1 mockups by Friday Nov 7.

[00:10:12] Rohan (QA): For testing, QA needs sample audio test sets with diverse accents, overlapping speakers, and background noise. Rohan will set up the automated audio test harness and create synthetic meeting fixtures by Nov 13.

[00:11:50] Alex (Backend): One major blocker: Google Meet OAuth app verification can take up to 2-3 weeks. If we delay submission, our Google Calendar integration will stall. Decision: Alex will submit the Google OAuth verification request tomorrow (Nov 6) as a P0 blocker task.

[00:13:30] Sachin (TPM): Agreed. Let's log that as a critical dependency. Also, regarding Slack and Jira integrations: Alex, please assign one backend engineer to build the Jira REST API v3 webhook handler for automatic ticket creation by Nov 16.

[00:14:45] Priya (PM): Looks solid. To summarize, Sprint 1 focus is foundation infra, audio ingestion pipeline, and auth. Let's reconvene on Friday for mid-sprint check-in.`
  },

  psiRiskTriage: {
    id: "psiRiskTriage",
    title: "PSI Mid-Sprint Risk Triage: Audio Latency & Cloud Quota Review",
    date: "2026-11-12",
    attendees: ["Sachin (TPM)", "Alex (Backend)", "Marcus (AI/ML)", "Rohan (QA)"],
    text: `[00:00:10] Sachin (TPM): Thanks for jumping on this ad-hoc risk triage. We've encountered two technical blockers in Sprint 1 that could impact our Week 4 Alpha milestone: AWS GPU instance quotas and Zoom bot disconnections.

[00:01:05] Marcus (AI/ML): On the GPU quota: AWS denied our limit increase request for g5.2xlarge instances in us-east-1. If we can't secure GPU instances, our local diarization fallback cannot scale.
[00:01:45] Sachin (TPM): Decision: We will immediately escalate with our AWS enterprise account manager today, and as a fallback, configure multi-region deployment across us-west-2 and eu-west-1. Sachin to draft escalation ticket by 3 PM today.

[00:03:00] Alex (Backend): Regarding Zoom headless bots: when meetings exceed 45 minutes, the Chromium container memory usage spikes and occasionally crashes. Decision: Alex will implement a 15-minute chunked audio buffering system and enforce a 2GB memory cap with auto-restart by Nov 15.

[00:04:30] Rohan (QA): QA identified that when two speakers speak simultaneously, the speaker diarization tags both as 'Speaker 1'. Marcus and Rohan will collaborate on a benchmark test for overlapping speech by Nov 17.

[00:06:10] Sachin (TPM): Action item for Rohan: Add speaker collision test cases to our regression suite by Nov 18. Alex, ensure Grafana alerts are set up for recorder container crashes by Nov 14.`
  },

  psiCeoScopeChange: {
    id: "psiCeoScopeChange",
    title: "Executive Alignment: CEO Feature Expansion Request (Sprint 3)",
    date: "2026-11-20",
    attendees: ["Sachin (TPM)", "CEO", "Priya (PM)", "Alex (Backend)", "Marcus (AI/ML)"],
    text: `[00:00:15] CEO: Thanks for the demo team. Progress looks great. However, looking at the market, I strongly feel we must include Multi-Language Transcription (Spanish & Japanese), Voice Cloning for automated meeting recap narration, and Salesforce CRM integration in our MVP launch.

[00:02:10] Sachin (TPM): Thank you for the strategic feedback. We've conducted a preliminary technical assessment of these three requests against our remaining 6-week MVP timeline. Here is our assessment:

[00:03:00] Sachin (TPM): Voice Cloning requires custom acoustic model training and introduces major ethical, legal, and GDPR consent requirements. It adds at least 4-5 engineering weeks and requires skills outside our current team capacity. Decision: Voice Cloning is deferred to V2 (Q2 roadmap).

[00:04:20] Marcus (AI/ML): Multi-language transcription (Spanish and Japanese) is feasible because Deepgram Nova-2 supports multilingual models out-of-the-box. However, it requires prompt localization and translation testing. We can support it as an experimental Beta toggle in Sprint 5 with 1 extra week of QA.

[00:05:45] Priya (PM): For CRM integration, Salesforce integration is heavy (OAuth, custom objects, bi-directional sync). However, we can offer a lightweight Webhook / Zapier export in Sprint 6, while keeping full native Salesforce for V1.1.

[00:07:00] CEO: That trade-off makes complete sense. Let's protect the 12-week MVP launch date. Sachin, please update the project charter and roadmap reflecting the multi-language beta in Sprint 5 and document the decision.`
  }
};
