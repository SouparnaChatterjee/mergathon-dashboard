"use client";

import Link from "next/link";
import { Team, Contributor } from "../types";
import { GitPullRequest, CheckCircle2, MessageSquare, PlusCircle } from "lucide-react";

interface TeamCardProps {
  team: Team;
  allContributors: Contributor[];
  totalScoreCombined: number;
}

export default function TeamCard({ team, allContributors, totalScoreCombined }: TeamCardProps) {
  const isAlpha = team.name.toLowerCase().includes("alpha");
  const teamClass = isAlpha ? "team-alpha" : "team-beta";
  const progressColor = isAlpha ? "blue" : "violet";
  
  // Calculate percentage of total score
  const scorePercentage = totalScoreCombined > 0 
    ? Math.round((team.totalScore / totalScoreCombined) * 100) 
    : 0;

  // Get contributor details for team members to display their avatars
  const memberContributors = allContributors.filter(c => 
    team.members.includes(c.username)
  );

  return (
    <div className={`card team-card ${teamClass}`}>
      <div className="team-header">
        <h3 className="team-name">{team.name}</h3>
        <span className="team-score-badge">{team.totalScore} pts</span>
      </div>

      <div className="team-stats-row">
        <div className="team-stat">
          <div className="team-stat-value" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "4px" }}>
            <GitPullRequest size={16} className={isAlpha ? "text-blue" : "text-violet"} style={{ color: team.color }} />
            <span>{team.totalPrsMerged}</span>
          </div>
          <div className="team-stat-label">Merged PRs</div>
        </div>
        <div className="team-stat">
          <div className="team-stat-value" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "4px" }}>
            <MessageSquare size={16} style={{ color: "var(--accent-cyan)" }} />
            <span>{team.totalPrsReviewed}</span>
          </div>
          <div className="team-stat-label">Reviews</div>
        </div>
        <div className="team-stat">
          <div className="team-stat-value" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "4px" }}>
            <CheckCircle2 size={16} style={{ color: "var(--accent-emerald)" }} />
            <span>{team.totalIssuesClosed}</span>
          </div>
          <div className="team-stat-label">Issues Closed</div>
        </div>
      </div>

      <div className="progress-bar-container">
        <div className="progress-label">
          <span>Event Contribution Share</span>
          <span>{scorePercentage}%</span>
        </div>
        <div className="progress-bar">
          <div 
            className={`progress-fill ${progressColor}`} 
            style={{ width: `${scorePercentage}%` }}
          />
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "12px" }}>
        <span style={{ fontSize: "13px", color: "var(--text-secondary)", fontWeight: 500 }}>
          Members ({team.members.length})
        </span>
        <div className="avatar-stack">
          {memberContributors.map((c) => (
            <Link key={c.username} href={`/contributors/${c.username}`} title={c.username}>
              <img 
                src={c.avatarUrl} 
                alt={c.username} 
                className="avatar"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80`;
                }}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
