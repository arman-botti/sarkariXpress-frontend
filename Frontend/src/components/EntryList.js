// frontend/src/components/EntryList.js
"use client";

const CONFIG = {
  job:        { bg: "var(--accent-lt)", color: "var(--accent)",  dot: "#1a3faa", label: "Job"        },
  result:     { bg: "var(--green-lt)",  color: "var(--green)",   dot: "#0a8754", label: "Result"     },
  admit_card: { bg: "var(--red-lt)",    color: "var(--red)",     dot: "#e63946", label: "Admit Card" },
  answer_key: { bg: "var(--purple-lt)", color: "var(--purple)",  dot: "#6d28d9", label: "Answer Key" },
  syllabus:   { bg: "var(--teal-lt)",   color: "var(--teal)",    dot: "#0891b2", label: "Syllabus"   },
  admission:  { bg: "var(--orange-lt)", color: "var(--orange)",  dot: "#e07b00", label: "Admission"  },
  important:  { bg: "var(--pink-lt)",   color: "var(--pink)",    dot: "#db2777", label: "Update"     },
  education:  { bg: "var(--teal-lt)",   color: "var(--teal)",    dot: "#0891b2", label: "Education"  },
};

export default function EntryList({ items = [], category = "job" }) {
  const cfg = CONFIG[category] || CONFIG.job;

  if (!items.length) return (
    <div style={{ padding: "24px 0", textAlign: "center", color: "var(--muted)", fontSize: 13 }}>
      Loading latest updates...
    </div>
  );

  return (
    <div>
      {items.map((item, i) => (
        <a key={i} href={item.link} target="_blank" rel="noopener noreferrer"
          style={{
            display: "flex", alignItems: "flex-start", gap: 14,
            padding: "11px 0", borderBottom: i < items.length - 1 ? "1px solid var(--border)" : "none",
            cursor: "pointer", transition: "padding-left 0.18s", textDecoration: "none",
          }}
          onMouseEnter={e => {
            e.currentTarget.style.paddingLeft = "6px";
            e.currentTarget.querySelector(".etitle").style.color = "var(--accent)";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.paddingLeft = "0";
            e.currentTarget.querySelector(".etitle").style.color = "var(--text)";
          }}
        >
          {/* Dot */}
          <span style={{ width:7, height:7, borderRadius:"50%", background:cfg.dot, marginTop:7, flexShrink:0 }} />

          {/* Content */}
          <div style={{ flex:1, minWidth:0 }}>
            <div className="etitle" style={{ fontSize:13.5, fontWeight:600, color:"var(--text)", lineHeight:1.45, marginBottom:5, transition:"color 0.18s" }}>
              {item.title}
            </div>
            <div style={{ display:"flex", alignItems:"center", gap:8, flexWrap:"wrap" }}>
              {/* Category chip */}
              <span style={{ fontSize:10, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.4px", padding:"2px 8px", borderRadius:4, background:cfg.bg, color:cfg.color }}>
                {item.organization || cfg.label}
              </span>
              {/* Badge */}
              {item.badge === "OUT" && (
                <span style={{ fontSize:9, fontWeight:800, letterSpacing:1, textTransform:"uppercase", background:"var(--green)", color:"#fff", padding:"2px 6px", borderRadius:3 }}>OUT</span>
              )}
              {item.badge === "NEW" && (
                <span style={{ fontSize:9, fontWeight:800, letterSpacing:1, textTransform:"uppercase", background:"var(--red)", color:"#fff", padding:"2px 6px", borderRadius:3 }}>NEW</span>
              )}
              {item.badge === "HOT" && (
                <span style={{ fontSize:9, fontWeight:800, letterSpacing:1, textTransform:"uppercase", background:"var(--orange)", color:"#fff", padding:"2px 6px", borderRadius:3 }}>HOT</span>
              )}
              {/* Date */}
              <span style={{ fontSize:11, color:"var(--muted)", fontWeight:500 }}>
                {item.scrapedAt ? new Date(item.scrapedAt).toLocaleDateString("en-IN", { day:"numeric", month:"short", year:"numeric" }) : "Latest"}
              </span>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
}
