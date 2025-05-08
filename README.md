# 🌌 JupBoard – Contributor Reputation Tracker for Jupiverse

**JupBoard** is a contributor reputation dashboard built for the Jupiter DAO ecosystem. It provides visibility into GitHub-based contributions by allowing users to link their wallet and GitHub account, calculate a reputation score, and be ranked transparently on a public leaderboard.

---

## ✨ Features

- 🔐 Wallet + GitHub onboarding form
- ⚙️ GitHub API-based PR contribution tracking
- 📊 Reputation score calculation (merged PR × 10)
- 🏆 Leaderboard sorted by contributor score
- 👤 Profile pages showing wallet, GitHub info, PR stats, and avatar
- 🔄 Real-time updates via Supabase backend

---

## 🖼 UI Screenshots

> Place these images inside `public/MainPhoto.PNG` and adjust paths if needed.

---

## 🧠 Tech Stack

| Layer       | Tech Used                      |
|-------------|-------------------------------|
| Frontend    | React + Vite + TypeScript      |
| Styling     | Tailwind CSS                   |
| Backend     | Supabase (PostgreSQL + API)    |
| Data Source | GitHub REST API                |
| Hosting     | Vercel (suggested)             |

---

## ⚙️ Local Setup

```bash
git clone https://github.com/bytemaster333/jupboard.git
cd jupboard
npm install
cp .env.example .env
# Add your Supabase credentials into .env
npm run dev
```
## 🔐 Environment Variables

Make sure to set your own credentials in a .env file:
```bash
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```
Do not commit .env files or sensitive credentials.

## 🛣 Roadmap – What's Next?

### 📚 Reputation System Enhancements
✅ Score breakdown: PR count → score mapping displayed in UI

🔧 DAO-configurable scoring weights (score_rules.json)

🧩 Integration with forum contributions, voting activity (e.g., Snapshot)

### 🏅 Contributor Recognition & Incentives
🏆 Dynamic badge system: “Top 3”, “Early Contributor”, “Weekly Warrior”

📆 Season-based contribution tracking (DAO-wide campaigns)

🔄 Manual “Update My Score” button for real-time resync

### 🛠 Workgroup & Admin Tools
🗂 Workgroup dashboards for filtering/searching contributors

🔍 Skill tagging or contribution type indicators

✅ Reputation-based contributor recommendations for bounties

### 📢 Governance Integration
🗳 Proposal comment weighting by contributor score

🪙 Future potential: token or NFT-based rewards for top contributors
