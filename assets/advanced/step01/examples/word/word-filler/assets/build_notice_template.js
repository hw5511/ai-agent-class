const fs = require("fs");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  AlignmentType, BorderStyle, WidthType, ShadingType, VerticalAlign,
  HeightRule, TabStopType, Footer, LevelFormat,
} = require("docx");

const FONT = "Noto Sans KR";
const BLACK = "111111", DARK = "333333", MID = "666666", LIGHT = "999999",
      LINE = "D9D9D9", FILL = "F5F5F5";

// A4, DXA units (1440 = 1 inch)
const PAGE_W = 11906, PAGE_H = 16838, MARGIN = 1134, CONTENT_W = PAGE_W - 2 * MARGIN;

const noBorder = { style: BorderStyle.NONE, size: 0, color: "FFFFFF" };
const noBorders = { top: noBorder, bottom: noBorder, left: noBorder, right: noBorder,
                    insideHorizontal: noBorder, insideVertical: noBorder };
const thin = (color = LINE, size = 4) => ({ style: BorderStyle.SINGLE, size, color });

const run = (text, opts = {}) => new TextRun({ text, font: FONT, ...opts });
const p = (children, opts = {}) => new Paragraph({ children, ...opts });
const spacer = (after = 120) => new Paragraph({ children: [run("")], spacing: { after, line: 240 } });
const cellMargins = { top: 70, bottom: 70, left: 160, right: 160 };

// --- Top label line -------------------------------------------------------
const topLine = new Table({
  width: { size: CONTENT_W, type: WidthType.DXA },
  columnWidths: [CONTENT_W / 2, CONTENT_W / 2],
  borders: { ...noBorders, bottom: thin(BLACK, 12) },
  rows: [new TableRow({ children: [
    new TableCell({
      width: { size: CONTENT_W / 2, type: WidthType.DXA },
      borders: noBorders, margins: { top: 0, bottom: 120, left: 0, right: 0 },
      children: [p([
        run("NOTICE", { bold: true, size: 20, color: BLACK, characterSpacing: 60 }),
        run("   공지사항", { size: 20, color: MID }),
      ])],
    }),
    new TableCell({
      width: { size: CONTENT_W / 2, type: WidthType.DXA },
      borders: noBorders, margins: { top: 0, bottom: 120, left: 0, right: 0 },
      children: [p([run("문서번호  NT-2026-000", { size: 18, color: LIGHT })],
        { alignment: AlignmentType.RIGHT })],
    }),
  ]})],
});

// --- Title ----------------------------------------------------------------
const title = p([run("[공지 제목을 입력하세요]", { bold: true, size: 56, color: BLACK })],
  { spacing: { before: 200, after: 80, line: 300 } });
const subtitle = p([run("공지의 핵심 내용을 한 줄로 요약해 주세요.", { size: 22, color: MID })],
  { spacing: { after: 200 } });

// --- Meta info grid -------------------------------------------------------
const LABEL_W = 1500, VALUE_W = CONTENT_W / 2 - LABEL_W;
const metaCell = (text, isLabel, w) => new TableCell({
  width: { size: w, type: WidthType.DXA },
  margins: cellMargins,
  verticalAlign: VerticalAlign.CENTER,
  shading: isLabel ? { fill: FILL, type: ShadingType.CLEAR, color: "auto" } : undefined,
  borders: { top: thin(), bottom: thin(), left: thin(), right: thin() },
  children: [p([run(text, { size: 19, bold: isLabel, color: isLabel ? DARK : BLACK })])],
});
const metaRow = (l1, v1, l2, v2) => new TableRow({ height: { value: 400, rule: HeightRule.ATLEAST },
  children: [metaCell(l1, true, LABEL_W), metaCell(v1, false, VALUE_W),
             metaCell(l2, true, LABEL_W), metaCell(v2, false, VALUE_W)] });
const metaTable = new Table({
  width: { size: CONTENT_W, type: WidthType.DXA },
  columnWidths: [LABEL_W, VALUE_W, LABEL_W, VALUE_W],
  rows: [
    metaRow("게시일", "2026. 00. 00.", "담당부서", "○○팀"),
    metaRow("게시기간", "2026. 00. 00. ~ 2026. 00. 00.", "문의", "담당자 이름 / 내선 000"),
  ],
});

// --- Section heading ------------------------------------------------------
const section = (num, text) => p([
  run(num, { bold: true, size: 22, color: BLACK }),
  run("   " + text, { bold: true, size: 22, color: BLACK }),
], { spacing: { before: 200, after: 100 }, border: { bottom: thin(BLACK, 6) } });

const body = (text) => p([run(text, { size: 20, color: DARK })],
  { spacing: { after: 40, line: 280 } });

const bullet = (text) => new Paragraph({
  children: [run(text, { size: 20, color: DARK })],
  numbering: { reference: "dash", level: 0 },
  spacing: { after: 20, line: 280 },
});

// --- Detail table ---------------------------------------------------------
const D_LABEL_W = 2000, D_VALUE_W = CONTENT_W - D_LABEL_W;
const detailRow = (label, value) => new TableRow({ height: { value: 420, rule: HeightRule.ATLEAST },
  children: [
    new TableCell({ width: { size: D_LABEL_W, type: WidthType.DXA }, margins: cellMargins,
      verticalAlign: VerticalAlign.CENTER,
      shading: { fill: FILL, type: ShadingType.CLEAR, color: "auto" },
      borders: { top: thin(), bottom: thin(), left: noBorder, right: noBorder },
      children: [p([run(label, { size: 19, bold: true, color: DARK })])] }),
    new TableCell({ width: { size: D_VALUE_W, type: WidthType.DXA }, margins: cellMargins,
      verticalAlign: VerticalAlign.CENTER,
      borders: { top: thin(), bottom: thin(), left: noBorder, right: noBorder },
      children: [p([run(value, { size: 19, color: BLACK })])] }),
  ] });
const detailTable = new Table({
  width: { size: CONTENT_W, type: WidthType.DXA },
  columnWidths: [D_LABEL_W, D_VALUE_W],
  borders: { ...noBorders, top: thin(BLACK, 8), bottom: thin(BLACK, 8) },
  rows: [
    detailRow("일시", "2026. 00. 00. (요일)  00:00 ~ 00:00"),
    detailRow("장소", "장소를 입력하세요"),
    detailRow("대상", "전 임직원"),
    detailRow("준비사항", "준비물 또는 사전 조치 사항을 입력하세요"),
  ],
});

// --- Image placeholder ----------------------------------------------------
const dashed = { style: BorderStyle.DASHED, size: 8, color: "BBBBBB" };
const imageBox = new Table({
  width: { size: CONTENT_W, type: WidthType.DXA },
  columnWidths: [CONTENT_W],
  rows: [new TableRow({ height: { value: 2300, rule: HeightRule.EXACT }, children: [
    new TableCell({
      width: { size: CONTENT_W, type: WidthType.DXA },
      verticalAlign: VerticalAlign.CENTER,
      shading: { fill: "FAFAFA", type: ShadingType.CLEAR, color: "auto" },
      borders: { top: dashed, bottom: dashed, left: dashed, right: dashed },
      children: [
        p([run("IMAGE", { bold: true, size: 24, color: LIGHT, characterSpacing: 80 })],
          { alignment: AlignmentType.CENTER, spacing: { after: 80 } }),
        p([run("이미지 영역  ·  17 × 4 cm (약 4:1, 예: 2000 × 480 px)", { size: 18, color: LIGHT })],
          { alignment: AlignmentType.CENTER, spacing: { after: 40 } }),
        p([run("Unsplash · Pexels · Pixabay 등 무료 스톡 이미지를 이 박스에 삽입하세요", { size: 16, color: "AAAAAA" })],
          { alignment: AlignmentType.CENTER }),
      ],
    }),
  ]})],
});

// --- Sign-off -------------------------------------------------------------
const signDate = p([run("2026. 00. 00.", { size: 20, color: DARK })],
  { alignment: AlignmentType.CENTER, spacing: { before: 160, after: 40 } });
const signName = p([run("○○○○ 주식회사  ", { bold: true, size: 26, color: BLACK }),
                    run("○○팀", { size: 22, color: MID })],
  { alignment: AlignmentType.CENTER, spacing: { after: 0 } });

const pageFooter = new Footer({ children: [
  new Paragraph({
    border: { top: thin(LINE, 4) },
    spacing: { before: 120 },
    tabStops: [{ type: TabStopType.RIGHT, position: CONTENT_W }],
    children: [
      run("본 공지는 사내 게시용이며 외부 반출을 금합니다.", { size: 15, color: LIGHT }),
      run("\t", { size: 15 }),
      run("○○○○ 주식회사", { size: 15, color: LIGHT }),
    ],
  }),
]});

const doc = new Document({
  creator: "Notice Template",
  styles: { default: { document: { run: { font: FONT, size: 20, color: BLACK } } } },
  numbering: { config: [{
    reference: "dash",
    levels: [{ level: 0, format: LevelFormat.BULLET, text: "–", alignment: AlignmentType.LEFT,
      style: { paragraph: { indent: { left: 360, hanging: 240 } }, run: { font: FONT, color: MID } } }],
  }]},
  sections: [{
    properties: { page: { size: { width: PAGE_W, height: PAGE_H },
      margin: { top: 900, bottom: 850, left: MARGIN, right: MARGIN, footer: 500 } } },
    footers: { default: pageFooter },
    children: [
      topLine,
      title, subtitle,
      metaTable,
      section("01", "개요"),
      body("공지의 배경과 목적을 2~3문장으로 작성하세요. 임직원이 이 공지를 통해 무엇을 알아야 하고, 어떤 행동을 해야 하는지 명확히 전달합니다."),
      section("02", "주요 내용"),
      detailTable,
      section("03", "유의사항"),
      bullet("첫 번째 유의사항을 입력하세요."),
      bullet("두 번째 유의사항을 입력하세요."),
      bullet("세 번째 유의사항을 입력하세요."),
      spacer(120),
      imageBox,
      signDate, signName,
    ],
  }],
});

Packer.toBuffer(doc).then(buf => { fs.writeFileSync("공지사항_템플릿.docx", buf); console.log("written"); });
