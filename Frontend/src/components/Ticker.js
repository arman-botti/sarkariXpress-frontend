"use client";
import { useEffect, useState } from "react";

export default function Ticker({ data: initialData }) {
  const [items, setItems] = useState(initialData || []);
  const [date, setDate] = useState("");

  useEffect(() => {
    setDate(
      new Date().toLocaleDateString("en-IN", {
        weekday: "short",
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    );
  }, []);

  const icons = ["🔵", "🟢", "🔴", "🟡"];

  return (
    <div style={{ background: "#1a3faa", color: "#fff", overflow: "hidden" }}>
      <div
        style={{
          maxWidth: 1360,
          margin: "0 auto",
          padding: "0 24px",
          display: "flex",
          alignItems: "stretch",
          height: 38,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            paddingRight: 20,
            borderRight: "1px solid rgba(255,255,255,0.2)",
            flexShrink: 0,
            fontWeight: 700,
            fontSize: 11,
          }}
        >
          🔴 LIVE
        </div>

        <div
          style={{
            flex: 1,
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            paddingLeft: 20,
          }}
        >
          <div
            style={{
              display: "flex",
              animation: "scroll-ticker 40s linear infinite",
              whiteSpace: "nowrap",
            }}
          >
            {[...items, ...items].map((item, i) => (
              <a
                key={i}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  paddingRight: 56,
                  fontSize: 12.5,
                  opacity: 0.9,
                  color: "#fff",
                  textDecoration: "none",
                }}
              >
                {icons[i % 4]} {item.title}
              </a>
            ))}
          </div>
        </div>

        <div
          style={{
            paddingLeft: 20,
            borderLeft: "1px solid rgba(255,255,255,0.2)",
            display: "flex",
            alignItems: "center",
            fontSize: 12,
            opacity: 0.75,
            flexShrink: 0,
          }}
        >
          {date}
        </div>
      </div>

      {/* FIXED STYLE */}
      <style jsx>{`
        @keyframes scroll-ticker {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
}
