import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

/* ============================ types ============================ */
export type Section = { id: string; no: string; en: string; jp: string };
export type SlideDef = { id: string; section: string; title: string; body: React.ReactNode };

export const SECTIONS: Section[] = [
  { id: "cover", no: "01", en: "Cover", jp: "表紙" },
  { id: "overview", no: "02", en: "Overview", jp: "会社概要" },
  { id: "vision", no: "03", en: "Vision", jp: "理念・ビジョン" },
  { id: "business", no: "04", en: "Business", jp: "事業内容" },
  { id: "data", no: "05", en: "Data Service", jp: "データサービス" },
  { id: "engineering", no: "06", en: "Engineering", jp: "技術・開発" },
  { id: "cases", no: "07", en: "Cases", jp: "実績・事例" },
  { id: "company", no: "08", en: "Company", jp: "会社情報" },
];

/* ============================ helpers ============================ */
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function Fade({
  children,
  delay = 0,
  y = 26,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

export function Grow({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scaleY: 0 }}
      animate={{ opacity: 1, scaleY: 1 }}
      transition={{ duration: 0.8, delay, ease: EASE }}
      style={{ transformOrigin: "bottom" }}
    >
      {children}
    </motion.div>
  );
}

function Counter({
  to,
  decimals = 0,
  suffix = "",
  prefix = "",
  duration = 1300,
}: {
  to: number;
  decimals?: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / duration);
      const e = 1 - Math.pow(1 - p, 3);
      setVal(to * e);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to, duration]);
  return (
    <>
      {prefix}
      {val.toFixed(decimals)}
      {suffix}
    </>
  );
}

function Kick({ children, tone }: { children: React.ReactNode; tone?: "teal" | "amber" }) {
  return <div className={`kicker ${tone ?? ""}`}>{children}</div>;
}

function Head({
  kick,
  tone,
  title,
  sub,
  right,
}: {
  kick: string;
  tone?: "teal" | "amber";
  title: React.ReactNode;
  sub?: React.ReactNode;
  right?: React.ReactNode;
}) {
  return (
    <Fade delay={0.05}>
      <div className="slide-head">
        <div>
          <Kick tone={tone}>{kick}</Kick>
          <h2 className="slide-title">{title}</h2>
          {sub ? <div className="slide-sub">{sub}</div> : null}
        </div>
        {right ? <div style={{ textAlign: "right" }}>{right}</div> : null}
      </div>
    </Fade>
  );
}

/* abstract brand mark — pure SVG geometry, no wordmark */
export function BrandMark({ size = 44 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden>
      <rect x="2" y="2" width="20" height="20" fill="var(--lime)" />
      <rect x="26" y="2" width="20" height="9" fill="var(--teal)" />
      <rect x="26" y="15" width="9" height="7" fill="var(--paper)" />
      <rect x="38" y="15" width="8" height="7" fill="var(--amber)" />
      <rect x="2" y="26" width="9" height="20" fill="var(--teal)" />
      <rect x="15" y="26" width="7" height="20" fill="var(--paper)" />
      <rect x="26" y="26" width="20" height="20" fill="none" stroke="var(--paper)" strokeWidth="3" />
      <rect x="33" y="33" width="6" height="6" fill="var(--lime)" />
    </svg>
  );
}

function InkMark({ size = 44 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden>
      <rect x="2" y="2" width="20" height="20" fill="var(--ink)" />
      <rect x="26" y="2" width="20" height="9" fill="var(--teal)" />
      <rect x="26" y="15" width="9" height="7" fill="var(--paper)" />
      <rect x="38" y="15" width="8" height="7" fill="var(--amber)" />
      <rect x="2" y="26" width="9" height="20" fill="var(--teal)" />
      <rect x="15" y="26" width="7" height="20" fill="var(--paper)" />
      <rect x="26" y="26" width="20" height="20" fill="none" stroke="var(--ink)" strokeWidth="3" />
      <rect x="33" y="33" width="6" height="6" fill="var(--ink)" />
    </svg>
  );
}

/* ============================ SVG figures ============================ */

function ArchDiagram() {
  const layers = [
    { en: "APPLICATION", jp: "アプリケーション層", desc: "ダッシュボード / レポート / アラート", c: "var(--teal)" },
    { en: "AI · ANALYTICS", jp: "AI・アナリティクス層", desc: "需要予測 / 異常検知 / 最適化", c: "var(--amber)" },
    { en: "DATA PLATFORM", jp: "データ基盤層", desc: "統合 / 蓄積 / 加工 / 品質管理", c: "var(--ink)" },
    { en: "INFRASTRUCTURE", jp: "インフラ層", desc: "クラウド / セキュリティ / 監視", c: "var(--muted)" },
  ];
  return (
    <svg viewBox="0 0 1300 430" width="100%" style={{ display: "block" }}>
      {layers.map((l, i) => {
        const y = 20 + i * 102;
        return (
          <g key={l.en}>
            <rect x="120" y={y} width="1000" height="78" fill="var(--white)" stroke="var(--line)" strokeWidth="1.5" />
            <rect x="120" y={y} width="10" height="78" fill={l.c} />
            <text x="160" y={y + 34} fontFamily="var(--font-mono)" fontSize="19" fontWeight="600" letterSpacing="3" fill="var(--ink)">
              {l.en}
            </text>
            <text x="160" y={y + 60} fontFamily="var(--font-body)" fontSize="16" fill="var(--muted)">
              {l.jp}　—　{l.desc}
            </text>
            <text x="1080" y={y + 46} fontFamily="var(--font-mono)" fontSize="15" fill="var(--muted)" textAnchor="end">
              L{4 - i}
            </text>
            {i < layers.length - 1 && (
              <g stroke="var(--line)" strokeWidth="2">
                <line x1="620" y1={y + 78} x2="620" y2={y + 102} />
                <path d={`M612 ${y + 94} L620 ${y + 102} L628 ${y + 94}`} fill="none" />
              </g>
            )}
          </g>
        );
      })}
      {/* side data bus */}
      <rect x="1140" y="20" width="44" height="388" fill="none" stroke="var(--lime)" strokeWidth="2" strokeDasharray="6 6" />
      <text x="1162" y="220" fontFamily="var(--font-mono)" fontSize="13" letterSpacing="3" fill="var(--ink)" textAnchor="middle" transform="rotate(90 1162 220)">
        DATA BUS / API
      </text>
      {/* left monitor column */}
      <rect x="20" y="20" width="76" height="388" fill="var(--ink)" />
      <text x="58" y="214" fontFamily="var(--font-mono)" fontSize="12" letterSpacing="3" fill="var(--lime)" textAnchor="middle" transform="rotate(-90 58 214)">
        MONITORING · SECURITY
      </text>
    </svg>
  );
}

function FlowDiagram() {
  const steps = [
    { en: "COLLECT", jp: "収集", c: "var(--teal)" },
    { en: "INTEGRATE", jp: "統合", c: "var(--ink)" },
    { en: "PROCESS", jp: "加工", c: "var(--ink)" },
    { en: "ANALYZE", jp: "分析", c: "var(--amber)" },
    { en: "VISUALIZE", jp: "可視化", c: "var(--lime)" },
  ];
  const w = 210;
  const gap = 42;
  return (
    <svg viewBox="0 0 1300 400" width="100%" style={{ display: "block" }}>
      {steps.map((s, i) => {
        const x = 30 + i * (w + gap);
        return (
          <g key={s.en}>
            <rect x={x} y="120" width={w} height="150" fill="var(--white)" stroke="var(--line)" strokeWidth="1.5" />
            <rect x={x} y="120" width={w} height="8" fill={s.c} />
            <text x={x + w / 2} y="176" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="20" fontWeight="600" letterSpacing="2" fill="var(--ink)">
              {s.en}
            </text>
            <text x={x + w / 2} y="208" textAnchor="middle" fontFamily="var(--font-body)" fontSize="18" fill="var(--muted)">
              {s.jp}
            </text>
            <text x={x + w / 2} y="244" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="14" fill="var(--muted)">
              0{i + 1}
            </text>
            {i < steps.length - 1 && (
              <g stroke="var(--ink)" strokeWidth="2">
                <line x1={x + w + 4} y1="195" x2={x + w + gap - 12} y2="195" />
                <path d={`M${x + w + gap - 20} 187 L${x + w + gap - 8} 195 L${x + w + gap - 20} 203`} fill="none" />
              </g>
            )}
          </g>
        );
      })}
      {/* feedback loop */}
      <path d="M 1220 120 L 1220 60 L 80 60 L 80 112" fill="none" stroke="var(--teal)" strokeWidth="2" strokeDasharray="7 7" />
      <path d="M72 104 L80 118 L88 104" fill="none" stroke="var(--teal)" strokeWidth="2" />
      <text x="650" y="44" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="14" letterSpacing="3" fill="var(--teal)">
        FEEDBACK LOOP — 継続的改善
      </text>
      <text x="650" y="330" textAnchor="middle" fontFamily="var(--font-body)" fontSize="16" fill="var(--muted)">
        データは一度きりの納品物ではなく、循環する資産として扱います。
      </text>
    </svg>
  );
}

function OrgChart() {
  const top = { x: 650, y: 60, w: 260, h: 64, en: "CEO", jp: "代表取締役" };
  const divisions = [
    { en: "DATA DIV.", jp: "データ事業部", c: "var(--teal)", subs: ["統合", "基盤"] },
    { en: "AI DIV.", jp: "AI事業部", c: "var(--amber)", subs: ["解析", "ML"] },
    { en: "ENGINEERING", jp: "エンジニアリング部", c: "var(--ink)", subs: ["開発", "SRE"] },
    { en: "CORPORATE", jp: "コーポレート部", c: "var(--muted)", subs: ["経営", "人事"] },
  ];
  const dw = 240;
  const gap = 60;
  const startX = 650 - (divisions.length * dw + (divisions.length - 1) * gap) / 2;
  return (
    <svg viewBox="0 0 1300 420" width="100%" style={{ display: "block" }}>
      {/* CEO */}
      <rect x={top.x - top.w / 2} y={top.y} width={top.w} height={top.h} fill="var(--ink)" />
      <text x={top.x} y={top.y + 28} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="18" fontWeight="600" letterSpacing="3" fill="var(--lime)">
        {top.en}
      </text>
      <text x={top.x} y={top.y + 50} textAnchor="middle" fontFamily="var(--font-body)" fontSize="14" fill="var(--paper)">
        {top.jp}
      </text>
      <line x1="650" y1={top.y + top.h} x2="650" y2="170" stroke="var(--line)" strokeWidth="2" />
      <line x1={startX + dw / 2} y1="170" x2={startX + 3 * (dw + gap) + dw / 2} y2="170" stroke="var(--line)" strokeWidth="2" />
      {divisions.map((d, i) => {
        const x = startX + i * (dw + gap);
        const cx = x + dw / 2;
        const y = 200;
        return (
          <g key={d.en}>
            <line x1={cx} y1="170" x2={cx} y2={y} stroke="var(--line)" strokeWidth="2" />
            <rect x={x} y={y} width={dw} height="86" fill="var(--white)" stroke="var(--line)" strokeWidth="1.5" />
            <rect x={x} y={y} width={dw} height="7" fill={d.c} />
            <text x={cx} y={y + 38} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="16" fontWeight="600" letterSpacing="1.5" fill="var(--ink)">
              {d.en}
            </text>
            <text x={cx} y={y + 64} textAnchor="middle" fontFamily="var(--font-body)" fontSize="14" fill="var(--muted)">
              {d.jp}
            </text>
            {d.subs.map((s, j) => {
              const sw = (dw - 30) / 2;
              const sx = x + 10 + j * (sw + 10);
              return (
                <g key={s}>
                  <line x1={cx} y1={y + 86} x2={cx} y2="320" stroke="var(--line-soft)" strokeWidth="2" />
                  <rect x={sx} y="320" width={sw} height="52" fill="var(--paper)" stroke="var(--line)" strokeWidth="1.5" />
                  <text x={sx + sw / 2} y="351" textAnchor="middle" fontFamily="var(--font-body)" fontSize="15" fontWeight="700" fill="var(--ink-2)">
                    {s}チーム
                  </text>
                </g>
              );
            })}
          </g>
        );
      })}
    </svg>
  );
}

function Timeline() {
  const items = [
    { y: "2016", t: "設立", d: "東京・大手町で創業" },
    { y: "2018", t: "データ基盤", d: "統合プラットフォーム v1 公開" },
    { y: "2020", t: "AI事業", d: "予測・異常検知サービス開始" },
    { y: "2022", t: "100社突破", d: "導入社数が100社を超過" },
    { y: "2024", t: "海外展開", d: "シンガポール拠点開設" },
    { y: "2026", t: "現在", d: "次世代データクラウドへ" },
  ];
  const n = items.length;
  const x0 = 80;
  const x1 = 1220;
  return (
    <svg viewBox="0 0 1300 420" width="100%" style={{ display: "block" }}>
      <line x1={x0} y1="210" x2={x1} y2="210" stroke="var(--ink)" strokeWidth="3" />
      {items.map((it, i) => {
        const x = x0 + (i * (x1 - x0)) / (n - 1);
        const up = i % 2 === 0;
        const ty = up ? 150 : 270;
        return (
          <g key={it.y}>
            <line x1={x} y1={up ? 160 : 260} x2={x} y2={up ? 205 : 215} stroke="var(--line)" strokeWidth="2" />
            <rect x={x - 7} y="203" width="14" height="14" fill={i === n - 1 ? "var(--lime)" : "var(--teal)"} transform={`rotate(45 ${x} 210)`} />
            <text x={x} y={up ? ty - 26 : ty + 40} textAnchor="middle" fontFamily="var(--font-num)" fontSize="30" fontWeight="800" fill="var(--ink)">
              {it.y}
            </text>
            <text x={x} y={up ? ty - 2 : ty + 64} textAnchor="middle" fontFamily="var(--font-body)" fontSize="16" fontWeight="700" fill="var(--ink-2)">
              {it.t}
            </text>
            <text x={x} y={up ? ty + 20 : ty + 86} textAnchor="middle" fontFamily="var(--font-body)" fontSize="13" fill="var(--muted)">
              {it.d}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function BarChart() {
  const data = [
    { y: "2021", v: 18 },
    { y: "2022", v: 34 },
    { y: "2023", v: 52 },
    { y: "2024", v: 71 },
    { y: "2025", v: 88 },
    { y: "2026", v: 104 },
  ];
  const max = 110;
  const bw = 110;
  const gap = 80;
  const base = 360;
  const x0 = 90;
  return (
    <svg viewBox="0 0 1300 420" width="100%" style={{ display: "block" }}>
      {[0, 25, 50, 75, 100].map((g) => {
        const yy = base - (g / max) * 300;
        return (
          <g key={g}>
            <line x1={x0} y1={yy} x2="1240" y2={yy} stroke="var(--line-soft)" strokeWidth="1.5" />
            <text x={x0 - 14} y={yy + 5} textAnchor="end" fontFamily="var(--font-mono)" fontSize="13" fill="var(--muted)">
              {g}
            </text>
          </g>
        );
      })}
      {data.map((d, i) => {
        const x = x0 + 60 + i * (bw + gap);
        const h = (d.v / max) * 300;
        const last = i === data.length - 1;
        return (
          <g key={d.y}>
            <rect x={x} y={base - h} width={bw} height={h} fill={last ? "var(--lime)" : "var(--ink)"} opacity={last ? 1 : 0.85 - i * 0.06} />
            <text x={x + bw / 2} y={base - h - 12} textAnchor="middle" fontFamily="var(--font-num)" fontSize="22" fontWeight="800" fill="var(--ink)">
              {d.v}
            </text>
            <text x={x + bw / 2} y={base + 30} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="15" fill="var(--muted)">
              {d.y}
            </text>
          </g>
        );
      })}
      <line x1={x0} y1={base} x2="1240" y2={base} stroke="var(--ink)" strokeWidth="3" />
      <text x="1240" y="410" textAnchor="end" fontFamily="var(--font-mono)" fontSize="13" letterSpacing="2" fill="var(--muted)">
        UNIT: 億円（売上高推移・計画値）
      </text>
    </svg>
  );
}

/* ============================ slides ============================ */

export const SLIDES: SlideDef[] = [
  /* ---------- 01 COVER ---------- */
  {
    id: "cover-1",
    section: "cover",
    title: "表紙",
    body: (
      <div className="slide" style={{ padding: "80px 110px 100px", justifyContent: "center" }}>
        {/* decorative geometry */}
        <div style={{ position: "absolute", top: 0, right: 0, width: 460, height: 460, opacity: 1, pointerEvents: "none" }}>
          <svg viewBox="0 0 460 460" width="460" height="460">
            <rect x="120" y="0" width="340" height="120" fill="var(--lime)" />
            <rect x="240" y="120" width="220" height="100" fill="var(--ink)" />
            <rect x="340" y="220" width="120" height="240" fill="var(--teal)" />
            <rect x="240" y="260" width="80" height="80" fill="var(--amber)" />
            <rect x="120" y="140" width="80" height="80" fill="none" stroke="var(--line)" strokeWidth="2" />
          </svg>
        </div>

        <Fade delay={0.05}>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <InkMark size={52} />
            <div>
              <div className="mono-label">Corporate Profile</div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.2em", color: "var(--muted)", marginTop: 3 }}>
                2026 EDITION — VOL.08
              </div>
            </div>
          </div>
        </Fade>

        <div style={{ marginTop: 90 }}>
          <Fade delay={0.15}>
            <div className="kicker">Data × AI — 産業の意思決定を支える</div>
          </Fade>
          <Fade delay={0.25}>
            <h1 style={{ margin: "26px 0 0", fontSize: 148, fontWeight: 900, lineHeight: 1.02, letterSpacing: "0.01em" }}>
              会社案内
            </h1>
          </Fade>
          <Fade delay={0.35}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 22, marginTop: 14 }}>
              <span className="font-num" style={{ fontSize: 40, fontWeight: 800, letterSpacing: "0.14em", color: "var(--ink-2)" }}>
                COMPANY GUIDE
              </span>
              <span style={{ width: 120, height: 3, background: "var(--lime)", alignSelf: "center" }} />
              <span className="mono-label">Business Overview &amp; Capabilities</span>
            </div>
          </Fade>
        </div>

        <Fade delay={0.5}>
          <div style={{ marginTop: 96, display: "flex", gap: 0, maxWidth: 980, border: "1px solid var(--line)", background: "var(--white)" }}>
            {[
              ["設立", "2016年"],
              ["本社", "東京・大手町"],
              ["事業", "データ / AI / エンジニアリング"],
              ["展開", "JP · SG"],
            ].map(([k, v], i) => (
              <div key={k} style={{ flex: 1, padding: "20px 26px", borderLeft: i ? "1px solid var(--line)" : "none" }}>
                <div className="mono-label">{k}</div>
                <div style={{ marginTop: 7, fontSize: 17, fontWeight: 700 }}>{v}</div>
              </div>
            ))}
          </div>
        </Fade>
      </div>
    ),
  },

  /* ---------- 02 AGENDA ---------- */
  {
    id: "cover-2",
    section: "cover",
    title: "アジェンダ",
    body: (
      <div className="slide">
        <Head kick="Contents" title="アジェンダ" sub="本資料の構成 — 全8章 / 20ページ" />
        <div className="slide-body" style={{ marginTop: 40 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 70px", alignContent: "start" }}>
            {SECTIONS.map((s, i) => (
              <Fade key={s.id} delay={0.08 * i}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 22,
                    padding: "19px 0",
                    borderBottom: "1px solid var(--line)",
                  }}
                >
                  <span className="font-num" style={{ fontSize: 40, fontWeight: 800, color: i === 0 ? "var(--ink)" : "var(--line)", width: 64 }}>
                    {s.no}
                  </span>
                  <span style={{ width: 8, height: 8, background: "var(--lime)", transform: "rotate(45deg)", flex: "0 0 auto" }} />
                  <span style={{ flex: 1 }}>
                    <span style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: 13, letterSpacing: "0.16em", color: "var(--muted)", textTransform: "uppercase" }}>
                      {s.en}
                    </span>
                    <span style={{ display: "block", fontSize: 20, fontWeight: 700, marginTop: 3 }}>{s.jp}</span>
                  </span>
                  <span className="mono-label">P.{String(i + 2).padStart(2, "0")}</span>
                </div>
              </Fade>
            ))}
          </div>
        </div>
      </div>
    ),
  },

  /* ---------- 03 COMPANY FACTS ---------- */
  {
    id: "overview-1",
    section: "overview",
    title: "会社概要",
    body: (
      <div className="slide">
        <Head kick="Chapter 02 — Overview" title="会社概要" sub="Company Profile — 基本情報" />
        <div className="slide-body">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 22 }}>
            {[
              ["商号", "株式会社データクラフト", "DataCraft Inc.", 0],
              ["設立", "2016年4月", "Founded", 0.06],
              ["本社所在地", "東京都千代田区大手町", "Headquarters", 0.12],
              ["資本金", "4億8,000万円", "Capital", 0.18],
              ["従業員数", "312名", "Employees", 0.24],
              ["代表者", "代表取締役 高橋 誠", "CEO", 0.3],
            ].map(([k, v, en, d]) => (
              <Fade key={k as string} delay={d as number}>
                <div className="card" style={{ padding: "30px 32px", height: "100%" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span className="mono-label">{en as string}</span>
                    <span style={{ width: 8, height: 8, background: "var(--teal)" }} />
                  </div>
                  <div style={{ fontSize: 30, fontWeight: 900, marginTop: 16, lineHeight: 1.2 }}>{v as string}</div>
                  <div style={{ fontSize: 14, color: "var(--muted)", marginTop: 8 }}>{k as string}</div>
                </div>
              </Fade>
            ))}
          </div>
          <Fade delay={0.4}>
            <div style={{ marginTop: 30, display: "flex", gap: 12, flexWrap: "wrap" }}>
              {["ISO 27001", "ISMS 認証", "プライバシーマーク", "AWS Partner", "GCP Partner"].map((c) => (
                <span className="chip" key={c}>
                  <span className="dot" style={{ background: "var(--lime)" }} />
                  {c}
                </span>
              ))}
            </div>
          </Fade>
        </div>
      </div>
    ),
  },

  /* ---------- 04 HISTORY ---------- */
  {
    id: "overview-2",
    section: "overview",
    title: "沿革",
    body: (
      <div className="slide">
        <Head kick="Chapter 02 — Overview" tone="teal" title="沿革" sub="History — 2016年から現在までの歩み" />
        <div className="slide-body" style={{ justifyContent: "center" }}>
          <Fade delay={0.2}>
            <Timeline />
          </Fade>
        </div>
      </div>
    ),
  },

  /* ---------- 05 PHILOSOPHY ---------- */
  {
    id: "vision-1",
    section: "vision",
    title: "経営理念",
    body: (
      <div className="slide" style={{ justifyContent: "center" }}>
        <Fade delay={0.05}>
          <Kick>Chapter 03 — Vision</Kick>
        </Fade>
        <div style={{ marginTop: 46, display: "flex", gap: 60, alignItems: "stretch" }}>
          <div style={{ flex: "0 0 10px", background: "var(--lime)" }} />
          <div>
            <Fade delay={0.15}>
              <div className="mono-label">Corporate Philosophy</div>
            </Fade>
            <Fade delay={0.25}>
              <h2 style={{ margin: "22px 0 0", fontSize: 78, fontWeight: 900, lineHeight: 1.28, letterSpacing: "0.02em", maxWidth: 1000 }}>
                データに<span style={{ background: "var(--lime)", padding: "0 14px" }}>確かな根拠</span>を、
                <br />
                産業に<span style={{ color: "var(--teal)" }}>迷いのない判断</span>を。
              </h2>
            </Fade>
            <Fade delay={0.4}>
              <p style={{ marginTop: 34, fontSize: 18, lineHeight: 2, color: "var(--muted)", maxWidth: 820 }}>
                私たちは、現場に眠るデータを「使える意思決定」に変換する専門集団です。
                収集から可視化までを一貫して担い、お客様が次の一手を迷わず打てる状態をつくります。
              </p>
            </Fade>
          </div>
        </div>
        <Fade delay={0.55}>
          <div style={{ marginTop: 64, display: "flex", gap: 40 }}>
            {[
              ["01", "現場主義", "現場の文脈を知らないデータに価値はない"],
              ["02", "長期伴走", "納品で終わらせず、運用まで責任を持つ"],
              ["03", "技術誠実", "誇大ではなく、再現できる成果だけを出す"],
            ].map(([no, t, d]) => (
              <div key={no} style={{ flex: 1, borderTop: "2px solid var(--ink)", paddingTop: 18 }}>
                <span className="font-num" style={{ fontSize: 26, fontWeight: 800, color: "var(--amber)" }}>{no}</span>
                <div style={{ fontSize: 22, fontWeight: 900, marginTop: 8 }}>{t}</div>
                <div style={{ fontSize: 13, color: "var(--muted)", marginTop: 8, lineHeight: 1.8 }}>{d}</div>
              </div>
            ))}
          </div>
        </Fade>
      </div>
    ),
  },

  /* ---------- 06 VISION PILLARS ---------- */
  {
    id: "vision-2",
    section: "vision",
    title: "ビジョン",
    body: (
      <div className="slide">
        <Head kick="Chapter 03 — Vision" tone="amber" title="2030年 ビジョン" sub="目指す姿 — 3つの柱" />
        <div className="slide-body" style={{ flexDirection: "row", gap: 26, alignItems: "stretch" }}>
          {[
            { no: "01", en: "TRUSTED DATA", jp: "信頼されるデータ基盤", d: "企業の意思決定の土台となる、品質の保証されたデータ基盤を標準として提供する。", c: "var(--teal)" },
            { no: "02", en: "APPLIED AI", jp: "現場で動くAI", d: "研究で終わらせない。業務に組み込まれ、毎日使われるAIを実装する。", c: "var(--amber)" },
            { no: "03", en: "INDUSTRY OS", jp: "産業のOSになる", d: "製造・物流・小売の業務プロセスに深く組み込まれた、不可欠な存在へ。", c: "var(--lime)" },
          ].map((p, i) => (
            <Fade key={p.no} delay={0.15 + i * 0.12} className="card" >
              <div style={{ height: "100%", padding: "38px 36px", display: "flex", flexDirection: "column", borderTop: `6px solid ${p.c}` }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                  <span className="font-num" style={{ fontSize: 52, fontWeight: 800, color: "var(--ink)" }}>{p.no}</span>
                  <span style={{ width: 10, height: 10, background: p.c, transform: "rotate(45deg)" }} />
                </div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 14, letterSpacing: "0.14em", color: "var(--muted)", marginTop: 20 }}>{p.en}</div>
                <div style={{ fontSize: 26, fontWeight: 900, marginTop: 10, lineHeight: 1.3 }}>{p.jp}</div>
                <p style={{ fontSize: 15, lineHeight: 1.9, color: "var(--muted)", marginTop: 16 }}>{p.d}</p>
                <div style={{ marginTop: "auto", borderTop: "1px solid var(--line-soft)", paddingTop: 14 }} className="mono-label">
                  Pillar {p.no} / 03
                </div>
              </div>
            </Fade>
          ))}
        </div>
      </div>
    ),
  },

  /* ---------- 07 BUSINESS SEGMENTS ---------- */
  {
    id: "business-1",
    section: "business",
    title: "事業内容",
    body: (
      <div className="slide">
        <Head kick="Chapter 04 — Business" title="事業内容" sub="3つの事業セグメントと売上構成比" />
        <div className="slide-body" style={{ flexDirection: "row", gap: 60 }}>
          <Fade delay={0.15} className="" >
            <div style={{ flex: "0 0 560px", display: "flex", flexDirection: "column", gap: 0 }}>
              {[
                { en: "DATA SERVICE", jp: "データサービス", pct: 46, c: "var(--teal)" },
                { en: "AI SOLUTION", jp: "AIソリューション", pct: 34, c: "var(--amber)" },
                { en: "ENGINEERING", jp: "開発・運用", pct: 20, c: "var(--ink)" },
              ].map((s, i) => (
                <Fade key={s.en} delay={0.25 + i * 0.12}>
                  <div style={{ padding: "26px 0", borderBottom: "1px solid var(--line)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                      <div>
                        <span className="mono-label">{s.en}</span>
                        <div style={{ fontSize: 24, fontWeight: 900, marginTop: 6 }}>{s.jp}</div>
                      </div>
                      <span className="font-num" style={{ fontSize: 40, fontWeight: 800 }}>{s.pct}%</span>
                    </div>
                    <div style={{ marginTop: 14, height: 10, background: "var(--line-soft)" }}>
                      <Grow delay={0.4 + i * 0.12}>
                        <div style={{ height: 10, width: `${s.pct}%`, background: s.c }} />
                      </Grow>
                    </div>
                  </div>
                </Fade>
              ))}
              <Fade delay={0.6}>
                <p style={{ fontSize: 14, lineHeight: 1.9, color: "var(--muted)", marginTop: 24, maxWidth: 520 }}>
                  データ基盤を入口に、AI活用・運用までを一気通貫で提供。
                  単発の受託ではなく、継続的な運用収益を積み上げるモデルへ転換中です。
                </p>
              </Fade>
            </div>
          </Fade>
          <Fade delay={0.3} className="" >
            <div style={{ flex: 1, background: "var(--white)", border: "1px solid var(--line)", padding: "34px 36px", display: "flex", flexDirection: "column" }}>
              <div className="mono-label">Revenue Growth — 売上高推移</div>
              <div style={{ flex: 1, marginTop: 18, display: "flex", alignItems: "flex-end" }}>
                <BarChart />
              </div>
            </div>
          </Fade>
        </div>
      </div>
    ),
  },

  /* ---------- 08 DATA SERVICES ---------- */
  {
    id: "data-1",
    section: "data",
    title: "データサービス",
    body: (
      <div className="slide">
        <Head kick="Chapter 05 — Data Service" tone="teal" title="データサービス" sub="収集からガバナンスまで、データの全 lifecycle をカバー" />
        <div className="slide-body" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20, alignItems: "stretch" }}>
          {[
            { en: "INTEGRATION", jp: "データ統合", d: "社内に散在するシステム・帳票・センサーデータを一元化。", icon: "grid" },
            { en: "GOVERNANCE", jp: "データガバナンス", d: "品質・権限・ lineage を整備し、使えるデータを維持。", icon: "shield" },
            { en: "ANALYTICS", jp: "分析基盤", d: "BI・ダッシュボードで現場が自ら問いを立てられる状態に。", icon: "chart" },
            { en: "SECURITY", jp: "データセキュリティ", d: "暗号化・アクセス制御・監査で資産を保護。", icon: "lock" },
          ].map((s, i) => (
            <Fade key={s.en} delay={0.12 + i * 0.1} className="card">
              <div style={{ height: "100%", padding: "32px 30px", display: "flex", flexDirection: "column" }}>
                <ServiceIcon name={s.icon} />
                <div className="mono-label" style={{ marginTop: 30 }}>{s.en}</div>
                <div style={{ fontSize: 22, fontWeight: 900, marginTop: 8 }}>{s.jp}</div>
                <p style={{ fontSize: 14, lineHeight: 1.85, color: "var(--muted)", marginTop: 12 }}>{s.d}</p>
                <div style={{ marginTop: "auto", paddingTop: 16 }} className="mono-label">
                  SERVICE / 0{i + 1}
                </div>
              </div>
            </Fade>
          ))}
        </div>
      </div>
    ),
  },

  /* ---------- 09 AI SOLUTION ---------- */
  {
    id: "data-2",
    section: "data",
    title: "AIソリューション",
    body: (
      <div className="slide">
        <Head kick="Chapter 05 — Data Service" tone="amber" title="AIソリューション" sub="現場業務に組み込まれる、実践的なAI" />
        <div className="slide-body" style={{ flexDirection: "row", gap: 26, alignItems: "stretch" }}>
          {[
            { en: "DEMAND FORECAST", jp: "需要予測", d: "販売・生産計画の精度を向上。欠品と過剰在庫を同時に削減。", metric: "予測精度 +18pt" },
            { en: "ANOMALY DETECTION", jp: "異常検知", d: "設備・品質の異常をリアルタイムに検知し、停止時間を最小化。", metric: "検知 0.3秒" },
            { en: "PROCESS OPTIMIZATION", jp: "工程最適化", d: "配車・人員・エネルギー配分を最適化し、コストを構造的に下げる。", metric: "コスト -12%" },
            { en: "DOCUMENT AI", jp: "帳票AI", d: "請求書・注文書などの非定型帳票を自動読取・構造化。", metric: "読取率 99.2%" },
          ].map((a, i) => (
            <Fade key={a.en} delay={0.12 + i * 0.1} className="card">
              <div style={{ height: "100%", padding: "32px 30px", display: "flex", flexDirection: "column", borderTop: "6px solid var(--amber)" }}>
                <span className="font-num" style={{ fontSize: 34, fontWeight: 800, color: "var(--line)" }}>{`0${i + 1}`}</span>
                <div className="mono-label" style={{ marginTop: 22 }}>{a.en}</div>
                <div style={{ fontSize: 22, fontWeight: 900, marginTop: 8 }}>{a.jp}</div>
                <p style={{ fontSize: 14, lineHeight: 1.85, color: "var(--muted)", marginTop: 12 }}>{a.d}</p>
                <div style={{ marginTop: "auto" }}>
                  <span className="chip" style={{ borderColor: "var(--amber)", color: "var(--ink)" }}>
                    <span className="dot" style={{ background: "var(--amber)" }} />
                    {a.metric}
                  </span>
                </div>
              </div>
            </Fade>
          ))}
        </div>
      </div>
    ),
  },

  /* ---------- 10 ARCHITECTURE ---------- */
  {
    id: "engineering-1",
    section: "engineering",
    title: "技術アーキテクチャ",
    body: (
      <div className="slide">
        <Head kick="Chapter 06 — Engineering" title="技術アーキテクチャ" sub="4層構成のデータプラットフォーム" />
        <div className="slide-body" style={{ justifyContent: "center" }}>
          <Fade delay={0.2}>
            <ArchDiagram />
          </Fade>
        </div>
      </div>
    ),
  },

  /* ---------- 11 DATA FLOW ---------- */
  {
    id: "engineering-2",
    section: "engineering",
    title: "データフロー",
    body: (
      <div className="slide">
        <Head kick="Chapter 06 — Engineering" tone="teal" title="データフロー" sub="収集から可視化までの標準パイプライン" />
        <div className="slide-body" style={{ justifyContent: "center" }}>
          <Fade delay={0.2}>
            <FlowDiagram />
          </Fade>
        </div>
      </div>
    ),
  },

  /* ---------- 12 ORGANIZATION ---------- */
  {
    id: "engineering-3",
    section: "engineering",
    title: "組織図",
    body: (
      <div className="slide">
        <Head kick="Chapter 06 — Engineering" tone="amber" title="組織体制" sub="事業部制 — 4ディビジョン" />
        <div className="slide-body" style={{ justifyContent: "center" }}>
          <Fade delay={0.2}>
            <OrgChart />
          </Fade>
        </div>
      </div>
    ),
  },

  /* ---------- 13 NUMBERS ---------- */
  {
    id: "cases-1",
    section: "cases",
    title: "実績ハイライト",
    body: (
      <div className="slide">
        <Head kick="Chapter 07 — Cases" title="実績ハイライト" sub="Key Figures — 数字で見る私たち" />
        <div className="slide-body" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 22, alignItems: "stretch" }}>
          {[
            { v: 240, suffix: "+", jp: "導入社数", en: "Clients", c: "var(--ink)", d: 0.1 },
            { v: 8.5, decimals: 1, suffix: " PB", jp: "日次データ処理量", en: "Data / day", c: "var(--teal)", d: 0.2 },
            { v: 99.98, decimals: 2, suffix: "%", jp: "プラットフォーム稼働率", en: "Uptime", c: "var(--lime)", d: 0.3 },
            { v: 68, suffix: "%", jp: "エンジニア比率", en: "Engineers", c: "var(--amber)", d: 0.4 },
          ].map((s) => (
            <Fade key={s.en} delay={s.d} className="card">
              <div style={{ height: "100%", padding: "40px 34px", display: "flex", flexDirection: "column", borderTop: `6px solid ${s.c}` }}>
                <div className="mono-label">{s.en}</div>
                <div className="stat-num" style={{ fontSize: 84, marginTop: 26, color: "var(--ink)" }}>
                  <Counter to={s.v} decimals={s.decimals ?? 0} suffix={s.suffix} />
                </div>
                <div style={{ fontSize: 16, fontWeight: 700, marginTop: 20 }}>{s.jp}</div>
                <div style={{ marginTop: "auto", borderTop: "1px solid var(--line-soft)", paddingTop: 14, fontSize: 12, color: "var(--muted)", lineHeight: 1.7 }}>
                  2026年3月期実績
                </div>
              </div>
            </Fade>
          ))}
        </div>
      </div>
    ),
  },

  /* ---------- 14 CASE 1 ---------- */
  {
    id: "cases-2",
    section: "cases",
    title: "事例：製造業",
    body: (
      <div className="slide">
        <Head kick="Chapter 07 — Cases" tone="teal" title={<>事例 — 製造業</>} sub="大手製造業 様 — 設備データの可視化と異常検知" />
        <div className="slide-body" style={{ flexDirection: "row", gap: 60 }}>
          <Fade delay={0.15}>
            <div style={{ flex: "0 0 520px" }}>
              <div className="mono-label">Background — 課題</div>
              <p style={{ fontSize: 17, lineHeight: 2, marginTop: 16, color: "var(--ink-2)" }}>
                複数工場にまたがる設備データが分断され、異常の発見が遅れて停止時間が常態化。
                ベテランの勘に依存した保全から脱却できていなかった。
              </p>
              <div className="mono-label" style={{ marginTop: 34 }}>Solution — 解決策</div>
              <p style={{ fontSize: 17, lineHeight: 2, marginTop: 16, color: "var(--ink-2)" }}>
                センサーデータを一元化し、異常検知AIを導入。保全計画をデータドリブンに再設計。
              </p>
            </div>
          </Fade>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 20 }}>
            {[
              { k: "計画外停止時間", v: "-42%", c: "var(--teal)" },
              { k: "保全コスト", v: "-18%", c: "var(--amber)" },
              { k: "異常検知リードタイム", v: "6時間 → 0.3秒", c: "var(--lime)" },
            ].map((r, i) => (
              <Fade key={r.k} delay={0.3 + i * 0.12} className="card">
                <div style={{ padding: "24px 32px", display: "flex", justifyContent: "space-between", alignItems: "center", borderLeft: `8px solid ${r.c}` }}>
                  <div>
                    <div className="mono-label">Result 0{i + 1}</div>
                    <div style={{ fontSize: 18, fontWeight: 700, marginTop: 6 }}>{r.k}</div>
                  </div>
                  <div className="font-num" style={{ fontSize: 42, fontWeight: 800 }}>{r.v}</div>
                </div>
              </Fade>
            ))}
          </div>
        </div>
      </div>
    ),
  },

  /* ---------- 15 CASE 2 ---------- */
  {
    id: "cases-3",
    section: "cases",
    title: "事例：小売・物流",
    body: (
      <div className="slide">
        <Head kick="Chapter 07 — Cases" tone="amber" title={<>事例 — 小売・物流</>} sub="全国チェーン 様 — 需要予測と在庫最適化" />
        <div className="slide-body" style={{ flexDirection: "row", gap: 60 }}>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 20 }}>
            {[
              { k: "欠品率", v: "-35%", c: "var(--amber)" },
              { k: "過剰在庫", v: "-22%", c: "var(--teal)" },
              { k: "発注業務工数", v: "-60%", c: "var(--lime)" },
            ].map((r, i) => (
              <Fade key={r.k} delay={0.3 + i * 0.12} className="card">
                <div style={{ padding: "24px 32px", display: "flex", justifyContent: "space-between", alignItems: "center", borderLeft: `8px solid ${r.c}` }}>
                  <div>
                    <div className="mono-label">Result 0{i + 1}</div>
                    <div style={{ fontSize: 18, fontWeight: 700, marginTop: 6 }}>{r.k}</div>
                  </div>
                  <div className="font-num" style={{ fontSize: 42, fontWeight: 800 }}>{r.v}</div>
                </div>
              </Fade>
            ))}
          </div>
          <Fade delay={0.15}>
            <div style={{ flex: "0 0 520px" }}>
              <div className="mono-label">Background — 課題</div>
              <p style={{ fontSize: 17, lineHeight: 2, marginTop: 16, color: "var(--ink-2)" }}>
                店舗ごとの発注が経験則に依存し、欠品と廃棄が同時発生。
                需要の山谷に対応しきれず、機会損失が拡大していた。
              </p>
              <div className="mono-label" style={{ marginTop: 34 }}>Solution — 解決策</div>
              <p style={{ fontSize: 17, lineHeight: 2, marginTop: 16, color: "var(--ink-2)" }}>
                気象・販促・曜日要因を取り込んだ需要予測モデルを構築し、自動発注と連携。
              </p>
            </div>
          </Fade>
        </div>
      </div>
    ),
  },

  /* ---------- 16 GLOBAL ---------- */
  {
    id: "company-1",
    section: "company",
    title: "グローバル展開",
    body: (
      <div className="slide">
        <Head kick="Chapter 08 — Company" tone="teal" title="グローバル展開" sub="Global Presence — 2拠点体制" />
        <div className="slide-body" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 26, alignItems: "stretch" }}>
          {[
            { city: "TOKYO", jp: "東京 — 本社", role: "経営 / R&D / 国内事業", c: "var(--ink)", x: "35°41′N", y: "139°41′E" },
            { city: "SINGAPORE", jp: "シンガポール", role: "APAC事業 / 海外展開", c: "var(--teal)", x: "1°21′N", y: "103°49′E" },
          ].map((g, i) => (
            <Fade key={g.city} delay={0.15 + i * 0.15} className="card">
              <div style={{ height: "100%", padding: "40px 40px", display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span className="font-num" style={{ fontSize: 46, fontWeight: 800, letterSpacing: "0.04em" }}>{g.city}</span>
                  <span style={{ width: 14, height: 14, background: g.c, transform: "rotate(45deg)" }} />
                </div>
                <div style={{ fontSize: 17, fontWeight: 700, marginTop: 12 }}>{g.jp}</div>
                <div style={{ fontSize: 14, color: "var(--muted)", marginTop: 6 }}>{g.role}</div>
                <div style={{ marginTop: "auto", display: "flex", gap: 12 }}>
                  <span className="chip">{g.x}</span>
                  <span className="chip">{g.y}</span>
                </div>
              </div>
            </Fade>
          ))}
        </div>
      </div>
    ),
  },

  /* ---------- 17 RECRUIT ---------- */
  {
    id: "company-2",
    section: "company",
    title: "採用情報",
    body: (
      <div className="slide">
        <Head kick="Chapter 08 — Company" tone="amber" title="採用情報" sub="Recruit — 募集中のポジション" />
        <div className="slide-body" style={{ flexDirection: "row", gap: 60 }}>
          <Fade delay={0.15}>
            <div style={{ flex: "0 0 520px" }}>
              <div className="mono-label">Message</div>
              <p style={{ fontSize: 20, lineHeight: 2, marginTop: 18, color: "var(--ink-2)", fontWeight: 500 }}>
                データは、置かれているだけでは価値を持ちません。
                それを「判断」に変える仕事に、一緒に取り組みませんか。
              </p>
              <div style={{ marginTop: 36, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                {[
                  ["平均年齢", "32.4歳"],
                  ["有給取得率", "78%"],
                  ["リモート率", "65%"],
                  ["研修時間", "年120h"],
                ].map(([k, v]) => (
                  <div key={k} style={{ border: "1px solid var(--line)", background: "var(--white)", padding: "16px 18px" }}>
                    <div className="mono-label">{k}</div>
                    <div className="font-num" style={{ fontSize: 26, fontWeight: 800, marginTop: 6 }}>{v}</div>
                  </div>
                ))}
              </div>
            </div>
          </Fade>
          <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
            {[
              { t: "データエンジニア", d: "基盤設計 / ETL / クラウド", tag: "ENGINEERING", c: "var(--ink)" },
              { t: "MLエンジニア", d: "予測モデル / MLOps", tag: "AI", c: "var(--amber)" },
              { t: "データアナリスト", d: "BI / 可視化 / 業務改善", tag: "ANALYTICS", c: "var(--teal)" },
              { t: "プロジェクトマネージャー", d: "顧客伴走 / 導入推進", tag: "DELIVERY", c: "var(--lime)" },
            ].map((r, i) => (
              <Fade key={r.t} delay={0.3 + i * 0.1}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "20px 24px",
                    borderBottom: "1px solid var(--line)",
                    borderLeft: `4px solid ${r.c}`,
                    background: "var(--white)",
                  }}
                >
                  <div>
                    <div style={{ fontSize: 19, fontWeight: 900 }}>{r.t}</div>
                    <div style={{ fontSize: 13, color: "var(--muted)", marginTop: 5 }}>{r.d}</div>
                  </div>
                  <span className="chip">{r.tag}</span>
                </div>
              </Fade>
            ))}
          </div>
        </div>
      </div>
    ),
  },

  /* ---------- 18 CONTACT ---------- */
  {
    id: "company-3",
    section: "company",
    title: "お問い合わせ",
    body: (
      <div className="slide" style={{ justifyContent: "center" }}>
        <Fade delay={0.05}>
          <Kick>Chapter 08 — Company</Kick>
        </Fade>
        <Fade delay={0.15}>
          <h2 style={{ margin: "26px 0 0", fontSize: 84, fontWeight: 900, lineHeight: 1.15 }}>
            まず、お話を<br />聞かせてください。
          </h2>
        </Fade>
        <Fade delay={0.3}>
          <div style={{ marginTop: 56, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 22, maxWidth: 1100 }}>
            {[
              ["WEB", "お問い合わせフォーム", "24時間受付"],
              ["MAIL", "contact@example.co.jp", "平日 9:00–18:00"],
              ["TEL", "03-0000-0000", "平日 9:00–18:00"],
            ].map(([k, v, d], i) => (
              <div key={k} className="card" style={{ padding: "30px 32px", borderTop: i === 0 ? "6px solid var(--lime)" : i === 1 ? "6px solid var(--teal)" : "6px solid var(--amber)" }}>
                <div className="mono-label">{k}</div>
                <div style={{ fontSize: 20, fontWeight: 900, marginTop: 14 }}>{v}</div>
                <div style={{ fontSize: 13, color: "var(--muted)", marginTop: 8 }}>{d}</div>
              </div>
            ))}
          </div>
        </Fade>
      </div>
    ),
  },

  /* ---------- 19 THANK YOU ---------- */
  {
    id: "company-4",
    section: "company",
    title: "ありがとうございました",
    body: (
      <div className="slide" style={{ justifyContent: "center", alignItems: "center", textAlign: "center" }}>
        <Fade delay={0.1}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <InkMark size={72} />
          </div>
        </Fade>
        <Fade delay={0.25}>
          <h2 style={{ margin: "40px 0 0", fontSize: 92, fontWeight: 900, letterSpacing: "0.04em" }}>
            ありがとうございました
          </h2>
        </Fade>
        <Fade delay={0.4}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 20, marginTop: 26 }}>
            <span style={{ width: 60, height: 3, background: "var(--lime)" }} />
            <span className="font-num" style={{ fontSize: 22, fontWeight: 700, letterSpacing: "0.22em", color: "var(--ink-2)" }}>
              THANK YOU
            </span>
            <span style={{ width: 60, height: 3, background: "var(--lime)" }} />
          </div>
        </Fade>
        <Fade delay={0.55}>
          <p style={{ marginTop: 40, fontSize: 16, lineHeight: 2, color: "var(--muted)", maxWidth: 640 }}>
            本資料に関するご質問・ご相談は、お気軽にお問い合わせください。
            <br />
            データに根拠を、産業に判断を。
          </p>
        </Fade>
      </div>
    ),
  },
];

/* ============================ inline service icons (SVG) ============================ */
function ServiceIcon({ name }: { name: string }) {
  const s = 40;
  const common = { width: s, height: s, viewBox: "0 0 40 40", fill: "none" as const };
  if (name === "grid")
    return (
      <svg {...common}>
        <rect x="4" y="4" width="14" height="14" fill="var(--teal)" />
        <rect x="22" y="4" width="14" height="14" fill="none" stroke="var(--ink)" strokeWidth="2.5" />
        <rect x="4" y="22" width="14" height="14" fill="none" stroke="var(--ink)" strokeWidth="2.5" />
        <rect x="22" y="22" width="14" height="14" fill="var(--ink)" />
      </svg>
    );
  if (name === "shield")
    return (
      <svg {...common}>
        <path d="M20 4 L34 10 V20 C34 28 28 34 20 36 C12 34 6 28 6 20 V10 Z" fill="var(--teal)" />
        <path d="M14 20 L18 24 L27 15" stroke="var(--paper)" strokeWidth="3" strokeLinecap="square" />
      </svg>
    );
  if (name === "chart")
    return (
      <svg {...common}>
        <rect x="5" y="22" width="8" height="14" fill="var(--ink)" />
        <rect x="16" y="14" width="8" height="22" fill="var(--amber)" />
        <rect x="27" y="6" width="8" height="30" fill="var(--teal)" />
      </svg>
    );
  return (
    <svg {...common}>
      <rect x="8" y="16" width="24" height="20" fill="var(--ink)" />
      <path d="M13 16 V12 A7 7 0 0 1 27 12 V16" stroke="var(--ink)" strokeWidth="3.5" fill="none" />
      <rect x="18" y="23" width="4" height="7" fill="var(--lime)" />
    </svg>
  );
}
