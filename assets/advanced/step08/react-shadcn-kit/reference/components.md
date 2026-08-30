# 컴포넌트 작성 규칙

## 먼저 shadcn 목록에서 고른다

새로 만들기 전에 **이미 있는 것부터 확인한다.** 자주 쓰는 것:

| 필요 | shadcn 컴포넌트 |
|---|---|
| 동작 버튼 | `button` |
| 묶음 · 카드 | `card` |
| 모달 · 확인 | `dialog`, `alert-dialog` |
| 입력 | `input`, `textarea`, `label` |
| 선택 | `select`, `checkbox`, `radio-group`, `switch` |
| 상태 표시 | `badge`, `skeleton` |
| 알림 | `sonner` (toast) |
| 목록 필터 | `command`, `popover` |
| 탭 | `tabs` |
| 표 | `table` |

**직접 만드는 경우:** 위에 없거나, 도메인 전용 조합일 때만. 그때도 `cn()` 과 토큰을 쓴다.

## 파일 배치

```
src/components/
├── ui/            shadcn 원본 (수정 최소화)
└── <feature>/     도메인 컴포넌트 — ui/ 를 조합해서 만든다
```

## 타입

```tsx
type TaskCardProps = {
  task: Task
  onMove: (id: string, to: ColumnId) => void
  onDelete: (id: string) => void
}

export function TaskCard({ task, onMove, onDelete }: TaskCardProps) { … }
```

- `any` 금지. `React.FC` 쓰지 않는다 (children 을 암묵적으로 받는다).
- 도메인 타입은 `src/types.ts` 한 곳에 모은다.
- 리터럴 유니온을 쓴다: `type ColumnId = 'todo' | 'doing' | 'done'`

## 상태

- 기본은 `useState` + 순수 함수 리듀서. 라이브러리를 먼저 꺼내지 않는다.
- 파생 값은 state 로 두지 않고 렌더 중에 계산한다.
- **필터·탭·페이지네이션은 URL 에 반영한다** (`URLSearchParams`). 새로고침·공유가 깨지지 않는다.
- 리스트 `key` 에 배열 인덱스를 쓰지 않는다.

## 폼

- 모든 입력에 `<Label htmlFor>` 를 붙인다. 플레이스홀더는 라벨이 아니다.
- `autocomplete`, 올바른 `type`, `inputmode` 를 지정한다.
- 제출 버튼은 요청이 시작될 때까지 활성 상태로 둔다.
- 오류는 해당 필드 옆에 인라인으로 띄우고, 제출 시 첫 오류로 포커스를 옮긴다.

## 자주 나오는 실수

```tsx
// ✗ div 에 클릭 핸들러
<div onClick={handleDelete}>삭제</div>

// ✓ 버튼 + 확인
<Button variant="destructive" onClick={confirmDelete}>삭제</Button>

// ✗ 아이콘 전용 버튼에 라벨 없음
<Button size="icon"><X /></Button>

// ✓
<Button size="icon" aria-label="카드 닫기"><X aria-hidden="true" /></Button>

// ✗ 빈 배열을 그냥 map
{tasks.map(t => <TaskCard key={t.id} task={t} />)}

// ✓ 빈 상태를 먼저 처리
{tasks.length === 0
  ? <EmptyState onAdd={handleAdd} />
  : tasks.map(t => <TaskCard key={t.id} task={t} … />)}

// ✗ flex 자식이 안 줄어들어 넘침
<div className="flex"><p className="truncate">{longTitle}</p></div>

// ✓
<div className="flex"><p className="min-w-0 truncate">{longTitle}</p></div>
```
