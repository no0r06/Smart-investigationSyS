# 🕵️ Nvest Intelligence

### Centralized Case Linkage & Investigation Platform

![Version](https://img.shields.io/badge/version-1.0.0-red)
![React](https://img.shields.io/badge/React-18.2.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0.0-blue)
![Tailwind](https://img.shields.io/badge/Tailwind-3.0.0-cyan)

---

## 🎯 The Problem We Solve

The FBI and local investigators handle thousands of homicide cases. When a new body is found, they need to know:

> **"Has this killer struck before?"**

**The challenge:** Physical evidence (DNA, fingerprints) is often missing. Human memory is flawed. Cases get mislinked or not linked at all.

**Our solution:** When physical evidence fails, we rely on what criminals can't hide — **their victim choice.**

---

## 🧠 How It Works

### The Victim-Profile Algorithm

Serial killers leave patterns in their victims:

| Factor | Points | Why It Matters |
|--------|--------|----------------|
| **Location Type** | 1 point | Same disposal/stalking areas |
| **Killing Method** | 1 point | MO rarely changes completely |
| **Victim Gender** | 1 point | Consistent target preference |
| **Age Range** | 1 point | Predators have age preferences |

**Score Interpretation:**
- 🟥 **4 points** → Perfect match (high confidence link)
- 🟧 **3 points** → Strong match
- 🟨 **2 points** → Possible match
- ⚪ **0-1 points** → Unlikely link (not shown)

---

## ✨ Features

### 🔗 Interactive Case Linkage Web
- Force-directed graph visualization
- Nodes colored by link strength (red → orange → yellow → gray)
- Edge thickness proportional to similarity score
- Click any node → view full case details
- Hover any edge → see why cases are linked

### 🎛️ Smart Filtering
Filter cases by:
- Victim Gender (Male/Female/Other)
- Location Type (Home, Street, Alley, Park, etc.)
- Killing Method (Stabbing, Strangulation, Shooting, etc.)
- Age Range (13-17, 18-24, 25-34, etc.)

### 👮 Investigator Session Login
- No personal accounts — all investigators share live data
- Badge ID authentication (e.g., `INV-0427`)
- Optional session code (`NVEST-2024`)
- Session persists via localStorage

### 📊 Intelligence Dashboard
- Active cases count & risk metrics
- Top linked case clusters
- Real-time intelligence feed
- System status monitoring

### 🎨 Cinematic UI
- Navy blue + dark red theme
- Floating animated stars background
- Glass morphism sidebar & topbar
- Pulsing red accents & glows
- Live surveillance feed corner element

---

## 📁 Project Structure
src/
├── components/
│ ├── ui/
│ │ ├── Button.tsx
│ │ ├── Card.tsx
│ │ ├── Badge.tsx
│ │ └── Input.tsx
│ ├── CaseCard.tsx
│ ├── EvidencePanel.tsx
│ ├── TimelineView.tsx
│ ├── AlertBadge.tsx
│ └── BackgroundStars.tsx
├── pages/
│ ├── LoginPage.tsx
│ ├── DashboardPage.tsx
│ ├── CaseDetailsPage.tsx
│ ├── CasesPage.tsx
│ ├── LinkAnalysisPage.tsx
│ └── SettingsPage.tsx
├── layout/
│ ├── Sidebar.tsx
│ └── Topbar.tsx
├── context/
│ └── AuthContext.tsx
├── data.ts # 55+ cases with victim profiles
└── App.tsx

text

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/nvest-intelligence.git

# Navigate to project
cd nvest-intelligence

# Install dependencies
npm install

# Install graph visualization library
npm install react-force-graph d3

# Start development server
npm run dev
Login Credentials (Demo)
Field	Value
Badge ID	INV-0427 (or any INV-xxxx format)
Session Code	(leave empty) or NVEST-2024
🗂️ Data Statistics
Total Cases: 55+

Category	Count
Male Victims	32
Female Victims	23
Age 18-24	14
Age 25-34	17
Age 35-44	11
Age 65+	5
Location Types: Home, Street, Alley, Park, Highway, Forest, Hotel, Warehouse, Riverfront, Vehicle, Apartment

Killing Methods: Stabbing, Strangulation, Shooting, Blunt Force, Poisoning, Suffocation, Asphyxiation, Dismemberment

🛠️ Built With
React 18 + TypeScript

Vite - Build tool

Tailwind CSS - Styling

React Force Graph - Case linkage visualization

React Router DOM - Navigation

Local Storage - Session persistence

🎨 Design System
Colors
css
Primary Navy:    #0a0e2a, #0f172a
Dark Red:        #7f1d1d, #991b1b, #dc2626
Text:            White with opacity variations
Animations
Floating stars (20-40s cycles)

Scan line effect (8s loop)

Border pulse (2s cycle)

Glow effects on active elements

🔮 Future Roadmap
Real-time database integration (Supabase/PostgreSQL)

Machine learning similarity scoring

PDF case report export

Multi-investigator real-time collaboration

Mobile-responsive design improvements

Dark/light theme toggle

📄 License
MIT © Nvest Intelligence

🙏 Acknowledgments
Inspired by real FBI behavioral analysis units

Victim-profile algorithm based on criminal psychology research

UI design influenced by modern intelligence dashboards

📧 Contact
For questions or contributions, please open an issue on GitHub.

Built for investigators, by developers.
"When evidence is silent, patterns speak."

