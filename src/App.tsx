import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BrandMark, SECTIONS, SLIDES } from "./slides";

const TOTAL = SLIDES.length;
const clamp = (i: number) => Math.max(0, Math.min(TOTAL - 1, i));

function parseHash(): number {
  const m = window.location.hash.match(/#slide-(\d+)/);
  if (m) {
    const n = parseInt(m[1], 10);
    if (n >= 1 && n <= TOTAL) return n - 1;
  }
  return 0;
}

export default function App() {
  const [index, setIndex] = useState<number>(() => parseHash());
  const [dir, setDir] = useState(1);
  const [collapsed, setCollapsed] = useState(false);
  const [scale, setScale] = useState(0.45);
  const wrapRef = useRef<HTMLDivElement>(null);

  const slide = SLIDES[index];
  const section = useMemo(
    () => SECTIONS.find((s) => s.id === slide.section) ?? SECTIONS[0],
    [slide.section]
  );

  /* ---------- hash sync ---------- */
  useEffect(() => {
    window.history.replaceState(null, "", `#slide-${index + 1}`);
  }, [index]);

  useEffect(() => {
    const onHash = () => setIndex(parseHash());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  /* ---------- stage scaling ---------- */
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const compute = () => {
      const w = el.clientWidth - 52;
      const h = el.clientHeight - 52;
      setScale(Math.max(0.15, Math.min(w / 1600, h / 900)));
    };
    compute();
    const ro = new ResizeObserver(compute);
    ro.observe(el);
    window.addEventListener("resize", compute);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", compute);
    };
  }, []);

  /* ---------- navigation ---------- */
  const lastRef = useRef(index);
  useEffect(() => {
    lastRef.current = index;
  }, [index]);

  const go = useCallback((i: number) => {
    const ni = clamp(i);
    setDir(ni >= lastRef.current ? 1 : -1);
    lastRef.current = ni;
    setIndex(ni);
  }, []);

  const goSection = useCallback((sectionId: string) => {
    const i = SLIDES.findIndex((s) => s.section === sectionId);
    if (i >= 0) go(i);
  }, [go]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowRight":
        case "PageDown":
        case " ":
          e.preventDefault();
          go(index + 1);
          break;
        case "ArrowLeft":
        case "PageUp":
          e.preventDefault();
          go(index - 1);
          break;
        case "Home":
          e.preventDefault();
          go(0);
          break;
        case "End":
          e.preventDefault();
          go(TOTAL - 1);
          break;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, go]);

  const progress = ((index + 1) / TOTAL) * 100;

  return (
    <div className="app-shell">
      {/* ==================== RAIL ==================== */}
      <aside className={`rail ${collapsed ? "collapsed" : ""}`}>
        <div className="rail-head">
          <button
            onClick={() => setCollapsed((c) => !c)}
            aria-label="ナビゲーション切替"
            style={{ background: "none", border: "none", cursor: "pointer", padding: 0, flex: "0 0 auto", display: "flex" }}
          >
            <BrandMark size={38} />
          </button>
          <div className="rail-labels">
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, fontWeight: 600, letterSpacing: "0.14em", color: "var(--paper)" }}>
              COMPANY
            </div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.18em", color: "rgba(247,248,245,0.45)", marginTop: 2 }}>
              GUIDE / 2026
            </div>
          </div>
        </div>

        <nav className="rail-nav">
          {SECTIONS.map((s) => {
            const active = s.id === section.id;
            const firstIdx = SLIDES.findIndex((sl) => sl.section === s.id);
            return (
              <button
                key={s.id}
                className={`rail-item ${active ? "active" : ""}`}
                onClick={() => goSection(s.id)}
                title={`${s.no} ${s.jp}`}
              >
                <span className="no">{s.no}</span>
                <span className="rail-labels">
                  <span className="en">{s.en}</span>
                  <span className="jp">{s.jp} ・ {firstIdx + 1}–</span>
                </span>
              </button>
            );
          })}
        </nav>

        <div className="rail-foot">
          <span className="txt" style={{ display: "block", color: "var(--lime)", marginBottom: 4 }}>
            ● {section.en.toUpperCase()}
          </span>
          <span className="txt">
            {String(index + 1).padStart(2, "0")} / {String(TOTAL).padStart(2, "0")}
          </span>
        </div>
      </aside>

      {/* ==================== MAIN ==================== */}
      <div className="main-col">
        {/* topbar */}
        <div className="topbar">
          <button className="nav-btn" onClick={() => go(index - 1)} disabled={index === 0} aria-label="前へ">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M9 2 L4 7 L9 12" stroke="currentColor" strokeWidth="2" />
            </svg>
          </button>
          <button className="nav-btn" onClick={() => go(index + 1)} disabled={index === TOTAL - 1} aria-label="次へ">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M5 2 L10 7 L5 12" stroke="currentColor" strokeWidth="2" />
            </svg>
          </button>

          <div style={{ minWidth: 0 }}>
            <div className="crumb-chapter">
              CH.{section.no} — {section.en.toUpperCase()}
            </div>
            <div className="crumb-title">{slide.title}</div>
          </div>

          <div className="progress-track" title={`${index + 1} / ${TOTAL}`}>
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>

          <div className="pageno">
            <span className="font-num" style={{ fontWeight: 700 }}>{String(index + 1).padStart(2, "0")}</span>
            <span className="total"> / {String(TOTAL).padStart(2, "0")}</span>
          </div>
        </div>

        {/* stage */}
        <div className="stage-wrap" ref={wrapRef}>
          <div className="stage slide-grid" style={{ transform: `scale(${scale})` }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={slide.id}
                initial={{ opacity: 0, x: dir * 70 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: dir * -50 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                style={{ position: "absolute", inset: 0 }}
              >
                {slide.body}
              </motion.div>
            </AnimatePresence>

            {/* slide footer */}
            <div className="slide-foot">
              <span>COMPANY GUIDE 2026</span>
              <span style={{ color: "var(--ink)", fontWeight: 600 }}>
                {section.en.toUpperCase()} — {section.jp}
              </span>
              <span>
                <span style={{ color: "var(--ink)" }}>{String(index + 1).padStart(2, "0")}</span> / {String(TOTAL).padStart(2, "0")}
              </span>
            </div>

            {/* crop marks */}
            <div className="cropmark" style={{ top: 20, left: 20, borderLeft: "1.5px solid", borderTop: "1.5px solid" }} />
            <div className="cropmark" style={{ top: 20, right: 20, borderRight: "1.5px solid", borderTop: "1.5px solid" }} />
            <div className="cropmark" style={{ bottom: 20, left: 20, borderLeft: "1.5px solid", borderBottom: "1.5px solid" }} />
            <div className="cropmark" style={{ bottom: 20, right: 20, borderRight: "1.5px solid", borderBottom: "1.5px solid" }} />
          </div>

          <div className="hint-bar">
            <span><kbd>←</kbd><kbd>→</kbd>ページ移動</span>
            <span><kbd>Space</kbd>次へ</span>
            <span><kbd>Home</kbd><kbd>End</kbd>先頭 / 末尾</span>
            <span>#slide-N で直接アクセス</span>
          </div>
        </div>
      </div>
    </div>
  );
}
