// frontend/src/components/Sidebar.js
"use client";
import { useState } from "react";

const STATES = ["UP","Bihar","MP","Rajasthan","Delhi","Haryana","Punjab","Gujarat","Maharashtra","Karnataka","Tamil Nadu","W. Bengal"];
const CATEGORIES = [
  { icon:"🏛️", label:"UPSC / IAS" },
  { icon:"🚂", label:"Railway (RRB)" },
  { icon:"🏦", label:"Banking (IBPS/SBI)" },
  { icon:"👮", label:"Police / SSC" },
  { icon:"🎖️", label:"Defence / Army" },
  { icon:"📖", label:"Teaching (TET/CTET)" },
  { icon:"🏥", label:"Medical (NEET/AIIMS)" },
  { icon:"🌐", label:"State PSC" },
];

function SideCard({ head, icon, iconBg, children }) {
  return (
    <div style={{ background:"var(--white)", border:"1px solid var(--border)", borderRadius:16, overflow:"hidden", boxShadow:"var(--shadow)" }}>
      <div style={{ padding:"14px 18px", borderBottom:"1px solid var(--border)", fontSize:13, fontWeight:700, color:"var(--text)", display:"flex", alignItems:"center", gap:8 }}>
        <span style={{ width:24, height:24, borderRadius:6, background:iconBg, display:"flex", alignItems:"center", justifyContent:"center", fontSize:12 }}>{icon}</span>
        {head}
      </div>
      <div style={{ padding:"14px 16px" }}>{children}</div>
    </div>
  );
}

export default function Sidebar({ summary = [], highlights = [] }) {
  const [selState, setSelState] = useState("");

  const counts = {};
  summary.forEach(s => { counts[s._id] = s.count; });

  return (
    <aside style={{ display:"flex", flexDirection:"column", gap:18 }}>

      {/* Quick Links */}
      <SideCard head="Quick Links" icon="⚡" iconBg="var(--accent-lt)">
        <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
          {[
            { icon:"💼", label:"Latest Jobs",   key:"job"        },
            { icon:"📋", label:"Results",        key:"result"     },
            { icon:"🎫", label:"Admit Cards",    key:"admit_card" },
            { icon:"🔑", label:"Answer Keys",    key:"answer_key" },
            { icon:"📚", label:"Syllabus",       key:"syllabus"   },
            { icon:"🎓", label:"Admission",      key:"admission"  },
          ].map(item => (
            <div key={item.key} style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"9px 12px", borderRadius:8, background:"var(--surface)", border:"1px solid var(--border)", fontSize:13, fontWeight:500, color:"var(--text2)", cursor:"pointer", transition:"all 0.18s" }}
              onMouseEnter={e => { e.currentTarget.style.background="var(--accent-lt)"; e.currentTarget.style.borderColor="var(--accent)"; e.currentTarget.style.color="var(--accent)"; }}
              onMouseLeave={e => { e.currentTarget.style.background="var(--surface)"; e.currentTarget.style.borderColor="var(--border)"; e.currentTarget.style.color="var(--text2)"; }}
            >
              <span style={{ display:"flex", alignItems:"center", gap:9 }}><span>{item.icon}</span>{item.label}</span>
              <span style={{ fontSize:10.5, fontWeight:700, background:"var(--accent-lt)", color:"var(--accent)", padding:"2px 8px", borderRadius:99 }}>
                {counts[item.key] || 0}
              </span>
            </div>
          ))}
        </div>
      </SideCard>

      {/* Today's Highlights */}
      {highlights.length > 0 && (
        <SideCard head="Today's Highlights" icon="🔔" iconBg="var(--red-lt)">
          <div>
            {highlights.slice(0,5).map((h, i) => (
              <a key={i} href={h.link} target="_blank" rel="noopener noreferrer"
                style={{ display:"flex", gap:12, padding:"10px 0", borderBottom: i < 4 ? "1px solid var(--border)" : "none", cursor:"pointer", textDecoration:"none" }}>
                <span style={{ fontSize:11, fontWeight:800, color:"var(--muted)", flexShrink:0, marginTop:2, width:18 }}>0{i+1}</span>
                <span style={{ fontSize:12.5, color:"var(--text2)", lineHeight:1.5 }}>{h.title}</span>
              </a>
            ))}
          </div>
        </SideCard>
      )}

      {/* Exam Categories */}
      <SideCard head="Exam Categories" icon="📁" iconBg="var(--accent-lt)">
        <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
          {CATEGORIES.map((cat, i) => (
            <div key={i} style={{ display:"flex", alignItems:"center", gap:10, padding:"9px 12px", borderRadius:8, background:"var(--surface)", border:"1px solid var(--border)", fontSize:13, fontWeight:500, color:"var(--text2)", cursor:"pointer", transition:"all 0.18s" }}
              onMouseEnter={e => { e.currentTarget.style.background="var(--accent-lt)"; e.currentTarget.style.borderColor="var(--accent)"; e.currentTarget.style.color="var(--accent)"; }}
              onMouseLeave={e => { e.currentTarget.style.background="var(--surface)"; e.currentTarget.style.borderColor="var(--border)"; e.currentTarget.style.color="var(--text2)"; }}
            >
              <span style={{ fontSize:16 }}>{cat.icon}</span>
              {cat.label}
              <span style={{ marginLeft:"auto", color:"var(--muted)", fontSize:12 }}>›</span>
            </div>
          ))}
        </div>
      </SideCard>

      {/* State Filter */}
      <SideCard head="State-wise Jobs" icon="🗺️" iconBg="var(--orange-lt)">
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:7 }}>
          {STATES.map(state => (
            <div key={state}
              onClick={() => setSelState(selState === state ? "" : state)}
              style={{ textAlign:"center", padding:"8px 6px", borderRadius:7, fontSize:11.5, fontWeight:600, cursor:"pointer", transition:"all 0.18s",
                background: selState === state ? "var(--accent)" : "var(--surface)",
                border: `1px solid ${selState === state ? "var(--accent)" : "var(--border)"}`,
                color: selState === state ? "#fff" : "var(--text2)",
              }}
            >
              {state}
            </div>
          ))}
        </div>
      </SideCard>

    </aside>
  );
}
