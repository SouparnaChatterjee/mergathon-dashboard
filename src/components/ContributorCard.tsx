"use client";

import Link from "next/link";
import { Contributor } from "../types";
import { GitPullRequest, Award, Flame } from "lucide-react";

interface ContributorCardProps {
  contributor: Contributor;
  rank: number;
}

export default function ContributorCard({ contributor, rank }: ContributorCardProps) {
  const getRankColor = (rank: number) => {
    if (rank === 1) return "var(--accent-amber)";
    if (rank === 2) return "var(--text-secondary)";
    if (rank === 3) return "#d97706"; // Bronze
    return "var(--text-tertiary)";
  };

  return (
    <Link href={`/contributors/${contributor.username}`} style={{ textDecoration: "none" }}>
      <div 
        className="card" 
        style={{ 
          display: "flex", 
          alignItems: "center", 
          gap: "16px",
          padding: "16px 20px",
          position: "relative",
          overflow: "hidden"
        }}
      >
        {/* Rank number visual */}
        <div 
          style={{ 
            fontSize: "24px", 
            fontWeight: 800, 
            color: getRankColor(rank),
            minWidth: "28px",
            textAlign: "center"
          }}
        >
          #{rank}
        </div>

        {/* Avatar */}
        <img 
          src={contributor.avatarUrl} 
          alt={contributor.username}
          style={{
            width: "48px",
            height: "48px",
            borderRadius: "var(--radius-full)",
            objectFit: "cover",
            border: "2px solid var(--border-primary)"
          }}
          onError={(e) => {
            (e.target as HTMLImageElement).src = `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80`;
          }}
        />

        {/* Info */}
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <h4 style={{ fontSize: "16px", fontWeight: 700, color: "var(--text-primary)" }}>
              {contributor.username}
            </h4>
            {contributor.activityLevel === "High" && (
              <span title="High Activity">
                <Flame size={14} style={{ color: "var(--accent-rose)" }} />
              </span>
            )}
          </div>
          <span 
            style={{ 
              fontSize: "12px", 
              color: contributor.team.includes("Alpha") ? "var(--accent-blue)" : "var(--accent-violet)",
              fontWeight: 600
            }}
          >
            {contributor.team}
          </span>
        </div>

        {/* Score and Merged PRs */}
        <div style={{ textAlign: "right" }}>
          <div 
            style={{ 
              fontSize: "18px", 
              fontWeight: 800, 
              color: "var(--accent-blue)",
              display: "flex", 
              alignItems: "center", 
              justifyContent: "flex-end", 
              gap: "4px" 
            }}
          >
            <Award size={16} />
            <span>{contributor.score}</span>
          </div>
          <div 
            style={{ 
              fontSize: "12px", 
              color: "var(--text-secondary)",
              display: "flex", 
              alignItems: "center", 
              justifyContent: "flex-end", 
              gap: "4px" 
            }}
          >
            <GitPullRequest size={12} />
            <span>{contributor.prsMerged} merged</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
