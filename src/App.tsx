import { useState, useEffect, useRef } from "react";
import { LISTINGS, SAMPLE_BOOKINGS, type Listing, type BookingRecord, type AccomType } from "./data";
import phnomPenhBg from "./imports/independancemonument.jpg";
import jomrorkLogo from "./imports/image-1.png";

// ─── Icons ────────────────────────────────────────────────────────────────────
const IC = {
  Home: ({ on }: { on?: boolean }) => (
    <svg viewBox="0 0 24 24" fill={on ? "#173A5E" : "none"} stroke={on ? "#173A5E" : "#9ca3af"} strokeWidth={1.8} className="w-6 h-6">
      <path d="M3 12L12 3l9 9" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 10v9a1 1 0 001 1h4v-5h4v5h4a1 1 0 001-1v-9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  Calendar: ({ on }: { on?: boolean }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke={on ? "#173A5E" : "#9ca3af"} strokeWidth={1.8} className="w-6 h-6">
      <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" strokeLinecap="round" /><line x1="8" y1="2" x2="8" y2="6" strokeLinecap="round" /><line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  ),
  Heart: ({ on, sm }: { on?: boolean; sm?: boolean }) => (
    <svg viewBox="0 0 24 24" fill={on ? "#ef4444" : "none"} stroke={on ? "#ef4444" : "#6b7280"} strokeWidth={1.8} className={sm ? "w-5 h-5" : "w-6 h-6"}>
      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" strokeLinecap="round" />
    </svg>
  ),
  Msg: ({ on }: { on?: boolean }) => (
    <svg viewBox="0 0 24 24" fill={on ? "#173A5E" : "none"} stroke={on ? "#173A5E" : "#9ca3af"} strokeWidth={1.8} className="w-6 h-6">
      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  User: ({ on }: { on?: boolean }) => (
    <svg viewBox="0 0 24 24" fill={on ? "#173A5E" : "none"} stroke={on ? "#173A5E" : "#9ca3af"} strokeWidth={1.8} className="w-6 h-6">
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" strokeLinecap="round" /><circle cx="12" cy="7" r="4" />
    </svg>
  ),
  Search: ({ color = "currentColor" }: { color?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.8} className="w-5 h-5">
      <circle cx="11" cy="11" r="7" /><path d="M21 21l-4.35-4.35" strokeLinecap="round" />
    </svg>
  ),
  Back: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} className="w-5 h-5">
      <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  Star: ({ on }: { on?: boolean }) => (
    <svg viewBox="0 0 24 24" fill={on ? "#f59e0b" : "#e5e7eb"} className="w-3.5 h-3.5">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
  StarLg: ({ on }: { on?: boolean }) => (
    <svg viewBox="0 0 24 24" fill={on ? "#f59e0b" : "#e5e7eb"} className="w-5 h-5">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
  Pin: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-3.5 h-3.5">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" /><circle cx="12" cy="9" r="2.5" />
    </svg>
  ),
  PinSm: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" /><circle cx="12" cy="9" r="2.5" />
    </svg>
  ),
  Shield: ({ color = "#22c55e" }: { color?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.8} className="w-4 h-4">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  Check: ({ color = "#22c55e" }: { color?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <path d="M5 12l4 4L19 7" />
    </svg>
  ),
  CheckCircle: () => (
    <svg viewBox="0 0 24 24" fill="none" className="w-16 h-16">
      <circle cx="12" cy="12" r="12" fill="#dcfce7" />
      <path d="M7 12l3.5 3.5L17 8.5" stroke="#22c55e" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  Video: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={1.8} className="w-4 h-4">
      <polygon points="23 7 16 12 23 17 23 7" fill="white" /><rect x="1" y="5" width="15" height="14" rx="2" />
    </svg>
  ),
  Play: () => (
    <svg viewBox="0 0 24 24" fill="white" className="w-12 h-12 drop-shadow-lg">
      <circle cx="12" cy="12" r="12" fill="rgba(0,0,0,0.5)" /><polygon points="10 8 16 12 10 16 10 8" />
    </svg>
  ),
  Filter: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
      <line x1="4" y1="6" x2="20" y2="6" strokeLinecap="round" /><line x1="8" y1="12" x2="16" y2="12" strokeLinecap="round" /><line x1="11" y1="18" x2="13" y2="18" strokeLinecap="round" />
    </svg>
  ),
  X: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} className="w-5 h-5">
      <line x1="18" y1="6" x2="6" y2="18" strokeLinecap="round" /><line x1="6" y1="6" x2="18" y2="18" strokeLinecap="round" />
    </svg>
  ),
  ChevronRight: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth={2} className="w-4 h-4">
      <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  Lightning: () => <svg viewBox="0 0 24 24" fill="#f59e0b" className="w-4 h-4"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>,
  Water: () => <svg viewBox="0 0 24 24" fill="#3b82f6" className="w-4 h-4"><path d="M12 2C12 2 5 10 5 15a7 7 0 0014 0c0-5-7-13-7-13z" /></svg>,
  Park: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth={2} className="w-4 h-4">
      <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M9 17V7h4a3 3 0 010 6H9" strokeLinecap="round" />
    </svg>
  ),
  Wifi: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth={1.8} className="w-4 h-4">
      <path d="M1.5 8.5a13.5 13.5 0 0121 0" strokeLinecap="round" /><path d="M5 12a9 9 0 0114 0" strokeLinecap="round" /><path d="M8.5 15.5a5 5 0 017 0" strokeLinecap="round" /><circle cx="12" cy="19" r="1" fill="#6b7280" />
    </svg>
  ),
  Phone: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.22 1.18 2 2 0 012.22 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.29 6.29l1.27-.27" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  Card: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
      <rect x="1" y="4" width="22" height="16" rx="2" /><line x1="1" y1="10" x2="23" y2="10" />
    </svg>
  ),
  QR: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
      <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><path d="M14 14h3v3h-3zM17 17h3v3h-3zM14 17v3" strokeLinecap="round" />
    </svg>
  ),
  GradCap: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4">
      <path d="M22 10v6M2 10l10-5 10 5-10 5-10-5z" strokeLinecap="round" strokeLinejoin="round" /><path d="M6 12v5c3 3 9 3 12 0v-5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  Building: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4">
      <rect x="3" y="3" width="18" height="18" rx="1" /><path d="M9 22V12h6v10M9 7h1M14 7h1M9 12h1M14 12h1" strokeLinecap="round" />
    </svg>
  ),
  Door: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4">
      <path d="M18 20V6a2 2 0 00-2-2H8a2 2 0 00-2 2v14" strokeLinecap="round" /><line x1="2" y1="20" x2="22" y2="20" strokeLinecap="round" /><circle cx="14" cy="12" r="1" fill="currentColor" />
    </svg>
  ),
  Users: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4">
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" strokeLinecap="round" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" strokeLinecap="round" />
    </svg>
  ),
  Lock: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4">
      <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0110 0v4" strokeLinecap="round" />
    </svg>
  ),
  Bell: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4">
      <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" strokeLinecap="round" />
    </svg>
  ),
  IdCard: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4">
      <rect x="2" y="5" width="20" height="14" rx="2" /><circle cx="8" cy="12" r="2" /><path d="M14 10h4M14 14h2" strokeLinecap="round" />
    </svg>
  ),
  BookOpen: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4">
      <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z" strokeLinecap="round" strokeLinejoin="round" /><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  Flag: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4">
      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" strokeLinecap="round" strokeLinejoin="round" /><line x1="4" y1="22" x2="4" y2="15" strokeLinecap="round" />
    </svg>
  ),
  FileText: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" strokeLinecap="round" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" strokeLinecap="round" /><line x1="16" y1="17" x2="8" y2="17" strokeLinecap="round" /><polyline points="10 9 9 9 8 9" />
    </svg>
  ),
  Coin: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4">
      <circle cx="12" cy="12" r="8" /><path d="M12 8v1M12 15v1M9.5 10.5a2.5 2.5 0 015 0c0 1.5-2.5 2-2.5 3.5" strokeLinecap="round" />
    </svg>
  ),
  CoinLg: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth={1.8} className="w-5 h-5">
      <circle cx="12" cy="12" r="8" /><path d="M12 8v1M12 15v1M9.5 10.5a2.5 2.5 0 015 0c0 1.5-2.5 2-2.5 3.5" strokeLinecap="round" />
    </svg>
  ),
  Info: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4">
      <circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" strokeLinecap="round" /><line x1="12" y1="8" x2="12.01" y2="8" strokeLinecap="round" />
    </svg>
  ),
  Coffee: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4">
      <path d="M18 8h1a4 4 0 010 8h-1" strokeLinecap="round" /><path d="M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z" strokeLinecap="round" /><line x1="6" y1="1" x2="6" y2="4" strokeLinecap="round" /><line x1="10" y1="1" x2="10" y2="4" strokeLinecap="round" /><line x1="14" y1="1" x2="14" y2="4" strokeLinecap="round" />
    </svg>
  ),
  ShoppingBag: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4">
      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" strokeLinecap="round" strokeLinejoin="round" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 01-8 0" strokeLinecap="round" />
    </svg>
  ),
  Medical: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4">
      <rect x="3" y="3" width="18" height="18" rx="2" /><line x1="12" y1="8" x2="12" y2="16" strokeLinecap="round" /><line x1="8" y1="12" x2="16" y2="12" strokeLinecap="round" />
    </svg>
  ),
  Bank: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4">
      <line x1="3" y1="22" x2="21" y2="22" strokeLinecap="round" /><line x1="3" y1="11" x2="21" y2="11" /><line x1="6" y1="11" x2="6" y2="22" strokeLinecap="round" /><line x1="10" y1="11" x2="10" y2="22" strokeLinecap="round" /><line x1="14" y1="11" x2="14" y2="22" strokeLinecap="round" /><line x1="18" y1="11" x2="18" y2="22" strokeLinecap="round" /><polygon points="12 2 20 7 4 7 12 2" />
    </svg>
  ),
  Send: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
      <line x1="22" y1="2" x2="11" y2="13" strokeLinecap="round" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  ),
  Map: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4">
      <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" /><line x1="8" y1="2" x2="8" y2="18" /><line x1="16" y1="6" x2="16" y2="22" />
    </svg>
  ),
  SortAsc: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4">
      <line x1="3" y1="6" x2="21" y2="6" strokeLinecap="round" /><line x1="3" y1="12" x2="15" y2="12" strokeLinecap="round" /><line x1="3" y1="18" x2="9" y2="18" strokeLinecap="round" />
    </svg>
  ),
  Contract: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" strokeLinecap="round" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" strokeLinecap="round" /><line x1="16" y1="17" x2="8" y2="17" strokeLinecap="round" /><line x1="10" y1="9" x2="8" y2="9" strokeLinecap="round" />
    </svg>
  ),
};

// ─── Brand components ─────────────────────────────────────────────────────────
const PP = "'Poppins','Helvetica Neue',Arial,sans-serif";

function JomrorkIcon({ size = 40, glow = false }: { size?: number; glow?: boolean }) {
  const r = Math.round(size * 0.22);
  return (
    <div style={{
      width: size, height: size, borderRadius: r, overflow: "hidden",
      flexShrink: 0, display: "block",
      boxShadow: glow
        ? "0 0 22px 8px rgba(251,211,77,0.55), 0 0 8px 2px rgba(245,197,24,0.4)"
        : "none",
    }}>
      <img src={jomrorkLogo} alt="Jomrork" style={{ width: "100%", height: "100%", display: "block", objectFit: "cover" }} />
    </div>
  );
}

function JomrorkLogo({ onDark = true, size = 38, glow = false }: { onDark?: boolean; size?: number; glow?: boolean }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 9, flexShrink: 0 }}>
      <JomrorkIcon size={size} glow={glow} />
      <span style={{
        fontFamily: PP, fontWeight: 800,
        fontSize: Math.round(size * 0.74),
        color: onDark ? "#ffffff" : "#173A5E",
        letterSpacing: "-0.01em", lineHeight: 1,
      }}>Jomrork</span>
    </div>
  );
}

// Header for Bookings/Saved/Messages/Profile — title only, no logo
function TabHeader({ title, subtitle, right }: { title: string; subtitle?: string; right?: React.ReactNode }) {
  return (
    <div className="bg-[#173A5E] pt-14 pb-4 px-4 shrink-0">
      <div className="flex items-center justify-between">
        <p style={{ fontFamily: PP, fontWeight: 700, fontSize: 20, color: "#fff", lineHeight: 1.15 }}>{title}</p>
        {right ?? <div className="w-9" />}
      </div>
      {subtitle && (
        <p className="text-white/55 text-xs mt-0.5">{subtitle}</p>
      )}
    </div>
  );
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function Stars({ n, lg }: { n: number; lg?: boolean }) {
  return (
    <span className="flex items-center gap-0.5">
      {[1,2,3,4,5].map(i => lg ? <IC.StarLg key={i} on={i <= Math.round(n)} /> : <IC.Star key={i} on={i <= Math.round(n)} />)}
    </span>
  );
}

type TagColor = "gray" | "navy" | "green" | "amber" | "red" | "outline";
function Tag({ label, color = "gray" }: { label: string; color?: TagColor }) {
  const cls: Record<TagColor, string> = {
    gray:    "bg-gray-100 text-gray-600",
    navy:    "bg-[#173A5E] text-white",
    green:   "bg-green-100 text-green-700",
    amber:   "bg-[#FEF4B0] text-[#B08010]",
    red:     "bg-red-100 text-red-600",
    outline: "border border-gray-300 text-gray-500 bg-white",
  };
  return <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${cls[color]}`}>{label}</span>;
}

function Avatar({ name, size = "md", bg = "#173A5E" }: { name: string; size?: "sm" | "md" | "lg"; bg?: string }) {
  const sz = { sm: "w-7 h-7 text-xs", md: "w-9 h-9 text-sm", lg: "w-12 h-12 text-base" };
  return (
    <div className={`rounded-full flex items-center justify-center text-white font-bold shrink-0 ${sz[size]}`} style={{ background: bg }}>
      {name.charAt(0).toUpperCase()}
    </div>
  );
}

// ─── Listing Card ─────────────────────────────────────────────────────────────
function ListingCard({ l, onPress, saved, onSave, isUserBooked }: {
  l: Listing; onPress: () => void; saved: boolean;
  onSave: (e: React.MouseEvent) => void; isUserBooked?: boolean;
}) {
  const unavailable = l.isBooked || isUserBooked;
  return (
    <div
      onClick={onPress}
      role="button" tabIndex={0}
      onKeyDown={e => e.key === "Enter" && onPress()}
      className="w-full text-left bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm cursor-pointer card-press"
    >
      <div className="relative h-44 bg-gray-200 overflow-hidden">
        <img src={l.images[0]} alt={l.title} className="w-full h-full object-cover" style={{ transition: "transform 0.4s ease", }} onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.04)")} onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

        {/* Verified + Heart */}
        <div className="absolute top-2 right-2 flex items-center gap-1.5">
          {l.verified && (
            <div className="flex items-center gap-1 bg-white/92 rounded-full px-1.5 py-0.5">
              <IC.Shield /><span className="text-[9px] font-bold text-green-700">Verified</span>
            </div>
          )}
          <button
            onClick={onSave}
            className="w-7 h-7 flex items-center justify-center bg-white/92 rounded-full shadow-sm active:scale-90 transition-transform shrink-0"
          >
            <IC.Heart sm on={saved} />
          </button>
        </div>

        {/* Video badge */}
        {l.hasVideo && (
          <div className="absolute bottom-2 right-2 flex items-center gap-1 bg-black/60 rounded-full px-2 py-1">
            <IC.Video /><span className="text-[9px] text-white font-medium">Video</span>
          </div>
        )}

        {/* Location */}
        <div className="absolute bottom-2 left-2.5 flex items-center gap-1 text-white/90">
          <IC.Pin /><span className="text-xs drop-shadow font-medium">{l.area}</span>
        </div>
      </div>

      <div className="p-3.5">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="font-bold text-gray-900 text-sm leading-tight">{l.title}</p>
            <p className="text-xs text-gray-500 mt-0.5 flex items-center gap-1">
              <IC.GradCap />{l.distanceToUni} to {l.nearUni}
            </p>
          </div>
          <div className="text-right shrink-0">
            <p className="font-bold text-[#173A5E] text-base leading-tight">${l.price}</p>
            <p className="text-[10px] text-gray-400">/month</p>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-2.5 flex-wrap">
          <Tag label={l.type} />
          <div className="flex items-center gap-1">
            <Stars n={l.rating} />
            <span className="text-xs font-semibold text-gray-700 ml-0.5">{l.rating}</span>
            <span className="text-xs text-gray-400">({l.reviewCount})</span>
          </div>
          <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full border ${unavailable ? "bg-red-50 border-red-100" : "bg-green-50 border-green-100"}`}>
            <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${unavailable ? "bg-red-500" : "bg-green-500"}`} />
            <span className={`text-[10px] font-semibold ${unavailable ? "text-red-600" : "text-green-700"}`}>{unavailable ? "Unavailable" : "Available"}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Sort Bar ─────────────────────────────────────────────────────────────────
type SortOpt = "none" | "rating" | "price_asc" | "price_desc";
function SortBar({ sort, onChange }: { sort: SortOpt; onChange: (s: SortOpt) => void }) {
  const opts: [SortOpt, string][] = [["rating", "Top Rated"], ["price_asc", "Price: Low–High"], ["price_desc", "Price: High–Low"]];
  return (
    <div className="flex items-center gap-2 flex-wrap">
      <div className="flex items-center gap-1.5 text-gray-500">
        <IC.SortAsc /><span className="text-xs font-medium">Sort by</span>
      </div>
      {opts.map(([v, label]) => (
        <button key={v} onClick={() => onChange(sort === v ? "none" : v)}
          className={`text-xs px-3 py-1.5 rounded-full border font-medium transition-colors active:scale-95 ${sort === v ? "bg-[#173A5E] text-white border-[#173A5E]" : "bg-white text-gray-600 border-gray-200"}`}>
          {label}
        </button>
      ))}
    </div>
  );
}

function applySortAndFilter(list: Listing[], sort: SortOpt) {
  if (sort === "none") return list;
  const sorted = [...list];
  if (sort === "rating") sorted.sort((a, b) => b.rating - a.rating);
  else if (sort === "price_asc") sorted.sort((a, b) => a.price - b.price);
  else sorted.sort((a, b) => b.price - a.price);
  return sorted;
}

// ─── SPLASH ───────────────────────────────────────────────────────────────────
function SplashScreen({ onDone }: { onDone: () => void }) {
  const [stage, setStage] = useState(0);
  useEffect(() => {
    const t1 = setTimeout(() => setStage(1), 100);
    const t2 = setTimeout(() => setStage(2), 700);
    const t3 = setTimeout(onDone, 2600);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onDone]);

  return (
    <div className="flex flex-col items-center justify-center h-full relative overflow-hidden"
      style={{ background: "linear-gradient(160deg, #0f2540 0%, #173A5E 55%, #1c4570 100%)" }}>

      {/* Animated rings — gold tint */}
      {[1,2,3].map(i => (
        <div key={i} className="absolute rounded-full pointer-events-none"
          style={{
            width: i * 200, height: i * 200,
            top: "50%", left: "50%",
            transform: "translate(-50%, -50%)",
            border: `1px solid rgba(251,211,77,${0.07 - i * 0.01})`,
            animation: `ping ${1.8 + i * 0.4}s ease-out ${i * 0.3}s infinite`,
          }} />
      ))}

      {/* Gold glow */}
      <div className="absolute w-72 h-72 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(251,211,77,0.10) 0%, transparent 70%)", top:"50%", left:"50%", transform:"translate(-50%,-50%)" }} />

      {/* Logo + wordmark */}
      <div className="relative z-10 flex flex-col items-center"
        style={{ transition: "opacity 0.6s ease, transform 0.6s cubic-bezier(0.34,1.56,0.64,1)", opacity: stage >= 1 ? 1 : 0, transform: stage >= 1 ? "translateY(0)" : "translateY(28px)" }}>

        <div className="mb-5">
          <JomrorkIcon size={88} />
        </div>

        <span style={{ fontFamily: PP, fontWeight: 800, fontSize: "clamp(2.4rem,8vw,3.2rem)", lineHeight: 1, color: "white", letterSpacing: "-0.01em" }}>
          Jomrork
        </span>
        <p className="text-white/45 text-[11px] mt-2 tracking-[0.2em] uppercase">You Study. We House.</p>
      </div>

      {/* Loading dots — gold */}
      <div className="absolute bottom-24 z-10 flex flex-col items-center gap-4"
        style={{ transition: "opacity 0.5s ease 0.4s", opacity: stage >= 2 ? 1 : 0 }}>
        <div className="flex gap-1.5">
          {[0,1,2].map(i => (
            <div key={i} className="rounded-full"
              style={{ width: 6, height: 6, background: "#FBD34D", animation: `bounce 1.1s ease-in-out ${i * 0.18}s infinite` }} />
          ))}
        </div>
        <p className="text-white/40 text-[10px] tracking-widest uppercase">Finding your home…</p>
      </div>
    </div>
  );
}

// ─── SUCCESS MODAL ────────────────────────────────────────────────────────────
function SuccessModal({ receiptNo, pointsEarned, onGoHome, onGoBookings }: {
  receiptNo: string; pointsEarned: number; onGoHome: () => void; onGoBookings: () => void;
}) {
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-3xl mx-6 p-6 text-center shadow-2xl slide-up w-full max-w-sm">
        <div className="flex justify-center mb-4">
          <IC.CheckCircle />
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-1">Booking Confirmed!</h2>
        <p className="text-sm text-gray-500 mb-3">Your payment was processed successfully.</p>
        <div className="bg-gray-50 rounded-xl px-4 py-2.5 mb-3 border border-gray-100">
          <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-0.5">Receipt Number</p>
          <p className="text-sm font-bold text-gray-800">{receiptNo}</p>
        </div>
        {/* Points earned */}
        <div className="bg-[#FFFBDD] border border-[#F0D94D] rounded-xl px-4 py-2.5 mb-5 flex items-center justify-center gap-2">
          <IC.CoinLg />
          <div>
            <p className="text-xs text-[#B08010] font-semibold">Points Earned</p>
            <p className="text-base font-black text-[#8C6408]">+{pointsEarned} pts</p>
          </div>
        </div>
        <div className="space-y-2.5">
          <button onClick={onGoBookings}
            className="w-full bg-[#173A5E] text-white font-bold py-3 rounded-full text-sm active:scale-95 transition-transform">
            See Receipt
          </button>
          <button onClick={onGoHome}
            className="w-full border border-gray-200 text-gray-700 font-semibold py-3 rounded-2xl text-sm active:scale-95 transition-transform">
            Go to Home
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── HOME SCREEN ──────────────────────────────────────────────────────────────
type CategoryFilter = { kind: "type" | "university" | "area"; value: string };

const HOME_PREVIEW_COUNT = 10;

function HomeAllListings({ onListing, savedIds, onSave, bookedByUser }: {
  onListing: (id: string) => void; savedIds: Set<string>;
  onSave: (id: string) => void; bookedByUser: Set<string>;
}) {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? LISTINGS : LISTINGS.slice(0, HOME_PREVIEW_COUNT);
  return (
    <div className="px-4 pt-5 pb-4">
      <div className="flex items-center justify-between mb-3">
        <p className="heading-font text-gray-900 text-[15px] font-bold">All Listings</p>
        <span className="text-xs text-gray-400">{LISTINGS.length} available</span>
      </div>
      <div className="space-y-3 stagger-list">
        {visible.map(l => (
          <ListingCard key={l.id} l={l} onPress={() => onListing(l.id)}
            saved={savedIds.has(l.id)} onSave={e => { e.stopPropagation(); onSave(l.id); }}
            isUserBooked={bookedByUser.has(l.id)} />
        ))}
      </div>
      {!showAll && LISTINGS.length > HOME_PREVIEW_COUNT && (
        <button onClick={() => setShowAll(true)}
          className="mt-4 w-full py-3 rounded-full border border-[#173A5E] text-[#173A5E] text-sm font-semibold active:bg-[#173A5E]/5 transition-colors">
          Show more
        </button>
      )}
      {showAll && (
        <button onClick={() => setShowAll(false)}
          className="mt-4 w-full py-3 rounded-2xl border border-gray-200 text-gray-500 text-sm font-semibold active:bg-gray-50 transition-colors">
          Show less
        </button>
      )}
    </div>
  );
}

function HomeScreen({ onListing, onSearch, onCategory, savedIds, onSave, bookedByUser, isGuest }: {
  onListing: (id: string) => void;
  onSearch: () => void;
  onCategory: (f: CategoryFilter) => void;
  savedIds: Set<string>;
  onSave: (id: string) => void;
  bookedByUser: Set<string>;
  isGuest: boolean;
}) {
  const sponsored = LISTINGS.filter(l => l.sponsored);
  const [adIdx, setAdIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setAdIdx(i => (i+1) % sponsored.length), 3800);
    return () => clearInterval(t);
  }, [sponsored.length]);

  const typeItems: { type: AccomType; label: string; img: string; Icon: () => React.ReactElement }[] = [
    { type: "Room",        label: "Rooms",        img: "https://images.unsplash.com/photo-1696762932825-2737db830bbe?w=300&h=300&fit=crop", Icon: IC.Door },
    { type: "Apartment",   label: "Apartments",   img: "https://images.unsplash.com/photo-1738168246881-40f35f8aba0a?w=300&h=300&fit=crop", Icon: IC.Building },
    { type: "Condo",       label: "Condos",       img: "https://images.unsplash.com/photo-1724582586529-62622e50c0b3?w=300&h=300&fit=crop", Icon: IC.Building },
    { type: "Shared House",label: "Shared House", img: "https://images.unsplash.com/photo-1688646953306-5ec93eab8c06?w=300&h=300&fit=crop", Icon: IC.Users },
  ];

  const UNIS = ["RUPP","ITC","RULE","Paragon","NUM","AUPP","CamEd","Zaman"];
  const AREAS = ["Toul Kork","Chamkarmon","Daun Penh","Sen Sok","Russei Keo","Meanchey"];

  const uniList = UNIS.map(u => ({ u, count: LISTINGS.filter(l => l.nearUni === u).length })).filter(x => x.count > 0);
  const areaList = AREAS.map(a => ({ a, count: LISTINGS.filter(l => l.area === a).length })).filter(x => x.count > 0);

  return (
    <div className="flex flex-col h-full bg-[#fbfaf7]">
      {/* Header */}
      <div className="bg-[#173A5E] pt-14 pb-4 px-4 shrink-0">
        <div className="flex items-center justify-between mb-3">
          <JomrorkLogo size={34} onDark glow />
          <div className="w-9 h-9 rounded-full bg-white/15 border border-white/25 flex items-center justify-center shrink-0">
            {isGuest ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth={1.8} className="w-5 h-5">
                <circle cx="12" cy="8" r="4" />
                <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" strokeLinecap="round" />
              </svg>
            ) : (
              <span className="text-white text-sm font-bold">SK</span>
            )}
          </div>
        </div>
        <button onClick={onSearch}
          className="w-full flex items-center gap-2 bg-white/15 border border-white/20 rounded-2xl px-3 py-2.5 active:bg-white/25 transition-colors">
          <IC.Search color="rgba(255,255,255,0.6)" />
          <span className="text-white/50 text-sm flex-1 text-left">Search by university, area, or type...</span>
          <IC.Filter />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto scroll-smooth-touch pb-2">

        {/* Ad Banner — only on the banner strip (not listing cards) */}
        <div className="px-4 pt-4">
          <button onClick={() => onListing(sponsored[adIdx].id)}
            className="relative w-full h-40 rounded-2xl overflow-hidden shadow-sm active:scale-[0.98] transition-transform">
            <img src={sponsored[adIdx].images[0]} alt="ad" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#173A5E]/85 to-transparent" />
            <div className="absolute top-2.5 left-2.5 flex items-center gap-1 bg-white/90 border border-gray-300 rounded px-1.5 py-0.5">
              <span className="text-[9px] font-black text-gray-500 tracking-wider">AD</span>
            </div>
            <div className="absolute inset-0 p-4 flex flex-col justify-end">
              <p className="text-white font-bold text-[15px] drop-shadow leading-tight">{sponsored[adIdx].title}</p>
              <p className="text-white/70 text-xs mt-0.5 flex items-center gap-1">
                <IC.Pin />{sponsored[adIdx].area} · ${sponsored[adIdx].price}/month
              </p>
            </div>
            <div className="absolute bottom-3 right-3 flex gap-1">
              {sponsored.map((_, i) => (
                <div key={i} className={`h-1.5 rounded-full transition-all ${i===adIdx ? "w-4 bg-white" : "w-1.5 bg-white/40"}`} />
              ))}
            </div>
          </button>
        </div>

        {/* ── Browse by Type ─────────────────────────── */}
        <div className="px-4 pt-5">
          <div className="flex items-center justify-between mb-3">
            <p className="heading-font text-gray-900 text-[15px] font-bold">Browse by Type</p>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {typeItems.map(({ type, label, img }) => {
              const count = LISTINGS.filter(l => l.type === type).length;
              return (
                <button key={type} onClick={() => onCategory({ kind: "type", value: type })}
                  className="relative rounded-2xl overflow-hidden aspect-square active:scale-95 transition-transform">
                  <img src={img} alt={label} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-black/10" />
                  <div className="absolute inset-0 flex flex-col items-center justify-end pb-2 px-1">
                    <p className="text-white text-[11px] font-bold text-center leading-tight">{label}</p>
                    <p className="text-white/65 text-[9px] mt-0.5">{count} listing{count!==1?"s":""}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Browse by University ───────────────────── */}
        <div className="px-4 pt-5">
          <div className="flex items-center justify-between mb-3">
            <p className="heading-font text-gray-900 text-[15px] font-bold">Browse by University</p>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {uniList.map(({ u, count }) => (
              <button key={u} onClick={() => onCategory({ kind: "university", value: u })}
                className="shrink-0 flex items-center gap-2 bg-white border border-gray-200 rounded-2xl px-3 py-2.5 shadow-sm active:bg-gray-50 active:scale-95 transition-all">
                <div className="w-7 h-7 rounded-xl bg-[#173A5E]/10 flex items-center justify-center text-[#173A5E]">
                  <IC.GradCap />
                </div>
                <div className="text-left">
                  <p className="text-xs font-bold text-gray-800">{u}</p>
                  <p className="text-[10px] text-gray-400">{count} listing{count!==1?"s":""}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* ── Browse by Area ─────────────────────────── */}
        <div className="px-4 pt-5">
          <div className="flex items-center justify-between mb-3">
            <p className="heading-font text-gray-900 text-[15px] font-bold">Browse by Area</p>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {areaList.map(({ a, count }) => (
              <button key={a} onClick={() => onCategory({ kind: "area", value: a })}
                className="shrink-0 flex items-center gap-2 bg-white border border-gray-200 rounded-2xl px-3 py-2.5 shadow-sm active:bg-gray-50 active:scale-95 transition-all">
                <div className="w-7 h-7 rounded-xl bg-green-50 flex items-center justify-center text-green-700">
                  <IC.PinSm />
                </div>
                <div className="text-left">
                  <p className="text-xs font-bold text-gray-800">{a}</p>
                  <p className="text-[10px] text-gray-400">{count} listing{count!==1?"s":""}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* ── All Listings ───────────────────────────── */}
        <HomeAllListings onListing={onListing} savedIds={savedIds} onSave={onSave} bookedByUser={bookedByUser} />

      </div>
    </div>
  );
}

// ─── CATEGORY SCREEN ─────────────────────────────────────────────────────────
function CategoryScreen({ filter, onBack, onListing, savedIds, onSave, bookedByUser }: {
  filter: CategoryFilter; onBack: () => void; onListing: (id: string) => void;
  savedIds: Set<string>; onSave: (id: string) => void; bookedByUser: Set<string>;
}) {
  const [sort, setSort] = useState<SortOpt>("none");
  const [maxPrice, setMaxPrice] = useState(400);
  const [showFilter, setShowFilter] = useState(false);

  const base = LISTINGS.filter(l => {
    const matchFilter = filter.kind === "type" ? l.type === filter.value
      : filter.kind === "university" ? l.nearUni === filter.value
      : l.area === filter.value;
    return matchFilter && l.price <= maxPrice;
  });

  const results = applySortAndFilter(base, sort);

  const titles: Record<CategoryFilter["kind"], string> = {
    type: filter.value + "s",
    university: "Near " + filter.value,
    area: filter.value,
  };

  const subtitle = `${results.length} listing${results.length !== 1 ? "s" : ""} found`;

  return (
    <div className="flex flex-col h-full bg-[#fbfaf7]">
      <div className="bg-[#173A5E] pt-14 pb-4 px-4 shrink-0">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="w-9 h-9 bg-white/15 rounded-full flex items-center justify-center active:bg-white/25">
            <IC.Back />
          </button>
          <div className="flex-1">
            <p className="text-white font-bold text-lg leading-tight">{titles[filter.kind]}</p>
            <p className="text-white/55 text-xs">{subtitle}</p>
          </div>
          <button onClick={() => setShowFilter(s => !s)}
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${showFilter ? "bg-white text-[#173A5E]" : "bg-white/15 text-white"}`}>
            <IC.Filter />
          </button>
        </div>
      </div>

      <div className="bg-white border-b border-gray-100 px-4 pt-3 pb-3 shrink-0 space-y-3">
        <SortBar sort={sort} onChange={setSort} />
        {showFilter && (
          <div className="fade-in">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs text-gray-500 font-medium">Max price: ${maxPrice}/month</span>
            </div>
            <input type="range" min={50} max={400} step={10} value={maxPrice}
              onChange={e => setMaxPrice(+e.target.value)} className="w-full" />
          </div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto scroll-smooth-touch px-4 pt-3 pb-4 space-y-3 stagger-list">
        {results.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-48 text-center">
            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3 text-gray-400">
              <IC.Home />
            </div>
            <p className="text-gray-500 font-semibold text-sm">No listings found</p>
            <p className="text-gray-400 text-xs mt-1">Try adjusting the price filter</p>
          </div>
        ) : results.map(l => (
          <ListingCard key={l.id} l={l} onPress={() => onListing(l.id)}
            saved={savedIds.has(l.id)} onSave={e => { e.stopPropagation(); onSave(l.id); }}
            isUserBooked={bookedByUser.has(l.id)} />
        ))}
      </div>
    </div>
  );
}

// ─── SEARCH OVERLAY ───────────────────────────────────────────────────────────
function SearchOverlay({ onClose, onListing, savedIds, onSave, bookedByUser }: {
  onClose: () => void; onListing: (id: string) => void;
  savedIds: Set<string>; onSave: (id: string) => void; bookedByUser: Set<string>;
}) {
  const [q, setQ] = useState("");
  const [typeFilter, setTypeFilter] = useState<AccomType | "All">("All");
  const [sort, setSort] = useState<SortOpt>("none");
  const [maxPrice, setMaxPrice] = useState(400);
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => { ref.current?.focus(); }, []);

  const types: (AccomType | "All")[] = ["All", "Room", "Apartment", "Condo", "Shared House"];

  const base = LISTINGS.filter(l => {
    const qL = q.toLowerCase();
    const hit = !q || [l.title, l.area, l.nearUni, l.address, l.type].some(s => s.toLowerCase().includes(qL));
    return hit && (typeFilter === "All" || l.type === typeFilter) && l.price <= maxPrice;
  });
  const results = applySortAndFilter(base, sort);

  return (
    <div className="flex flex-col h-full bg-[#fbfaf7]">
      {/* Search header — same top clearance as other screens, never reaches Dynamic Island */}
      <div className="bg-[#173A5E] pt-14 pb-3 px-4 shrink-0">
        <p className="text-white/60 text-xs mb-2">Search accommodations</p>
        <div className="flex items-center gap-2">
          <div className="flex-1 flex items-center gap-2 bg-white rounded-2xl px-3 py-2.5 shadow-sm">
            <IC.Search />
            <input ref={ref} value={q} onChange={e => setQ(e.target.value)}
              placeholder="University, area, room type..."
              className="flex-1 text-sm text-gray-800 outline-none bg-transparent placeholder-gray-400" />
            {q && <button onClick={() => setQ("")} className="text-gray-400 text-xl leading-none active:scale-90 px-1">×</button>}
          </div>
          <button onClick={onClose}
            className="shrink-0 px-3 py-2.5 bg-white/15 rounded-2xl text-white text-xs font-semibold active:bg-white/25">
            Cancel
          </button>
        </div>
      </div>

      {/* Filters — compact, always visible */}
      <div className="bg-white border-b border-gray-100 px-4 pt-2.5 pb-2.5 shrink-0 space-y-2">
        <div className="flex gap-1.5 overflow-x-auto pb-0.5" style={{scrollbarWidth:"none"}}>
          {types.map(t => (
            <button key={t} onClick={() => setTypeFilter(t)}
              className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${typeFilter===t ? "bg-[#173A5E] text-white border-[#173A5E]" : "bg-gray-50 text-gray-600 border-gray-200"}`}>
              {t}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <SortBar sort={sort} onChange={setSort} />
          <div className="flex-1 flex items-center gap-2 min-w-0">
            <span className="text-[10px] text-gray-400 shrink-0">≤${maxPrice}</span>
            <input type="range" min={50} max={500} step={10} value={maxPrice}
              onChange={e => setMaxPrice(+e.target.value)}
              className="flex-1 accent-[#173A5E] h-1 cursor-pointer" />
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="flex-1 overflow-y-auto scroll-smooth-touch px-4 pt-3 pb-4 space-y-3">
        <p className="text-xs text-gray-400">{results.length} listing{results.length!==1?"s":""} found</p>
        {results.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-40 text-center gap-2">
            <p className="text-gray-500 text-sm font-semibold">No results found</p>
            <p className="text-gray-400 text-xs">Try different keywords or adjust filters</p>
          </div>
        ) : results.map(l => (
          <ListingCard key={l.id} l={l} onPress={() => { onClose(); onListing(l.id); }}
            saved={savedIds.has(l.id)} onSave={e => { e.stopPropagation(); onSave(l.id); }}
            isUserBooked={bookedByUser.has(l.id)} />
        ))}
      </div>
    </div>
  );
}

// ─── LISTING DETAIL ───────────────────────────────────────────────────────────
function ListingDetail({ listingId, onBack, onBook, savedIds, onSave, bookedByUser, isGuest, onLogin }: {
  listingId: string; onBack: () => void; onBook: (id: string) => void;
  savedIds: Set<string>; onSave: (id: string) => void; bookedByUser: Set<string>;
  isGuest: boolean; onLogin: () => void;
}) {
  const l = LISTINGS.find(x => x.id === listingId)!;
  const [imgIdx, setImgIdx] = useState(0);
  const [showVideo, setShowVideo] = useState(false);
  const [tab, setTab] = useState<"info" | "amenities" | "reviews" | "map">("info");
  const isUnavailable = l.isBooked || bookedByUser.has(l.id);
  const hasBooked = bookedByUser.has(l.id);
  const maskPhone = (p: string) => { const pts = p.trim().split(" "); return pts.length >= 2 ? pts[0] + " " + pts[1] + " xxx xxx" : "xxx xxx xxx"; };

  const menuIcon = (t: typeof tab) =>
    t === "info" ? <IC.Info /> : t === "amenities" ? <IC.Shield /> : t === "reviews" ? <IC.Star on /> : <IC.Map />;

  return (
    <div className="flex flex-col h-full bg-[#fbfaf7]">
      {/* Gallery */}
      <div className="relative shrink-0 bg-gray-200" style={{ height: "240px" }}>
        {showVideo ? (
          <div className="w-full h-full bg-[#111] flex flex-col items-center justify-center gap-3">
            <IC.Play />
            <p className="text-white/70 text-sm">Video Tour — {l.title}</p>
            <button onClick={() => setShowVideo(false)}
              className="mt-1 px-4 py-1.5 bg-white/15 rounded-full text-white text-xs border border-white/20">
              Close
            </button>
          </div>
        ) : (
          <>
            <img src={l.images[imgIdx]} alt={l.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent pointer-events-none" />
          </>
        )}

        <button onClick={onBack}
          className="absolute top-10 left-3 w-9 h-9 bg-white/90 rounded-full flex items-center justify-center shadow active:scale-90 transition-transform">
          <IC.Back />
        </button>
        <button onClick={() => onSave(l.id)}
          className="absolute top-10 right-3 w-9 h-9 bg-white/90 rounded-full flex items-center justify-center shadow active:scale-90 transition-transform">
          <IC.Heart sm on={savedIds.has(l.id)} />
        </button>

        {!showVideo && (
          <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
            <div className="flex gap-1.5">
              {l.images.map((img, i) => (
                <button key={i} onClick={() => setImgIdx(i)}
                  className={`w-10 h-7 rounded-md overflow-hidden border-2 transition-colors ${imgIdx===i ? "border-white" : "border-transparent opacity-55"}`}>
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
              {l.hasVideo && (
                <button onClick={() => setShowVideo(true)}
                  className="w-10 h-7 rounded-md bg-black/60 border-2 border-white/30 flex items-center justify-center">
                  <IC.Video />
                </button>
              )}
            </div>
            <div className="flex gap-1">
              {l.images.map((_, i) => (
                <div key={i} className={`h-1.5 rounded-full transition-all ${imgIdx===i&&!showVideo ? "w-4 bg-white" : "w-1.5 bg-white/45"}`} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Title card — no "Save with Jomrork" callout */}
      <div className="bg-white px-4 py-3 border-b border-gray-100 shrink-0">
        <div className="flex items-start gap-2 justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="font-bold text-gray-900 text-lg leading-tight">{l.title}</h2>
              {l.verified && (
                <div className="flex items-center gap-1 bg-green-50 border border-green-200 rounded-full px-2 py-0.5">
                  <IC.Check /><span className="text-[10px] text-green-700 font-bold">Verified</span>
                </div>
              )}
              <div className={`flex items-center gap-1 rounded-full px-2 py-0.5 border ${isUnavailable ? "bg-red-50 border-red-200" : "bg-green-50 border-green-200"}`}>
                <div className={`w-1.5 h-1.5 rounded-full ${isUnavailable ? "bg-red-500" : "bg-green-500"}`} />
                <span className={`text-[10px] font-bold ${isUnavailable ? "text-red-600" : "text-green-700"}`}>{isUnavailable ? "Unavailable" : "Available"}</span>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-0.5 flex items-center gap-1"><IC.PinSm />{l.address}</p>
            <div className="flex items-center gap-2 mt-1.5 flex-wrap">
              <Stars n={l.rating} />
              <span className="text-xs font-semibold">{l.rating}</span>
              <span className="text-xs text-gray-400">({l.reviewCount})</span>
              <Tag label={l.type} />
            </div>
          </div>
          <div className="text-right shrink-0">
            <p className="font-bold text-[#173A5E] text-xl">${l.price}</p>
            <p className="text-gray-400 text-[10px]">/month</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200 flex shrink-0">
        {(["info","amenities","reviews","map"] as const).map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`flex-1 py-2.5 flex flex-col items-center gap-0.5 text-[10px] font-semibold capitalize transition-colors border-b-2 ${tab===t ? "border-[#173A5E] text-[#173A5E]" : "border-transparent text-gray-400"}`}>
            <span className={tab===t ? "text-[#173A5E]" : "text-gray-400"}>{menuIcon(t)}</span>
            {t}{t==="reviews"?` (${l.reviewCount})`:""}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="flex-1 overflow-y-auto scroll-smooth-touch pb-2">

        {tab === "info" && (
          <div className="px-4 pt-4 pb-4 space-y-3">
            <div className="grid grid-cols-3 gap-2">
              {[
                ["Size", l.size],["Floor", `${l.floor} / ${l.buildingFloors}F`],["Min. Stay", l.minStay],
                ["Bedrooms", l.bedrooms===0?"Studio":`${l.bedrooms} BR`],["Bathrooms",`${l.bathrooms} Bath`],["Available", l.availableFrom],
              ].map(([k, v]) => (
                <div key={k} className="bg-white rounded-xl p-2.5 border border-gray-100 shadow-sm text-center">
                  <p className="text-[10px] text-gray-400">{k}</p>
                  <p className="text-xs font-bold text-gray-800 mt-0.5">{v}</p>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
              <p className="font-bold text-gray-900 text-sm mb-2">About this place</p>
              <p className="text-sm text-gray-600 leading-relaxed body-font">{l.description}</p>
            </div>

            {/* Cost breakdown — no Jomrork Service Fee row */}
            <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
              <p className="font-bold text-gray-900 text-sm mb-3">Cost Breakdown</p>
              <div className="space-y-3">
                {[
                  { icon: <IC.Home />, label: "Base Rent", value: `$${l.price}/month`, note: "" },
                  { icon: <IC.Lightning />, label: "Electricity", value: `$${l.electricity}/kWh`, note: "Est. $15–25/month" },
                  { icon: <IC.Water />, label: "Water", value: `$${l.water}/month`, note: "Fixed" },
                  { icon: <IC.Park />, label: "Parking", value: l.parking==="Free"?"Free":l.parking==="No Parking"?"Not available":`$${l.parkingFee}/month`, note: "" },
                  { icon: <IC.Wifi />, label: "Internet", value: "Included", note: l.internet },
                ].map(({ icon, label, value, note }) => (
                  <div key={label} className="flex items-center gap-3">
                    <div className="w-7 flex items-center justify-center text-gray-500 shrink-0">{icon}</div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-700">{label}</p>
                      {note && <p className="text-[10px] text-gray-400">{note}</p>}
                    </div>
                    <span className="text-sm font-semibold text-gray-800">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
              <p className="font-bold text-gray-900 text-sm mb-3">Contact Landlord</p>
              <div className="flex items-center gap-3">
                <Avatar name={l.landlordName} bg="#173A5E" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-800 truncate">{l.landlordName}</p>
                  <p className="text-xs text-gray-500">{hasBooked ? l.landlordPhone : maskPhone(l.landlordPhone)}</p>
                </div>
                {hasBooked ? (
                  <div className="flex gap-2">
                    <button className="flex items-center gap-1.5 bg-[#173A5E]/10 text-[#173A5E] text-xs font-bold px-3 py-2 rounded-xl active:scale-95 transition-transform">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-3.5 h-3.5">
                        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      Message
                    </button>
                    <button className="flex items-center gap-1.5 bg-[#173A5E] text-white text-xs font-bold px-3 py-2 rounded-xl active:scale-95 transition-transform">
                      <IC.Phone />Call
                    </button>
                  </div>
                ) : (
                  <div className="w-8 h-8 rounded-xl bg-gray-100 flex items-center justify-center text-gray-400">
                    <IC.Lock />
                  </div>
                )}
              </div>
              {!hasBooked && (
                <div className="mt-2.5 flex items-center gap-2 bg-[#FFFBDD] border border-[#F5E890] rounded-xl px-3 py-2">
                  <IC.Lock />
                  <p className="text-xs text-[#B08010]">Complete a booking to see full contact details</p>
                </div>
              )}
            </div>

            <div className="bg-[#173A5E]/5 rounded-2xl p-4 border border-[#173A5E]/10">
              <p className="font-bold text-[#173A5E] text-sm mb-2.5 flex items-center gap-1.5">
                <IC.Shield color="#173A5E" />Safety & Trust
              </p>
              <div className="grid grid-cols-2 gap-y-2 gap-x-3">
                {["ID-verified landlord","In-person inspection done","Contract available","24/7 CCTV building","Background check done","Jomrork guarantee"].map(item => (
                  <div key={item} className="flex items-start gap-1.5">
                    <IC.Check /><span className="text-[11px] text-gray-600 leading-tight">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {tab === "amenities" && (
          <div className="px-4 pt-4 pb-4 space-y-3">
            <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
              <p className="font-bold text-gray-900 text-sm mb-3">What"s Included</p>
              <div className="grid grid-cols-2 gap-2">
                {l.amenities.map(a => (
                  <div key={a} className="flex items-center gap-2 bg-gray-50 rounded-xl px-3 py-2.5 border border-gray-100">
                    <IC.Check /><span className="text-xs text-gray-700 font-medium leading-tight">{a}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
              <p className="font-bold text-gray-900 text-sm mb-3">Property Details</p>
              <div className="divide-y divide-gray-50">
                {[
                  ["Furnished status", l.furnished],
                  ["Internet", l.internet],
                  ["Floor", `${l.floor} of ${l.buildingFloors}`],
                  ["Unit size", l.size],
                  ["Bedrooms", l.bedrooms===0?"Studio (open plan)":`${l.bedrooms} Bedroom`],
                  ["Bathrooms", `${l.bathrooms} Bathroom`],
                  ["Parking", l.parking==="Free"?"Free":"Paid – $"+(l.parkingFee)+"/mo"],
                  ["Minimum stay", l.minStay],
                  ["Available from", l.availableFrom],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between py-2.5 first:pt-0 last:pb-0">
                    <span className="text-xs text-gray-500">{k}</span>
                    <span className="text-xs font-semibold text-gray-800 text-right max-w-[55%]">{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {tab === "reviews" && (
          <div className="px-4 pt-4 pb-4 space-y-3">
            <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm flex items-center gap-5">
              <div className="text-center shrink-0">
                <p className="text-4xl font-bold text-[#173A5E]">{l.rating}</p>
                <Stars n={l.rating} lg />
                <p className="text-xs text-gray-400 mt-1">{l.reviewCount} reviews</p>
              </div>
              <div className="flex-1 space-y-1.5">
                {[5,4,3,2,1].map(s => {
                  const pct = s===5?70:s===4?20:10;
                  return (
                    <div key={s} className="flex items-center gap-2">
                      <span className="text-[10px] text-gray-500 w-2">{s}</span>
                      <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-amber-400 rounded-full" style={{ width:`${pct}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            {l.reviews.map(r => (
              <div key={r.id} className="bg-white rounded-2xl p-3.5 border border-gray-100 shadow-sm">
                <div className="flex items-center gap-2.5 mb-2">
                  <Avatar name={r.user} size="sm" />
                  <div>
                    <p className="text-xs font-bold text-gray-800">{r.user}</p>
                    <div className="flex items-center gap-1">
                      <Stars n={r.rating} /><span className="text-[10px] text-gray-400 ml-1">{r.date}</span>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed body-font">{r.comment}</p>
              </div>
            ))}
            <p className="text-center text-xs text-gray-400 py-1">Showing {l.reviews.length} of {l.reviewCount} reviews</p>
          </div>
        )}

        {tab === "map" && (
          <div className="px-4 pt-4 pb-4 space-y-3">
            <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
              <div style={{ height: "260px" }}>
                <iframe
                  title="Property map"
                  width="100%" height="100%"
                  src={`https://maps.google.com/maps?q=${l.lat},${l.lng}&hl=en&z=16&output=embed`}
                  allowFullScreen loading="lazy"
                />
              </div>
              <div className="p-3 border-t border-gray-100">
                <p className="text-xs font-bold text-gray-800 flex items-center gap-1.5"><IC.PinSm />{l.area}</p>
                <p className="text-[11px] text-gray-500 mt-0.5">{l.address}</p>
                <div className="mt-1.5 flex items-center gap-1 text-[#173A5E]">
                  <IC.GradCap />
                  <span className="text-[11px] font-medium">{l.distanceToUni} to {l.nearUni}</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
              <p className="font-bold text-gray-900 text-sm mb-3">Nearby Places</p>
              <div className="divide-y divide-gray-50">
                {[
                  { label: l.nearUni, distance: l.distanceToUni, Icon: IC.GradCap },
                  { label: "Local Market", distance: "3 min walk", Icon: IC.ShoppingBag },
                  { label: "ATM / Bank", distance: "5 min walk", Icon: IC.Bank },
                  { label: "Coffee Shop", distance: "2 min walk", Icon: IC.Coffee },
                  { label: "Pharmacy", distance: "8 min walk", Icon: IC.Medical },
                ].map(({ label, distance, Icon }) => (
                  <div key={label} className="flex items-center justify-between py-2.5 first:pt-0 last:pb-0">
                    <div className="flex items-center gap-2 text-gray-700">
                      <div className="text-gray-500"><Icon /></div>
                      <span className="text-sm">{label}</span>
                    </div>
                    <span className="text-xs text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full border border-gray-100">{distance}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Book CTA */}
      <div className="bg-white border-t border-gray-200 px-4 pt-3 pb-7 shrink-0 flex items-center gap-3">
        <div>
          <p className="text-[10px] text-gray-400">Monthly rent</p>
          <p className="font-bold text-[#173A5E] text-base">${l.price}/mo</p>
        </div>
        {isGuest ? (
          <button onClick={onLogin}
            className="flex-1 font-bold py-3 rounded-full text-sm shadow-md bg-[#173A5E] text-white active:scale-95 transition-transform">
            Log In to Book
          </button>
        ) : (
          <button onClick={() => !isUnavailable && onBook(listingId)} disabled={isUnavailable}
            className={`flex-1 font-bold py-3 rounded-full text-sm shadow-md active:scale-95 transition-transform ${isUnavailable ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-[#173A5E] text-white"}`}>
            {isUnavailable ? "Unavailable" : "Book Now"}
          </button>
        )}
      </div>
    </div>
  );
}

// ─── CONTRACT SCREEN (inside BookingFlow) ─────────────────────────────────────
function ContractView({ listing, months, onAgree, onBack }: {
  listing: Listing; months: number; onAgree: () => void; onBack: () => void;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    if (el.scrollTop + el.clientHeight >= el.scrollHeight - 20) setScrolled(true);
  };

  const today = new Date().toLocaleDateString("en-US", { day:"numeric", month:"long", year:"numeric" });

  return (
    <div className="flex flex-col h-full bg-[#fbfaf7]">
      <div className="bg-[#173A5E] pt-14 pb-4 px-4 flex items-center gap-3 shrink-0">
        <button onClick={onBack} className="w-9 h-9 bg-white/15 rounded-full flex items-center justify-center active:bg-white/25"><IC.Back /></button>
        <div>
          <p className="text-white font-bold text-base">Rental Agreement</p>
          <p className="text-white/55 text-xs">Please read and agree to continue</p>
        </div>
      </div>

      {/* Contract scroll area */}
      <div ref={scrollRef} onScroll={handleScroll} className="flex-1 overflow-y-auto scroll-smooth-touch px-4 pt-4 pb-4">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          {/* Header */}
          <div className="bg-[#173A5E] px-5 py-4 flex items-center gap-3">
            <IC.Contract />
            <div>
              <p className="text-white font-bold text-sm">JOMRORK RENTAL AGREEMENT</p>
              <p className="text-white/60 text-xs">Reference: JMR-CONTR-{Math.floor(100000 + Math.random() * 900000)}</p>
            </div>
          </div>

          <div className="px-5 py-5 space-y-5 text-sm text-gray-700 leading-relaxed">
            <div>
              <p className="font-bold text-gray-900 mb-1">1. PARTIES</p>
              <p>This Rental Agreement ("Agreement") is entered into on <strong>{today}</strong> between:</p>
              <p className="mt-2"><strong>Landlord:</strong> {listing.landlordName} — <span className="text-gray-400 italic">Contact details released upon booking confirmation</span></p>
              <p className="mt-1"><strong>Tenant:</strong> Sophea Kea (Student, RUPP) — the Jomrork account holder</p>
            </div>

            <div>
              <p className="font-bold text-gray-900 mb-1">2. PROPERTY</p>
              <p>The Landlord agrees to rent to the Tenant the premises located at:</p>
              <p className="mt-1 font-medium text-gray-800">{listing.address}, {listing.area}, Phnom Penh, Cambodia.</p>
              <p className="mt-1">Property type: <strong>{listing.type}</strong> · Size: <strong>{listing.size}</strong></p>
            </div>

            <div>
              <p className="font-bold text-gray-900 mb-1">3. TERM</p>
              <p>This tenancy shall commence on <strong>{today}</strong> and continue for a period of <strong>{months} month{months>1?"s":""}</strong>, renewable by mutual agreement.</p>
            </div>

            <div>
              <p className="font-bold text-gray-900 mb-1">4. RENT & FEES</p>
              <p>The Tenant pays the <strong>first month's rent (${listing.price})</strong> and the <strong>security deposit (${listing.price * Math.ceil(months/12)})</strong> securely through the Jomrork app at the time of booking. All subsequent monthly rent payments are made directly to the Landlord.</p>
              <p className="mt-2">Utility costs — including electricity (billed at the building rate, approx. ${listing.electricity}/kWh), water (approx. ${listing.water}/month), and any other utility or maintenance fees — are settled directly between the Tenant and the Landlord and are not collected through the Jomrork platform.</p>
              {listing.parking !== "No Parking" && listing.parking === "Paid" && (
                <p className="mt-1">Parking: ${listing.parkingFee}/month, payable to the Landlord.</p>
              )}
              <p className="mt-2">A security deposit of <strong>{Math.ceil(months/12)} month{Math.ceil(months/12)>1?"s":""} rent (${listing.price * Math.ceil(months/12)})</strong> is required for a {months}-month tenancy (1 month per 12-month period). The deposit will be refunded within 14 days of lease end, subject to property inspection.</p>
            </div>

            <div>
              <p className="font-bold text-gray-900 mb-1">5. USE OF PROPERTY</p>
              <p>The Tenant shall use the premises solely as a private residential dwelling. Commercial activities, subletting, or unauthorized alterations are prohibited without the Landlord's written consent.</p>
            </div>

            <div>
              <p className="font-bold text-gray-900 mb-1">6. TENANT OBLIGATIONS</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Maintain the property in a clean and sanitary condition.</li>
                <li>Avoid causing damage beyond normal wear and tear.</li>
                <li>Respect building rules including quiet hours (10 PM – 6 AM).</li>
                <li>Report any repairs or maintenance issues to the Landlord promptly.</li>
                <li>Not keep pets without prior written approval from the Landlord.</li>
              </ul>
            </div>

            <div>
              <p className="font-bold text-gray-900 mb-1">7. LANDLORD OBLIGATIONS</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Ensure the property is habitable and in good repair.</li>
                <li>Provide functioning utilities as described in the listing.</li>
                <li>Respect the Tenant's right to quiet enjoyment.</li>
                <li>Give 24-hour notice before entering the premises (except emergencies).</li>
              </ul>
            </div>

            <div>
              <p className="font-bold text-gray-900 mb-1">8. TERMINATION</p>
              <p>Either party may terminate this agreement with <strong>30 days written notice</strong> through the Jomrork platform. Early termination by the Tenant may result in forfeiture of the security deposit.</p>
            </div>

            <div>
              <p className="font-bold text-gray-900 mb-1">9. JOMRORK PLATFORM</p>
              <p>This agreement is facilitated through Jomrork. Jomrork charges a one-time commission of <strong>8–10% of the first month's rent</strong>, charged to the Landlord at the time of move-in. No fees whatsoever are charged to the Tenant beyond the rent and deposit stated in Section 4.</p>
            </div>

            {/* 48-hour refund callout */}
            <div className="rounded-2xl border border-green-200 bg-green-50 px-4 py-4">
              <div className="flex items-center gap-2 mb-2">
                <svg viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth={2} className="w-4 h-4 shrink-0">
                  <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <p className="font-bold text-green-800 text-sm">48-Hour Refund Protection</p>
              </div>
              <p className="text-green-800 text-xs leading-relaxed">Jomrork holds your first month's rent and security deposit securely — <strong>we do not release funds to the landlord until 48 hours after booking confirmation.</strong> Within this 48-hour window, you may cancel your booking for any reason and receive a <strong>full refund</strong>, no questions asked.</p>
              <p className="text-green-700 text-xs mt-2 leading-relaxed">After 48 hours, the first month's rent is transferred to the landlord and the security deposit is held by Jomrork until your move-out inspection. Cancellations after 48 hours may forfeit the first month's rent. Contact <strong>support@jomrork.com</strong> to request a refund within the window.</p>
            </div>

            <div>
              <p className="font-bold text-gray-900 mb-1">10. GOVERNING LAW</p>
              <p>This Agreement shall be governed by the laws of the Kingdom of Cambodia. Any disputes shall be resolved through negotiation, or if necessary, through the competent courts of Phnom Penh.</p>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <p className="text-xs text-gray-500 text-center">By selecting "I Agree", both parties acknowledge they have read, understood, and agree to be bound by this Rental Agreement. This digital agreement carries the same legal weight as a physical signature under Cambodian electronic commerce law.</p>
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        {!scrolled && (
          <div className="mt-3 text-center">
            <p className="text-xs text-gray-400 flex items-center justify-center gap-1">
              <span>↓</span> Scroll to the bottom to enable agreement
            </p>
          </div>
        )}
      </div>

      {/* Agreement checkbox + CTA */}
      <div className="bg-white border-t border-gray-200 px-4 pt-3 pb-7 shrink-0 space-y-3">
        <button onClick={() => scrolled && setAgreed(v => !v)}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border transition-colors ${scrolled ? "cursor-pointer" : "opacity-40 cursor-not-allowed"} ${agreed ? "border-[#173A5E] bg-[#173A5E]/5" : "border-gray-200 bg-gray-50"}`}>
          <div className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-colors ${agreed ? "bg-[#173A5E] border-[#173A5E]" : "border-gray-300"}`}>
            {agreed && <IC.Check color="white" />}
          </div>
          <span className="text-sm text-gray-700 text-left leading-snug">
            I have read and agree to the Rental Agreement terms
          </span>
        </button>
        <button onClick={onAgree} disabled={!agreed}
          className={`w-full font-bold py-3.5 rounded-full text-sm shadow-md active:scale-95 transition-transform ${agreed ? "bg-[#173A5E] text-white" : "bg-gray-200 text-gray-400 cursor-not-allowed"}`}>
          I Agree &amp; Continue to Payment
        </button>
      </div>
    </div>
  );
}

// ─── BOOKING FLOW ─────────────────────────────────────────────────────────────
function BookingFlow({ listingId, onBack, onApply, onDone, onGoHome }: {
  listingId: string; onBack: () => void;
  onApply: (record: BookingRecord) => void;
  onDone: () => void;
  onGoHome: (record: BookingRecord) => void;
}) {
  const l = LISTINGS.find(x => x.id === listingId)!;
  const minStayMonths = parseInt(l.minStay) || 1;
  const durationOptions = [1,3,6,12].filter(m => m >= minStayMonths);
  const [step, setStep] = useState<"select" | "contract" | "pay" | "receipt">("select");
  const [pay, setPay] = useState<"aba" | "card">("aba");
  const [months, setMonths] = useState(durationOptions[0]);
  const [showModal, setShowModal] = useState(false);
  const appliedRef = useRef(false);

  const commission = Math.round(l.price * l.commissionRate);
  // Deposit: 1× rent for 1–12 months, 2× for 13–24 months, etc.
  const depositMultiplier = Math.ceil(months / 12);
  const deposit = l.price * depositMultiplier;
  // User pays only first month + deposit upfront; remaining months paid monthly
  const totalNow = l.price + deposit;
  const ptPerMonth = l.price < 100 ? 25 : l.price < 150 ? 50 : 75;
  const pointsEarned = ptPerMonth * months;

  const receiptNo = useRef("JMR-" + Math.floor(100000 + Math.random() * 900000)).current;
  const today = new Date().toLocaleDateString("en-US", { day:"numeric", month:"long", year:"numeric" });

  const record: BookingRecord = {
    id: "b" + Date.now(), listingId: l.id, listingTitle: l.title, area: l.area,
    months, total: totalNow, deposit, commission, payMethod: pay,
    date: today, status: "Active", receiptNo, image: l.images[0],
    pointsEarned,
  };

  const handleConfirm = () => setShowModal(true);
  const handleGoBookings = () => {
    if (!appliedRef.current) { appliedRef.current = true; onApply(record); }
    setShowModal(false);
    setStep("receipt");
  };
  const handleGoHome = () => {
    setShowModal(false);
    if (!appliedRef.current) { appliedRef.current = true; }
    onGoHome(record);
  };

  if (step === "receipt") {
    return (
      <div className="flex flex-col h-full bg-[#fbfaf7]">
        <div className="bg-[#173A5E] pt-12 pb-4 px-4 flex items-center justify-center shrink-0">
          <p className="text-white font-bold text-base">Payment Receipt</p>
        </div>
        <div className="flex-1 overflow-y-auto scroll-smooth-touch px-4 pt-4 pb-4 space-y-4">
          <div className="flex flex-col items-center">
            <IC.CheckCircle />
            <p className="text-gray-900 font-bold text-lg mt-3">Booking Confirmed!</p>
            <p className="text-gray-500 text-sm">Receipt #{receiptNo}</p>
          </div>
          <div className="bg-white rounded-3xl border border-gray-100 shadow-md overflow-hidden">
            <div className="bg-[#173A5E] px-5 py-4 flex items-center justify-between">
              <p className="brand-font text-white text-xl">Jomrork</p>
              <Tag label="Paid" color="green" />
            </div>
            <div className="px-5 py-4 space-y-3 text-sm divide-y divide-gray-50">
              {[["Receipt", receiptNo],["Date", today],["Property", l.title],["Area", l.area],
                ["Duration", `${months} month${months>1?"s":""}`],["Payment", pay==="aba"?"ABA QR":"Bank Card"]].map(([k,v]) => (
                <div key={k} className="flex justify-between pt-2 first:pt-0">
                  <span className="text-gray-500">{k}</span>
                  <span className="font-semibold text-gray-800 text-right max-w-[55%] truncate">{v}</span>
                </div>
              ))}
              <div className="pt-2 space-y-2">
                <div className="flex justify-between"><span className="text-gray-500">First Month Rent</span><span>${l.price}</span></div>
                <div className="flex justify-between text-[#B08010] font-medium">
                  <span>Security Deposit ({depositMultiplier}× rent)</span>
                  <span>${deposit}</span>
                </div>
                <div className="flex justify-between font-bold text-base pt-1 border-t border-gray-100">
                  <span>Total Paid Now</span><span className="text-[#173A5E]">${totalNow}</span>
                </div>
              </div>
              <div className="pt-2">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">Landlord Contact</p>
                <p className="text-sm font-semibold text-gray-800">{l.landlordName}</p>
                <p className="text-sm text-[#173A5E] font-medium">{l.landlordPhone}</p>
              </div>
              <div className="pt-2 flex items-center gap-2">
                <IC.CoinLg />
                <span className="text-sm text-[#B08010] font-semibold">+{pointsEarned} points earned</span>
              </div>
            </div>
            <div className="bg-green-50 px-5 py-3 border-t border-green-100 flex items-center gap-2">
              <IC.Info />
              <p className="text-[11px] text-green-700 leading-snug">Refund available within <strong>48 hours</strong>. Contact support to request.</p>
            </div>
          </div>
          <button onClick={onDone}
            className="w-full bg-[#173A5E] text-white font-bold py-3.5 rounded-full text-sm active:scale-95 transition-transform">
            Back to My Bookings
          </button>
        </div>
      </div>
    );
  }

  if (step === "contract") {
    return <ContractView listing={l} months={months} onAgree={() => setStep("pay")} onBack={() => setStep("select")} />;
  }

  return (
    <div className="flex flex-col h-full bg-[#fbfaf7] relative">
      {showModal && (
        <SuccessModal receiptNo={receiptNo} pointsEarned={pointsEarned} onGoHome={handleGoHome} onGoBookings={handleGoBookings} />
      )}

      <div className="bg-[#173A5E] pt-14 pb-4 px-4 flex items-center gap-3 shrink-0">
        <button onClick={onBack} className="w-9 h-9 bg-white/15 rounded-full flex items-center justify-center active:bg-white/25"><IC.Back /></button>
        <div className="flex-1">
          <p className="text-white font-bold text-base">{step==="select"?"Booking Details":"Payment"}</p>
          {/* Step indicator */}
          <div className="flex items-center gap-1 mt-0.5">
            {["select","contract","pay"].map((s, i) => (
              <div key={s} className={`h-1 rounded-full transition-all ${s===step?"w-6 bg-white":"w-2 bg-white/35"}`} />
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scroll-smooth-touch px-4 pt-4 pb-4 space-y-4">
        {/* Property summary */}
        <div className="bg-white rounded-2xl p-3 flex gap-3 border border-gray-100 shadow-sm">
          <img src={l.images[0]} alt="" className="w-20 h-16 object-cover rounded-xl shrink-0" />
          <div className="min-w-0">
            <p className="font-bold text-gray-800 text-sm leading-tight">{l.title}</p>
            <p className="text-xs text-gray-500 mt-0.5">{l.area} · {l.type}</p>
            <div className="flex items-center gap-1 mt-1"><Stars n={l.rating} /><span className="text-xs font-semibold ml-0.5">{l.rating}</span></div>
          </div>
        </div>

        {step === "select" && (
          <>
            <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
              <p className="font-bold text-gray-900 text-sm mb-3">Rental Duration</p>
              <p className="text-xs text-gray-400 mb-2">Min. stay: {l.minStay}</p>
              <div className="grid grid-cols-4 gap-2">
                {durationOptions.map(m => (
                  <button key={m} onClick={() => setMonths(m)}
                    className={`py-2.5 rounded-xl text-sm font-bold border transition-colors active:scale-95 ${months===m?"bg-[#173A5E] text-white border-[#173A5E]":"bg-gray-50 text-gray-600 border-gray-200"}`}>
                    {m}mo
                  </button>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
              <p className="font-bold text-gray-900 text-sm mb-3">Price Summary</p>
              <div className="divide-y divide-gray-50 text-sm">
                <div className="flex justify-between py-2 first:pt-0">
                  <span className="text-gray-500">First Month Rent</span><span>${l.price}</span>
                </div>
                <div className="flex justify-between py-2 text-[#B08010] font-medium">
                  <span>Security Deposit <span className="text-xs font-normal text-[#C49A10]">({depositMultiplier}× rent)</span></span>
                  <span>${deposit}</span>
                </div>
                <div className="flex justify-between py-2 font-bold text-base"><span>Due Now</span><span className="text-[#173A5E]">${totalNow}</span></div>
                <div className="flex justify-between py-1 text-xs text-gray-400"><span>Remaining ({months - 1} months)</span><span>Paid monthly</span></div>
              </div>
              <div className="mt-2.5 bg-[#FFFBDD] border border-[#F5E890] rounded-xl px-3 py-2 flex items-center gap-2">
                <IC.CoinLg />
                <p className="text-xs text-[#B08010]">You will earn <strong>{pointsEarned} points</strong> from this booking ({months} months × {ptPerMonth} pts/month)</p>
              </div>
              <div className="mt-2 bg-green-50 border border-green-100 rounded-xl px-3 py-2 flex items-start gap-2">
                <IC.Info />
                <p className="text-xs text-green-700 leading-relaxed">Refund available within <strong>48 hours</strong> of payment. No service fee is charged to you.</p>
              </div>
            </div>
          </>
        )}

        {step === "pay" && (
          <>
            <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
              <p className="font-bold text-gray-900 text-sm mb-3">Payment Method</p>
              <div className="space-y-2">
                {[
                  { id:"aba" as const, label:"ABA QR Code", sub:"Scan with ABA Mobile app", Icon: IC.QR },
                  { id:"card" as const, label:"Bank Card", sub:"Visa / Mastercard / UnionPay", Icon: IC.Card },
                ].map(pm => (
                  <button key={pm.id} onClick={() => setPay(pm.id)}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-colors active:scale-[0.98] ${pay===pm.id?"border-[#173A5E] bg-[#173A5E]/5":"border-gray-200 bg-white"}`}>
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${pay===pm.id?"bg-[#173A5E] text-white":"bg-gray-100 text-gray-500"}`}>
                      <pm.Icon />
                    </div>
                    <div className="text-left flex-1">
                      <p className="text-sm font-semibold text-gray-800">{pm.label}</p>
                      <p className="text-xs text-gray-400">{pm.sub}</p>
                    </div>
                    <div className={`w-4 h-4 rounded-full border-2 transition-colors ${pay===pm.id?"border-[#173A5E] bg-[#173A5E]":"border-gray-300"}`} />
                  </button>
                ))}
              </div>
            </div>

            {pay === "aba" ? (
              <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm flex flex-col items-center gap-3">
                <p className="text-sm font-bold text-gray-800">Scan with ABA Mobile</p>
                <div className="w-44 h-44 border-2 border-[#173A5E] rounded-2xl bg-white p-3 grid grid-cols-7 gap-0.5">
                  {[...Array(49)].map((_,i) => (
                    <div key={i} className={`rounded-[2px] ${(i*7+i*3+11)%4>0?"bg-[#173A5E]":"bg-transparent"}`} />
                  ))}
                </div>
                <p className="text-xs text-gray-500 text-center">Open ABA Mobile → Pay → Scan this QR code</p>
                <div className="bg-[#FFFBDD] border border-[#F0D94D] rounded-xl px-4 py-2 w-full text-center">
                  <p className="text-sm font-bold text-[#8C6408]">Amount: ${totalNow}</p>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm space-y-3">
                <p className="text-sm font-bold text-gray-900">Card Details</p>
                {[{l:"Card Number",p:"1234 5678 9012 3456"},{l:"Cardholder Name",p:"SOKHA CHAN"}].map(f => (
                  <div key={f.l}>
                    <p className="text-xs text-gray-500 mb-1">{f.l}</p>
                    <input className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-[#173A5E] transition-colors" placeholder={f.p} />
                  </div>
                ))}
                <div className="flex gap-3">
                  <div className="flex-1">
                    <p className="text-xs text-gray-500 mb-1">Expiry</p>
                    <input className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-[#173A5E]" placeholder="MM/YY" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-500 mb-1">CVV</p>
                    <input className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-[#173A5E]" placeholder="•••" type="password" />
                  </div>
                </div>
              </div>
            )}

            <div className="flex items-center justify-center gap-1.5 text-gray-400">
              <IC.Lock /><span className="text-xs">256-bit encryption · Secure payment</span>
            </div>
          </>
        )}
      </div>

      <div className="bg-white border-t border-gray-200 px-4 pt-3 pb-7 shrink-0">
        {step === "select" ? (
          <button onClick={() => setStep("contract")}
            className="w-full bg-[#173A5E] text-white font-bold py-3.5 rounded-full text-sm shadow-md active:scale-95 transition-transform">
            Continue to Agreement · ${totalNow} due now
          </button>
        ) : (
          <button onClick={handleConfirm}
            className="w-full bg-[#173A5E] text-white font-bold py-3.5 rounded-full text-sm shadow-md active:scale-95 transition-transform">
            Confirm Payment · ${totalNow}
          </button>
        )}
      </div>
    </div>
  );
}

// ─── BOOKING RECEIPT OVERLAY ──────────────────────────────────────────────────
function BookingReceiptOverlay({ record, onClose }: { record: BookingRecord; onClose: () => void }) {
  const listing = LISTINGS.find(l => l.id === record.listingId);
  return (
    <div className="absolute inset-0 z-50 flex flex-col bg-[#fbfaf7]">
      <div className="bg-[#173A5E] pt-12 pb-4 px-4 flex items-center gap-3 shrink-0">
        <button onClick={onClose} className="w-9 h-9 bg-white/15 rounded-full flex items-center justify-center active:bg-white/25"><IC.Back /></button>
        <p className="text-white font-bold text-base">Booking Receipt</p>
      </div>
      <div className="flex-1 overflow-y-auto scroll-smooth-touch px-4 pt-4 pb-4 space-y-4">
        <div className="flex flex-col items-center">
          <IC.CheckCircle />
          <p className="text-gray-900 font-bold text-lg mt-3">Booking Confirmed</p>
          <p className="text-gray-500 text-sm">Receipt #{record.receiptNo}</p>
        </div>
        <div className="bg-white rounded-3xl border border-gray-100 shadow-md overflow-hidden">
          <div className="bg-[#173A5E] px-5 py-4 flex items-center justify-between">
            <p className="brand-font text-white text-xl">Jomrork</p>
            <Tag label={record.status} color={record.status==="Active"?"green":record.status==="Pending"?"amber":"gray"} />
          </div>
          <div className="px-5 py-4 space-y-3 text-sm divide-y divide-gray-50">
            {[["Receipt", record.receiptNo],["Date", record.date],["Property", record.listingTitle],
              ["Area", record.area],["Duration", `${record.months} month${record.months>1?"s":""}`],
              ["Payment", record.payMethod==="aba"?"ABA QR":"Bank Card"]].map(([k,v]) => (
              <div key={k} className="flex justify-between pt-2 first:pt-0">
                <span className="text-gray-500">{k}</span>
                <span className="font-semibold text-gray-800 text-right max-w-[55%] truncate">{v}</span>
              </div>
            ))}
            <div className="pt-2 space-y-2">
              <div className="flex justify-between"><span className="text-gray-500">First Month Rent</span><span>${record.total - record.deposit}</span></div>
              <div className="flex justify-between text-[#B08010] font-medium">
                <span>Security Deposit</span>
                <span>${record.deposit}</span>
              </div>
              <div className="flex justify-between font-bold text-base pt-1 border-t border-gray-100">
                <span>Total Paid</span><span className="text-[#173A5E]">${record.total}</span>
              </div>
            </div>
            {listing && (
              <div className="pt-2">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">Landlord Contact</p>
                <p className="text-sm font-semibold text-gray-800">{listing.landlordName}</p>
                <p className="text-sm text-[#173A5E] font-medium">{listing.landlordPhone}</p>
              </div>
            )}
            {record.pointsEarned > 0 && (
              <div className="pt-2 flex items-center gap-2">
                <IC.CoinLg />
                <span className="text-sm text-[#B08010] font-semibold">+{record.pointsEarned} points earned</span>
              </div>
            )}
          </div>
          <div className="bg-green-50 px-5 py-3 border-t border-green-100 flex items-center gap-2">
            <IC.Info />
            <p className="text-[11px] text-green-700 leading-snug">Refund available within <strong>48 hours</strong>. Contact support to request.</p>
          </div>
        </div>
        <button onClick={onClose}
          className="w-full bg-[#173A5E] text-white font-bold py-3.5 rounded-full text-sm active:scale-95 transition-transform">
          Back to My Bookings
        </button>
      </div>
    </div>
  );
}

// ─── BOOKINGS HISTORY ─────────────────────────────────────────────────────────
function BookingsScreen({ records, onView, isGuest, onLogin }: {
  records: BookingRecord[]; onView: (id: string) => void; isGuest: boolean; onLogin: () => void;
}) {
  const all = [...records]; // new users start fresh — no pre-seeded bookings
  const statusColor: Record<string, TagColor> = { Active:"green", Completed:"gray", Pending:"amber" };
  const [viewingReceipt, setViewingReceipt] = useState<BookingRecord | null>(null);

  if (isGuest) return (
    <div className="flex flex-col h-full bg-[#fbfaf7]">
      <TabHeader title="My Bookings" />
      <div className="flex-1 flex flex-col items-center justify-center gap-4 px-6 text-center">
        <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
          <svg viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth={1.5} className="w-8 h-8">
            <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0110 0v4" strokeLinecap="round" />
          </svg>
        </div>
        <p className="text-gray-700 font-bold text-base">Log in to see your bookings</p>
        <p className="text-gray-400 text-sm">Your booking history will appear here once you have an account.</p>
        <button onClick={onLogin} className="bg-[#173A5E] text-white font-bold px-8 py-3 rounded-full text-sm active:scale-95 transition-transform">
          Log In / Sign Up
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-full bg-[#fbfaf7] relative">
      {viewingReceipt && (
        <BookingReceiptOverlay record={viewingReceipt} onClose={() => setViewingReceipt(null)} />
      )}
      <TabHeader title="My Bookings" subtitle={`${all.length} booking${all.length!==1?"s":""}`} />
      <div className="flex-1 overflow-y-auto scroll-smooth-touch px-4 pt-4 pb-4 space-y-3">
        {all.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-center gap-3">
            <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
              <IC.Calendar />
            </div>
            <p className="text-gray-500 font-semibold">No bookings yet</p>
            <p className="text-gray-400 text-sm">Book a place to see your history here</p>
          </div>
        ) : all.map(b => (
          <div key={b.id} className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
            <button onClick={() => onView(b.listingId)} className="w-full text-left">
              <div className="flex gap-3 p-3">
                <img src={b.image} alt="" className="w-20 h-16 rounded-xl object-cover shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-bold text-gray-800 text-sm truncate">{b.listingTitle}</p>
                    <Tag label={b.status} color={statusColor[b.status]} />
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">{b.area} · {b.months}mo</p>
                  <div className="flex items-center justify-between mt-2">
                    <p className="text-xs text-gray-400">#{b.receiptNo}</p>
                    <p className="font-bold text-[#173A5E] text-sm">${b.total}</p>
                  </div>
                </div>
              </div>
            </button>
            <div className="border-t border-gray-50 px-3 py-2 flex items-center justify-between">
              <p className="text-[10px] text-gray-400">{b.date} · {b.payMethod==="aba"?"ABA QR":"Bank Card"}</p>
              <div className="flex items-center gap-2">
                {b.pointsEarned > 0 && (
                  <span className="text-[10px] text-[#C49A10] font-semibold">+{b.pointsEarned}pts</span>
                )}
                <button onClick={() => setViewingReceipt(b)}
                  className="text-[10px] text-[#173A5E] font-semibold flex items-center gap-0.5 active:opacity-70">
                  See Receipt <IC.ChevronRight />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── FAVORITES ────────────────────────────────────────────────────────────────
function FavoritesScreen({ savedIds, onListing, onSave, bookedByUser, isGuest, onLogin }: {
  savedIds: Set<string>; onListing: (id: string) => void; onSave: (id: string) => void;
  bookedByUser: Set<string>; isGuest: boolean; onLogin: () => void;
}) {
  const saved = LISTINGS.filter(l => savedIds.has(l.id));

  if (isGuest) return (
    <div className="flex flex-col h-full bg-[#fbfaf7]">
      <TabHeader title="Saved" />
      <div className="flex-1 flex flex-col items-center justify-center gap-4 px-6 text-center">
        <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
          <svg viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth={1.5} className="w-8 h-8">
            <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0110 0v4" strokeLinecap="round" />
          </svg>
        </div>
        <p className="text-gray-700 font-bold text-base">Log in to save listings</p>
        <p className="text-gray-400 text-sm">Create an account to save your favourite places and access them anytime.</p>
        <button onClick={onLogin} className="bg-[#173A5E] text-white font-bold px-8 py-3 rounded-full text-sm active:scale-95 transition-transform">
          Log In / Sign Up
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-full bg-[#fbfaf7]">
      <TabHeader title="Saved" subtitle={`${saved.length} listing${saved.length!==1?"s":""}`} />
      <div className="flex-1 overflow-y-auto scroll-smooth-touch px-4 pt-4 pb-4 space-y-3 stagger-list">
        {saved.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-center gap-3">
            <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
              <IC.Heart />
            </div>
            <p className="text-gray-500 font-semibold">No saved listings</p>
            <p className="text-gray-400 text-sm">Tap the heart icon on any listing to save it</p>
          </div>
        ) : saved.map(l => (
          <ListingCard key={l.id} l={l} onPress={() => onListing(l.id)}
            saved={true} onSave={e => { e.stopPropagation(); onSave(l.id); }}
            isUserBooked={bookedByUser.has(l.id)} />
        ))}
      </div>
    </div>
  );
}

// ─── MESSAGES ────────────────────────────────────────────────────────────────
interface AutoMessage { id: string; name: string; preview: string; time: string; detail: string; }

function MessagesScreen({ autoMessages, isGuest, onLogin }: { autoMessages: AutoMessage[]; isGuest: boolean; onLogin: () => void; }) {
  if (isGuest) return (
    <div className="flex flex-col h-full bg-[#fbfaf7]">
      <TabHeader title="Messages" />
      <div className="flex-1 flex flex-col items-center justify-center px-8 text-center gap-4">
        <div className="w-16 h-16 rounded-full bg-[#173A5E]/10 flex items-center justify-center">
          <svg viewBox="0 0 24 24" fill="none" stroke="#173A5E" strokeWidth={1.5} className="w-8 h-8">
            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div>
          <p className="font-bold text-gray-900 text-lg">Messages are private</p>
          <p className="text-gray-500 text-sm mt-1">Create an account to message landlords and get replies.</p>
        </div>
        <button onClick={onLogin} className="bg-[#173A5E] text-white font-bold px-8 py-3 rounded-full text-sm active:scale-95 transition-transform">
          Log In / Sign Up
        </button>
      </div>
    </div>
  );
  const [activeId, setActiveId] = useState<string | null>(null);
  const [input, setInput] = useState("");

  const staticConvos = [
    { id:"m1", name:"Sky Villa · Toul Kork", msg:"Yes, you can visit tomorrow morning!", time:"2m ago", unread:2, bg:"#6b7280" },
    { id:"m2", name:"Jomrork Support", msg:"Your booking #JMR-482921 is confirmed.", time:"1h ago", unread:0, bg:"#173A5E" },
    { id:"m3", name:"BKK1 Condo Owner", msg:"The deposit is 1 month rent. Agree?", time:"Yesterday", unread:1, bg:"#173A5E" },
  ];

  const allConvos = [
    ...autoMessages.map(m => ({ id: m.id, name: m.name, msg: m.preview, time: m.time, unread: 1, bg: "#22c55e" })),
    ...staticConvos,
  ];
  const active = allConvos.find(c => c.id === activeId);
  const autoMsg = autoMessages.find(m => m.id === activeId);

  if (active) {
    const baseThread = [
      { from:"them", text:"Hello! I saw you're interested in the listing. Any questions?", t:"10:12" },
      { from:"me", text:"Yes! Is the room available from October 1st?", t:"10:14" },
      { from:"them", text:active.msg, t:"10:15" },
    ];
    const thread = autoMsg
      ? [{ from:"them", text:autoMsg.detail, t:"Just now" }]
      : baseThread;

    return (
      <div className="flex flex-col h-full bg-[#fbfaf7]">
        <div className="bg-[#173A5E] pt-14 pb-3 px-4 flex items-center gap-3 shrink-0">
          <button onClick={() => setActiveId(null)} className="w-9 h-9 bg-white/15 rounded-full flex items-center justify-center active:bg-white/25"><IC.Back /></button>
          <Avatar name={active.name} bg={active.bg} size="sm" />
          <p className="text-white font-semibold text-sm">{active.name}</p>
        </div>
        <div className="flex-1 overflow-y-auto scroll-smooth-touch px-4 pt-4 pb-4 space-y-3">
          {thread.map((m,i) => (
            <div key={i} className={`flex ${m.from==="me"?"justify-end":"justify-start"}`}>
              <div className={`max-w-[80%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${m.from==="me"?"bg-[#173A5E] text-white rounded-tr-sm":"bg-white text-gray-800 border border-gray-100 rounded-tl-sm shadow-sm"}`}>
                <p className="whitespace-pre-wrap">{m.text}</p>
                <p className={`text-[10px] mt-1 text-right ${m.from==="me"?"text-white/55":"text-gray-400"}`}>{m.t}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-white border-t border-gray-200 px-4 py-3 flex gap-2 shrink-0">
          <input value={input} onChange={e => setInput(e.target.value)}
            className="flex-1 border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-[#173A5E] transition-colors" placeholder="Type a message..." />
          <button onClick={() => setInput("")}
            className="w-10 h-10 bg-[#173A5E] rounded-xl flex items-center justify-center text-white active:scale-90 transition-transform">
            <IC.Send />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-[#fbfaf7]">
      <TabHeader title="Messages" />
      <div className="flex-1 overflow-y-auto scroll-smooth-touch bg-white">
        {allConvos.map(c => (
          <button key={c.id} onClick={() => setActiveId(c.id)}
            className="w-full flex items-center gap-3 px-4 py-3.5 border-b border-gray-50 text-left active:bg-gray-50 transition-colors">
            <Avatar name={c.name} bg={c.bg} />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className="font-semibold text-gray-800 text-sm truncate">{c.name}</p>
                <span className="text-[10px] text-gray-400 shrink-0 ml-2">{c.time}</span>
              </div>
              <p className="text-xs text-gray-500 truncate mt-0.5">{c.msg}</p>
            </div>
            {c.unread > 0 && (
              <div className="w-5 h-5 rounded-full bg-[#173A5E] flex items-center justify-center shrink-0">
                <span className="text-[10px] text-white font-bold">{c.unread}</span>
              </div>
            )}
          </button>
        ))}
        <p className="text-center text-xs text-gray-400 py-6">Conversations appear when you contact a landlord</p>
      </div>
    </div>
  );
}

// ─── PROFILE DETAIL CONTENT ───────────────────────────────────────────────────
function ProfileDetail({ item, bookingCount, onBack }: { item: string; bookingCount: number; onBack: () => void }) {
  const content: Record<string, { title: string; body: React.ReactNode }> = {
    "My Bookings": {
      title: "My Bookings",
      body: (
        <div className="space-y-4">
          <div className="bg-[#173A5E]/5 border border-[#173A5E]/15 rounded-2xl p-4">
            <p className="text-2xl font-black text-[#173A5E]">{bookingCount}</p>
            <p className="text-sm text-gray-600 mt-0.5">Total booking{bookingCount !== 1 ? "s" : ""} made</p>
          </div>
          <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm space-y-2 text-sm text-gray-700">
            <p className="font-bold text-gray-900">About My Bookings</p>
            <p>Your booking history shows all confirmed rentals. Each booking includes your receipt, payment details, and landlord contact info.</p>
            <p className="mt-2">Bookings that are <span className="text-green-600 font-semibold">Active</span> are currently running. <span className="text-gray-500 font-semibold">Completed</span> bookings are past rentals.</p>
            <p className="mt-2 text-xs text-gray-500">Refunds are available within <strong>48 hours</strong> of confirming a booking. Contact support to request.</p>
          </div>
        </div>
      ),
    },
    "Payment Methods": {
      title: "Payment Methods",
      body: (
        <div className="space-y-3">
          <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-[#173A5E]/10 rounded-xl flex items-center justify-center"><IC.QR /></div>
              <div>
                <p className="font-bold text-gray-900 text-sm">ABA QR Code</p>
                <p className="text-xs text-gray-500">Scan with ABA Mobile app</p>
              </div>
              <Tag label="Recommended" color="green" />
            </div>
            <p className="text-xs text-gray-600 leading-relaxed">Open ABA Mobile → Pay → Scan QR. Payment is instant and secure. No fees charged to you.</p>
          </div>
          <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center"><IC.Card /></div>
              <div>
                <p className="font-bold text-gray-900 text-sm">Bank Card</p>
                <p className="text-xs text-gray-500">Visa · Mastercard · UnionPay</p>
              </div>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed">Enter your card details during checkout. All card data is encrypted with 256-bit TLS. Jomrork never stores your card number.</p>
          </div>
          <div className="bg-[#FFFBDD] border border-[#F5E890] rounded-2xl p-3 flex items-start gap-2">
            <IC.Info />
            <p className="text-xs text-[#B08010]">Jomrork charges <strong>no service fees</strong> to tenants. The amount you see is exactly what you pay.</p>
          </div>
        </div>
      ),
    },
    "Notification Settings": {
      title: "Notifications",
      body: (
        <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
          {[
            ["Booking Confirmations", "Instant alerts when a booking is confirmed", true],
            ["Payment Receipts", "Receipt sent after each payment", true],
            ["Landlord Messages", "New messages from your landlords", true],
            ["Listing Recommendations", "New listings matching your preferences", false],
            ["Promotions", "Special offers and platform news", false],
          ].map(([label, sub, on], i) => (
            <div key={i} className={`flex items-center gap-3 px-4 py-3.5 ${i > 0 ? "border-t border-gray-50" : ""}`}>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-800">{label as string}</p>
                <p className="text-[10px] text-gray-400 mt-0.5">{sub as string}</p>
              </div>
              <div className={`w-11 h-6 rounded-full flex items-center transition-colors ${on ? "bg-[#173A5E] justify-end" : "bg-gray-200 justify-start"}`}>
                <div className="w-5 h-5 bg-white rounded-full mx-0.5 shadow-sm" />
              </div>
            </div>
          ))}
        </div>
      ),
    },
    "ID Verification": {
      title: "Identity Verification",
      body: (
        <div className="space-y-3">
          <div className="bg-green-50 border border-green-100 rounded-2xl p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
              <IC.Check color="white" />
            </div>
            <div>
              <p className="font-bold text-green-800 text-sm">Verified Account</p>
              <p className="text-xs text-green-600">National ID · Student Card</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm space-y-3 text-sm">
            <p className="font-bold text-gray-900">Why we verify identity</p>
            <p className="text-gray-600 leading-relaxed">Jomrork requires all users to verify their National ID Card (Cambodian or valid foreign passport) before making a booking. This protects both tenants and landlords from scams and illegal activity.</p>
            <div className="border-t border-gray-50 pt-3">
              <p className="font-semibold text-gray-800 mb-2">Documents required:</p>
              <ul className="space-y-1.5 text-gray-600 text-xs">
                <li className="flex items-center gap-2"><IC.Check color="#22c55e" /> National ID Card (front &amp; back)</li>
                <li className="flex items-center gap-2"><IC.Check color="#22c55e" /> Student ID Card from enrolled university</li>
                <li className="flex items-center gap-2"><IC.Check color="#22c55e" /> Selfie photo for facial match</li>
              </ul>
            </div>
            <div className="border-t border-gray-50 pt-3">
              <p className="font-semibold text-gray-800 mb-1">Your verification</p>
              <div className="space-y-1 text-xs text-gray-500">
                <p>National ID: <span className="text-green-600 font-semibold">Verified ✓</span></p>
                <p>Student Card: <span className="text-green-600 font-semibold">Verified ✓</span></p>
                <p>Selfie Match: <span className="text-green-600 font-semibold">Passed ✓</span></p>
                <p>Verified since: January 2026</p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    "How Jomrork Works": {
      title: "How Jomrork Works",
      body: (
        <div className="space-y-3">
          {[
            { n:"1", title:"Create & Verify Account", desc:"Sign up and verify your National ID and Student Card. This ensures a safe community for everyone." },
            { n:"2", title:"Search & Explore", desc:"Browse 100+ verified listings across Phnom Penh. Filter by location, price, university, and type." },
            { n:"3", title:"Contact & Visit", desc:"Message the landlord directly through the app. Request a visit before committing to book." },
            { n:"4", title:"Book Securely", desc:"Choose your rental duration. Pay the first month and security deposit through ABA QR or card." },
            { n:"5", title:"Sign Digital Contract", desc:"A legal rental agreement is generated automatically and signed digitally. No paper needed." },
            { n:"6", title:"Move In & Earn Points", desc:"Move in on your start date. Earn 1 Jomrork Point per $1 of rent paid — redeemable for rewards." },
          ].map(s => (
            <div key={s.n} className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm flex gap-3">
              <div className="w-8 h-8 rounded-full bg-[#173A5E] flex items-center justify-center text-white font-bold text-sm shrink-0">{s.n}</div>
              <div>
                <p className="font-bold text-gray-900 text-sm">{s.title}</p>
                <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      ),
    },
    "Report a Problem": {
      title: "Report a Problem",
      body: (
        <div className="space-y-3">
          <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm space-y-3">
            <p className="text-sm text-gray-600">We take all reports seriously and respond within 24 hours.</p>
            <div>
              <p className="text-xs text-gray-500 mb-1">Category</p>
              <select className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-[#173A5E] bg-white">
                <option>Landlord behavior issue</option>
                <option>Payment problem</option>
                <option>Listing inaccurate</option>
                <option>App bug</option>
                <option>Safety concern</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Describe the problem</p>
              <textarea rows={4} className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-[#173A5E] resize-none" placeholder="Please describe what happened..." />
            </div>
            <button className="w-full bg-[#173A5E] text-white font-bold py-3 rounded-full text-sm active:scale-95 transition-transform">
              Submit Report
            </button>
          </div>
          <div className="bg-[#FFFBDD] border border-[#F5E890] rounded-2xl p-3 flex items-start gap-2">
            <IC.Info />
            <p className="text-xs text-[#B08010]">For urgent safety issues, call Cambodian emergency services at <strong>119</strong>.</p>
          </div>
        </div>
      ),
    },
    "FAQ": {
      title: "Frequently Asked Questions",
      body: (
        <div className="space-y-2">
          {[
            ["Can I visit before booking?", "Yes! Message the landlord through the app to arrange a visit. We recommend visiting before signing any agreement."],
            ["How is the security deposit calculated?", "For 1–12 month rentals: 1× monthly rent. For 13–24 months: 2× monthly rent. It's refunded within 14 days after moving out, subject to property inspection."],
            ["Can I cancel my booking?", "Yes, within 48 hours of confirming. After that, cancellation may forfeit your security deposit. Contact support to request a refund."],
            ["Are listings verified?", "Listings marked with a blue ✓ have been inspected by the Jomrork team. Landlords and addresses are verified against official records."],
            ["What if there's a dispute with my landlord?", "Use the 'Report a Problem' feature. Jomrork mediates disputes and can escalate to local authorities if needed."],
            ["Do I need to pay the full rent upfront?", "No! You only pay the first month's rent plus security deposit at booking. Remaining months are paid monthly."],
            ["How do points work?", "You earn 1 Jomrork Point for every $1 of rent paid. Points can be redeemed for discounts on future bookings."],
          ].map(([q, a], i) => (
            <div key={i} className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
              <p className="font-bold text-gray-900 text-sm mb-1">{q}</p>
              <p className="text-xs text-gray-500 leading-relaxed">{a}</p>
            </div>
          ))}
        </div>
      ),
    },
    "Contact Support": {
      title: "Contact Support",
      body: (
        <div className="space-y-3">
          {[
            { label:"Live Chat", sub:"Average response: 5 minutes", Icon: IC.Msg, badge:"Online" },
            { label:"Email Support", sub:"support@jomrork.com.kh", Icon: IC.FileText, badge:null },
            { label:"Phone", sub:"+855 23 999 888 (9AM–6PM)", Icon: IC.Bell, badge:null },
          ].map(({ label, sub, Icon, badge }) => (
            <button key={label} className="w-full bg-white rounded-2xl p-4 border border-gray-100 shadow-sm flex items-center gap-3 active:bg-gray-50 transition-colors">
              <div className="w-10 h-10 bg-[#173A5E]/10 rounded-xl flex items-center justify-center text-[#173A5E]"><Icon /></div>
              <div className="flex-1 text-left">
                <p className="font-bold text-gray-900 text-sm">{label}</p>
                <p className="text-xs text-gray-500">{sub}</p>
              </div>
              {badge && <Tag label={badge} color="green" />}
              <IC.ChevronRight />
            </button>
          ))}
          <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm space-y-2">
            <p className="text-sm font-bold text-gray-900">Send a message</p>
            <textarea rows={3} className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-[#173A5E] resize-none" placeholder="How can we help?" />
            <button className="w-full bg-[#173A5E] text-white font-bold py-3 rounded-full text-sm active:scale-95 transition-transform">Send</button>
          </div>
        </div>
      ),
    },
    "Terms of Service": {
      title: "Terms of Service",
      body: (
        <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm space-y-4 text-sm text-gray-700">
          <p className="text-[10px] text-gray-400">Last updated: September 2026</p>
          {[
            ["1. Acceptance", "By using Jomrork, you agree to these terms. If you do not agree, please do not use the platform."],
            ["2. Eligibility", "You must be at least 18 years old and a verified student at an accredited Cambodian university to book through Jomrork."],
            ["3. Identity Verification", "All users must complete National ID verification before making bookings. False documentation is grounds for immediate account termination and may be referred to authorities."],
            ["4. Booking & Payment", "Bookings are confirmed upon payment of the first month's rent and security deposit. Remaining monthly rents are paid directly to the landlord or via the platform."],
            ["5. Cancellation & Refunds", "Refunds are available within 48 hours of booking confirmation. After 48 hours, the security deposit is non-refundable unless there is a platform error."],
            ["6. Prohibited Conduct", "Users may not sublease, conduct commercial activities, or damage property. Violations may result in account suspension."],
            ["7. Disputes", "Jomrork provides mediation services for landlord-tenant disputes but is not a party to the rental agreement."],
            ["8. Changes", "Jomrork may update these terms at any time. Continued use of the platform constitutes acceptance of updated terms."],
          ].map(([title, text]) => (
            <div key={title as string}>
              <p className="font-bold text-gray-900 mb-1">{title as string}</p>
              <p className="leading-relaxed text-gray-600 text-xs">{text as string}</p>
            </div>
          ))}
        </div>
      ),
    },
    "Privacy Policy": {
      title: "Privacy Policy",
      body: (
        <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm space-y-4 text-sm text-gray-700">
          <p className="text-[10px] text-gray-400">Last updated: September 2026</p>
          {[
            ["Data We Collect", "We collect your name, National ID number (hashed), student ID, phone, email, location, and booking history to operate the platform."],
            ["How We Use Data", "Your data is used to verify identity, facilitate bookings, communicate with landlords on your behalf, and improve our platform."],
            ["Data Sharing", "We share necessary booking details with your landlord only after a confirmed booking. We never sell your data to third parties."],
            ["National ID Data", "Your National ID is processed through encrypted channels and only the verification status (pass/fail) is stored — never the raw ID number."],
            ["Data Security", "All data is encrypted at rest (AES-256) and in transit (TLS 1.3). We conduct regular security audits."],
            ["Your Rights", "You can request a copy of your data, correction of inaccuracies, or deletion of your account at any time by contacting support."],
            ["Cookies", "We use minimal cookies for session management and analytics. No advertising cookies are used."],
          ].map(([title, text]) => (
            <div key={title as string}>
              <p className="font-bold text-gray-900 mb-1">{title as string}</p>
              <p className="leading-relaxed text-gray-600 text-xs">{text as string}</p>
            </div>
          ))}
        </div>
      ),
    },
    "Commission Policy": {
      title: "Commission Policy",
      body: (
        <div className="space-y-3">
          <div className="bg-[#173A5E] rounded-2xl p-5 text-white">
            <p className="text-xs text-white/60 uppercase tracking-wider mb-1">Our Promise</p>
            <p className="font-bold text-xl">Zero fees for students</p>
            <p className="text-white/70 text-sm mt-1">Jomrork charges nothing to tenants. Ever.</p>
          </div>
          <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm space-y-3 text-sm">
            <p className="font-bold text-gray-900">How Jomrork earns revenue</p>
            <p className="text-gray-600 leading-relaxed">Jomrork charges a commission <strong>only from landlords/accommodation owners</strong> who list their properties on the platform — not from students or tenants.</p>
            <div className="bg-[#173A5E]/5 border border-[#173A5E]/15 rounded-xl p-3">
              <p className="font-bold text-[#173A5E] text-sm mb-1">Commission Rate</p>
              <p className="text-2xl font-black text-[#173A5E]">8–10%</p>
              <p className="text-xs text-gray-600 mt-1">of the first month&apos;s rent, charged <strong>once</strong> at the time the student confirms move-in.</p>
            </div>
            <div className="border-t border-gray-50 pt-3 space-y-2 text-xs text-gray-600">
              <p><strong>Example:</strong> A $100/month room → Jomrork charges the landlord $8–10 when the student moves in. The student pays exactly $100.</p>
              <p>This is <strong>far below</strong> traditional rental agencies who charge 50–100% of one month&apos;s rent.</p>
              <p>Landlords benefit from free listing exposure, digital contract management, and verified student tenants.</p>
            </div>
          </div>
          <div className="bg-green-50 border border-green-100 rounded-2xl p-3 flex items-start gap-2">
            <IC.Info />
            <p className="text-xs text-green-700">Students on Jomrork always pay the exact listed price with <strong>no hidden fees</strong>.</p>
          </div>
        </div>
      ),
    },
  };

  const detail = content[item];
  if (!detail) return null;

  return (
    <div className="flex flex-col h-full bg-[#fbfaf7]">
      <div className="bg-[#173A5E] pt-12 pb-4 px-4 flex items-center gap-3 shrink-0">
        <button onClick={onBack} className="w-9 h-9 bg-white/15 rounded-full flex items-center justify-center active:bg-white/25">
          <IC.Back />
        </button>
        <p className="text-white font-bold text-base">{detail.title}</p>
      </div>
      <div className="flex-1 overflow-y-auto scroll-smooth-touch px-4 pt-4 pb-6">
        {detail.body}
      </div>
    </div>
  );
}

// ─── PROFILE ─────────────────────────────────────────────────────────────────
function ProfileScreen({ points, bookingCount, isGuest, onLogin }: {
  points: number; bookingCount: number; isGuest: boolean; onLogin: () => void;
}) {
  const [editing, setEditing] = useState(false);
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const [openDetail, setOpenDetail] = useState<string | null>(null);
  const [lang, setLang] = useState<"en" | "km">("en");
  const fileRef = useRef<HTMLInputElement>(null);

  const menuSections = [
    { section: "Account", items: [
      { label:"My Bookings", sub:`${bookingCount} booking${bookingCount !== 1 ? "s" : ""}`, Icon: IC.Calendar },
      { label:"Payment Methods", sub:"ABA QR · Bank Card", Icon: IC.Card },
      { label:"Notification Settings", sub:"Manage alerts", Icon: IC.Bell },
      { label:"ID Verification", sub:"National ID — Verified ✓", Icon: IC.IdCard },
    ]},
    { section: "Support", items: [
      { label:"How Jomrork Works", sub:"Step-by-step guide", Icon: IC.Info },
      { label:"Report a Problem", sub:"We respond within 24h", Icon: IC.Flag },
      { label:"FAQ", sub:"Common questions answered", Icon: IC.BookOpen },
      { label:"Contact Support", sub:"Chat · Email · Phone", Icon: IC.Msg },
    ]},
    { section: "Legal", items: [
      { label:"Terms of Service", sub:"Last updated Sep 2026", Icon: IC.FileText },
      { label:"Privacy Policy", sub:"Your data is protected", Icon: IC.Lock },
      { label:"Commission Policy", sub:"8–10% from landlords — free for you", Icon: IC.Coin },
    ]},
  ];

  if (openDetail) {
    return <ProfileDetail item={openDetail} bookingCount={bookingCount} onBack={() => setOpenDetail(null)} />;
  }

  // ── Guest profile view ──────────────────────────────────────
  if (isGuest) {
    const guestLegal = [
      { label:"How Jomrork Works", sub:"Step-by-step guide", Icon: IC.Info },
      { label:"FAQ", sub:"Common questions answered", Icon: IC.BookOpen },
      { label:"Commission Policy", sub:"8–10% from landlords — free for you", Icon: IC.Coin },
      { label:"Terms of Service", sub:"Last updated Sep 2026", Icon: IC.FileText },
      { label:"Privacy Policy", sub:"Your data is protected", Icon: IC.Lock },
    ];
    return (
      <div className="flex flex-col h-full bg-[#fbfaf7]">
        <div className="bg-[#173A5E] pt-14 pb-5 px-4 shrink-0">
          <p style={{ fontFamily: PP, fontWeight: 700, fontSize: 20, color: "#fff", lineHeight: 1.15, marginBottom: 16 }}>Profile</p>
          <div className="flex flex-col items-center">
            <div className="w-[68px] h-[68px] rounded-full bg-white/15 border-2 border-white/30 flex items-center justify-center mb-2">
              <svg viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth={1.5} className="w-9 h-9">
                <circle cx="12" cy="8" r="4" />
                <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" strokeLinecap="round" />
              </svg>
            </div>
            <p className="text-white font-bold text-base">Guest</p>
            <p className="text-white/50 text-xs mt-0.5">Browsing without an account</p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto scroll-smooth-touch px-4 pt-4 pb-6 space-y-3">
          {/* CTA card */}
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm text-center space-y-3">
            <p className="text-gray-800 font-bold text-base">You&apos;re browsing as a guest</p>
            <p className="text-gray-500 text-sm leading-relaxed">Log in or sign up to book accommodations, save listings, view your history, and earn points.</p>
            <button onClick={onLogin}
              className="w-full bg-[#173A5E] text-white font-bold py-3 rounded-full text-sm active:scale-95 transition-transform">
              Log In / Sign Up
            </button>
          </div>

          {/* Locked account sections */}
          <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider px-4 pt-3 pb-1">Account</p>
            {[
              { label:"My Bookings", sub:"Log in to see your bookings", Icon: IC.Calendar },
              { label:"Payment Methods", sub:"Log in to manage payments", Icon: IC.Card },
              { label:"ID Verification", sub:"Required to book", Icon: IC.IdCard },
            ].map(({ label, sub, Icon }) => (
              <button key={label} onClick={onLogin}
                className="w-full flex items-center gap-3 px-4 py-3 border-t border-gray-50 active:bg-gray-50 transition-colors opacity-50">
                <div className="text-gray-400"><Icon /></div>
                <div className="flex-1 text-left min-w-0">
                  <p className="text-sm text-gray-500 leading-tight">{label}</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">{sub}</p>
                </div>
                <svg viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth={2} className="w-4 h-4 shrink-0">
                  <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0110 0v4" strokeLinecap="round" />
                </svg>
              </button>
            ))}
          </div>

          {/* Public info (accessible to guests) */}
          <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider px-4 pt-3 pb-1">Info &amp; Legal</p>
            {guestLegal.map(({ label, sub, Icon }) => (
              <button key={label} onClick={() => setOpenDetail(label)}
                className="w-full flex items-center gap-3 px-4 py-3 border-t border-gray-50 active:bg-gray-50 transition-colors">
                <div className="text-gray-500"><Icon /></div>
                <div className="flex-1 text-left min-w-0">
                  <p className="text-sm text-gray-700 leading-tight">{label}</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">{sub}</p>
                </div>
                <IC.ChevronRight />
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-[#fbfaf7]">
      <div className="bg-[#173A5E] pt-14 pb-5 px-4 shrink-0">
        <p style={{ fontFamily: PP, fontWeight: 700, fontSize: 20, color: "#fff", lineHeight: 1.15, marginBottom: 16 }}>Profile</p>
        {/* Avatar with change-photo */}
        <div className="flex flex-col items-center mb-3">
          <button onClick={() => fileRef.current?.click()} className="relative mb-2 active:scale-95 transition-transform">
            <div className="w-[72px] h-[72px] rounded-full border-2 border-white/40 overflow-hidden bg-white/20 flex items-center justify-center">
              {profilePic
                ? <img src={profilePic} className="w-full h-full object-cover" alt="Profile" />
                : <span className="text-white text-2xl font-bold">SK</span>
              }
            </div>
            <div className="absolute bottom-0 right-0 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-md">
              <svg viewBox="0 0 24 24" fill="none" stroke="#173A5E" strokeWidth={2.2} className="w-3.5 h-3.5">
                <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="12" cy="13" r="4" />
              </svg>
            </div>
          </button>
          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={e => {
            const f = e.target.files?.[0];
            if (f) setProfilePic(URL.createObjectURL(f));
          }} />
          <p className="text-white font-bold text-lg">Sophea Kea</p>
          <p className="text-white/55 text-xs">Student at RUPP · Member since 2026</p>
        </div>

        {/* Points + Edit Profile in the same row — equal height */}
        <div className="flex items-stretch gap-2">
          <div className="flex-1 flex items-center gap-2 bg-white/15 border border-white/25 rounded-2xl px-3 py-2.5">
            <IC.CoinLg />
            <div>
              <p className="text-white/60 text-[10px] leading-none">Points Balance</p>
              <p className="text-white font-bold text-sm leading-tight">{points.toLocaleString()} pts</p>
            </div>
          </div>
          <button onClick={() => setEditing(v => !v)}
            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 bg-white/15 rounded-2xl text-white text-xs border border-white/25 active:bg-white/25 font-semibold">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-3.5 h-3.5 shrink-0">
              <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" strokeLinecap="round" />
              <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" strokeLinecap="round" />
            </svg>
            {editing ? "Save Profile" : "Edit Profile"}
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scroll-smooth-touch px-4 pt-4 pb-4 space-y-3">
        {editing && (
          <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm space-y-3 fade-in">
            <p className="font-bold text-gray-900 text-sm">Edit Profile</p>
            {/* Required */}
            <p className="text-[10px] font-bold text-red-400 uppercase tracking-wider">Required</p>
            {[["Full Name","Sophea Kea"],["National ID Number","120498123456789"],["Phone","+855 12 345 678"]].map(([lbl,val]) => (
              <div key={lbl}>
                <p className="text-xs text-gray-500 mb-1">{lbl}</p>
                <input defaultValue={val} className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-[#173A5E] transition-colors" />
              </div>
            ))}
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider pt-1">Optional</p>
            {[["Email","sophea.kea@student.rupp.edu"],["University / Institution","RUPP"],["Occupation","Student"]].map(([lbl,val]) => (
              <div key={lbl}>
                <p className="text-xs text-gray-500 mb-1">{lbl}</p>
                <input defaultValue={val} className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-[#173A5E] transition-colors" />
              </div>
            ))}
          </div>
        )}

        {/* Personal info card */}
        <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Personal Info</p>
          <div className="divide-y divide-gray-50">
            {[
              ["Full Name", "Sophea Kea"],
              ["National ID", "120498 ••••••• (verified)"],
              ["Phone", "+855 12 345 678"],
              ["Occupation", "Student"],
              ["University", "RUPP (optional)"],
              ["Member Since", "January 2026"],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between py-2 first:pt-0 last:pb-0 gap-2">
                <span className="text-xs text-gray-500 shrink-0">{k}</span>
                <span className="text-xs font-semibold text-gray-800 text-right">{v}</span>
              </div>
            ))}
          </div>
          <div className="mt-2 pt-2 border-t border-gray-50 flex items-center gap-2">
            <IC.Check color="#22c55e" />
            <span className="text-[10px] text-green-600 font-semibold">National ID verified — booking enabled</span>
          </div>
        </div>

        {/* Language setting */}
        <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-3">Language</p>
          <div className="flex gap-2">
            {([{ code: "en", label: "🇬🇧  English" }, { code: "km", label: "🇰🇭  Khmer" }] as const).map(({ code, label }) => (
              <button key={code} onClick={() => setLang(code)}
                className={`flex-1 py-2.5 rounded-xl text-sm font-semibold border transition-colors ${lang === code ? "bg-[#173A5E] text-white border-[#173A5E]" : "bg-gray-50 text-gray-600 border-gray-200 active:bg-gray-100"}`}>
                {label}
              </button>
            ))}
          </div>
          {lang === "km" && (
            <p className="text-[11px] text-[#173A5E] mt-2 text-center">Khmer language — full translation coming soon</p>
          )}
        </div>

        {menuSections.map(({ section, items }) => (
          <div key={section} className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider px-4 pt-3 pb-1">{section}</p>
            {items.map(({ label, sub, Icon }) => (
              <button key={label} onClick={() => setOpenDetail(label)}
                className="w-full flex items-center gap-3 px-4 py-3 border-t border-gray-50 active:bg-gray-50 transition-colors">
                <div className="text-gray-500"><Icon /></div>
                <div className="flex-1 text-left min-w-0">
                  <p className="text-sm text-gray-700 leading-tight">{label}</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">{sub}</p>
                </div>
                <IC.ChevronRight />
              </button>
            ))}
          </div>
        ))}

        <div className="bg-[#173A5E]/5 border border-[#173A5E]/15 rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <IC.Info />
            <p className="text-sm font-bold text-[#173A5E]">How Jomrork Works</p>
          </div>
          <p className="text-xs text-gray-600 leading-relaxed">
            We charge landlords 8–10% of first month rent, once — well below agency rates. You pay <strong>no fees</strong>. Earn 1 point per $1 rent paid. Refunds available within <strong>48 hours</strong> of booking.
          </p>
        </div>

        <button className="w-full py-3 rounded-2xl border border-red-200 text-red-500 font-semibold text-sm active:scale-95 transition-transform">
          Sign Out
        </button>
      </div>
    </div>
  );
}

// ─── BOTTOM NAV ───────────────────────────────────────────────────────────────
type Tab = "home" | "bookings" | "favorites" | "messages" | "profile";

// ─── SIDE NAV (tablet / desktop) ─────────────────────────────────────────────
function SideNav({ active, onChange }: { active: Tab; onChange: (t: Tab) => void }) {
  const tabs: { id: Tab; Icon: (on: boolean) => React.ReactElement; label: string }[] = [
    { id:"home",      Icon: on => <IC.Home on={on} />,     label:"Home" },
    { id:"bookings",  Icon: on => <IC.Calendar on={on} />, label:"Bookings" },
    { id:"favorites", Icon: on => <IC.Heart on={on} />,    label:"Saved" },
    { id:"messages",  Icon: on => <IC.Msg on={on} />,      label:"Messages" },
    { id:"profile",   Icon: on => <IC.User on={on} />,     label:"Profile" },
  ];
  return (
    <div className="hidden sm:flex flex-col shrink-0 h-full"
      style={{ width: 72, background: "#173A5E", borderRight: "1px solid rgba(255,255,255,0.08)" }}>
      {/* Logo */}
      <div className="flex items-center justify-center py-6 shrink-0">
        <JomrorkIcon size={36} glow />
      </div>
      {/* Nav items */}
      <div className="flex flex-col gap-1 px-2 flex-1">
        {tabs.map(t => {
          const isActive = active === t.id;
          return (
            <button key={t.id} onClick={() => onChange(t.id)}
              style={{ transition: "background 0.18s ease" }}
              className={`flex flex-col items-center gap-1 py-3 px-1 rounded-2xl ${isActive ? "bg-white/18" : "hover:bg-white/8 active:bg-white/15"}`}>
              <div style={{ filter: isActive ? "none" : "opacity(0.55)" }}>
                {/* Render icon in white for sidebar */}
                <svg viewBox="0 0 24 24" fill={isActive ? "rgba(255,255,255,0.95)" : "none"}
                  stroke={isActive ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.6)"}
                  strokeWidth={1.8} className="w-5 h-5">
                  {t.id === "home"      && <><path d="M3 12L12 3l9 9" strokeLinecap="round" strokeLinejoin="round"/><path d="M5 10v9a1 1 0 001 1h4v-5h4v5h4a1 1 0 001-1v-9" strokeLinecap="round" strokeLinejoin="round"/></>}
                  {t.id === "bookings"  && <><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6" strokeLinecap="round"/><line x1="8" y1="2" x2="8" y2="6" strokeLinecap="round"/><line x1="3" y1="10" x2="21" y2="10"/></>}
                  {t.id === "favorites" && <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" strokeLinecap="round"/>}
                  {t.id === "messages"  && <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" strokeLinecap="round" strokeLinejoin="round"/>}
                  {t.id === "profile"   && <><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" strokeLinecap="round"/><circle cx="12" cy="7" r="4"/></>}
                </svg>
              </div>
              <span style={{ fontFamily: PP, fontWeight: isActive ? 600 : 400, fontSize: 8.5,
                color: isActive ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.5)" }}>
                {t.label}
              </span>
              {isActive && <div style={{ width: 16, height: 2.5, borderRadius: 2, background: "#FBD34D", marginTop: 1 }} />}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── BOTTOM NAV (mobile only) ─────────────────────────────────────────────────
function BottomNav({ active, onChange }: { active: Tab; onChange: (t: Tab) => void }) {
  const tabs: { id: Tab; Icon: (on: boolean) => React.ReactElement; label: string }[] = [
    { id:"home",     Icon: on => <IC.Home on={on} />,     label:"Home" },
    { id:"bookings", Icon: on => <IC.Calendar on={on} />, label:"Bookings" },
    { id:"favorites",Icon: on => <IC.Heart on={on} />,    label:"Saved" },
    { id:"messages", Icon: on => <IC.Msg on={on} />,      label:"Messages" },
    { id:"profile",  Icon: on => <IC.User on={on} />,     label:"Profile" },
  ];
  return (
    <div className="bg-white border-t border-gray-100 flex items-center px-1 pt-2 pb-6 shrink-0" style={{ transition: "box-shadow 0.2s ease" }}>
      {tabs.map(t => {
        const isActive = active === t.id;
        return (
          <button key={t.id} onClick={() => onChange(t.id)}
            style={{ transition: "color 0.2s ease, transform 0.15s cubic-bezier(0.34,1.56,0.64,1)" }}
            className={`flex-1 flex flex-col items-center gap-0.5 py-1 active:scale-90 ${isActive ? "text-[#173A5E]" : "text-gray-400"}`}>
            <div style={{ transform: isActive ? "translateY(-1px)" : "translateY(0)", transition: "transform 0.22s cubic-bezier(0.34,1.56,0.64,1)" }}>
              {t.Icon(isActive)}
            </div>
            <span style={{ fontFamily: PP, fontWeight: isActive ? 600 : 400, fontSize: 9, color: isActive ? "#173A5E" : "#9ca3af", transition: "color 0.2s ease, font-weight 0.2s ease" }}>
              {t.label}
            </span>
            <div style={{ height: 3, width: isActive ? 18 : 0, borderRadius: 2, background: "#173A5E", transition: "width 0.28s cubic-bezier(0.34,1.56,0.64,1)", marginTop: 1 }} />
          </button>
        );
      })}
    </div>
  );
}

// ─── LOGIN SCREEN ─────────────────────────────────────────────────────────────
function LoginScreen({ onLogin, onGuest }: { onLogin: () => void; onGuest: () => void }) {
  const [showPass, setShowPass] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [bgLoaded, setBgLoaded] = useState(false);

  return (
    <div className="flex flex-col h-full relative overflow-hidden" style={{ background: "#0d2340" }}>
      {/* Full-bleed photo — fades in once loaded */}
      <img
        src={phnomPenhBg}
        alt=""
        onLoad={() => setBgLoaded(true)}
        className="absolute inset-0 w-full h-full object-cover"
        style={{ objectPosition: "center top", opacity: bgLoaded ? 1 : 0, transition: "opacity 0.8s ease" }}
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(23,58,94,0.62) 0%, rgba(23,58,94,0.28) 38%, rgba(0,0,18,0.72) 100%)" }} />

      {/* Scrollable content */}
      <div className="relative z-10 flex flex-col h-full overflow-y-auto">

        {/* Top bar: logo + location pill */}
        <div className="flex items-center justify-between px-5 pt-14 pb-3 shrink-0">
          <JomrorkLogo size={38} onDark glow />
          <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-white/30 bg-white/10 backdrop-blur-sm">
            <span style={{ fontFamily: PP, fontWeight: 500, color: "white", fontSize: 12 }}>Phnom Penh</span>
            <svg viewBox="0 0 12 12" fill="none" stroke="white" strokeWidth={2} className="w-3 h-3 shrink-0">
              <path d="M2 4l4 4 4-4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        {/* Hero text — sits in upper portion; flex-1 spacer pushes card down */}
        <div className="px-5 pt-4 pb-5 shrink-0">
          <p style={{ fontFamily: PP, fontWeight: 500, color: "#FBD34D", fontSize: 14 }} className="mb-2">
            {mode === "login" ? "Welcome back" : "Join Jomrork"}
          </p>
          <h1 style={{ fontFamily: PP, fontWeight: 700, lineHeight: 1.15, color: "white", fontSize: "clamp(26px,7vw,32px)", whiteSpace: "pre-line" }}>
            {mode === "login" ? "Your next room in\nthe city is waiting." : "Find your perfect\nstudent home today."}
          </h1>
        </div>

        {/* Spacer: shows monument between headline and card */}
        <div style={{ flex: 1, minHeight: 30, maxHeight: 100 }} />

        {/* Frosted glass card */}
        <div className="mx-3 mb-4 shrink-0">
          <div className="rounded-3xl p-6 space-y-4" style={{
            background: "rgba(255,255,255,0.13)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            border: "1px solid rgba(255,255,255,0.20)"
          }}>
            <p style={{ fontFamily: PP, fontWeight: 400, color: "rgba(255,255,255,0.78)", fontSize: 13 }}>
              Log in to pick up where you left off.
            </p>

            {/* Email */}
            {mode === "signup" && (
              <div className="flex items-center gap-3 bg-white rounded-2xl px-4 py-3.5">
                <svg viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth={1.8} className="w-5 h-5 shrink-0">
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" strokeLinecap="round"/><circle cx="12" cy="7" r="4"/>
                </svg>
                <input type="text" placeholder="Full name" className="flex-1 outline-none text-sm text-gray-800 placeholder-gray-400 bg-transparent" style={{ fontFamily: PP }} />
              </div>
            )}
            <div className="flex items-center gap-3 bg-white rounded-2xl px-4 py-3.5">
              <svg viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth={1.8} className="w-5 h-5 shrink-0">
                <rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 7l-10 7L2 7" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <input type="email" placeholder="you@gmail.com" value={email} onChange={e => setEmail(e.target.value)}
                className="flex-1 outline-none text-sm text-gray-800 placeholder-gray-400 bg-transparent" style={{ fontFamily: PP }} />
            </div>

            {/* Password */}
            <div className="flex items-center gap-3 bg-white rounded-2xl px-4 py-3.5">
              <svg viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth={1.8} className="w-5 h-5 shrink-0">
                <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4" strokeLinecap="round"/>
              </svg>
              <input type={showPass ? "text" : "password"} placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)}
                className="flex-1 outline-none text-sm text-gray-800 placeholder-gray-400 bg-transparent" style={{ fontFamily: PP }} />
              <button onClick={() => setShowPass(v => !v)} className="text-gray-400 active:text-gray-600 transition-colors shrink-0">
                {showPass ? (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
                    <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" strokeLinecap="round"/>
                    <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" strokeLinecap="round"/>
                    <line x1="1" y1="1" x2="23" y2="23" strokeLinecap="round"/>
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" strokeLinecap="round"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                )}
              </button>
            </div>
            {mode === "signup" && (
              <div className="flex items-center gap-3 bg-white rounded-2xl px-4 py-3.5">
                <svg viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth={1.8} className="w-5 h-5 shrink-0">
                  <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4" strokeLinecap="round"/>
                </svg>
                <input type="password" placeholder="Confirm password" className="flex-1 outline-none text-sm text-gray-800 placeholder-gray-400 bg-transparent" style={{ fontFamily: PP }} />
              </div>
            )}

            {/* Forgot password */}
            {mode === "login" && (
              <div className="flex justify-end">
                <button style={{ fontFamily: PP, fontWeight: 500, color: "#FBD34D", fontSize: 12 }} className="active:opacity-70">
                  Forgot password?
                </button>
              </div>
            )}

            {/* Primary CTA — white pill */}
            <button onClick={onLogin}
              className="w-full bg-white py-4 rounded-full text-sm shadow-md active:scale-[0.98] transition-transform"
              style={{ color: "#173A5E", fontFamily: PP, fontWeight: 600 }}>
              {mode === "login" ? "Log in" : "Create account"}
            </button>

            {/* OR divider */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-white/20" />
              <span style={{ fontFamily: PP, color: "rgba(255,255,255,0.55)", fontSize: 12 }}>or</span>
              <div className="flex-1 h-px bg-white/20" />
            </div>

            {/* Continue as guest — outline white pill */}
            <button onClick={onGuest}
              className="w-full border border-white/55 py-4 rounded-full text-sm text-white active:scale-[0.98] transition-transform"
              style={{ fontFamily: PP, fontWeight: 600 }}>
              Continue as guest
            </button>

            {/* Sign up / log in toggle */}
            <p className="text-center text-sm" style={{ fontFamily: PP, fontWeight: 400, color: "rgba(255,255,255,0.70)" }}>
              {mode === "login" ? (
                <>New here?{" "}
                  <button onClick={() => setMode("signup")} style={{ fontWeight: 700, color: "white" }} className="active:opacity-70">
                    Create an account
                  </button>
                </>
              ) : (
                <>Already have an account?{" "}
                  <button onClick={() => setMode("login")} style={{ fontWeight: 700, color: "white" }} className="active:opacity-70">
                    Log in
                  </button>
                </>
              )}
            </p>

            {/* National ID badge */}
            <div className="pt-3 flex items-start gap-3" style={{ borderTop: "1.5px dashed rgba(255,255,255,0.25)" }}>
              <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0" style={{ border: "1px solid rgba(251,211,77,0.5)" }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="#FBD34D" strokeWidth={1.8} className="w-4 h-4">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <p style={{ fontFamily: PP, fontWeight: 400, color: "rgba(255,255,255,0.68)", fontSize: 12, lineHeight: 1.5 }}>
                <strong style={{ color: "rgba(255,255,255,0.88)", fontWeight: 600 }}>National ID required</strong> before your first booking — it keeps the community safe.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── APP ROOT ─────────────────────────────────────────────────────────────────
export default function App() {
  const [phase, setPhase]   = useState<"splash"|"login"|"app">("splash");
  const [isGuest, setIsGuest] = useState(false);
  const [tab, setTab]       = useState<Tab>("home");
  const [detailId, setDetailId]     = useState<string|null>(null);
  const [bookingId, setBookingId]   = useState<string|null>(null);
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter|null>(null);
  const [showSearch, setShowSearch] = useState(false);
  const [savedIds, setSavedIds]     = useState<Set<string>>(new Set());
  const [bookingHistory, setBookingHistory] = useState<BookingRecord[]>([]);
  const [points, setPoints]         = useState(0);
  const [bookedByUser, setBookedByUser] = useState<Set<string>>(new Set());
  const [everBookedListings, setEverBookedListings] = useState<Set<string>>(new Set());
  const [autoMessages, setAutoMessages] = useState<AutoMessage[]>([]);

  const toggleSave = (id: string) => setSavedIds(prev => {
    const next = new Set(prev);
    next.has(id) ? next.delete(id) : next.add(id);
    return next;
  });

  const openListing  = (id: string) => { setDetailId(id); setCategoryFilter(null); setShowSearch(false); };
  const openBooking  = (id: string) => { setBookingId(id); setDetailId(null); };
  const openCategory = (f: CategoryFilter) => { setCategoryFilter(f); setShowSearch(false); setDetailId(null); };

  const handleNavChange = (t: Tab) => {
    setTab(t); setDetailId(null); setBookingId(null); setCategoryFilter(null); setShowSearch(false);
  };

  const applyBookingRecord = (record: BookingRecord) => {
    setBookingHistory(prev => [record, ...prev]);
    setPoints(prev => prev + record.pointsEarned);
    setBookedByUser(prev => new Set([...prev, record.listingId]));
    setEverBookedListings(prev => new Set([...prev, record.listingId]));
    const listing = LISTINGS.find(l => l.id === record.listingId);
    if (listing) {
      const msgDetail = `Booking Confirmation\n\nDear ${listing.landlordName},\n\nA booking has been confirmed via Jomrork.\n\n• Property: ${listing.title}\n• Duration: ${record.months} month${record.months>1?"s":""}\n• Receipt: ${record.receiptNo}\n• Total Paid: $${record.total}\n• Contract Ref: JMR-CONTR\n• Payment: ${record.payMethod === "aba" ? "ABA QR" : "Bank Card"}\n\nThe tenant will contact you shortly to arrange check-in. Thank you for listing with Jomrork!`;
      setAutoMessages(prev => [{
        id: "auto-" + record.receiptNo,
        name: listing.landlordName,
        preview: `Booking confirmed: ${listing.title} · ${record.receiptNo}`,
        time: "Just now",
        detail: msgDetail,
      }, ...prev]);
    }
  };

  const goToLogin = () => { setIsGuest(false); setPhase("login"); };

  if (phase === "splash") return (
    <>
      <SplashScreen onDone={() => setPhase("login")} />
      {/* Preload auth background while splash plays */}
      <img src={phnomPenhBg} alt="" style={{ position: "fixed", width: 1, height: 1, opacity: 0, pointerEvents: "none" }} />
    </>
  );
  if (phase === "login")  return (
    <LoginScreen
      onLogin={() => { setIsGuest(false); setPhase("app"); }}
      onGuest={() => { setIsGuest(true); setPhase("app"); }}
    />
  );

  const totalBookings = bookingHistory.length;
  const showOverlay = showSearch || !!bookingId || !!detailId || !!categoryFilter;
  const showNav = !showOverlay;

  // Crossfade style — keeps all 5 tabs mounted, transitions opacity only
  const tabStyle = (t: Tab): React.CSSProperties => ({
    position: "absolute", inset: 0,
    opacity: tab === t && !showOverlay ? 1 : 0,
    pointerEvents: tab === t && !showOverlay ? "auto" : "none",
    transition: "opacity 0.25s ease",
  });

  const renderOverlay = () => {
    if (showSearch) return (
      <div key="search" className="overlay-enter absolute inset-0">
        <SearchOverlay onClose={() => setShowSearch(false)} onListing={openListing} savedIds={savedIds} onSave={toggleSave} bookedByUser={bookedByUser} />
      </div>
    );
    if (bookingId) return (
      <div key={`booking-${bookingId}`} className="overlay-enter absolute inset-0">
        <BookingFlow
          listingId={bookingId}
          onBack={() => setBookingId(null)}
          onApply={applyBookingRecord}
          onDone={() => { setBookingId(null); setDetailId(null); setTab("bookings"); }}
          onGoHome={(record) => { applyBookingRecord(record); setBookingId(null); setDetailId(null); setTab("home"); }}
        />
      </div>
    );
    if (detailId) return (
      <div key={`detail-${detailId}`} className="overlay-enter absolute inset-0">
        <ListingDetail listingId={detailId} onBack={() => setDetailId(null)} onBook={openBooking} savedIds={savedIds} onSave={toggleSave} bookedByUser={bookedByUser} isGuest={isGuest} onLogin={goToLogin} />
      </div>
    );
    if (categoryFilter) return (
      <div key={`cat-${categoryFilter}`} className="overlay-enter absolute inset-0">
        <CategoryScreen filter={categoryFilter} onBack={() => setCategoryFilter(null)} onListing={openListing} savedIds={savedIds} onSave={toggleSave} bookedByUser={bookedByUser} />
      </div>
    );
    return null;
  };

  return (
    <div className="w-full h-full flex overflow-hidden bg-[#fbfaf7]">
      {/* Sidebar — tablet & desktop only (hidden on mobile via CSS) */}
      {showNav && <SideNav active={tab} onChange={handleNavChange} />}

      {/* Main content column */}
      <div className="flex-1 min-w-0 flex flex-col overflow-hidden">
        <div className="flex-1 min-h-0 relative overflow-hidden">
          {/* All 5 tabs always mounted — crossfade via opacity only */}
          <div style={tabStyle("home")}><HomeScreen onListing={openListing} onSearch={() => setShowSearch(true)} onCategory={openCategory} savedIds={savedIds} onSave={toggleSave} bookedByUser={bookedByUser} isGuest={isGuest} /></div>
          <div style={tabStyle("bookings")}><BookingsScreen records={bookingHistory} onView={openListing} isGuest={isGuest} onLogin={goToLogin} /></div>
          <div style={tabStyle("favorites")}><FavoritesScreen savedIds={savedIds} onListing={openListing} onSave={toggleSave} bookedByUser={bookedByUser} isGuest={isGuest} onLogin={goToLogin} /></div>
          <div style={tabStyle("messages")}><MessagesScreen autoMessages={autoMessages} isGuest={isGuest} onLogin={goToLogin} /></div>
          <div style={tabStyle("profile")}><ProfileScreen points={points} bookingCount={totalBookings} isGuest={isGuest} onLogin={goToLogin} /></div>
          {/* Overlays */}
          {renderOverlay()}
        </div>
        {/* Bottom nav — mobile only */}
        {showNav && (
          <div className="sm:hidden">
            <BottomNav active={tab} onChange={handleNavChange} />
          </div>
        )}
      </div>
    </div>
  );
}
