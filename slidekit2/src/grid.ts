// Slide grid helpers — derived from templates/layouts/layouts.json `grid` (12 columns, 40px gutter,
// column width 103.33px, content starts at x=120). Read-only re-export of the plan's fixed-frame numbers
// (claudemd_slide_plan.md "Fixed frame"), not a copy of layouts.json itself.
//
// colX(startCol)  -> left px of a column index (0-based) inside the content area (x=120..1800)
// colW(nCols)     -> width px spanning nCols columns including the inner gutters
//
// Body area for every SlideDeck slide: x 120..1800 (12 cols), y ~250..1000 (annotation/screen content).

export const CONTENT_X = 120;
export const CONTENT_RIGHT = 1800;
export const CONTENT_W = CONTENT_RIGHT - CONTENT_X; // 1680
export const COL_W = 103.33;
export const GUTTER = 40;
export const COL_STEP = COL_W + GUTTER; // 143.33

export const BODY_Y = 250;
export const BODY_BOTTOM = 1000;
export const BODY_H = BODY_BOTTOM - BODY_Y; // 750

// Left px of column `startCol` (0-based) inside the content area.
export const colX = (startCol: number): number => CONTENT_X + startCol * COL_STEP;

// Width in px spanning `nCols` columns (including inner gutters, not the trailing one).
export const colW = (nCols: number): number => nCols * COL_W + Math.max(0, nCols - 1) * GUTTER;
