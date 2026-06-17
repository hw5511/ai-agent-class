/**
 * extract_courses.js
 * Extracts COURSES data from index.html and writes per-step JSON files.
 * Run once to bootstrap the courses/ directory.
 * Usage: node scripts/extract_courses.js
 */

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');
const HTML_PATH = path.join(ROOT, 'index.html');
const COURSES_DIR = path.join(ROOT, 'courses');

// --- Extract COURSES block from HTML ---
const html = fs.readFileSync(HTML_PATH, 'utf8');
const lines = html.split('\n');

let startLine = -1;
let endLine = -1;
for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('const COURSES = {') && startLine === -1) {
        startLine = i;
    }
    if (startLine !== -1 && i > startLine && lines[i].trimEnd() === '        };') {
        endLine = i;
        break;
    }
}

if (startLine === -1 || endLine === -1) {
    console.error('Could not find COURSES block in index.html');
    process.exit(1);
}

console.log(`Found COURSES block: lines ${startLine + 1}–${endLine + 1}`);

const coursesJs = lines.slice(startLine, endLine + 1).join('\n');
const wrappedJs = coursesJs.replace('const COURSES =', 'module.exports =');

const sandbox = { module: { exports: {} }, require };
vm.runInNewContext(wrappedJs, sandbox);
const COURSES = sandbox.module.exports;

// --- Write JSON files ---
for (const [courseKey, courseData] of Object.entries(COURSES)) {
    const courseDir = path.join(COURSES_DIR, courseKey);
    fs.mkdirSync(courseDir, { recursive: true });

    const { sessions, ...courseMeta } = courseData;

    // Write course meta (label, badgeClass, badgeText, title)
    fs.writeFileSync(
        path.join(courseDir, '_meta.json'),
        JSON.stringify(courseMeta, null, 2),
        'utf8'
    );
    console.log(`  Wrote ${courseKey}/_meta.json`);

    for (const session of sessions) {
        const stepNum = String(session.num).padStart(2, '0');
        const filename = `step${stepNum}.json`;

        // Build slide entries with explicit imagePath
        const slides = (session.slides || []).map((filename, idx) => {
            const sd = (session.slideDescs && session.slideDescs[idx]) || {};
            return {
                imagePath: `assets/${courseKey}/step${stepNum}/${filename}`,
                goal: sd.goal || null,
                topics: sd.topics || null,
                practice: sd.practice || null,
                action: sd.action || null
            };
        });

        const stepData = {
            step: session.num,
            title: session.title,
            hours: session.hours,
            goal: session.goal,
            topics: session.topics,
            practice: session.practice,
            slides
        };

        const outPath = path.join(courseDir, filename);
        fs.writeFileSync(outPath, JSON.stringify(stepData, null, 2), 'utf8');
        console.log(`  Wrote ${courseKey}/${filename} (${slides.length} slides)`);
    }
}

console.log('\nDone. Next: run `python build.py` to regenerate index.html');
