// frontend/src/app/layout.js
import "./globals.css";

export const metadata = {
  title: "SarkariXpress — India's #1 Govt Job & Result Portal 2026",
  description: "Latest Sarkari Result, Govt Jobs, Admit Cards, Answer Keys — updated every 5 minutes",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
