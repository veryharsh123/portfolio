"use client";

import { useEffect, useRef, useState } from "react";

// A bulb hanging from the top of the page. Pull its cord (drag it down, click
// it, or press Enter) to switch the lights off for dark mode, and again to
// switch them back on. The theme itself is set before paint by the script in
// layout.tsx, so this only flips it. Until someone pulls it, the page follows
// the system setting, and pulling it back to match the system follows it again.

const PAPER = { light: "#f3f4f6", dark: "#0e1014" };
const MAX_PULL = 28; // px the cord stretches at most
const TRIGGER = 10; // px of stretch that counts as a pull

type Theme = keyof typeof PAPER;

const DARK_QUERY = "(prefers-color-scheme: dark)";

const currentTheme = (): Theme => (document.documentElement.dataset.theme === "dark" ? "dark" : "light");
const systemTheme = (): Theme => (matchMedia(DARK_QUERY).matches ? "dark" : "light");

function savedTheme() {
  try {
    return localStorage.getItem("theme");
  } catch {
    return null;
  }
}

function setThemeColor(theme: Theme) {
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", PAPER[theme]);
}

export default function Lamp() {
  const [dark, setDark] = useState(false);
  const [swings, setSwings] = useState(0);
  const [tugs, setTugs] = useState(0);
  const button = useRef<HTMLButtonElement>(null);
  const drag = useRef<{ y: number; pull: number } | null>(null);
  const dragged = useRef(false);

  function apply(theme: Theme) {
    document.documentElement.dataset.theme = theme;
    setThemeColor(theme);
    setDark(theme === "dark");
  }

  useEffect(() => {
    apply(currentTheme());
    // Follow the system as it changes, unless the lamp has overridden it.
    const media = matchMedia(DARK_QUERY);
    const onChange = () => {
      if (!savedTheme()) apply(systemTheme());
    };
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  function toggle() {
    const next: Theme = currentTheme() === "dark" ? "light" : "dark";
    try {
      if (next === systemTheme()) localStorage.removeItem("theme");
      else localStorage.setItem("theme", next);
    } catch {}
    apply(next);
    setSwings((n) => n + 1);
  }

  function setPull(px: number) {
    button.current?.style.setProperty("--pull", String(px));
  }

  function onPointerDown(e: React.PointerEvent<HTMLButtonElement>) {
    if (e.button !== 0) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    e.currentTarget.classList.add("dragging");
    drag.current = { y: e.clientY, pull: 0 };
    dragged.current = false;
  }

  function onPointerMove(e: React.PointerEvent<HTMLButtonElement>) {
    if (!drag.current) return;
    const dy = Math.max(0, e.clientY - drag.current.y);
    if (dy > 4) dragged.current = true;
    // Rubber band: easy to start, harder the further it goes.
    drag.current.pull = MAX_PULL * (1 - Math.exp(-dy / 40));
    setPull(drag.current.pull);
  }

  function release(e: React.PointerEvent<HTMLButtonElement>) {
    if (!drag.current) return;
    const { pull } = drag.current;
    drag.current = null;
    e.currentTarget.classList.remove("dragging");
    setPull(0);
    if (dragged.current && pull >= TRIGGER) toggle();
  }

  function onClick() {
    // A drag already did its work on pointerup; this handles clicks and keys.
    if (dragged.current) {
      dragged.current = false;
      return;
    }
    setTugs((n) => n + 1);
    toggle();
  }

  return (
    <button
      ref={button}
      type="button"
      className={`lamp${tugs ? ` tug-${tugs % 2}` : ""}`}
      aria-label="Dark mode"
      aria-pressed={dark}
      title={dark ? "Pull to turn the lights on" : "Pull to turn the lights off"}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={release}
      onPointerCancel={release}
      onClick={onClick}
    >
      <svg
        viewBox="0 0 32 64"
        width="40"
        height="80"
        aria-hidden="true"
        className={swings ? `swing-${swings % 2}` : undefined}
      >
        <defs>
          <radialGradient id="lamp-glow">
            <stop offset="0" stopColor="#ffcf5c" stopOpacity="0.55" />
            <stop offset="1" stopColor="#ffcf5c" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle className="glow" cx="16" cy="37" r="16" fill="url(#lamp-glow)" />
        <line className="wire" x1="16" y1="0" x2="16" y2="18" />
        <rect className="socket" x="11" y="18" width="10" height="8" rx="1.5" />
        <path className="glass" d="M12.5 26h7c0 3 5.5 5 5.5 10.5a9 9 0 0 1-18 0C7 31 12.5 29 12.5 26z" />
        <path className="filament" d="M13.5 26v7.5l1.25-1.5 1.25 1.5 1.25-1.5 1.25 1.5V26" />
        <line className="cord" x1="16" y1="45.5" x2="16" y2="55" />
        <circle className="bead" cx="16" cy="57.5" r="2.5" />
      </svg>
    </button>
  );
}
