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
    id: 'CASE-2001',
    title: 'Red Alley Homicide',
    image: '/assets/crime-scene-1.jpg',
    severity: 'Critical',
    victimType: 'Young Female Student',
    status: 'Active',
    lastUpdated: '34 minutes ago',
    location: 'South District',
    time: '2026-05-13 01:14',
    summary:
      'Victim discovered in a narrow alleyway with evidence suggesting organized postmortem positioning and targeted victim selection.',
    suspects: ['PROFILE-11', 'PROFILE-14'],
    relatedCaseIds: ['CASE-2002', 'CASE-2004'],
    riskScore: 91,
  },

  {
    id: 'CASE-2002',
    title: 'Riverfront Body Disposal',
    image: '/assets/crime-scene-2.jpg',
    severity: 'High',
    victimType: 'Female Office Worker',
    status: 'Under Review',
    lastUpdated: '2 hours ago',
    location: 'Riverfront District',
    time: '2026-05-08 03:42',
    summary:
      'Victim transported postmortem and disposed near industrial riverbank. Similar body positioning observed in previous active investigation.',
    suspects: ['PROFILE-11'],
    relatedCaseIds: ['CASE-2001'],
    riskScore: 84,
  },

  {
    id: 'CASE-2003',
    title: 'North Highway Abduction',
    image: '/assets/crime-scene-3.jpg',
    severity: 'Critical',
    victimType: 'Teenage Male',
    status: 'Open',
    lastUpdated: '5 hours ago',
    location: 'North Highway',
    time: '2026-05-11 22:08',
    summary:
      'Vehicle fragments and partial blood traces recovered near abandoned roadside stop. Victim currently missing.',
    suspects: ['PROFILE-18'],
    relatedCaseIds: [],
    riskScore: 76,
  },

  {
    id: 'CASE-2004',
    title: 'Apartment Ritual Scene',
    image: '/assets/crime-scene-4.jpg',
    severity: 'Critical',
    victimType: 'Middle-aged Male',
    status: 'Active',
    lastUpdated: 'Yesterday',
    location: 'East Borough',
    time: '2026-05-03 00:51',
    summary:
      'Crime scene displayed signs of ritualistic behavior, deliberate object arrangement, and repeated offender confidence.',
    suspects: ['PROFILE-14'],
    relatedCaseIds: ['CASE-2001'],
    riskScore: 95,
  },
]

export const profiles: Profile[] = [
  {
    id: 'PROFILE-11',
    name: 'Daniel Mercer',
    alias: 'The Ferryman',
    age: 39,
    threatLevel: 'Critical',
    lastSeen: 'Riverfront District',
    role: 'Primary Person of Interest',
  },

  {
    id: 'PROFILE-14',
    name: 'Elijah Cross',
    alias: 'The Curator',
    age: 44,
    threatLevel: 'High',
    lastSeen: 'East Borough',
    role: 'Behavioral Match Subject',
  },

  {
    id: 'PROFILE-18',
    name: 'Unknown',
    alias: 'Highway Subject',
    age: 0,
    threatLevel: 'Moderate',
    lastSeen: 'North Highway',
    role: 'Unidentified Subject',
  },
]

export const evidenceEntries: EvidenceEntry[] = [
  {
    id: 'EVID-001',
    caseId: 'CASE-2001',
    category: 'behavioral',
    title: 'Postmortem Positioning',
    description:
      'Victim body displayed intentional positioning inconsistent with rapid disposal behavior.',
    note:
      'Possible signature behavior rather than functional criminal behavior.',
  },

  {
    id: 'EVID-002',
    caseId: 'CASE-2001',
    category: 'physical',
    title: 'Partial Fingerprint Recovery',
    description:
      'Smudged partial print recovered from nearby metallic dumpster surface.',
    note:
      'Insufficient for positive identification but may support linkage analysis.',
  },

  {
    id: 'EVID-003',
    caseId: 'CASE-2002',
    category: 'behavioral',
    title: 'Victim Target Consistency',
    description:
      'Victim age range and occupation pattern align with previous active case.',
    note:
      'Behavioral consistency stronger than physical evidence consistency.',
  },

  {
    id: 'EVID-004',
    caseId: 'CASE-2002',
    category: 'physical',
    title: 'Fiber Trace Recovery',
    description:
      'Dark synthetic fibers recovered from victim clothing and disposal area.',
    note:
      'Laboratory comparison pending against previous evidence samples.',
  },

  {
    id: 'EVID-005',
    caseId: 'CASE-2004',
    category: 'behavioral',
    title: 'Ritualistic Arrangement',
    description:
      'Objects surrounding victim appear intentionally organized after death.',
    note:
      'Investigators warned against assuming symbolic meaning too early.',
  },

  {
    id: 'EVID-006',
    caseId: 'CASE-2004',
    category: 'physical',
    title: 'Cleaned Surface Areas',
    description:
      'Multiple surfaces appeared intentionally wiped before investigators arrived.',
    note:
      'Suggests increasing offender awareness and forensic avoidance.',
  },
]

export const timelineEvents: TimelineEvent[] = [
  {
    id: 'TIME-01',
    caseId: 'CASE-2001',
    timestamp: '2026-05-13 01:14',
    title: 'Body discovered',
    detail:
      'Emergency response contacted after civilian reported suspicious scene.',
  },

  {
    id: 'TIME-02',
    caseId: 'CASE-2001',
    timestamp: '2026-05-13 02:40',
    title: 'Forensic collection started',
    detail:
      'Scene perimeter expanded after investigators identified possible staging indicators.',
  },

  {
    id: 'TIME-03',
    caseId: 'CASE-2002',
    timestamp: '2026-05-08 03:42',
    title: 'Victim identified',
    detail:
      'Dental records confirmed identity of recovered victim near riverbank.',
  },

  {
    id: 'TIME-04',
    caseId: 'CASE-2004',
    timestamp: '2026-05-03 00:51',
    title: 'Scene photography completed',
    detail:
      'Investigators documented repeated positioning similarities with older homicide file.',
  },

  {
    id: 'TIME-05',
    caseId: 'CASE-2004',
    timestamp: '2026-05-03 04:15',
    title: 'Behavioral review requested',
    detail:
      'Case forwarded for behavioral linkage assessment due to unusual organization patterns.',
  },
]

export const relationships: Relationship[] = [
  {
    sourceCaseId: 'CASE-2001',
    targetCaseId: 'CASE-2002',
    similarity: 83,
    confidence: 'High',
    note:
      'Victim targeting behavior and postmortem handling show significant overlap.',
  },

  {
    sourceCaseId: 'CASE-2001',
    targetCaseId: 'CASE-2004',
    similarity: 71,
    confidence: 'Medium',
    note:
      'Behavioral staging similarities present, though forensic evidence remains limited.',
  },

  {
    sourceCaseId: 'CASE-2003',
    targetCaseId: 'CASE-2001',
    similarity: 32,
    confidence: 'Low',
    note:
      'Current linkage probability remains weak and requires further validation.',
  },
]

export const activityFeed: ActivityFeedItem[] = [
  {
    id: 'ACT-01',
    timestamp: 'Today, 09:12',
    description:
      'Behavioral linkage confidence increased between CASE-2001 and CASE-2002.',
  },

  {
    id: 'ACT-02',
    timestamp: 'Today, 08:02',
    description:
      'New forensic photographs uploaded to CASE-2004 investigation file.',
  },

  {
    id: 'ACT-03',
    timestamp: 'Yesterday, 22:40',
    description:
      'Witness interview added to North Highway abduction investigation.',
  },

  {
    id: 'ACT-04',
    timestamp: 'Yesterday, 19:11',
    description:
      'Investigators flagged possible false-positive linkage in active comparison report.',
  },
]