// @ts-nocheck
const { spawn, spawnSync } = require('child_process');

const DEV_OUTPUT_NOISE = [
  /^>/,
  /^◇ injected env/,
  /^◈ /,
  /^warn\s+- Invalid next\.config/,
  /^Browserslist:/,
  /^event - /,
  /^wait  - /,
  /^Warning: \[antd/,
  /^Warning: Route file/,
  /^If this file is not intended/,
  /^Current configuration:/,
  /^  \d\. Rename/,
  /^  routeFileIgnore/,
  /^See more info here/,
  /^\s+- The root value/,
  /^\s+- The value at/,
  /^\(node:\d+\) MaxListenersExceededWarning/,
  /^\(Use `node --trace-warnings/,
  /^ready - started server/,
  /^vite:react-swc\]/,
  /^\s*VITE\+/,
  /^\s*➜\s+Network:/,
  /^\s*➜\s+Local:/,
  /^\s*➜\s+press h \+/,
  // Next.js banners (build / start) — keep ReactPress-facing logs only
  /^▲\s*Next\.js/,
  /^Next\.js\s+\d/,
  /^- Environments:/,
  /^- Experiments/,
  /^Experiments \(use with caution\)/,
  /^·\s+\w/,
  /^⨯\s+\w/,
  /^Creating an optimized production build/,
  /^Compiled (successfully|in )/,
  /^Linting and checking/,
  /^Collecting page data/,
  /^Generating static pages/,
  /^Finalizing page optimization/,
  /^Collecting build traces/,
  /^Route \(app\)/,
  /^Route \(pages\)/,
  /^First Load JS/,
  /^Size\s+First Load JS/,
  /^┌/,
  /^├/,
  /^└/,
  /^○\s/,
  /^ƒ\s/,
  /^λ\s/,
  /^✓\s+(Starting|Ready|Compiled)/,
  /^- Local:/,
  /^- Network:/,
  /^Local:/,
  /^Network:/,
  /^Middleware/,
  /^✨\s*Done in/,
  /^Done in \d/,
];

function isDevOutputQuiet() {
  return process.env.REACTPRESS_DEV_VERBOSE !== '1';
}

function isNoiseLine(line) {
  const trimmed = line.trim();
  if (!trimmed) return true;
  return DEV_OUTPUT_NOISE.some((re) => re.test(trimmed));
}

function pipeFiltered(stream, target) {
  let buffer = '';
  stream.on('data', (chunk) => {
    buffer += chunk.toString();
    let idx;
    while ((idx = buffer.indexOf('\n')) >= 0) {
      const line = buffer.slice(0, idx);
      buffer = buffer.slice(idx + 1);
      if (!isNoiseLine(line)) {
        target.write(`${line}\n`);
      }
    }
  });
  stream.on('end', () => {
    if (buffer.trim() && !isNoiseLine(buffer)) {
      target.write(`${buffer}\n`);
    }
  });
}

/**
 * Spawn with filtered stdout/stderr unless REACTPRESS_DEV_VERBOSE=1.
 */
function spawnDevChild(command, args, options = {}) {
  if (!isDevOutputQuiet()) {
    return spawn(command, args, { ...options, stdio: options.stdio ?? 'inherit' });
  }

  const child = spawn(command, args, {
    ...options,
    stdio: ['ignore', 'pipe', 'pipe'],
  });

  if (child.stdout) pipeFiltered(child.stdout, process.stdout);
  if (child.stderr) pipeFiltered(child.stderr, process.stderr);

  return child;
}

/**
 * Run a theme production build quietly (hide Next.js / package-manager noise).
 * On failure, dump the captured output. Set REACTPRESS_DEV_VERBOSE=1 to inherit stdio.
 */
function runQuietThemeBuild(command, args, options = {}) {
  if (!isDevOutputQuiet()) {
    return spawnSync(command, args, {
      ...options,
      stdio: options.stdio ?? 'inherit',
    });
  }

  const result = spawnSync(command, args, {
    ...options,
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
  });

  if (result.status !== 0) {
    const combined = `${result.stdout || ''}${result.stderr || ''}`.trim();
    if (combined) {
      process.stderr.write(`${combined}\n`);
    }
  }

  return result;
}

module.exports = {
  isDevOutputQuiet,
  spawnDevChild,
  runQuietThemeBuild,
};
