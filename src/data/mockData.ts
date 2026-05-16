export type CaseSeverity = 'Low' | 'Medium' | 'High' | 'Critical'
export type CaseStatus = 'Open' | 'Active' | 'Under Review' | 'Closed'

export type CaseSummary = {
  id: string
  title: string
  image: string
  severity: CaseSeverity
  victimType: string
  status: CaseStatus
  lastUpdated: string
  location: string
  time: string
  summary: string
  suspects: string[]
  relatedCaseIds: string[]
  riskScore: number
}

export type Profile = {
  id: string
  name: string
  alias: string
  age: number
  threatLevel: 'Moderate' | 'High' | 'Critical'
  lastSeen: string
  role: string
}

export type EvidenceEntry = {
  id: string
  caseId: string
  category: 'behavioral' | 'physical'
  title: string
  description: string
  note: string
}

export type TimelineEvent = {
  id: string
  caseId: string
  timestamp: string
  title: string
  detail: string
}

export type Relationship = {
  sourceCaseId: string
  targetCaseId: string
  similarity: number
  confidence: 'Low' | 'Medium' | 'High'
  note: string
}

export type ActivityFeedItem = {
  id: string
  timestamp: string
  description: string
}

export const cases: CaseSummary[] = [
  {
    id: 'CASE-0911',
    title: 'Downtown Data Breach',
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=500&q=60',
    severity: 'High',
    victimType: 'Corporate Target',
    status: 'Active',
    lastUpdated: '2 hours ago',
    location: 'Civic Center',
    time: '2026-05-12 23:40',
    summary: 'A targeted network intrusion affecting multiple executive accounts and sensitive investigation files.',
    suspects: ['PROFILE-12', 'PROFILE-21'],
    relatedCaseIds: ['CASE-1120', 'CASE-1304'],
    riskScore: 82,
  },
  {
    id: 'CASE-1120',
    title: 'Cold-Storage Theft',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=500&q=60',
    severity: 'Medium',
    victimType: 'Storage Facility',
    status: 'Open',
    lastUpdated: '5 hours ago',
    location: 'Port District',
    time: '2026-05-11 18:20',
    summary: 'Unauthorized entry and theft of refrigerated evidence containers linked to ongoing cyber investigations.',
    suspects: ['PROFILE-12'],
    relatedCaseIds: ['CASE-0911'],
    riskScore: 67,
  },
  {
    id: 'CASE-1304',
    title: 'Crypto Extortion Ring',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=500&q=60',
    severity: 'Critical',
    victimType: 'Financial Institution',
    status: 'Under Review',
    lastUpdated: 'Yesterday',
    location: 'Midtown',
    time: '2026-05-10 04:15',
    summary: 'Extortion scheme leveraging ransomware and social engineering across several corporate networks.',
    suspects: ['PROFILE-34'],
    relatedCaseIds: ['CASE-0911'],
    riskScore: 94,
  },
  {
    id: 'CASE-1472',
    title: 'Suspicious Asset Transfer',
    image: 'https://images.unsplash.com/photo-1523475496153-3efd1b0c6dee?auto=format&fit=crop&w=500&q=60',
    severity: 'Low',
    victimType: 'Private Individual',
    status: 'Closed',
    lastUpdated: '2 days ago',
    location: 'East Bay',
    time: '2026-05-08 09:10',
    summary: 'Review of a disputed asset transfer that may connect to a larger money-laundering operation.',
    suspects: ['PROFILE-21'],
    relatedCaseIds: [],
    riskScore: 34,
  },
]

export const profiles: Profile[] = [
  {
    id: 'PROFILE-12',
    name: 'Maya Torres',
    alias: 'Night Cipher',
    age: 31,
    threatLevel: 'High',
    lastSeen: 'Warehouse District',
    role: 'Cyber Syndicate Operator',
  },
  {
    id: 'PROFILE-21',
    name: 'Gideon Rhee',
    alias: 'Chain Runner',
    age: 38,
    threatLevel: 'Moderate',
    lastSeen: 'Harbor Front',
    role: 'Logistics Coordinator',
  },
  {
    id: 'PROFILE-34',
    name: 'Ava Caldwell',
    alias: 'Red Ledger',
    age: 29,
    threatLevel: 'Critical',
    lastSeen: 'Downtown Vault',
    role: 'Financial Executor',
  },
]

export const evidenceEntries: EvidenceEntry[] = [
  {
    id: 'EVID-001',
    caseId: 'CASE-0911',
    category: 'behavioral',
    title: 'Unusual Login Window',
    description: 'Suspicious credentials were used from an unregistered VPN endpoint during off-hours.',
    note: 'Behavior matches previous extortion campaign patterns.',
  },
  {
    id: 'EVID-002',
    caseId: 'CASE-0911',
    category: 'physical',
    title: 'Tampered Access Panel',
    description: 'Security camera footage shows forced entry to the data center after hours.',
    note: 'Vehicle license plate was partially obscured.',
  },
  {
    id: 'EVID-003',
    caseId: 'CASE-1120',
    category: 'behavioral',
    title: 'Patterned Access Request',
    description: 'Several employees received similar phishing messages during the week prior.',
    note: 'Requests were likely coordinated by the same actor group.',
  },
  {
    id: 'EVID-004',
    caseId: 'CASE-1120',
    category: 'physical',
    title: 'Inventory Discrepancy',
    description: 'Refrigerated assets were moved without authorization and bypassed an alarm trigger.',
    note: 'Manual override logs show unusual technician behavior.',
  },
  {
    id: 'EVID-005',
    caseId: 'CASE-1304',
    category: 'behavioral',
    title: 'Extortion Communication',
    description: 'Threatening demands were sent via scrambled messages to a known executive account.',
    note: 'Consistent with previous ransomware extortion cases.',
  },
  {
    id: 'EVID-006',
    caseId: 'CASE-1304',
    category: 'physical',
    title: 'Compromised Ledger',
    description: 'Digital transaction logs were modified shortly before the ransom deadline.',
    note: 'Ledger tampering points to an inside collaborator.',
  },
]

export const timelineEvents: TimelineEvent[] = [
  {
    id: 'TIME-01',
    caseId: 'CASE-0911',
    timestamp: '2026-05-12 23:40',
    title: 'Intrusion detected',
    detail: 'Network sensors flagged unauthorized access to executive email nodes.',
  },
  {
    id: 'TIME-02',
    caseId: 'CASE-0911',
    timestamp: '2026-05-13 01:05',
    title: 'Forensic snapshot captured',
    detail: 'Disk images secured and initial attack vector identified.',
  },
  {
    id: 'TIME-03',
    caseId: 'CASE-1120',
    timestamp: '2026-05-11 18:20',
    title: 'Theft reported',
    detail: 'Security confirmed missing packages from cold-storage bay B.',
  },
  {
    id: 'TIME-04',
    caseId: 'CASE-1304',
    timestamp: '2026-05-10 04:15',
    title: 'Ransom demand received',
    detail: 'Encrypted message demanded payment in crypto within 24 hours.',
  },
  {
    id: 'TIME-05',
    caseId: 'CASE-1304',
    timestamp: '2026-05-10 07:00',
    title: 'Ledger analysis started',
    detail: 'Audit team began tracing suspicious transactions from the vault.',
  },
  {
    id: 'TIME-06',
    caseId: 'CASE-0911',
    timestamp: '2026-05-13 09:00',
    title: 'Linkage flagged',
    detail: 'Correlation analysis suggested a shared actor across two active cases.',
  },
]

export const relationships: Relationship[] = [
  {
    sourceCaseId: 'CASE-0911',
    targetCaseId: 'CASE-1120',
    similarity: 72,
    confidence: 'Medium',
    note: 'Shared network intrusion patterns with theft activity.',
  },
  {
    sourceCaseId: 'CASE-0911',
    targetCaseId: 'CASE-1304',
    similarity: 81,
    confidence: 'High',
    note: 'Extortion behavior closely matches current cyber breach.',
  },
  {
    sourceCaseId: 'CASE-1120',
    targetCaseId: 'CASE-1472',
    similarity: 43,
    confidence: 'Low',
    note: 'Possible asset trafficking connection requires validation.',
  },
]

export const activityFeed: ActivityFeedItem[] = [
  {
    id: 'ACT-01',
    timestamp: 'Today, 09:25',
    description: 'New correlation report generated for CASE-0911.',
  },
  {
    id: 'ACT-02',
    timestamp: 'Today, 08:10',
    description: 'Evidence chain review completed for CASE-1120.',
  },
  {
    id: 'ACT-03',
    timestamp: 'Yesterday, 17:45',
    description: 'Suspect profile updated with new alias information.',
  },
  {
    id: 'ACT-04',
    timestamp: 'Yesterday, 14:20',
    description: 'Risk score reevaluated after additional forensic analysis.',
  },
]
