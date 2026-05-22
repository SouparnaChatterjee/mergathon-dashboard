"use client";

import { useData } from "../../context/DataContext";
import LeaderboardTable from "../../components/LeaderboardTable";
import { Trophy, HelpCircle } from "lucide-react";

export default function LeaderboardPage() {
  const { data } = useData();

  if (!data) return null;

  const { contributors } = data;

  return (
    <div>
      {/* Page Header */}
      <div className="page-header" style={{ marginBottom: "24px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "4px" }}>
          <Trophy size={28} style={{ color: "var(--accent-amber)" }} />
          <h2 className="page-title">Event Leaderboard</h2>
        </div>
        <p className="page-subtitle">Ranked participation and contribution metrics of all registered members</p>
      </div>

      {/* Rules Card */}
      <div 
        className="card" 
        style={{ 
          marginBottom: "32px", 
          background: "linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(139, 92, 246, 0.05) 100%)",
          borderColor: "var(--border-primary)" 
        }}
      >
        <div style={{ display: "flex", gap: "16px" }}>
          <div 
            style={{ 
              width: "40px", 
              height: "40px", 
              borderRadius: "var(--radius-md)", 
              background: "rgba(59, 130, 246, 0.1)", 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "center",
              color: "var(--accent-blue)",
              flexShrink: 0
            }}
          >
            <HelpCircle size={20} />
          </div>
          <div>
            <h4 style={{ fontSize: "15px", fontWeight: 700, color: "var(--text-primary)", marginBottom: "4px" }}>
              How is the score calculated?
            </h4>
            <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.5 }}>
              Participation scores are weighted heavily towards completing and reviewing code changes:
              <span style={{ display: "inline-flex", gap: "12px", marginLeft: "12px", flexWrap: "wrap", marginTop: "4px", fontWeight: 500 }}>
                <span style={{ color: "var(--accent-emerald)" }}>✓ Merged PR: +10 pts</span>
                <span style={{ color: "var(--accent-blue)" }}>⚡ Opened PR: +5 pts</span>
                <span style={{ color: "var(--accent-violet)" }}>💬 PR Review: +3 pts</span>
                <span style={{ color: "var(--accent-emerald)" }}>✓ Issue Solved: +4 pts</span>
                <span style={{ color: "var(--accent-amber)" }}>⚙️ Issue Opened: +2 pts</span>
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Leaderboard Table with full filtering capability */}
      <div className="card">
        <LeaderboardTable contributors={contributors} showSearchAndFilters={true} />
      </div>
    </div>
  );
}
