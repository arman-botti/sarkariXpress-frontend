// frontend/src/components/Ticker.js
"use client";
import { useEffect, useState } from "react";

export default function Ticker() {
  const [items, setItems] = useState([]);
  const [date, setDate]   = useState("");

  useEffect(() => {
    setDate(new Date().toLocaleDateString("en-IN", {
      weekday: "short", day: "numeric", month: "short", year: "numeric"
    }));

    async function load() {
      try {
        const res  = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/jobs/ticker`);
        const data = await res.json();
        if (data.success) setItems(data.data);
      } catch {
        // fallback — show nothing
      }
    }
    load();
    const t = setInterval(load, 5 * 60 * 1000);
    return () => clearInterval(t);
  }, []);

  const icons = ["🔵","🟢","🔴","🟡"];

  return (
    <div style={{ background: "var(--accent)", color: "#fff", overflow: "hidden", position: "relative", zIndex: 200 }}>
      <div style={{ maxWidth: 1360, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "stretch", height: 38 }}>

        {/* LIVE label */}
        <div style={{ display:"flex", alignItems:"center", gap:8, paddingRight:20, borderRight:"1px solid rgba(255,255,255,0.2)", flexShrink:0, fontWeight:700, fontSize:11, letterSpacing:"1.5px", textTransform:"uppercase" }}>
          <span style={{ width:7, height:7, background:"#ff4d4d", borderRadius:"50%", boxShadow:"0 0 0 3px rgba(255,77,77,0.3)", display:"inline-block", animation:"livepulse 1.4s ease infinite" }} />
          Live
        </div>

        {/* Scrolling ticker */}
        <div style={{ flex:1, overflow:"hidden", display:"flex", alignItems:"center", paddingLeft:20 }}>
          <div style={{ display:"flex", animation:"scroll-ticker 40s linear infinite", whiteSpace:"nowrap" }}>
            {[...items, ...items].map((item, i) => (
              <a key={i} href={item.link} target="_blank" rel="noopener noreferrer"
                style={{ display:"inline-flex", alignItems:"center", gap:6, paddingRight:56, fontSize:12.5, opacity:0.9, cursor:"pointer" }}>
                {icons[i % 4]} {item.title}
              </a>
            ))}
          </div>
        </div>

        {/* Date */}
        <div style={{ paddingLeft:20, borderLeft:"1px solid rgba(255,255,255,0.2)", display:"flex", alignItems:"center", fontSize:12, opacity:0.75, flexShrink:0 }}>
          {date}
        </div>
      </div>

      <style>{`
        @keyframes livepulse { 0%,100%{box-shadow:0 0 0 2px rgba(255,77,77,0.4)} 50%{box-shadow:0 0 0 5px rgba(255,77,77,0)} }
        @keyframes scroll-ticker { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
      `}</style>
    </div>
  );
}
