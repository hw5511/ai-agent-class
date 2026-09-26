---
name: word-filler
description: Generate a Korean business report (워드 보고서, 보고서 docx, 기획 보고서, 추진 계획 보고서, 현황 보고서) or a company notice (공지사항, 사내 공지, 게시판 공지, 안내문, 공지 만들어줘, 공지사항 양식으로) as a Word document by organizing the user's content into a JSON file and injecting it into the bundled company template with a CLI script. Use this whenever the user asks for a 보고서를 워드로, 워드 보고서 만들어줘, docx 보고서, 보고서 템플릿에 넣어줘, wants report content (배경, 현황, 문제점, 추진 계획, 일정, 예산, 기대 효과, 결론, 건의) turned into the company report format, or asks for a 공지사항 / 사내 공지 / 안내 공지 (workshop, holiday, system maintenance, policy change, event) to post on the company board, even if they just paste notes, bullet points, or a date and place and say "공지로 만들어줘" or "보고서로 정리해줘". Do not use for Word documents unrelated to these two templates (letters, contracts, free-form docs); use the docx skill for those. Do not use for 한글 hwpx files.
---

Two templates are bundled. Pick by what the user wants:

| User wants | Template | Script | Section |
|---|---|---|---|
| 보고서 (report with chapters, tables, approval) | `assets/보고서_템플릿.docx` | `scripts/fill_template.py` | Report mode, below |
| 공지사항 (one-page notice for the company board) | `assets/공지사항_템플릿.docx` | `scripts/fill_notice.py` | Notice mode, end of file |

# Report mode

# Word Filler: business report from the company template

The company report template lives in `assets/보고서_템플릿.docx`. It has a cover page with
a metadata table, an auto table of contents, five numbered chapters, two styled data
tables, a highlighted strategy box, an approval (결재) table and an appendix. Never rebuild
it with docx-js and never edit the XML by hand. Instead: collect the content, write it as
JSON, and run the bundled script, which copies the template and fills only the
placeholders. Every report then shares the same layout, fonts, colors and page setup.

## Workflow

1. **Gather the content** from whatever the user gives you (chat message, meeting notes,
   a spreadsheet, a previous report). Map it onto the JSON layout below. The template
   is a 기획/추진 보고서, so if the user's material lacks a section, write a short
   sensible paragraph from context or leave the field empty; ask only when the missing
   piece is essential (title, company, the core conclusion).
2. **Write the JSON** to the working folder (for example `보고서_2026Q4.json`). Copy the
   shape of `references/example_data.json`; it is a complete, realistic example.
3. **Run the script** (any working directory; paths are resolved as given, and the
   template is found relative to the script). Needs only Python 3.8+ standard library.

   ```bash
   python <skill-dir>/scripts/fill_template.py --data DATA.json --output 보고서_YYYYMMDD.docx
   ```

   It exits non-zero with a message naming the bad field when the JSON does not fit.
   Fix the JSON and rerun rather than patching the docx.
4. **Verify** with `python <skill-dir>/scripts/verify_output.py OUTPUT.docx`. It prints the
   heading outline, every table row and bullet, and fails if any `[placeholder]` from the
   template survived. Compare the numbers and names against the user's source.
5. **Report** to the user: the output path, the section and row counts the script
   printed, and any assumptions you made (dates you filled in, wording you wrote for
   sections the user did not supply, how you split long content).

## JSON layout

Seven top-level sections, matching the template's chapters:

```json
{
  "cover":      {"title": "...", "subtitle": "...", "report_no": "RPT-2026-017",
                 "date": "2026년 09월 26일", "author": "양희우 / 기획팀",
                 "recipient": "김부장 / 경영기획실", "grade": "대외비",
                 "company": "우희인더스트리", "department": "기획팀"},
  "overview":   {"background": "...", "scope_desc": "...", "scope_items": ["...", "..."]},
  "analysis":   {"current_desc": "...", "table_caption": "현황 데이터 요약",
                 "table_rows": [{"item": "결제 전환율", "current": "1.9%", "target": "3.0%", "rate": "63%"}],
                 "problem_desc": "...", "problems": [{"problem": "...", "cause": "..."}]},
  "plan":       {"strategy_desc": "...", "callout_title": "핵심 추진 전략", "callout_body": "...",
                 "schedule_caption": "추진 일정표",
                 "schedule": [{"stage": "1단계", "activity": "...", "period": "10월~11월", "owner": "IT팀 박선임"}],
                 "budget_desc": "..."},
  "effects":    {"intro": "...", "quantitative": ["매출 증가: ...", "비용 절감: ..."], "qualitative": "..."},
  "conclusion": {"summary": "...", "recommend_desc": "...", "recommendations": ["...", "..."],
                 "approval": {"작성자": {"name": "양희우", "position": "기획팀 대리", "sign": "", "date": "2026-09-26"},
                              "검토자": {"name": "김부장", "position": "경영기획실 부장", "sign": "", "date": ""},
                              "승인자": {"name": "박대표", "position": "대표이사", "sign": "", "date": ""}}},
  "appendix":   {"desc": "...", "items": ["...", "..."]}
}
```

Rules the template imposes, and why:

- **Required: `cover.title`, `cover.company`, `overview.background`, `conclusion.summary`.**
  Everything else defaults to an empty string or empty list. An empty list simply
  produces no bullets or rows in that spot, so the chapter stays but reads short.
- **Lists and table rows can be any length.** The script clones the template's bullet
  paragraph or table row once per item, so 2 rows or 9 rows both keep the styling.
  Keep table cells short (a few words or a number) because the columns are fixed width.
- **`analysis.table_rows` has exactly four columns**: item, current, target, rate. Pass
  values as display strings with units (`"182,000명"`, `"63%"`); the script does no
  arithmetic. If the user's data has more columns, pick the four that fit or summarize
  and mention it.
- **`plan.schedule` needs activity, period, owner**; `stage` is optional and defaults to
  `1단계`, `2단계`, ... in order.
- **`analysis.problems` items are `{"problem", "cause"}`** and render as `문제점: 원인`. A
  plain string is also accepted when there is no separate cause.
- **`effects.quantitative` are full sentences** in the "효과 항목: 수치" style shown in the
  example, since the template's bullets have no sub-structure.
- **`rate` (달성률) is current divided by target** for higher-is-better metrics. For
  lower-is-better metrics (processing time, error rate, headcount) use target divided by
  current so the number still reads as "how close to goal", and say which formula you
  used in your reply. If the user gives their own 달성률, use it as-is.
- **Approval table**: the roles are fixed to 작성자, 검토자, 승인자 and the rows to
  name, position, sign, date. Leave `sign` empty; it is a handwritten signature box.
  Unknown reviewers can be omitted and the cell stays blank. The `cover.author` is
  normally the 작성자 and the `cover.recipient` the 승인자, unless the user names a
  separate reviewer or approver.
- **Do not invent identifiers.** Leave `report_no` empty unless the user gives one or
  a numbering pattern is visible in their other reports. Fill `date` with today's date
  in `YYYY년 MM월 DD일` form when not specified.
- **Empty chapters still print their heading.** If the user gave no appendix material,
  list the sources you did use (their message, attached files) as `appendix.items`
  rather than leaving 붙임 empty, and mention any chapter you had to write yourself.
- **Text only.** Newlines inside a string are not rendered as line breaks. Split long
  content across the list fields instead of stuffing paragraphs with `\n`.

## Delivering the file

The table of contents is a Word field. The script sets the document to refresh fields
on open, so Word shows a "이 문서에는 다른 파일을 참조하는 필드가 있을 수 있습니다" prompt;
tell the user to click 예 (Yes) once and the TOC fills in with page numbers. Viewers that
do not run fields (previews, pandoc) show the TOC area empty; that is expected.

Do not add chapters, restyle runs, or change page setup in the output. If the user needs
a section the template lacks (for example a risk table), deliver the filled template
first, then either put the extra content in the appendix list or build the extra in a
separate document with the docx skill so the template stays a faithful copy.

# Notice mode: one-page 공지사항 from the company template

`assets/공지사항_템플릿.docx` is a single A4 page in Noto Sans KR, black and white:
a NOTICE label line with a document number, a large title and one-line summary, a
2 x 4 meta grid (게시일 / 담당부서 / 게시기간 / 문의), three numbered sections
(01 개요 paragraph, 02 주요 내용 label-value table, 03 유의사항 dash bullets), a
17 x 4 cm image box, a centered date + company sign-off and a footer note. Never
rebuild it with docx-js and never hand-edit the XML; the generator script that
produced it is kept in `assets/build_notice_template.js` only for template redesigns.

## Workflow

1. **Gather the content.** A notice needs: title, what/why (개요), the facts (일시,
   장소, 대상, 준비사항 or any other label-value pairs), cautions (유의사항), the
   posting department and contact, and the company name. Write short, polite 사내
   공지 wording from whatever the user gives; ask only if the title, the core fact
   (date or action required) or the company is missing.
2. **Write the JSON** (for example `공지_워크숍.json`), copying the shape of
   `references/notice_example.json`.
3. **Run the script** (Python 3.8+ standard library; any working directory):

   ```bash
   python <skill-dir>/scripts/fill_notice.py --data DATA.json --output 공지사항_YYYYMMDD.docx --preview
   ```

   `--preview` renders through Word (needs `docx2pdf` and `pymupdf`; silently skipped
   otherwise), prints the page count, and writes `<output>_preview.png`. Read the PNG
   and check it. The layout is designed for **one page**; if the script warns that it
   spilled to page 2, shorten `overview` (max ~3 lines), `details` (max 5 rows) or
   `notes` (max 4 bullets) and rerun.
4. **Verify** with `python <skill-dir>/scripts/verify_output.py OUTPUT.docx`. It prints
   the footer, image count, every table row and bullet, and fails if template sample
   text (`[...]`, `입력하세요`, `○○`) survived.
5. **Report** the output path, the page count, whether an image was placed, and any
   wording you wrote yourself.

## JSON layout

```json
{
  "title": "2026년 4분기 전사 워크숍 안내",
  "summary": "한 줄 요약 (선택)",
  "doc_no": "NT-2026-014",
  "post_date": "2026. 09. 26.",
  "department": "경영지원팀",
  "period": "2026. 09. 26. ~ 2026. 10. 17.",
  "contact": "양희우 / 내선 204",
  "overview": "개요 문단 (필수)",
  "details": [{"label": "일시", "value": "2026. 10. 17. (금)  09:30 ~ 17:00"},
              {"label": "장소", "value": "본사 3층 대회의실"}],
  "notes": ["유의사항 1", "유의사항 2"],
  "image": "photo.jpg",
  "sign_date": "2026. 09. 26.",
  "company": "우희인더스트리 주식회사",
  "sign_department": "경영지원팀",
  "footer_note": "본 공지는 사내 게시용이며 외부 반출을 금합니다."
}
```

Rules the template imposes:

- **Required: `title`, `overview`, `company`.** Everything else defaults to empty.
  `sign_date` defaults to `post_date`; `sign_department` defaults to `department`.
- **Dates use the `2026. 09. 26.` style** (dot separated, trailing dot) to match the
  template; use today's date for `post_date` when the user gives none.
- **`doc_no`: leave empty unless the user gives one** or a numbering pattern is visible
  in their other notices; the "문서번호" label disappears when it is empty.
- **`details` rows are any label-value pairs**, any count. The four labels in the
  example (일시, 장소, 대상, 준비사항) are the usual set; drop or rename freely
  (예: 대상 → 적용 범위, 준비사항 → 조치 사항). Empty list removes the 02 section
  entirely, and empty `notes` removes the 03 section.
- **Section headings** can be renamed with `overview_title`, `details_title`,
  `notes_title` (defaults 개요 / 주요 내용 / 유의사항); the 01/02/03 numbers stay.
- **`image`: optional path** (absolute, or relative to the JSON file) to a `.png`/`.jpg`.
  The script center-crops it to the 17 x 4 cm box (about 4:1), so wide banner photos
  work best; portrait photos lose most of their height. When the user has no image,
  leave it empty: the dashed placeholder box with the "free stock image" hint stays so
  they can paste one in Word. To source a free image, suggest Unsplash, Pexels or
  Pixabay with a wide landscape search term matching the notice (사무실, 워크숍,
  팀, 미니멀 등) and prefer calm, low-contrast photos so the black-and-white layout
  stays clean.
- **Text only, no newlines inside strings.** Use the `notes` list for multiple points.
- **Tone**: 사내 공지 formal polite (…합니다 / …해 주세요 / …부탁드립니다), no emoji.
