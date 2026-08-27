import { useCallback, useEffect, useRef, useState } from "react";
import {
  DECK,
  TOTAL,
  pad,
  probeLocalBase,
  slideSrc,
  type BaseKind,
} from "./deck";

/* ---------- 图标（全部内联 SVG） ---------- */
const ChevronLeft = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M14.5 5.5 8 12l6.5 6.5" stroke="currentColor" strokeWidth="1.8" />
  </svg>
);
const ChevronRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M9.5 5.5 16 12l-6.5 6.5" stroke="currentColor" strokeWidth="1.8" />
  </svg>
);
const GridIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path
      d="M4 4h6.5v6.5H4zM13.5 4H20v6.5h-6.5zM4 13.5h6.5V20H4zM13.5 13.5H20V20h-6.5z"
      stroke="currentColor"
      strokeWidth="1.6"
    />
  </svg>
);
const CloseIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.8" />
  </svg>
);
const CollapseIcon = ({ collapsed }: { collapsed: boolean }) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
    {collapsed ? (
      <path d="M9.5 5.5 16 12l-6.5 6.5" stroke="currentColor" strokeWidth="1.8" />
    ) : (
      <path d="M14.5 5.5 8 12l6.5 6.5" stroke="currentColor" strokeWidth="1.8" />
    )}
  </svg>
);
const CropMark = ({ className }: { className: string }) => (
  <svg className={`crop ${className}`} viewBox="0 0 18 18" fill="none" aria-hidden>
    <path d="M1 17V1h16" stroke="#657170" strokeWidth="1" />
  </svg>
);
/** 中性文档标识（取自仓库名 company_guide 缩写，非虚构品牌） */
const DocMark = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M5 3.5h11.5L20 7v13.5H5z" stroke="currentColor" strokeWidth="1.4" />
    <path d="M16 3.5V7.5H20" stroke="currentColor" strokeWidth="1.4" />
    <path d="M8 11h8M8 14h8M8 17h5" stroke="#B6D62F" strokeWidth="1.6" />
  </svg>
);

function initialIdxFromHash(): number {
  const m = window.location.hash.match(/^#slide-(\d+)$/);
  if (m) {
    const n = parseInt(m[1], 10);
    if (n >= 1 && n <= TOTAL) return n - 1;
  }
  return 0;
}

/* ---------- OCR 文字导出（浏览器本地运行 Tesseract，数据不出本机） ---------- */

declare global {
  interface Window {
    Tesseract?: {
      createWorker: (
        langs: string,
        oem?: number,
        options?: { logger?: (m: { status: string; progress: number }) => void }
      ) => Promise<{
        recognize: (src: string) => Promise<{ data: { text: string } }>;
        terminate: () => Promise<void>;
      }>;
    };
  }
}

let tesseractLoader: Promise<NonNullable<Window["Tesseract"]>> | null = null;

function loadTesseract() {
  if (window.Tesseract) return Promise.resolve(window.Tesseract);
  if (tesseractLoader) return tesseractLoader;
  tesseractLoader = new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.src = "https://cdn.jsdelivr.net/npm/tesseract.js@5/dist/tesseract.min.js";
    s.onload = () =>
      window.Tesseract
        ? resolve(window.Tesseract)
        : reject(new Error("OCR 引擎未能挂载"));
    s.onerror = () => {
      tesseractLoader = null;
      reject(new Error("OCR 引擎加载失败（首次需联网从 CDN 拉取引擎与语言包）"));
    };
    document.head.appendChild(s);
  });
  return tesseractLoader;
}

function ocrStageLabel(status: string): string {
  if (status.includes("core")) return "正在加载 OCR 引擎核心…";
  if (status.includes("language")) return "正在下载中文语言包（首次约 20MB）…";
  if (status.includes("tesseract")) return "正在初始化 OCR 引擎…";
  if (status.includes("api")) return "正在准备识别…";
  return "正在识别…";
}

const TypeIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path
      d="M5 7V4.5h14V7M12 4.5v15M9 19.5h6"
      stroke="currentColor"
      strokeWidth="1.6"
    />
  </svg>
);

function OcrPanel({ base, onClose }: { base: BaseKind; onClose: () => void }) {
  const [stage, setStage] = useState<"intro" | "running" | "done" | "error">(
    "intro"
  );
  const [page, setPage] = useState(0);
  const [pct, setPct] = useState(0);
  const [msg, setMsg] = useState("");
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);

  const run = async () => {
    setStage("running");
    setText("");
    setPage(0);
    setPct(0);
    setMsg("正在加载 OCR 引擎…");
    try {
      const T = await loadTesseract();
      const worker = await T.createWorker("chi_sim+eng", 1, {
        logger: (m) => {
          if (m.status === "recognizing text") {
            setPct(Math.round(m.progress * 100));
          } else if (m.status) {
            setMsg(ocrStageLabel(m.status));
          }
        },
      });
      const parts: string[] = [
        "# 公司介绍 PPT · OCR 文本",
        "> 由浏览器端 Tesseract（chi_sim+eng）逐页识别 generated_pages/ 原图生成",
        "",
      ];
      for (const s of DECK) {
        setPage(s.page);
        setMsg(`正在识别 第 ${s.page} / ${TOTAL} 页…`);
        const { data } = await worker.recognize(slideSrc(s, base));
        parts.push(
          `## 第 ${s.page} 页`,
          "",
          data.text.trim() || "（本页未识别到文字）",
          ""
        );
        setText(parts.join("\n"));
      }
      await worker.terminate();
      setStage("done");
    } catch (e) {
      setStage("error");
      setMsg(e instanceof Error ? e.message : "OCR 过程出错");
    }
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      /* 剪贴板不可用时静默 */
    }
  };

  const download = () => {
    const blob = new Blob([text], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "company-guide-ocr.md";
    a.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 2000);
  };

  return (
    <aside className="ocr-panel" aria-label="OCR 文字导出">
      <div className="ocr-head">
        <div>
          <div className="ocr-title">OCR 文字导出</div>
          <div className="ocr-sub">TESSERACT · CHI_SIM + ENG · LOCAL</div>
        </div>
        <button className="icon-btn" onClick={onClose} aria-label="关闭面板">
          <CloseIcon />
        </button>
      </div>

      <div className="ocr-desc">
        在本机浏览器内逐页识别 {TOTAL} 张幻灯片的文字，把内容交给我后即可按
        new_prompt.md 规范重绘成 HTML / SVG 版本。识别全程本地完成，不上传数据；首次运行需联网拉取语言包（约 20MB）。
      </div>

      <div className="ocr-body">
        {stage === "intro" && (
          <button className="btn primary ocr-start" onClick={run}>
            开始识别 {TOTAL} 页
          </button>
        )}

        {stage !== "intro" && (
          <>
            <div className="ocr-progress">
              <span>
                {stage === "done"
                  ? `已完成 ${TOTAL} / ${TOTAL} 页`
                  : page
                  ? `PAGE ${pad(page)} / ${TOTAL}`
                  : "ENGINE"}
              </span>
              <span>{stage === "done" ? "100%" : `${pct}%`}</span>
            </div>
            <div className="ocr-bar" style={{ opacity: stage === "error" ? 0.3 : 1 }}>
              <i style={{ width: stage === "done" ? "100%" : `${pct}%` }} />
            </div>
            <div className="ocr-msg">{msg}</div>
          </>
        )}

        {stage === "error" && <div className="ocr-err">{msg}</div>}

        {text && (
          <>
            <textarea className="ocr-out" readOnly value={text} aria-label="识别结果" />
            <div className="ocr-actions">
              <button className="btn" onClick={copy}>
                {copied ? "已复制 ✓" : "复制全文"}
              </button>
              <button className="btn" onClick={download}>
                下载 .md
              </button>
              {stage !== "running" && (
                <button className="btn" onClick={run}>
                  重新识别
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </aside>
  );
}

/* ---------- App ---------- */

export default function App() {
  const [idx, setIdx] = useState(initialIdxFromHash);
  const [dir, setDir] = useState(1);
  const [collapsed, setCollapsed] = useState(false);
  const [grid, setGrid] = useState(false);
  const [ocrOpen, setOcrOpen] = useState(false);
  const [base, setBase] = useState<BaseKind | null>(null);
  const [scale, setScale] = useState(0.4);
  const [loaded, setLoaded] = useState<Record<number, boolean>>({});

  const stageRef = useRef<HTMLDivElement>(null);
  const railListRef = useRef<HTMLDivElement>(null);
  const idxRef = useRef(idx);

  /* 图片源探测：同目录部署走相对路径，否则回退仓库 raw 链接 */
  useEffect(() => {
    let alive = true;
    probeLocalBase().then((b) => alive && setBase(b));
    return () => {
      alive = false;
    };
  }, []);

  /* 舞台等比缩放（1600×900 → 视口） */
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      const r = el.getBoundingClientRect();
      setScale(
        Math.max(0.05, Math.min((r.width - 16) / 1600, (r.height - 16) / 900))
      );
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  /* 翻页（带方向，用于过渡动画） */
  const go = useCallback((next: number) => {
    setIdx((prev) => {
      const c = Math.max(0, Math.min(TOTAL - 1, next));
      return c === prev ? prev : c;
    });
  }, []);

  useEffect(() => {
    if (idx !== idxRef.current) {
      setDir(idx > idxRef.current ? 1 : -1);
      idxRef.current = idx;
    }
  }, [idx]);

  /* idx → URL Hash（replaceState，不产生历史堆栈） */
  useEffect(() => {
    try {
      const h = `#slide-${idx + 1}`;
      if (window.location.hash !== h) {
        window.history.replaceState(null, "", h);
      }
    } catch {
      /* 某些嵌入环境禁止改写 URL，忽略即可 */
    }
    document.title = `P.${pad(idx + 1)} / ${TOTAL} · 公司介绍`;
  }, [idx]);

  /* Hash → idx（支持后退/前进与手改地址直达） */
  useEffect(() => {
    const onHash = () => {
      const m = window.location.hash.match(/^#slide-(\d+)$/);
      if (m) {
        const n = parseInt(m[1], 10);
        if (n >= 1 && n <= TOTAL) go(n - 1);
      }
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, [go]);

  /* 键盘：← → / PageUp PageDown / Space / Home / End / G 总览 / Esc */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === "TEXTAREA" || t.tagName === "INPUT")) return;
      switch (e.key) {
        case "ArrowRight":
        case "PageDown":
          e.preventDefault();
          go(idxRef.current + 1);
          break;
        case "ArrowLeft":
        case "PageUp":
          e.preventDefault();
          go(idxRef.current - 1);
          break;
        case " ":
          e.preventDefault();
          go(idxRef.current + (e.shiftKey ? -1 : 1));
          break;
        case "Home":
          e.preventDefault();
          go(0);
          break;
        case "End":
          e.preventDefault();
          go(TOTAL - 1);
          break;
        case "g":
        case "G":
          setGrid((v) => !v);
          break;
        case "o":
        case "O":
          setOcrOpen((v) => !v);
          break;
        case "Escape":
          setGrid(false);
          setOcrOpen(false);
          break;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  /* 预加载当前页之后两张，翻页无等待 */
  useEffect(() => {
    if (!base) return;
    [idx + 1, idx + 2].forEach((i) => {
      if (i < TOTAL) {
        const im = new Image();
        im.src = slideSrc(DECK[i], base);
      }
    });
  }, [idx, base]);

  /* Rail 中当前页保持可见 */
  useEffect(() => {
    const list = railListRef.current;
    if (!list) return;
    const el = list.querySelector<HTMLElement>(`[data-page="${idx + 1}"]`);
    el?.scrollIntoView({ block: "nearest" });
  }, [idx]);

  const slide = DECK[idx];
  const progress = ((idx + 1) / TOTAL) * 100;

  return (
    <>
      <div className="app">
        {/* ================= 左侧 Rail ================= */}
        <aside className={`rail${collapsed ? " collapsed" : ""}`}>
          <div className="rail-head">
            <div className="rail-mark">
              <DocMark />
            </div>
            <div>
              <div className="rail-title">公司介绍</div>
              <div className="rail-sub">
                GENERATED_PAGES / {TOTAL}P
              </div>
            </div>
          </div>

          <div className="rail-pages" ref={railListRef}>
            {DECK.map((s, i) => (
              <button
                key={s.page}
                data-page={s.page}
                className={`page-item${i === idx ? " active" : ""}`}
                onClick={() => go(i)}
                aria-current={i === idx ? "page" : undefined}
              >
                <span className="tick" />
                <span className="pno">{pad(s.page)}</span>
                <span className="pdash" />
                <span className="pdott" />
              </button>
            ))}
          </div>

          <div className="rail-foot">
            <button className="rail-toggle" onClick={() => setCollapsed((v) => !v)}>
              <CollapseIcon collapsed={collapsed} />
              <span>{collapsed ? "展开" : "收起"}</span>
            </button>
          </div>
        </aside>

        {/* ================= 右列 ================= */}
        <div className="main">
          <div className="topbar">
            <button
              className="navbtn"
              onClick={() => go(idx - 1)}
              disabled={idx === 0}
              aria-label="上一页"
            >
              <ChevronLeft />
            </button>
            <button
              className="navbtn"
              onClick={() => go(idx + 1)}
              disabled={idx === TOTAL - 1}
              aria-label="下一页"
            >
              <ChevronRight />
            </button>
            <div className="crumb">
              <b>公司介绍</b>
              <span className="sep">/</span>
              <span>第 {pad(slide.page)} 页</span>
              <span className="sep">/</span>
              <span className="src-file" title={slide.file}>
                {slide.file}
              </span>
            </div>
            <button
              className={`gridbtn${ocrOpen ? " on" : ""}`}
              onClick={() => setOcrOpen((v) => !v)}
              title="OCR 文字导出（O）"
            >
              <TypeIcon />
              文字
            </button>
            <button className="gridbtn" onClick={() => setGrid(true)}>
              <GridIcon />
              总览
            </button>
            <div className="counter num">
              <b>{pad(idx + 1)}</b>
              <span> / {TOTAL}</span>
            </div>
          </div>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>

          {/* ---------------- 舞台 ---------------- */}
          <div className="stage-area paper-bg" ref={stageRef}>
            <CropMark className="tl" />
            <CropMark className="tr" />
            <CropMark className="br" />
            <CropMark className="bl" />

            <div
              className="stage-scaler"
              style={{
                width: 1600 * scale,
                height: 900 * scale,
              }}
            >
              <div
                className="stage-frame"
                style={{ transform: `scale(${scale})`, transformOrigin: "0 0" }}
              >
                <div
                  key={idx}
                  className="slide-anim"
                  style={{ ["--dx" as string]: `${dir * 44}px` }}
                >
                  {!loaded[slide.page] && (
                    <div className="shimmer">
                      <span>
                        {base ? `LOADING P.${pad(slide.page)}` : "INIT SOURCE…"}
                      </span>
                    </div>
                  )}
                  {base && (
                    <img
                      className="slide-img"
                      src={slideSrc(slide, base)}
                      alt={`公司介绍 第 ${slide.page} 页`}
                      onLoad={() =>
                        setLoaded((m) => ({ ...m, [slide.page]: true }))
                      }
                      draggable={false}
                    />
                  )}
                </div>
              </div>
            </div>

            <div className="stage-meta">
              <span>
                <span className="dot-live" />
                SRC&nbsp;generated_pages/{slide.file.length > 26 ? slide.file.slice(0, 24) + "…" : slide.file}
              </span>
              <span className="mid hint-bar">
                <span>← → 翻页</span>
                <span>SPACE 下一页</span>
                <span>HOME/END 首尾页</span>
                <span>G 总览</span>
              </span>
              <span>
                1600 × 900 · SCALE {Math.round(scale * 100)}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ================= 总览网格 ================= */}
      {grid && (
        <div className="overlay" role="dialog" aria-label="全部页面总览">
          <div className="overlay-head">
            <h2>全部页面</h2>
            <span className="mono">
              P.01 — P.{TOTAL} · 点击跳转 · ESC 关闭
            </span>
            <button className="overlay-close" onClick={() => setGrid(false)} aria-label="关闭总览">
              <CloseIcon />
            </button>
          </div>
          <div className="overlay-grid">
            {DECK.map((s, i) => (
              <button
                key={s.page}
                className={`thumb${i === idx ? " active" : ""}`}
                style={{ animationDelay: `${Math.min(i * 18, 500)}ms` }}
                onClick={() => {
                  go(i);
                  setGrid(false);
                }}
              >
                <img
                  src={base ? slideSrc(s, base) : undefined}
                  alt={`第 ${s.page} 页缩略图`}
                  loading="lazy"
                  decoding="async"
                />
                <span className="tno">
                  <b>P.{pad(s.page)}</b>
                  <span>{i === idx ? "当前" : ""}</span>
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ================= OCR 文字导出面板 ================= */}
      {ocrOpen && base && <OcrPanel base={base} onClose={() => setOcrOpen(false)} />}

      {/* ================= 打印导出（整份 PDF） ================= */}
      <div className="print-deck">
        {DECK.map((s) => (
          <figure key={s.page}>
            <img src={slideSrc(s, base ?? "remote")} alt={`第 ${s.page} 页`} />
          </figure>
        ))}
      </div>
    </>
  );
}
