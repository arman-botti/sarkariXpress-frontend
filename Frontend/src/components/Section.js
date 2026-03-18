"use client";

import EntryList from "./EntryList";

export default function Section({ title, icon, iconBg, items, category, href = "#" }) {
  return (
    <div style={{ marginBottom: 28 }}>
      {/* Head */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 14,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            fontSize: 16,
            fontWeight: 700,
            color: "var(--text)",
          }}
        >
          <span
            style={{
              width: 28,
              height: 28,
              borderRadius: 7,
              background: iconBg,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 14,
            }}
          >
            {icon}
          </span>
          {title}
        </div>

        <a
          href={href}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 4,
            fontSize: 12.5,
            fontWeight: 600,
            color: "var(--accent)",
            padding: "5px 12px",
            borderRadius: 7,
            border: "1px solid var(--border)",
            transition: "all 0.18s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "var(--accent-lt)";
            e.currentTarget.style.borderColor = "var(--accent)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.borderColor = "var(--border)";
          }}
        >
          View All →
        </a>
      </div>

      {/* Divider */}
      <div style={{ borderTop: "1.5px solid var(--border)", marginBottom: 4 }} />

      {/* List */}
      <EntryList items={items} category={category} />
    </div>
  );
}