"""
build.py - Lecture viewer builder
Assembles viewer.template.html + courses/*.json into index.html (build artifact).

The 뷰어 셸(CSS+JS)은 viewer.template.html 에 보관되고, courses/*.json 데이터는
빌드 시 마커(//__COURSES__) 자리에 const COURSES = {…} 로 주입된다.
index.html 은 순수 산출물이므로 git 에서 추적하지 않는다(.gitignore). CI 가 재생성한다.

Usage: python build.py
       python build.py --dry-run
"""
import json
import os
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).parent
COURSES_DIR = ROOT / 'courses'
TEMPLATE_PATH = ROOT / 'viewer.template.html'
HTML_PATH = ROOT / 'index.html'
COURSES_MARKER = '        //__COURSES__'
COURSE_ORDER = ['basic', 'advanced', 'automation']
INDENT = '        '  # 8 spaces


def js_string(s):
    return s.replace('\\', '\\\\').replace('"', '\\"').replace('\n', '\\n').replace('\r', '\\r')


def js_value(val, depth=0):
    pad = '    ' * depth
    inner_pad = '    ' * (depth + 1)
    if val is None:
        return 'null'
    if isinstance(val, bool):
        return 'true' if val else 'false'
    if isinstance(val, (int, float)):
        return str(val)
    if isinstance(val, str):
        return f'"{js_string(val)}"'
    if isinstance(val, list):
        if not val:
            return '[]'
        items = [f'{inner_pad}{js_value(item, depth + 1)}' for item in val]
        return '[\n' + ',\n'.join(items) + f'\n{pad}]'
    if isinstance(val, dict):
        if not val:
            return '{}'
        lines = []
        for k, v in val.items():
            lines.append(f'{inner_pad}{k}: {js_value(v, depth + 1)}')
        return '{\n' + ',\n'.join(lines) + f'\n{pad}}}'
    raise TypeError(f'Unsupported type: {type(val)}')


def build_session_js(session_data, course_key, depth=3):
    pad = '    ' * depth
    inner = '    ' * (depth + 1)

    slides_filenames = []
    slide_descs = []
    for slide in session_data.get('slides', []):
        image_path = slide.get('imagePath', '')
        filename = os.path.basename(image_path)
        slides_filenames.append(filename)
        desc = {}
        if slide.get('goal') is not None:
            desc['goal'] = slide['goal']
        if slide.get('topics') is not None:
            desc['topics'] = slide['topics']
        if slide.get('practice') is not None:
            desc['practice'] = slide['practice']
        if slide.get('action') is not None:
            desc['action'] = slide['action']
        slide_descs.append(desc)

    fields = []
    fields.append(f'{inner}num: {session_data["step"]}')
    fields.append(f'{inner}title: {js_value(session_data["title"])}')
    fields.append(f'{inner}hours: {js_value(session_data["hours"])}')
    fields.append(f'{inner}goal: {js_value(session_data.get("goal", ""))}')

    topics = session_data.get('topics', [])
    topics_items = [f'{inner}    {js_value(t)}' for t in topics]
    topics_js = '[\n' + ',\n'.join(topics_items) + f'\n{inner}]' if topics_items else '[]'
    fields.append(f'{inner}topics: {topics_js}')

    fields.append(f'{inner}practice: {js_value(session_data.get("practice", ""))}')

    slides_fn_items = [f'{inner}    {js_value(fn)}' for fn in slides_filenames]
    slides_fn_js = '[\n' + ',\n'.join(slides_fn_items) + f'\n{inner}]' if slides_fn_items else '[]'
    fields.append(f'{inner}slides: {slides_fn_js}')

    desc_items = []
    for desc in slide_descs:
        if not desc:
            desc_items.append(f'{inner}    {{}}')
        else:
            desc_fields = []
            if 'goal' in desc:
                desc_fields.append(f'{inner}        goal: {js_value(desc["goal"])}')
            if 'topics' in desc:
                t_items = [f'{inner}            {js_value(t)}' for t in desc['topics']]
                t_js = '[\n' + ',\n'.join(t_items) + f'\n{inner}        ]' if t_items else '[]'
                desc_fields.append(f'{inner}        topics: {t_js}')
            if 'practice' in desc:
                desc_fields.append(f'{inner}        practice: {js_value(desc["practice"])}')
            if 'action' in desc:
                action = desc['action']
                desc_fields.append(f'{inner}        action: {js_value(action, depth + 3)}')
            desc_items.append(f'{inner}    {{\n' + ',\n'.join(desc_fields) + f'\n{inner}    }}')

    descs_js = '[\n' + ',\n'.join(desc_items) + f'\n{inner}]' if desc_items else '[]'
    fields.append(f'{inner}slideDescs: {descs_js}')

    return f'{pad}{{\n' + ',\n'.join(fields) + f'\n{pad}}}'


def load_course(course_key):
    course_dir = COURSES_DIR / course_key
    with open(course_dir / '_meta.json', encoding='utf-8') as f:
        meta = json.load(f)
    step_files = sorted(course_dir.glob('step*.json'))
    sessions = []
    for step_file in step_files:
        with open(step_file, encoding='utf-8') as f:
            sessions.append(json.load(f))
    return meta, sessions


def build_courses_js():
    lines = [f'{INDENT}const COURSES = {{']
    course_entries = []
    for course_key in COURSE_ORDER:
        meta, sessions = load_course(course_key)
        session_js_list = [build_session_js(s, course_key) for s in sessions]
        sessions_js = ',\n'.join(session_js_list)
        course_lines = [
            f'{INDENT}    {course_key}: {{',
            f'{INDENT}        label: {js_value(meta["label"])},',
            f'{INDENT}        badgeClass: {js_value(meta["badgeClass"])},',
            f'{INDENT}        badgeText: {js_value(meta["badgeText"])},',
            f'{INDENT}        title: {js_value(meta["title"])},',
            f'{INDENT}        sessions: [',
            sessions_js,
            f'{INDENT}        ]',
            f'{INDENT}    }}',
        ]
        course_entries.append('\n'.join(course_lines))
    lines.append(',\n'.join(course_entries))
    lines.append(f'{INDENT}}};')
    return '\n'.join(lines)


def render_from_template(courses_js):
    """viewer.template.html 의 //__COURSES__ 마커를 생성된 COURSES JS 로 치환한다."""
    if not TEMPLATE_PATH.exists():
        raise RuntimeError(f'Template not found: {TEMPLATE_PATH}')
    with open(TEMPLATE_PATH, encoding='utf-8') as f:
        template_lines = f.read().split('\n')
    marker_idx = [i for i, l in enumerate(template_lines) if l == COURSES_MARKER]
    if len(marker_idx) != 1:
        raise RuntimeError(
            f'Expected exactly one COURSES marker ({COURSES_MARKER!r}) in template, '
            f'found {len(marker_idx)}'
        )
    i = marker_idx[0]
    print(f'Injecting COURSES at template line {i + 1}')
    new_lines = template_lines[:i] + courses_js.split('\n') + template_lines[i + 1:]
    return '\n'.join(new_lines)


def git_deploy(message=None):
    """Stage sources and push to main to trigger GitHub Pages deployment.

    index.html 은 git 추적 대상이 아니므로(.gitignore) 스테이징하지 않는다.
    배포는 CI 가 viewer.template.html + courses/ 로 index.html 을 재생성한다.
    """
    if message is None:
        message = 'build: update lecture viewer sources'

    def run(cmd):
        result = subprocess.run(cmd, cwd=ROOT, capture_output=True, text=True)
        if result.stdout.strip():
            print(result.stdout.strip())
        if result.returncode != 0:
            print(result.stderr.strip())
            raise RuntimeError(f'git command failed: {" ".join(cmd)}')

    print('Staging changes...')
    run(['git', 'add', 'viewer.template.html', 'courses/', 'build.py'])

    status = subprocess.run(['git', 'status', '--porcelain'], cwd=ROOT, capture_output=True, text=True)
    staged = [l for l in status.stdout.splitlines() if l.startswith(('A ', 'M ', 'D '))]
    if not staged:
        print('Nothing to commit — sources are already up to date.')
        return

    run(['git', 'commit', '-m', message])
    print('Pushing to main...')
    run(['git', 'push', 'origin', 'main'])
    print('Push complete. GitHub Actions will deploy to GitHub Pages.')


def main():
    dry_run = '--dry-run' in sys.argv
    deploy = '--deploy' in sys.argv

    print('Building COURSES JS from JSON files...')
    courses_js = build_courses_js()

    if dry_run:
        print('\n--- COURSES JS (dry run, first 3000 chars) ---')
        print(courses_js[:3000])
        if len(courses_js) > 3000:
            print(f'... ({len(courses_js)} chars total)')
        print('--- end ---')
        return

    new_html = render_from_template(courses_js)
    with open(HTML_PATH, 'w', encoding='utf-8') as f:
        f.write(new_html)
    print(f'Done. Wrote {HTML_PATH}')

    if deploy:
        git_deploy()


if __name__ == '__main__':
    main()