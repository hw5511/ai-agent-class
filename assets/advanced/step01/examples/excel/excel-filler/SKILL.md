---
name: excel-filler
description: Generate a Korean sales report workbook (매출 보고서, 매출 데이터, 월별 매출 요약) by organizing the user's sales figures into a JSON file and injecting them into the bundled Excel template with a CLI script. Use this whenever the user asks for a 매출보고서, 매출 엑셀, 매출 정리, 월별 매출 요약, or wants sales/transaction data (거래처, 제품, 수량, 단가, 할인율) put into the company sales template, even if they just paste raw numbers or a CSV and say "엑셀로 만들어줘". Do not use for spreadsheets unrelated to the sales template; use the xlsx skill for those.
---

# Excel Filler: sales report from template

The company sales template lives in `assets/매출데이터_템플릿.xlsx`. It has formulas,
colored input cells, a category dropdown, and a monthly summary sheet. Never rebuild it
from scratch and never write into its formula cells. Instead: collect the data, write it
as JSON, and run the bundled script, which copies the template and fills only the input
cells. This keeps every report identical in layout and keeps the formulas alive.

## Workflow

1. **Gather the data** from whatever the user gives you (chat message, CSV, another
   spreadsheet, a pasted table). Map it onto the JSON layout below. Ask only when a
   required field is genuinely missing and cannot be inferred; otherwise make the
   sensible call and mention it in your reply.
2. **Write the JSON** to the working folder (for example `매출데이터_2025Q1.json`).
   Copy the shape of `references/example_data.json`.
3. **Run the script** from the skill folder:

   ```bash
   python <skill-dir>/scripts/fill_template.py --data DATA.json --output 매출보고서_YYYYMM.xlsx
   ```

   It exits non-zero with a clear message if the data does not fit the template.
   Fix the JSON and rerun rather than editing the xlsx by hand.
4. **Verify** with `python <skill-dir>/scripts/verify_output.py OUTPUT.xlsx`. It prints the
   header, row count, expected totals, and the monthly table. Compare the totals with
   the user's source numbers before delivering.
5. **Report** to the user: the output path, how many rows were written, the expected
   totals, and any assumptions you made (missing discounts treated as 0, category
   mapping, computed monthly actuals).

## JSON layout

```json
{
  "header":  {"작성일": "2025-04-01", "담당자": "김영업", "부서": "영업1팀", "기간": "2025년 1분기"},
  "sales":   [{"날짜": "2025-01-06", "거래처명": "한빛마트", "제품명": "유기농 현미 10kg",
               "카테고리": "식품", "수량": 40, "단가": 38000, "할인율": 0.05, "비고": "정기 납품"}],
  "monthly": [{"월": "1월", "목표_매출": 10000000, "비고": "신년 프로모션"}]
}
```

Rules the template imposes, and why:

- **Dates are `YYYY-MM-DD` strings.** The script converts them to real Excel dates so
  sorting and filtering work.
- **카테고리 must be one of** 식품, 의류, 전자기기, 화장품, 생활용품, 서비스, 기타.
  The template has a dropdown with exactly these values; anything else shows as a
  validation error in Excel. Map the user's wording onto the closest one and say so.
- **할인율 is a fraction** (10% is `0.1`). The template's column is formatted as a
  percentage, so `10` would render as 1000%. Omit it or use `0` when there is no discount.
- **수량 and 단가 are plain numbers**, no commas or currency symbols. The template
  multiplies them itself in the 매출액 and 할인 후 매출 columns.
- **At most 30 sales rows.** The template's total row sums a fixed range. If the user
  has more, produce one workbook per period (month or quarter) and tell them why.
- **monthly.실제_매출 is optional.** When absent, the script sums that month's
  할인 후 매출 from the sales rows, so the summary sheet stays consistent with the
  detail sheet. Only set it explicitly when the user gives a different official figure.
- **Missing optional fields are fine.** 비고, 할인율, header items, and unused months can
  be left out.

## Delivering the file

The script writes formulas without cached values. Excel recalculates on open, so the
user sees correct totals. Tools that read cached values (pandas, previewers) show the
formula cells as empty until the file has been opened and saved in Excel or recalculated
with LibreOffice. If LibreOffice is available, run the xlsx skill's `recalc.py` on the
output; if not, mention this once in your reply and move on.

Do not add sheets, restyle cells, or hardcode totals into the output. If the user asks
for a chart or extra analysis, deliver the filled template first, then build the extra
in a separate file or sheet so the template stays a faithful copy.
