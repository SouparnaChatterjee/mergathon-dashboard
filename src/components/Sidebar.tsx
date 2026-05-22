"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Trophy, Users, GitPullRequest, ShieldAlert } from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Dashboard", icon: LayoutDashboard },
    { href: "/leaderboard", label: "Leaderboard", icon: Trophy },
    { href: "/teams", label: "Teams", icon: Users },
  ];

  return (
    <aside className={`sidebar ${isOpen ? "open" : ""}`}>
      <div className="sidebar-logo">
        <div className="sidebar-logo-icon">CV</div>
        <div>
          <h1 className="sidebar-logo-text">Mergathon</h1>
          <span className="sidebar-logo-sub">Dashboard</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className={`sidebar-link ${isActive ? "active" : ""}`}
            >
              <Icon />
              <span>{link.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "12px", color: "var(--text-tertiary)" }}>
          <ShieldAlert size={14} style={{ color: "var(--accent-violet)" }} />
          <span>Mergathon v1.0.0</span>
        </div>
      </div>
    </aside>
  );
}
