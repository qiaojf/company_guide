/**
 * 幻灯片数据源 —— 内容 100% 来自仓库 generated_pages/ 下的原始图片，
 * 页序与 PPT 页码严格对应（1–15 为 ChatGPT Image 系列按时间排序，16–43 为 page-N.png）。
 * 不含任何虚构内容。
 */

export type SlideDef = { page: number; file: string };
export type BaseKind = "local" | "remote";

const RAW_BASE =
  "https://raw.githubusercontent.com/qiaojf/company_guide/main/generated_pages/";

export const DECK: SlideDef[] = [
  { page: 1, file: "ChatGPT Image 2026年8月26日 17_33_50.png" },
  { page: 2, file: "ChatGPT Image 2026年8月26日 17_34_17 (1).png" },
  { page: 3, file: "ChatGPT Image 2026年8月26日 17_34_18 (2).png" },
  { page: 4, file: "ChatGPT Image 2026年8月26日 17_34_20 (4).png" },
  { page: 5, file: "ChatGPT Image 2026年8月26日 17_34_20 (5).png" },
  { page: 6, file: "ChatGPT Image 2026年8月26日 17_35_00 (1).png" },
  { page: 7, file: "ChatGPT Image 2026年8月26日 17_35_01 (2).png" },
  { page: 8, file: "ChatGPT Image 2026年8月26日 17_35_03 (3).png" },
  { page: 9, file: "ChatGPT Image 2026年8月26日 17_35_04 (4).png" },
  { page: 10, file: "ChatGPT Image 2026年8月26日 17_35_05 (5).png" },
  { page: 11, file: "ChatGPT Image 2026年8月26日 17_35_05 (6).png" },
  { page: 12, file: "ChatGPT Image 2026年8月26日 17_35_07 (7).png" },
  { page: 13, file: "ChatGPT Image 2026年8月26日 17_35_07 (8).png" },
  { page: 14, file: "ChatGPT Image 2026年8月26日 17_35_08 (9).png" },
  { page: 15, file: "ChatGPT Image 2026年8月26日 17_35_09 (10).png" },
];

for (let p = 16; p <= 43; p++) {
  DECK.push({ page: p, file: `page-${p}.png` });
}

export const TOTAL = DECK.length; // 43

export function slideSrc(s: SlideDef, base: BaseKind): string {
  return base === "local"
    ? `./generated_pages/${s.file}`
    : `${RAW_BASE}${encodeURIComponent(s.file)}`;
}

/**
 * 启动时探测：代码若与 generated_pages/ 同目录部署（GitHub Pages），
 * 优先走相对路径（离线可用、无外链）；否则回退到仓库 raw 链接。
 */
export function probeLocalBase(): Promise<BaseKind> {
  return new Promise((resolve) => {
    const img = new Image();
    const timer = window.setTimeout(() => resolve("remote"), 2500);
    img.onload = () => {
      window.clearTimeout(timer);
      resolve("local");
    };
    img.onerror = () => {
      window.clearTimeout(timer);
      resolve("remote");
    };
    img.src = slideSrc(DECK[15], "local"); // page-16.png 作为探针
  });
}

export const pad = (n: number) => String(n).padStart(2, "0");
