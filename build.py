#!/usr/bin/env python
"""
AI Agent Lecture - Build Script

Usage:
    python build.py                 # Assemble sections
    python build.py --standalone    # Assemble + inline CSS/images (for PDF export)

This script assembles all enabled sections from manifest.json into a single HTML file.
"""

import argparse
import base64
import json
import re
import sys
from pathlib import Path


PROJECT_DIR = Path(__file__).parent


def get_mime_type(file_path: Path) -> str:
    mime_types = {
        '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
        '.webp': 'image/webp', '.gif': 'image/gif', '.svg': 'image/svg+xml',
        '.mp4': 'video/mp4', '.woff': 'font/woff', '.woff2': 'font/woff2',
        '.ttf': 'font/ttf', '.otf': 'font/otf',
    }
    return mime_types.get(file_path.suffix.lower(), 'application/octet-stream')


def encode_to_base64(file_path: Path) -> str:
    with open(file_path, 'rb') as f:
        data = base64.b64encode(f.read()).decode('utf-8')
    return f'data:{get_mime_type(file_path)};base64,{data}'


def load_manifest() -> dict:
    manifest_path = PROJECT_DIR / "manifest.json"
    with open(manifest_path, 'r', encoding='utf-8') as f:
        return json.load(f)


def build_html_head(manifest: dict) -> str:
    project = manifest['project']
    return f'''<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{project['title']}</title>
    <link rel="stylesheet" href="../css/style_portrait.css">
</head>
<body>
    <div class="presentation-container">
'''


def build_html_footer() -> str:
    return '''    </div>
    <script>
    document.addEventListener('DOMContentLoaded', () => {
        // Auto-apply reveal classes
        document.querySelectorAll('.section-header').forEach(el => el.classList.add('reveal'));
        document.querySelectorAll('.content-area').forEach(el => el.classList.add('reveal'));
        document.querySelectorAll('.curriculum-grid, .curriculum-intro-grid, .roadmap-row, .compare-grid, .image-row-3, .image-row-2').forEach(el => {
            el.classList.add('reveal-children');
        });

        // IntersectionObserver for scroll reveal
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

        document.querySelectorAll('.reveal, .reveal-children').forEach(el => observer.observe(el));

        // Video modal player
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

        // Add play overlay to each video-showcase
        document.querySelectorAll('.video-showcase').forEach(wrap => {
            const overlay = document.createElement('div');
            overlay.className = 'play-overlay';
            overlay.innerHTML = '<svg width="28" height="28" viewBox="0 0 24 24" fill="#fff"><polygon points="5,3 19,12 5,21"/></svg>';
            wrap.appendChild(overlay);
        });

        // Create modal backdrop (once)
        const backdrop = document.createElement('div');
        backdrop.className = 'video-modal-backdrop';
        backdrop.style.pointerEvents = 'none';
        document.body.appendChild(backdrop);

        function openVideoModal(src, poster) {
            if (isMobile) {
                // Mobile: create temp video and request fullscreen
                const tmp = document.createElement('video');
                tmp.src = src;
                tmp.poster = poster;
                tmp.controls = true;
                tmp.autoplay = true;
                tmp.playsInline = false;
                tmp.style.display = 'none';
                document.body.appendChild(tmp);
                tmp.play().then(() => {
                    if (tmp.requestFullscreen) tmp.requestFullscreen();
                    else if (tmp.webkitEnterFullscreen) tmp.webkitEnterFullscreen();
                }).catch(() => {});
                tmp.addEventListener('fullscreenchange', () => {
                    if (!document.fullscreenElement) { tmp.pause(); tmp.remove(); }
                });
                tmp.addEventListener('webkitendfullscreen', () => { tmp.pause(); tmp.remove(); });
                tmp.addEventListener('ended', () => { tmp.remove(); });
                return;
            }
            // Desktop: modal popup
            backdrop.innerHTML = '<button class="video-modal-close">&times;</button>';
            const mv = document.createElement('video');
            mv.src = src;
            mv.poster = poster;
            mv.controls = true;
            mv.autoplay = true;
            mv.loop = true;
            mv.style.borderRadius = '12px';
            backdrop.appendChild(mv);
            backdrop.classList.add('active');
            backdrop.style.pointerEvents = 'auto';
            mv.play().catch(() => {});
            function closeModal() {
                mv.pause();
                backdrop.classList.remove('active');
                setTimeout(() => { backdrop.innerHTML = ''; backdrop.style.pointerEvents = 'none'; }, 300);
            }
            backdrop.querySelector('.video-modal-close').addEventListener('click', (e) => { e.stopPropagation(); closeModal(); });
            backdrop.addEventListener('click', (e) => { if (e.target === backdrop) closeModal(); });
            document.addEventListener('keydown', function esc(e) { if (e.key === 'Escape') { closeModal(); document.removeEventListener('keydown', esc); } });
        }

        document.querySelectorAll('.video-showcase').forEach(wrap => {
            wrap.addEventListener('click', () => {
                const v = wrap.querySelector('video');
                if (!v) return;
                const src = v.querySelector('source')?.src || v.src;
                const poster = v.poster || '';
                openVideoModal(src, poster);
            });
        });
    });
    </script>
</body>
</html>'''


def assemble(manifest: dict) -> str:
    active = [s for s in manifest['sections'] if s.get('enabled', True)]
    sorted_sections = sorted(active, key=lambda x: x['order'])

    parts = [build_html_head(manifest)]

    for section in sorted_sections:
        section_file = PROJECT_DIR / section['file']
        if section_file.exists():
            parts.append(section_file.read_text(encoding='utf-8'))
        else:
            print(f"  Warning: Section file not found: {section['file']}")

    parts.append(build_html_footer())
    return '\n'.join(parts)


def build(standalone: bool = False):
    manifest = load_manifest()
    print(f"Building: {manifest['project']['title']}")
    print("-" * 50)

    html_content = assemble(manifest)

    build_dir = PROJECT_DIR / "_build"
    build_dir.mkdir(exist_ok=True)

    output_filename = manifest['build_config']['output_filename']
    output_path = build_dir / output_filename

    active_count = len([s for s in manifest['sections'] if s.get('enabled', True)])
    output_path.write_text(html_content, encoding='utf-8')
    print(f"  Assembled: {output_filename} ({active_count} sections)")

    if standalone:
        # Read and inline CSS
        css_file = PROJECT_DIR / "css" / "style_portrait.css"
        if css_file.exists():
            css_content = css_file.read_text(encoding='utf-8')

            # Resolve local @import '../components/xxx.css'
            import_pattern = re.compile(r"@import\s+'([^']+\.css)'\s*;")
            def resolve_imports(content, base_dir):
                def replace_import(m):
                    import_path = (base_dir / m.group(1)).resolve()
                    if import_path.exists():
                        return import_path.read_text(encoding='utf-8')
                    return m.group(0)
                return import_pattern.sub(replace_import, content)

            css_content = resolve_imports(css_content, css_file.parent)
            print(f"  CSS imports resolved")

            # Replace CSS link with inline style
            css_link_pattern = r'<link\s+rel=["\']stylesheet["\']\s+href=["\'][^"\']+\.css["\']\s*/?>'
            html_content = re.sub(css_link_pattern, f'<style>\n{css_content}\n</style>', html_content)
            print(f"  CSS inlined")

        # Encode images
        img_pattern = re.compile(r'src=["\']([^"\']+)["\']')
        encoded_count = 0

        def replace_image(match):
            nonlocal encoded_count
            img_src = match.group(1)
            if img_src.startswith('data:') or img_src.startswith('http'):
                return match.group(0)

            img_path = (build_dir / img_src).resolve()
            if img_path.exists():
                try:
                    data_uri = encode_to_base64(img_path)
                    encoded_count += 1
                    return f'src="{data_uri}"'
                except Exception as e:
                    print(f"  Warning: Could not encode {img_src}: {e}")
            return match.group(0)

        html_content = img_pattern.sub(replace_image, html_content)

        standalone_filename = manifest['build_config']['standalone_filename']
        standalone_path = build_dir / standalone_filename
        standalone_path.write_text(html_content, encoding='utf-8')

        file_size = standalone_path.stat().st_size / 1024
        print(f"  Standalone: {standalone_filename}")
        print(f"  Images encoded: {encoded_count}")
        print(f"  Size: {file_size:.1f} KB")
        output_path = standalone_path

    print("-" * 50)
    print(f"[SUCCESS] Build complete!")
    print(f"  Output: {output_path}")
    return output_path


def main():
    parser = argparse.ArgumentParser(description='AI Agent Lecture - Build Script')
    parser.add_argument('--standalone', action='store_true',
                        help='Build standalone HTML with embedded CSS/images')
    args = parser.parse_args()

    try:
        build(standalone=args.standalone)
        return 0
    except Exception as e:
        print(f"Error: {e}", file=sys.stderr)
        return 1


if __name__ == '__main__':
    sys.exit(main())
