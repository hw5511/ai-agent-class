"""
build.py - Lecture viewer builder
Reads JSON files from courses/ and regenerates index.html with embedded COURSES data.
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
HTML_PATH = ROOT / 'index.html'
COURSE_ORDER = ['basic', 'advanced']
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


def inject_into_html(courses_js):
    with open(HTML_PATH, encoding='utf-8') as f:
        html = f.read()
    html_lines = html.split('\n')
    start_line = -1
    end_line = -1
    for i, line in enumerate(html_lines):
        if 'const COURSES = {' in line and start_line == -1:
            start_line = i
        if start_line != -1 and i > start_line and line.rstrip() == '        };':
            end_line = i
            break
    if start_line == -1 or end_line == -1:
        raise RuntimeError('Could not locate COURSES block in index.html')
    print(f'Replacing COURSES block: lines {start_line + 1}--{end_line + 1}')
    new_lines = html_lines[:start_line] + courses_js.split('\n') + html_lines[end_line + 1:]
    return '\n'.join(new_lines)


def git_deploy(message=None):
    """Stage build artifacts and push to main to trigger GitHub Pages deployment."""
    if message is None:
        message = 'build: regenerate index.html from JSON sources'

    def run(cmd):
        result = subprocess.run(cmd, cwd=ROOT, capture_output=True, text=True)
        if result.stdout.strip():
            print(result.stdout.strip())
        if result.returncode != 0:
            print(result.stderr.strip())
            raise RuntimeError(f'git command failed: {" ".join(cmd)}')

    print('Staging changes...')
    run(['git', 'add', 'index.html', 'courses/', 'build.py'])

    status = subprocess.run(['git', 'status', '--porcelain'], cwd=ROOT, capture_output=True, text=True)
    staged = [l for l in status.stdout.splitlines() if l.startswith(('A ', 'M ', 'D '))]
    if not staged:
        print('Nothing to commit — index.html and courses/ are already up to date.')
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

    new_html = inject_into_html(courses_js)
    with open(HTML_PATH, 'w', encoding='utf-8') as f:
        f.write(new_html)
    print(f'Done. Wrote {HTML_PATH}')

    if deploy:
        git_deploy()


if __name__ == '__main__':
    main()