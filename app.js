const ASSET = "./assets/images/";
const REFERENCE_SLIDE_ASSET = "./assets/reference/slides/";
const TOTAL = 43;
const SLIDE_LAYER_MODES = new Set(["reference", "compare", "dom"]);

const requestedLayerMode = new URLSearchParams(window.location.search).get("layer");
let slideLayerMode = SLIDE_LAYER_MODES.has(requestedLayerMode)
  ? requestedLayerMode
  : "reference";

document.documentElement.dataset.slideLayer = slideLayerMode;

const sections = [
  { no: "01", label: "経営ビジョン", start: 1, end: 3 },
  { no: "02", label: "会社概要", start: 4, end: 4 },
  { no: "03", label: "会社組織", start: 5, end: 5 },
  { no: "04", label: "エンジニアリング事業部", start: 6, end: 9 },
  { no: "05", label: "ソリューション事業部", start: 10, end: 38 },
  { no: "06", label: "IT人材サービス事業部", start: 39, end: 42 },
  { no: "07", label: "主要取引先", start: 43, end: 43 },
];

const footer = (n) => `
  <div class="slide__footer">
    <span>TERABOX INC.</span>
    <span>${n} / ${TOTAL}</span>
  </div>`;

const meta = (n, eyebrow = "") => `
  <div class="slide__meta">
    <div class="slide__number">${String(n).padStart(2, "0")}</div>
    ${eyebrow ? `<div class="slide__eyebrow">${eyebrow}</div>` : ""}
  </div>`;

const frame = (n, eyebrow, title, lead, body, className = "") => `
  <article class="slide ${className}" data-slide="${n}">
    ${meta(n, eyebrow)}
    <h1 class="slide__title">${title}</h1>
    ${lead ? `<p class="slide__lead">${lead}</p>` : ""}
    ${body}
    ${footer(n)}
  </article>`;

const editorialList = (items) => `
  <ol class="editorial-list">
    ${items
      .map(
        (item, index) => `
          <li>
            <span class="editorial-list__num">${String(index + 1).padStart(2, "0")}</span>
            <div><strong>${item[0]}</strong>${item[1] ? `<span>${item[1]}</span>` : ""}</div>
          </li>`,
      )
      .join("")}
  </ol>`;

const infoBlocks = (items, columns = 3) => `
  <div class="grid-${columns}">
    ${items
      .map(
        (item, index) => `
          <section class="info-block">
            <div class="info-block__index">${String(index + 1).padStart(2, "0")}</div>
            <h3>${item.title}</h3>
            ${item.text ? `<p>${item.text}</p>` : ""}
            ${item.list ? `<ul>${item.list.map((line) => `<li>${line}</li>`).join("")}</ul>` : ""}
          </section>`,
      )
      .join("")}
  </div>`;

const flow = (nodes) => `
  <div class="flow">
    ${nodes
      .map(
        (node, index) => `
          <div class="flow__node">
            <span class="flow__num">${String(index + 1).padStart(2, "0")}</span>
            <span class="flow__title">${node.title}</span>
            ${node.sub ? `<span class="flow__sub">${node.sub}</span>` : ""}
          </div>`,
      )
      .join("")}
  </div>`;

const sectionSlide = (n, chapter, label, title, tagline, items) => `
  <article class="slide section-slide" data-slide="${n}">
    <section class="section-slide__dark">
      <div class="section-slide__chapter">${chapter}</div>
      <div class="section-slide__label">${label}</div>
      <h1>${title}</h1>
      <p class="section-slide__tagline">${tagline}</p>
    </section>
    <section class="section-slide__agenda">
      ${editorialList(items)}
    </section>
    ${footer(n)}
  </article>`;

const slides = [
  () => `
    <article class="slide cover" data-slide="1">
      <section class="cover__left">
        <div class="cover__index">01</div>
        <h1>会社案内</h1>
        <p class="cover__tagline">Best IT partner for your company</p>
        <strong class="cover__company">TERABOX INC.</strong>
        <span class="cover__version">2025 Ver.</span>
      </section>
      <section class="cover__right">
        <img class="cover__mark" src="${ASSET}s01-01.png" alt="Terabox" />
      </section>
      ${footer(1)}
    </article>`,

  () => frame(
    2,
    "CONTENTS",
    "目次",
    "",
    `<div class="contents-layout"><div class="agenda__list">
      ${[
        "経営ビジョン",
        "会社概要",
        "会社組織",
        "エンジニアリング事業部",
        "ソリューション事業部",
        "IT人材サービス事業部",
        "主要取引先",
      ]
        .map(
          (label, i) => `<div class="agenda__item"><b>${String(i + 1).padStart(2, "0")}</b><span>${label}</span></div>`,
        )
        .join("")}
    </div><figure class="contents__visual"><img src="./assets/reference/contents-architecture.png" alt="Terabox architectural visual" /></figure></div>`,
    "agenda",
  ),

  () => frame(
    3,
    "VISION",
    "経営ビジョン",
    "",
    `<div class="vision__layout">
      <figure class="image-frame vision__portrait"><img src="./assets/reference/vision-portrait.png" alt="代表取締役 荊威" /></figure>
      <section class="vision__message">
        <p>テラボックスは、様々なビジネスシーンで経験を積んだ優秀且つ精鋭なメンバーが結集し設立されました。従来より更に多業種の企業様から信頼されるビジネスパートナーとして真摯にビジネス推進を行って参ります。</p>
        <p>弊社はプロパーと他のIT企業様とのグローバルネットワークを構築し、緊密な連携により企業様の経営戦略、AI・DXからIT構築・保守・メンテナンスまで一気通貫で対応可能な体制を整えております。</p>
        <div class="grid-3" style="margin:26px 0 24px">
          <div class="info-block"><span class="technical-label">01</span><h3>エンジニアリング事業</h3></div>
          <div class="info-block"><span class="technical-label">02</span><h3>ソリューション事業</h3></div>
          <div class="info-block"><span class="technical-label">03</span><h3>IT人材サービス事業</h3></div>
        </div>
        <p>金融業界のビジネス経験者が多数在籍し、高いセキュリティ意識を持ってビジネスを推進。今後更に事業領域と体制を強化し、社会に貢献できる企業を目指します。</p>
        <div class="vision__signature">テラボックス株式会社<br />代表取締役　荊 威 / Jing Wei</div>
      </section>
    </div>`,
  ),

  () => frame(
    4,
    "COMPANY PROFILE",
    "会社概要",
    "Corporate data sheet",
    `<div class="company-metrics">
      <div><b>2016</b><span>FOUNDED</span></div>
      <div><b>20M</b><span>CAPITAL / JPY</span></div>
      <div><b>TOKYO</b><span>HEAD OFFICE</span></div>
    </div>
    <div class="company-sheet">
      <section>
        <h2>HEAD OFFICE / 本社</h2>
        <dl class="data-table">
          <dt>名称</dt><dd>テラボックス株式会社</dd>
          <dt>所在地</dt><dd>〒104-0045<br />東京都中央区築地6-17-4 リードシー築地ビル4階</dd>
          <dt>TEL</dt><dd>03-5542-7798</dd>
          <dt>設立</dt><dd>2016年4月</dd>
          <dt>資本金</dt><dd>2,000万円</dd>
          <dt>代表者</dt><dd>荊 威</dd>
          <dt>諸資格</dt><dd>プライバシーマーク 10825028<br />有料職業紹介許可証 13-ユ-309628<br />労働者派遣事業許可証 派13-312878<br />Google Cloud Partner</dd>
        </dl>
      </section>
      <section>
        <h2>AFFILIATED COMPANY / 関連会社</h2>
        <dl class="data-table">
          <dt>名称</dt><dd>博科思信息科技（広州）有限公司</dd>
          <dt>所在地</dt><dd>〒510000<br />中国広東省広州市 海珠区赤岗西路205号A棟210室A16</dd>
          <dt>TEL</dt><dd>86-13167022930</dd>
          <dt>設立</dt><dd>2019年12月</dd>
          <dt>資本金</dt><dd>50万人民元</dd>
          <dt>代表者</dt><dd>荊 威</dd>
          <dt>WEB</dt><dd>https://terabox.jp</dd>
        </dl>
      </section>
    </div>`,
  ),

  () => frame(
    5,
    "ORGANIZATION",
    "会社組織",
    "Governance & departments",
    `<div class="organization-layout"><aside class="organization-note"><p>事業を実行する5つの部門と、専門性の高い組織体制で、お客様の成長を総合的に支援します。</p></aside><div class="org-chart">
      <div class="org-row"><div class="org-box org-box--primary">取締役会</div></div>
      <div class="org-row"><div class="org-box org-box--primary">代表取締役</div><div class="org-box">経営メンバー<br /><small>COO / CIO / CTO / 社外取締役</small></div></div>
      <div class="org-lines"></div>
      <div class="org-row">
        <div class="org-box org-box--accent">営業企画部<br /><small>SES営業 / ソリューション営業</small></div>
        <div class="org-box org-box--accent">管理部<br /><small>人事総務 / 財務</small></div>
        <div class="org-box org-box--accent">エンジニアリング事業部<br /><small>インフラ部 / システム開発部</small></div>
        <div class="org-box org-box--accent">ソリューション事業部<br /><small>ロボット / AI・DX / 製品推進</small></div>
        <div class="org-box org-box--accent">IT人材サービス事業部<br /><small>紹介 / 教育訓練 / プラットフォーム</small></div>
      </div>
      <div class="org-lines" style="width:47%"></div>
      <div class="org-row">
        <div class="org-box">ロボット推進部</div><div class="org-box">AI/DX推進部</div><div class="org-box">製品推進部</div><div class="org-box">人材サービス営業</div>
      </div>
    </div></div>`,
  ),

  () => sectionSlide(6, "04", "ENGINEERING", "エンジニアリング事業部", "設計・開発・運用を、確かな技術で支える。", [
    ["部門概要", "多国籍エンジニアによる一貫支援"],
    ["インフラ部", "クラウド基盤・ネットワークの設計、構築、運用"],
    ["システム開発部", "AI・LLM・データ分析・業務システム開発"],
  ]),

  () => frame(
    7,
    "ENGINEERING",
    "エンジニアリング事業部",
    "部門概要",
    `<div class="engineering-overview">
      <section class="engineering-overview__facts">
        <div class="metric-pair"><div><b>25+</b><span>Multinational Engineers<br />多国籍エンジニアが在籍</span></div><div><b>7+</b><span>Avg. Years of Experience<br />平均業務経験</span></div></div>
        <div class="technical-label">AI / CLOUD</div>
        <img src="./assets/reference/engineering-team-illustration.png" alt="AI・クラウドの専門チーム" />
      </section>
      <section class="engineering-overview__list">${editorialList([
        ["TEAM", "日本人を含む多国籍エンジニア。プロジェクトの成功に向けて一体となり価値を提供します。"],
        ["INDUSTRY EXPERIENCE", "官公庁・自治体、金融、医療、物流、自動運転など、多様な業界での実績。"],
        ["CAPABILITY", "要件定義から設計・開発・運用保守まで一貫対応。SES常駐型と受託開発の双方に対応。"],
        ["VALUE", "お客様の事業成長に直結する価値を創出し、信頼される技術パートナーとして共に前進します。"],
      ])}</section>
    </div>`,
  ),

  () => frame(
    8,
    "INFRASTRUCTURE",
    "4.1 インフラ部",
    "実績",
    `<div class="infra-layout">
      <section class="infra-layout__metrics">
        <div><b>40<sup>+</sup></b><span>PERSON-MONTH</span><p>Webシステム基盤の設計・構築・移行<br />AWSクラウド / CI/CD</p></div>
        <div><b>100<sup>+</sup></b><span>PERSON-MONTH</span><p>マルチアカウント基盤の設計・運用<br />グローバル金融基盤</p></div>
        <div><b>200<sup>+</sup></b><span>PERSON-MONTH</span><p>データ基盤の構築・分析基盤整備<br />物流WMS / レガシー移行</p></div>
      </section>
      <section class="infra-layout__detail">
        <ul><li>要件定義から設計・構築・移行・運用まで一気通貫で対応</li><li>インフラ自動化・標準化を推進</li><li>主要クラウド認定資格を保有するエンジニアが多数在籍</li></ul>
        <img src="./assets/reference/infrastructure-architecture.png" alt="クラウド基盤と業務システム" />
      </section>
    </div>`,
  ),

  () => frame(
    9,
    "SYSTEM DEVELOPMENT",
    "4.2 システム開発部",
    "実績",
    `<div class="system-dev-grid">
      <section><div class="line-icon line-icon--ai"></div><h2>AI・データ分析ソリューション</h2><ul><li>AI・機械学習モデルの開発・実装</li><li>大規模データ基盤の構築と分析基盤の設計</li><li>データ可視化・ダッシュボード開発</li></ul></section>
      <section><div class="line-icon line-icon--screen"></div><h2>業務システム開発</h2><ul><li>要件定義から設計・開発・導入までの一貫支援</li><li>Web・モバイルアプリケーション開発</li><li>業務システム・基幹システムの開発</li></ul></section>
      <section><div class="line-icon line-icon--cloud"></div><h2>クラウドネイティブ開発</h2><ul><li>CI/CD パイプラインの設計・構築</li><li>コンテナ基盤・Kubernetesを活用した開発</li><li>DevOps推進・運用支援</li></ul></section>
    </div>`,
  ),

  () => sectionSlide(10, "05", "SOLUTION", "ソリューション事業部", "業務の現場を理解し、実装できる仕組みに変える。", [
    ["部門概要", "企画・導入・運用までを一貫支援"],
    ["ロボット推進部", "サービスロボット / 物流ロボット"],
    ["AI / DX推進部", "AIアプリ / 市場調査 / 人材マッチング / AIoT"],
    ["製品推進部", "Engineering Base / Dynamics 365"],
  ]),

  () => frame(
    11,
    "SOLUTION",
    "ソリューション事業部<br />概要",
    "テラボックスは、AI・ロボティクス・DX・プラットフォームソリューションの力を組み合わせ、お客様のビジネス変革と業務革新を支援します。",
    `<div class="solution-pillars">
      <section><div class="pillar-icon">⌁</div><h2>ロボティクス</h2><p>高度なロボット技術で現場の自動化と業務効率化を実現します。</p></section>
      <section><div class="pillar-icon">◎</div><h2>AI / DX</h2><p>AIとデータ活用により、業務の最適化と意思決定の高度化を支援します。</p></section>
      <section><div class="pillar-icon">▣</div><h2>製品・ソリューション</h2><p>自動化製品とパートナーソリューションで課題に最適な価値を提供します。</p></section>
      <section><div class="pillar-icon">⌘</div><h2>コンサルティング</h2><p>導入から運用まで伴走し、確実な実行と継続的な成果創出を支援します。</p></section>
    </div>`,
  ),

  () => frame(
    12,
    "SOLUTION",
    "ロボット推進部　概要",
    "",
    `<div class="robotics-overview">
      <section class="robotics-overview__row robotics-overview__row--service"><div class="robotics-overview__copy"><b>01</b><h2>サービスロボット事業</h2><p>ホテル・レストラン・介護施設・商業施設など、<br />人と触れ合う現場に最適なサービスロボットを<br />提供します。</p><p>業務の自動化・省人化を通じて、顧客体験の向上と<br />人手不足の解消に貢献します。</p></div><figure><img src="./assets/reference/robotics-service-scene.png" alt="サービスロボット導入イメージ" /></figure></section>
      <section class="robotics-overview__row robotics-overview__row--reverse"><div class="robotics-overview__copy"><b>02</b><h2>物流ロボット事業</h2><p>AGF・AGV・仕分けロボットなどを通じて、<br />倉庫や物流センターの効率化を実現します。</p><p>搬送の自動化とスマートな運用で、<br />コスト削減と生産性向上を支援します。</p></div><figure><img src="./assets/reference/robotics-logistics-scene.png" alt="物流ロボット導入イメージ" /></figure></section>
    </div>`,
  ),

  () => frame(
    13,
    "SERVICE ROBOT",
    "サービスロボット　製品ラインナップ",
    "",
    `<div class="robot-gallery">
      ${[
        ["s13-02.png", "配膳ロボット（配送）"],
        ["s13-01.png", "案内ロボット（受付・案内）"],
        ["s13-07.png", "清掃ロボット"],
        ["s13-06.png", "清掃ロボット"],
      ]
        .map(([src, label]) => `<figure><img src="${ASSET}${src}" alt="${label}" /><figcaption>${label}</figcaption></figure>`)
        .join("")}
    </div>`,
  ),

  () => frame(
    14,
    "SOLUTION",
    "KEENON<br />手が届く未来",
    "",
    `<div class="keenon-layout"><section><p>多様な形態のサービスロボットを提供するリーディングカンパニーとして、KEENONは包括的な製品ラインナップを展開。</p><p>ホテル、レストラン、複合商業施設、病院など、世界中のあらゆるシーンにロボットをシームレスに導入し、よりスマートな未来を実現します。</p><div class="benefit-row"><span>安全性<small>SAFETY</small></span><span>効率<small>EFFICIENCY</small></span><span>スマート<small>SMART</small></span></div></section><figure><img src="./assets/reference/keenon-architectural.png" alt="建築空間に設置されたKEENONロボット" /></figure></div>`,
  ),

  () => frame(
    15,
    "SOLUTION",
    "UPロボットシリーズ<br />主な機能",
    "",
    `<div class="up-robot-layout"><figure><img src="./assets/reference/up-robot-architectural.png" alt="UPロボット" /></figure><section>${editorialList([
      ["自動配送・自動返却", "指定の場所まで自動走行し、配達と返却を自動で実行します。"],
      ["障害物検知・安全停止", "3D LiDARとセンサーにより、周囲の障害物を検知し安全に停止します。"],
      ["エレベーター連携", "エレベーターシステムと連携し、フロア間の移動を自動で行います。"],
      ["マルチフロア対応", "複数フロアの運用に対応し、柔軟な配送ルートを構築できます。"],
      ["クラウド管理・遠隔監視", "クラウドプラットフォームで稼働状況を可視化し、遠隔から管理できます。"],
    ])}</section></div>`,
  ),

  () => frame(
    16,
    "SOLUTION",
    "ホテルの絨毯清掃に特化した設計",
    "共用部や夜間清掃にも配慮した、低騒音の清掃システム。",
    `<div class="feature-split">
      <figure class="image-frame feature-split__media"><img src="./assets/reference/carpet-robot-architectural.png" alt="ホテル絨毯清掃ロボット" /></figure>
      <div class="feature-split__content">
        <div class="technical-label">CARPET CLEANING SYSTEM</div>
        ${editorialList([
          ["壁際まで届くサイドブラシ", "端部まで近づき、壁際の汚れを丁寧に清掃"],
          ["H12級 HEPAフィルター", "微細な粉じんを捕集し、空気への再飛散を抑制"],
          ["50,000 rpm 高速ブラシレスモーター", "高い吸引力を支える"],
          ["高速ローラーブラシ", "繊維の奥にたまった汚れをかき出す"],
          ["防巻き付きローラーブラシ軸", "毛髪の絡まりを抑える独自設計"],
          ["65 dB未満の低騒音", "共用部や夜間清掃にも配慮"],
        ])}
      </div>
    </div>`,
  ),

  () => frame(
    17,
    "CASE STUDY",
    "介護施設で、<br />ロボットを「使える仕組み」に",
    "機器を置くだけではなく、現場に定着する運用まで設計しました。",
    `<div class="case-layout">
      <section class="case-layout__copy">
        <div class="technical-label">CARE FACILITY / ROBOT DEPLOYMENT</div>
        ${editorialList([
          ["安全と快適性を最優先", "入居者の動線と施設環境を確認し、無理のない運用を設計。"],
          ["現場スタッフの負担を軽減", "配膳・清掃業務を支援し、本来のケア業務に集中できる環境へ。"],
          ["導入から定着まで一貫支援", "要件整理、現場教育、運用設計、定着支援まで伴走。"],
        ])}
      </section>
      <section class="case-layout__media">
        <figure class="image-frame"><img src="${ASSET}s17-01.jpg" alt="介護施設の食堂" /></figure>
        <figure class="image-frame"><img src="${ASSET}s17-02.jpg" alt="施設内の導入環境" /></figure>
        <figure class="image-frame"><img src="${ASSET}s17-03.jpg" alt="施設で稼働するロボット" /></figure>
      </section>
    </div>`,
  ),

  () => frame(
    18,
    "LOGISTICS ROBOT",
    "搬送距離と運用条件で、AGF／AGVを選び分ける",
    "現場レイアウトと搬送方式に合わせて、最適な機体を選定します。",
    `<div class="compare-layout">
      <section class="compare-panel"><span class="technical-label">AGF ROBOT</span><h2>固定ルートで安定搬送</h2><ul><li>定型工程</li><li>高い再現性</li><li>シンプルな運用</li></ul><div class="robot-pair"><img src="${ASSET}s18-01.png" alt="AGFロボット" /><img src="${ASSET}s18-02.png" alt="AGFロボット大型機" /></div></section>
      <section class="compare-panel"><span class="technical-label">AGV ROBOT</span><h2>自律走行で柔軟に対応</h2><ul><li>3Dナビゲーション</li><li>自動充電</li><li>安全センサー</li></ul><div class="robot-pair"><img src="${ASSET}s18-03.png" alt="AGVロボット" /><img src="./assets/reference/agv-robot-large.png" alt="AGVロボット大型機" /></div></section>
    </div>`,
  ),

  () => frame(
    19,
    "LOGISTICS ROBOT",
    "仕分け工程を、もっと速く・柔軟に",
    "FlyPick Sorting Robot",
    `<figure class="image-frame image-frame--contain" style="height:390px;margin-top:24px"><img src="${ASSET}s19-01.png" alt="FlyPick仕分けロボット" /></figure>
    <div style="margin-top:28px">${infoBlocks([
      { title: "高効率", text: "AGVと3D仕分け機を連携し、処理能力を高めます。" },
      { title: "短期導入", text: "標準構成では、最短2週間での納品に対応。" },
      { title: "柔軟な拡張", text: "モジュール設計により、需要に合わせて増減。" },
      { title: "省スペース", text: "多層搬送で床面を有効活用。" },
    ], 4)}</div>`,
  ),

  () => frame(
    20,
    "LOGISTICS ROBOT",
    "倉庫レイアウトに合わせて、搬送ラインを拡張",
    "入荷から仕分け、保管、出荷までを一つの運用として設計します。",
    `<div class="warehouse-reference"><img src="./assets/reference/warehouse-main.png" alt="入荷・保管・仕分け・出荷をつなぐ倉庫搬送レイアウト" /></div>
    <div class="warehouse-labels"><span>入荷</span><span>保管</span><span>仕分け</span><span>出荷</span></div>
    <div class="warehouse-systems"><span>RCS ロボット管理</span><span>OMS 注文管理</span><span>WMS 倉庫管理</span></div>
    <figure class="warehouse-channels"><img src="./assets/reference/warehouse-channels.png" alt="単一チャンネル・E型・T型の搬送ライン構成" /></figure>`,
  ),

  () => frame(
    21,
    "PARTNERSHIP",
    "日本市場における、戦略的パートナーシップ",
    "物流ロボットの販売・サービス体制を、正式な協業関係で支えます。",
    `<div class="certificate-layout">
      <section class="certificate-layout__details">
        ${editorialList([
          ["対象：物流ロボット設備・システム", ""],
          ["領域：販売・サービス", ""],
          ["許諾地域：日本", ""],
          ["許諾期間：2025.08.18–2026.12.31", ""],
        ])}
      </section>
      <figure class="certificate-layout__frame"><img src="${ASSET}s21-01.png" alt="LOGIAN 戦略的パートナー認定証" /></figure>
    </div>`,
  ),

  () => sectionSlide(22, "05", "AI & DIGITAL TRANSFORMATION", "AI / DX 推進部", "AIを、現場で使える仕組みに。", [
    ["AIアプリケーション開発", "LLM・コンピュータビジョン"],
    ["市場調査インテリジェンス", "収集・統合・分析・報告"],
    ["AI人材マッチング", "人材と案件の効率的な接続"],
    ["AIoTスマートメーター", "遠隔検針・異常検知・可視化"],
  ]),

  () => frame(
    23,
    "AI / DX",
    "業界知識 × AI × ローコードで、実装までを短縮",
    "要件整理からモデル運用までを、一つの実装フレームワークでつなぎます。",
    `<div style="margin-top:72px">${flow([
      { title: "業界知識", sub: "自動車・貿易・HR・物流" },
      { title: "要件定義", sub: "課題分析と適用可能性評価" },
      { title: "AIモデル", sub: "領域特化モデルを選定" },
      { title: "ローコード実装", sub: "画面・承認・データ連携" },
      { title: "業務運用", sub: "迅速な構築と展開" },
    ])}</div>
    <div class="grid-3" style="margin-top:82px">
      <div class="info-block"><h3>10年以上の業界経験</h3><p>自動車・貿易・HR・物流の知見を活用。</p></div>
      <div class="info-block"><h3>モデル／APIを一元管理</h3><p>GUIでモデル選択とバージョンを管理。</p></div>
      <div class="info-block"><h3>業務フローを短期構築</h3><p>承認、画面、データ連携を一つの流れに。</p></div>
    </div>`,
  ),

  () => frame(
    24,
    "AI APPLICATION",
    "AIの価値は、業務シナリオで決まる",
    "情報を集めるだけでなく、判断につながる形へ整えます。",
    `<div class="proof-layout reference-proof" style="grid-template-columns:45% 55%;margin-top:38px">
      <figure class="reference-photo"><img src="./assets/reference/ai-documents.png" alt="AI活用シナリオを示す業務資料" /></figure>
      ${editorialList([
        ["事業戦略・競合分析", "競合、新製品、特許、ニュースを継続監視し、戦略判断を支援。"],
        ["製品開発・R&D", "論文・特許・社内研究データを結び、新製品開発を加速。"],
        ["営業・マーケティング", "顧客情報とCRMデータを統合し、提案・アプローチを最適化。"],
        ["法務・コンプライアンス", "法規制の変化を追跡し、事業リスクを早期に把握。"],
      ])}
    </div>`,
  ),

  () => frame(
    25,
    "MARKET INTELLIGENCE",
    "調査業務を、探索から報告まで一気通貫で支援",
    "情報収集、知識整理、進捗共有、レポート作成を一つのワークフローに。",
    `<div class="proof-layout reference-proof" style="grid-template-columns:58% 42%;margin-top:34px">
      <figure class="reference-photo"><img src="./assets/reference/research-documents.png" alt="市場調査レポートと分析資料" /></figure>
      ${editorialList([
        ["調査テーマの自動分解", "複雑なテーマを検索可能な論点へ分ける"],
        ["多次元検索と情報統合", "異なる情報源を横断し、関連データを整理"],
        ["ステージ共有サマリー", "中間結果を段階的にまとめ、チームで共有"],
        ["ナレッジベース／進捗管理", "調査資産とプロジェクト状況を一元管理"],
      ])}
    </div>`,
  ),

  () => frame(
    26,
    "MARKET INTELLIGENCE",
    "複雑な調査を、6つの機能で自動化",
    "探索精度を高めながら、報告までの手作業を減らします。",
    `<div class="research-cycle">
      <svg class="research-cycle__lines" viewBox="0 0 1200 410" preserveAspectRatio="none" aria-hidden="true"><path d="M105 124 H306 C332 124 344 140 344 165 V242 C344 268 360 282 386 282 H504"/><path d="M504 282 H610 C638 282 650 266 650 240 V165 C650 140 666 124 692 124 H1094"/><path d="M594 282 V362 H842"/></svg>
      ${[
        ["01", "RESEARCH THEME", "調査テーマを自動分解", "r1"],
        ["02", "SEARCH", "Big Data検索精度を向上", "r2"],
        ["03", "KNOWLEDGE", "企業知識を自動関連付け", "r3"],
        ["04", "SUMMARY REPORT", "自動要約レポート", "r4"],
        ["05", "EFFICIENCY & QUALITY", "調査の効率・品質を向上", "r5"],
        ["06", "KNOWLEDGE BASE", "知識庫を整理し対話活用", "r6"],
      ].map(([n,t,d,c])=>`<div class="research-cycle__node ${c}"><b>${n}</b><span class="research-cycle__glyph"></span><strong>${t}</strong><small>${d}</small></div>`).join("")}
    </div>`,
  ),

  () => frame(
    27,
    "TIME ADVANTAGE",
    "3週間を、1時間へ。",
    "AI支援により、市場調査のリードタイムを劇的に短縮。",
    `<div class="timeline-compress">
      <div><div class="metric" style="margin-bottom:18px"><span class="metric__value" style="color:var(--ink)">3</span><span class="metric__unit">WEEKS</span></div>
        <div class="timeline-weeks">
          <div class="timeline-week"><b>WEEK 1</b><span>調査設計・情報収集・一次整理</span></div>
          <div class="timeline-week"><b>WEEK 2</b><span>多次元検索・情報統合・傾向分析</span></div>
          <div class="timeline-week"><b>WEEK 3</b><span>内容精査・資料化・レビュー</span></div>
        </div>
      </div>
      <div class="timeline-hour"><b>≤ 1</b><span class="technical-label">HOUR</span></div>
    </div>
    <div class="grid-2" style="margin-top:58px">
      <div class="info-block"><h3>AIが研究を加速</h3><p>AIの支援により、情報収集から分析・レポート化までを高速に実行。</p></div>
      <div class="info-block"><h3>研究サイクルを短縮</h3><p>作業効率と意思決定のスピードを高め、競争力につなげます。</p></div>
    </div>`,
  ),

  () => frame(
    28,
    "AI TALENT MATCHING",
    "人材と案件の、最適解を導く。",
    "先進的なAI技術で、正確かつ効率的なマッチングを実現。",
    `<div class="matching-grid">
      <section><span class="technical-label">TALENT POOL</span><div class="matching-list">${Array.from({ length: 4 }, () => `<div class="matching-row"><span>スキル</span><span>経験</span><span>専門領域</span></div>`).join("")}</div></section>
      <div class="matching-core"><span>MATCH</span></div>
      <section><span class="technical-label">PROJECT REQUIREMENTS</span><div class="matching-list">${Array.from({ length: 4 }, () => `<div class="matching-row"><span>スキル</span><span>経験</span><span>専門領域</span></div>`).join("")}</div></section>
    </div>
    <div class="grid-2" style="margin-top:42px"><div class="info-block"><h3>AIが人材マッチングを支援</h3></div><div class="info-block"><h3>適切な人材をより早く見つけ、案件処理の効率と競争力を高める</h3></div></div>`,
  ),

  () => frame(
    29,
    "MATCHING ENGINE",
    "受信から推薦まで、ひとつの知識循環へ。",
    "情報をつなぎ、適切な人材を、適切なタイミングで。",
    `<div style="margin-top:70px">${flow([
      { title: "Gmail", sub: "メール・コンテンツ" },
      { title: "自動取得", sub: "インテリジェントなクロール" },
      { title: "AI判断・分類・要約", sub: "ケースと人材情報" },
      { title: "各データベース", sub: "ケース / 人材 / プロファイル" },
      { title: "多次元クエリ", sub: "検索・要件分析" },
      { title: "人材推薦・スコア", sub: "意思決定支援" },
      { title: "フォローアップ・評価", sub: "継続的な改善" },
    ])}</div>
    <div class="grid-3" style="margin-top:78px">${[
      ["インテリジェントなクロールと分類", "メールとコンテンツを自動取得し、情報を分類・要約。"],
      ["パーソナライズされたケースマッチング", "専門知識と要件に基づき、適切な人材を推薦。"],
      ["効率的なクエリとフィードバック", "多次元検索と評価で、マッチングを継続改善。"],
    ].map((x,i)=>`<div class="info-block"><div class="info-block__index">0${i+1}</div><h3>${x[0]}</h3><p>${x[1]}</p></div>`).join("")}</div>`,
  ),

  () => frame(
    30,
    "EFFICIENCY SHIFT",
    "1人で、1日80件。<br />マッチングは、わずか1分。",
    "",
    `<div class="compare-layout" style="margin-top:34px">
      <section class="compare-panel" style="text-align:center"><span class="technical-label" style="color:var(--muted)">従来</span><h2 style="margin-top:84px;font-size:36px">処理件数に限界</h2><h2 style="font-size:36px">手作業による非効率</h2></section>
      <section class="compare-panel" style="text-align:center"><span class="technical-label">AI MATCHING</span><div class="metric" style="justify-content:center;margin-top:56px"><span class="metric__value" style="font-size:112px">80</span><span class="metric__unit">件 / 日</span></div><div class="metric" style="justify-content:center;margin-top:30px"><span class="metric__value" style="font-size:92px">1</span><span class="metric__unit">分 / マッチング</span></div></section>
    </div>
    <h2 style="margin:26px 0 0;text-align:center;font-size:32px">処理速度と効率を大幅に向上</h2>`,
  ),

  () => frame(
    31,
    "CUSTOMS DX",
    "通関業務を、見えるプロセスへ。",
    "AIで通関業界のDXをリードする。",
    `<div class="grid-3" style="margin-top:54px">
      <section class="portfolio-panel"><span class="technical-label">CHALLENGES</span>${editorialList([["手作業とエラー",""],["コミュニケーションコスト",""],["進捗の不透明性",""]])}</section>
      <section class="portfolio-panel"><span class="technical-label">CORE</span>${editorialList([["スマート識別","AIが申告書類を自動で読み取り・分類"],["ワンクリック申告","複雑な手続きをボタン一つで実行"],["プロセス可視化","通関状況をダッシュボードで一元管理"]])}</section>
      <section class="portfolio-panel"><span class="technical-label">VALUE</span>${editorialList([["コスト削減","人件費と運営コストを削減"],["時間短縮","申告から許可までの時間を短縮"],["リスク管理","エラーを防ぎ、コンプライアンスを強化"]])}</section>
    </div>`,
  ),

  () => frame(
    32,
    "AIoT SMART METER",
    "エネルギー管理を、<br />現場から更新する。",
    "",
    `<div class="proof-layout smart-meter-layout" style="margin-top:38px">
      <section class="smart-meter-brief">
        <div><b>課題</b><p>手動データ収集の非効率／データ精度の欠如</p></div>
        <div><b>目的</b><p>デジタルアップグレード／収集の効率化／<br />エネルギー管理の最適化／少人数・無人化運用</p></div>
        <strong>単位製品あたりのエネルギー消費量と炭素排出量を精細化</strong>
      </section>
      <figure class="smart-meter-layout__photo"><img src="./assets/reference/smart-meter-field.png" alt="工場でスマートメーターを確認する作業員" /></figure>
    </div>`,
  ),

  () => frame(
    33,
    "SYSTEM ARCHITECTURE",
    "現場データを、判断できる情報へ。",
    "",
    `<div class="architecture">
      <div class="architecture__stack">
        <div class="architecture__layer architecture__layer--cloud"><div class="architecture__label"><b>CLOUD &amp; ACCESS</b><span>クラウドプラットフォーム /<br />Web・モバイル</span></div><div class="architecture__visual"><span class="arch-glyph arch-glyph--cloud"></span><span class="arch-glyph arch-glyph--laptop"></span><span class="arch-glyph arch-glyph--tablet"></span><span class="arch-glyph arch-glyph--phone"></span></div></div>
        <div class="architecture__layer architecture__layer--intelligence"><div class="architecture__label"><b>INTELLIGENCE</b><span>AI画像認識 / 異常検知</span></div><div class="architecture__visual architecture__visual--boxed"><span class="arch-glyph arch-glyph--camera"></span><em>スマートカメラ<br />（搭載AI）</em><span class="arch-glyph arch-glyph--brain"></span><em>機械学習<br />異常パターン学習</em><span class="arch-glyph arch-glyph--alert">!</span><em>異常検知<br />アラート生成</em></div><aside>画像認識精度<br /><strong>99%以上</strong>を目標</aside></div>
        <div class="architecture__layer architecture__layer--connect"><div class="architecture__label"><b>CONNECT</b><span>NB-IoT / BLE</span></div><div class="architecture__visual"><span class="arch-glyph arch-glyph--antenna"></span><em>NB-IoT / BLE</em></div></div>
        <div class="architecture__layer architecture__layer--field"><div class="architecture__label"><b>FIELD</b><span>IoTデバイスから<br />現場データを収集</span></div><div class="architecture__visual"><span class="arch-device">メーター</span><span class="arch-device">メーター</span><span class="arch-device">メーター</span><i>•••</i><span class="arch-device arch-device--camera">スマートカメラ</span><span class="arch-device arch-device--camera">スマートカメラ</span><i>•••</i><span class="arch-device arch-device--ble">BLE送信機</span><span class="arch-device arch-device--ble">BLE送信機</span><i>•••</i></div></div>
      </div>
      ${editorialList([
        ["高精度データ収集", "NB-IoT無線通信と既存メーター、スマートカメラ、BLE送信機により、広範囲かつ安定したデータをリアルタイムで収集。"],
        ["AI画像認識・異常検知", "スマートカメラと機械学習でメーターを自動読取りし、設備の異常パターンを学習。高精度な予知保全アラートを生成。"],
        ["データ可視化・分析", "クラウドプラットフォームで全データを一元管理。現場から経営層まで、Web／モバイルでリアルタイムに可視化・分析が可能。"],
        ["省人化・自動化", "自動データ収集とAI異常検知により、巡回・点検業務を大幅に削減。"],
      ])}
    </div>`,
  ),

  () => frame(
    34,
    "ENGINEERING BASE",
    "設計情報を、ひとつの基盤へ。",
    "電気設計・自動化・設備設計を横断する、統合型エンジニアリング設計プラットフォーム。",
    `<div class="industry-panorama">
      <section style="padding-top:96px">${editorialList([
        ["統一データベース", "部門や分野をまたぐ設計データを共有。"],
        ["マルチユーザー協働", "設計データをリアルタイムに同期。"],
      ])}</section>
      <figure class="industry-panorama__visual"><img src="./assets/reference/engineering-base-sketch.png" alt="統合エンジニアリング設計プラットフォーム" /></figure>
    </div>`,
  ),

  () => frame(
    35,
    "SINGLE SOURCE OF TRUTH",
    "分野を越えて、設計データを一元化。",
    "統合設計環境からプラントモデル、図面・リストまでを連続させます。",
    `<div class="design-data-layout">
      <section class="design-data-stream">
        ${editorialList([
          ["単一データベース", "Single Source of Truthに基づく統合設計環境"],
          ["分野横断データ管理", "プロセス、電気、計装、オートメーション"],
          ["モジュール化・ルールベース設計", "標準化と再利用性を向上"],
        ])}
        <div class="design-data-flow"><span>CONVENTIONAL WORKFLOW</span><i>→</i><span>CAD vs. EB</span><small>IT ARCHITECTURE</small></div>
      </section>
      <section class="design-data-stream">
        ${editorialList([
          ["デジタルツイン", "運用・保守を支援"],
          ["外部システム連携", "PDM、PLM、ERP、DMS、3D CAD、シミュレーション"],
          ["柔軟なライセンス", "買い切り、期間レンタル、トークン方式"],
        ])}
        <div class="design-data-flow"><span>PLANT MODEL</span><i>→</i><span>DIAGRAMS &amp; LISTS</span><small>SYSTEM LANDSCAPE / USERS &amp; ACCESS PERMISSIONS</small></div>
      </section>
    </div>`,
  ),

  () => frame(
    36,
    "APPLICATIONS & IMPACT",
    "設計から運用まで、産業全体をつなぐ。",
    "Engineering Baseの適用分野と導入効果。",
    `<div class="proof-layout" style="grid-template-columns:58% 42%;align-items:center">
      <div class="concentric">
        <div class="concentric__outer"></div><div class="concentric__inner"></div><div class="concentric__core">ENGINEERING<br />BASE</div>
        <div class="concentric__labels"><span>DIGITAL TWIN</span><span>INTEGRATIONS</span><span>COLLABORATION</span><span>PROJECT MANAGEMENT</span><span>PROCESS</span><span>INSTRUMENTATION</span><span>AUTOMATION</span><span>ELECTRICAL</span></div>
      </div>
      ${editorialList([
        ["プラントソリューション", "EPCを含む大規模プラント"],
        ["プロセス産業", "基本設計から詳細設計"],
        ["電力配給", "送配電プロジェクト計画"],
        ["モビリティ", "鉄道・自動車のモジュール設計"],
      ])}
    </div>`,
  ),

  () => frame(
    37,
    "DYNAMICS 365",
    "CRMとERPを、ひとつの運営基盤へ。",
    "Microsoft Dynamics 365を基盤に、企業のデジタル変革を支援。",
    `<div class="proof-layout" style="grid-template-columns:68% 32%;align-items:center">
      <div>
        <div class="crm-erp"><div class="crm-erp__pillar">CRM</div><div class="crm-erp__data">DATA</div><div class="crm-erp__pillar">ERP</div></div>
        <div class="grid-4" style="margin-top:28px"><div class="proof-card"><h3>Office 365</h3></div><div class="proof-card"><h3>Azure</h3></div><div class="proof-card"><h3>AI</h3></div><div class="proof-card"><h3>DATA</h3></div></div>
      </div>
      ${editorialList([
        ["高度なカスタマイズ", "具体的なニーズに応じてD365ソリューションを提供。"],
        ["Microsoftサービスとの統合", "Office 365やAzureとシームレスに統合。"],
        ["データ駆動型の運営", "AIとデータ分析でインテリジェントな運営を推進。"],
      ])}
    </div>`,
  ),

  () => frame(
    38,
    "BUSINESS SCENARIOS",
    "顧客・財務・業務を、同じデータで動かす。",
    "",
    `<div class="scenario-columns">
      <section class="scenario-column"><b>01</b><h3>販売と顧客管理</h3><ul><li>販売予測</li><li>顧客関係管理</li><li>販売実績向上</li></ul></section>
      <section class="scenario-column"><b>02</b><h3>財務と運営の最適化</h3><ul><li>財務データのリアルタイム監視</li><li>サプライチェーン効率向上</li><li>運営コスト削減</li></ul></section>
      <section class="scenario-column"><b>03</b><h3>自動化と分析</h3><ul><li>Power Automateで業務自動化</li><li>Power BIでリアルタイム分析</li><li>インテリジェントな意思決定支援</li></ul></section>
    </div>
    <div class="technical-label" style="text-align:center;font-size:20px;letter-spacing:.18em">ONE DATA — ONE OPERATION</div>`,
  ),

  () => sectionSlide(39, "06", "IT TALENT SERVICES", "IT人材サービス<br />事業部", "人を、技術と事業へつなぐ。", [
    ["人材紹介", "採用ニーズに応じたIT人材の提案"],
    ["IT人材研修", "最新技術・業務知識の体系的な育成"],
    ["人材プラットフォーム運営", "IT人材と企業の効率的なマッチング"],
  ]),

  () => frame(
    40,
    "SERVICE OVERVIEW",
    "要件から稼働まで、人材支援を一気通貫で。",
    "IT人材の提案・育成・マッチングを、ひとつのサービス体系で提供。",
    `<div style="margin-top:52px">${flow([
      { title: "要件分析", sub: "課題と要件を整理" },
      { title: "人材提案", sub: "最適な人材を迅速に提案" },
      { title: "アサイン", sub: "スキル・経験・相性を考慮" },
      { title: "稼働フォロー", sub: "定期フォローと成果支援" },
    ])}</div>
    <div style="margin-top:64px">${infoBlocks([
      { title: "TEAM", text: "幅広い業界・業種に対応できるITエンジニア" },
      { title: "EXPERIENCE", text: "開発・インフラ・運用保守・AI/DX。大手から中小、短期・長期、SES常駐型に対応" },
      { title: "CAPABILITY", text: "クラウド・AI・RPA、国内外の多様なバックグラウンドによるグローバル対応" },
    ], 3)}</div>
    <p style="margin-top:36px;text-align:center;font-size:18px">人材紹介　／　IT人材研修　／　人材プラットフォーム運営</p>`,
  ),

  () => frame(
    41,
    "TALENT PLACEMENT",
    "採用にも、プロジェクトにも。",
    "企業のニーズに合わせ、最適なスキルと経験を持つIT人材を迅速に提案。",
    `<div class="placement-with-portraits"><img src="./assets/reference/talent-portraits-left.png" alt="IT人材" /><div class="placement">
      <section class="placement__path"><h2>DIRECT HIRE</h2><h3>有料職業紹介</h3><div class="placement__steps"><div class="placement__step"><b>01</b><span>要件整理</span></div><div class="placement__step"><b>02</b><span>候補者選定</span></div><div class="placement__step"><b>03</b><span>採用</span></div></div></section>
      <div class="placement__core">RIGHT<br />PERSON<br /><span class="accent">—</span><br />RIGHT<br />ROLE</div>
      <section class="placement__path"><h2>PROJECT ASSIGNMENT</h2><h3>紹介予定派遣</h3><div class="placement__steps"><div class="placement__step"><b>01</b><span>案件要件</span></div><div class="placement__step"><b>02</b><span>スキルマッチ</span></div><div class="placement__step"><b>03</b><span>稼働</span></div></div></section>
    </div><img src="./assets/reference/talent-portraits-right.png" alt="IT人材" /></div>`,
  ),

  () => frame(
    42,
    "IT TALENT ACADEMY",
    "学びを、現場で使える力へ。",
    "最新技術と業務知識を体系化し、即戦力となる人材を育成。",
    `<div class="academy-grid">
      ${[
        ["01", "SALESFORCE", "Admin / Developer", "s42-01.png"],
        ["02", "AWS", "Cloud Foundation", "s42-02.png"],
        ["03", "PYTHON", "Developer / Automation Test", "s42-03.png"],
        ["04", "GOOGLE CLOUD", "Associate Cloud Engineer / Professional Cloud Architect / Professional Data Engineer", "s42-04.png"],
      ].map(([n,t,d,src])=>`<section class="academy-lane"><b>${n}</b><h3>${t}</h3><p>${d}</p><img class="academy-art" src="${ASSET}${src}" alt="${t} training course" /></section>`).join("")}
    </div>
    <div class="technical-label" style="display:flex;justify-content:space-around;font-size:18px;margin-top:20px"><span>LEARN</span><span>→</span><span>PRACTICE</span><span>→</span><span>CERTIFY</span><span>→</span><span>DEPLOY</span></div>`,
  ),

  () => frame(
    43,
    "CLIENTS & PARTNERS",
    "信頼は、共創の積み重ね。",
    "主要取引先（一部）／敬称略・順不同",
    `<div class="logo-wall">
      ${[
        [null, "トヨタカネツ株式会社"], ["s43-02.jpg", "Rakuten"], ["s43-16.jpg", "JMDC"], ["s43-08.png", "FUJIFILM"],
        [null, "NS Solutions"], [null, "FUJITSU"], ["s43-10.jpg", "AMADA"], ["s43-06.png", "Capgemini"],
        ["s43-03.png", "Alibaba Cloud"], ["s43-07.png", "HAS"], ["s43-01.png", "SB Frameworks"], ["s43-11.jpg", "KONICA MINOLTA"],
        [null, "Benesse"], ["s43-13.png", "THE PARK FRONT HOTEL"], ["s43-14.png", "PFU"], ["s43-05.png", "SHIFT"],
        ["s43-04.jpg", "COSTCO WHOLESALE"], ["s43-12.png", "RH"], ["s43-09.png", "MIRAIT ONE"],
      ].map(([src,label])=>`<div class="logo-wall__item">${src ? `<img src="${ASSET}${src}" alt="${label}" />` : `<span class="logo-wall__word ${label === "FUJITSU" ? "logo-wall__word--red" : ""}">${label}</span>`}</div>`).join("")}
    </div>
    <p style="margin:18px 0 0;text-align:center;font-size:18px">多様な業界のパートナーと、確かな実装を。</p>`,
  ),
];

const app = document.getElementById("app");
const rail = document.getElementById("rail");
const railToggle = document.getElementById("railToggle");
const sectionNav = document.getElementById("sectionNav");
const viewer = document.getElementById("viewer");
const stageShell = document.getElementById("stageShell");
const slideStage = document.getElementById("slideStage");
const prevSlide = document.getElementById("prevSlide");
const nextSlide = document.getElementById("nextSlide");
const pageCurrent = document.getElementById("pageCurrent");
const pageTotal = document.getElementById("pageTotal");
const pageProgress = document.getElementById("pageProgress");
const layerToggle = document.getElementById("layerToggle");
const layerModeLabel = document.getElementById("layerModeLabel");

const layerModes = ["reference", "compare", "dom"];
const layerModeLabels = {
  reference: "合成",
  compare: "比較",
  dom: "DOM",
};

let currentSlide = 1;
let railCollapsed = false;

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function slideFromHash() {
  const match = window.location.hash.match(/^#slide-(\d+)$/);
  return match ? clamp(Number(match[1]), 1, TOTAL) : 1;
}

function setSlideLayerMode(mode, { syncUrl = true } = {}) {
  slideLayerMode = SLIDE_LAYER_MODES.has(mode) ? mode : "reference";
  document.documentElement.dataset.slideLayer = slideLayerMode;
  layerModeLabel.textContent = layerModeLabels[slideLayerMode];
  layerToggle.dataset.mode = slideLayerMode;
  layerToggle.setAttribute(
    "aria-label",
    `表示レイヤーを切り替える。現在：${layerModeLabels[slideLayerMode]}`,
  );

  if (syncUrl) {
    const url = new URL(window.location.href);
    if (slideLayerMode === "reference") {
      url.searchParams.delete("layer");
    } else {
      url.searchParams.set("layer", slideLayerMode);
    }
    window.history.replaceState(null, "", `${url.pathname}${url.search}${url.hash}`);
  }
}

function cycleSlideLayerMode() {
  const currentIndex = layerModes.indexOf(slideLayerMode);
  setSlideLayerMode(layerModes[(currentIndex + 1) % layerModes.length]);
}

function currentSection(page) {
  return sections.find((section) => page >= section.start && page <= section.end);
}

function buildNavigation() {
  sectionNav.innerHTML = sections
    .map(
      (section) => `
        <button class="rail__item" type="button" data-start="${section.start}" aria-label="${section.no} ${section.label}">
          <span class="rail__num">${section.no}</span>
          <span class="rail__label">${section.label}</span>
        </button>`,
    )
    .join("");

  sectionNav.addEventListener("click", (event) => {
    const button = event.target.closest("[data-start]");
    if (!button) return;
    goToSlide(Number(button.dataset.start));
  });
}

function updateNavigation() {
  const active = currentSection(currentSlide);
  sectionNav.querySelectorAll(".rail__item").forEach((button) => {
    const section = sections.find((item) => item.start === Number(button.dataset.start));
    const isActive = section === active;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-current", isActive ? "true" : "false");
  });
}

function renderSlide(animate = true) {
  const render = slides[currentSlide - 1];
  slideStage.innerHTML = render();
  const slide = slideStage.firstElementChild;
  if (slide) {
    slide.setAttribute("aria-label", `スライド ${currentSlide} / ${TOTAL}`);
    slide.classList.add("slide--reference-backed");

    const referenceImage = document.createElement("img");
    referenceImage.className = "slide__reference-bg";
    referenceImage.src = `${REFERENCE_SLIDE_ASSET}slide-${String(currentSlide).padStart(2, "0")}.png`;
    referenceImage.alt = "";
    referenceImage.setAttribute("aria-hidden", "true");
    referenceImage.draggable = false;
    referenceImage.addEventListener(
      "error",
      () => {
        slide.classList.remove("slide--reference-backed");
        referenceImage.remove();
      },
      { once: true },
    );
    slide.append(referenceImage);
  }
  if (animate && slide) {
    slide.classList.add("is-entering");
    window.setTimeout(() => slide.classList.remove("is-entering"), 460);
  }

  pageCurrent.textContent = String(currentSlide).padStart(2, "0");
  pageTotal.textContent = String(TOTAL).padStart(2, "0");
  pageProgress.style.width = `${(currentSlide / TOTAL) * 100}%`;
  prevSlide.disabled = currentSlide === 1;
  nextSlide.disabled = currentSlide === TOTAL;
  updateNavigation();
  document.title = `${String(currentSlide).padStart(2, "0")} / ${TOTAL}｜テラボックス株式会社`;
}

function goToSlide(page, { replace = false, animate = true } = {}) {
  const next = clamp(page, 1, TOTAL);
  currentSlide = next;
  const hash = `#slide-${next}`;
  if (window.location.hash !== hash) {
    window.history[replace ? "replaceState" : "pushState"](null, "", hash);
  }
  renderSlide(animate);
}

function fitStage() {
  const availableWidth = Math.max(320, viewer.clientWidth);
  const availableHeight = Math.max(180, viewer.clientHeight);
  const scale = Math.min(availableWidth / 1600, availableHeight / 900);
  stageShell.style.width = `${1600 * scale}px`;
  stageShell.style.height = `${900 * scale}px`;
  slideStage.style.transform = `scale(${scale})`;
}

function toggleRail() {
  const mobile = window.matchMedia("(max-width: 980px)").matches;
  if (mobile) {
    const expanded = app.classList.toggle("is-rail-expanded-mobile");
    railToggle.setAttribute("aria-expanded", String(expanded));
    railToggle.setAttribute("aria-label", expanded ? "ナビゲーションを折りたたむ" : "ナビゲーションを展開する");
  } else {
    railCollapsed = !railCollapsed;
    app.classList.toggle("is-rail-collapsed", railCollapsed);
    railToggle.setAttribute("aria-expanded", String(!railCollapsed));
    railToggle.setAttribute("aria-label", railCollapsed ? "ナビゲーションを展開する" : "ナビゲーションを折りたたむ");
  }
  window.requestAnimationFrame(fitStage);
}

prevSlide.addEventListener("click", () => goToSlide(currentSlide - 1));
nextSlide.addEventListener("click", () => goToSlide(currentSlide + 1));
railToggle.addEventListener("click", toggleRail);
layerToggle.addEventListener("click", cycleSlideLayerMode);

window.addEventListener("keydown", (event) => {
  if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement || event.target instanceof HTMLSelectElement) return;
  const keys = {
    ArrowLeft: -1,
    PageUp: -1,
    ArrowRight: 1,
    PageDown: 1,
    " ": 1,
  };
  if (event.key in keys) {
    event.preventDefault();
    goToSlide(currentSlide + keys[event.key]);
  } else if (event.key === "Home") {
    event.preventDefault();
    goToSlide(1);
  } else if (event.key === "End") {
    event.preventDefault();
    goToSlide(TOTAL);
  }
});

window.addEventListener("hashchange", () => {
  const page = slideFromHash();
  if (page !== currentSlide) {
    currentSlide = page;
    renderSlide();
  }
});

window.addEventListener("resize", fitStage);

let touchStartX = 0;
viewer.addEventListener("touchstart", (event) => {
  touchStartX = event.changedTouches[0].clientX;
}, { passive: true });
viewer.addEventListener("touchend", (event) => {
  const distance = event.changedTouches[0].clientX - touchStartX;
  if (Math.abs(distance) > 60) goToSlide(currentSlide + (distance < 0 ? 1 : -1));
}, { passive: true });

buildNavigation();
setSlideLayerMode(slideLayerMode, { syncUrl: false });
currentSlide = slideFromHash();
goToSlide(currentSlide, { replace: !window.location.hash, animate: false });
window.requestAnimationFrame(fitStage);
