import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { chromium } from 'playwright-core';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 4180;
const DIST_DIR = path.join(__dirname, 'dist');
const SCREENSHOTS_DIR = path.join(__dirname, 'screenshots');

const MIME_TYPES = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.pdf': 'application/pdf',
};

// Simple static server for dist
function startServer() {
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      let reqPath = decodeURI(req.url.split('?')[0]);
      if (reqPath === '/') reqPath = '/index.html';
      const filePath = path.join(DIST_DIR, reqPath);

      if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
        const ext = path.extname(filePath).toLowerCase();
        const contentType = MIME_TYPES[ext] || 'application/octet-stream';
        res.writeHead(200, {
          'Content-Type': contentType,
          'Access-Control-Allow-Origin': '*',
        });
        fs.createReadStream(filePath).pipe(res);
      } else {
        res.writeHead(404);
        res.end('Not found');
      }
    });

    server.listen(PORT, () => {
      console.log(`Server listening on http://localhost:${PORT}`);
      resolve(server);
    });
  });
}

async function main() {
  const server = await startServer();
  const browser = await chromium.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
  });

  try {
    // ==========================================
    // 1. DESKTOP VIEWPORT (1600 x 900)
    // ==========================================
    console.log('\n--- Capturing Desktop Screenshots (1600x900) ---');
    const desktopPage = await browser.newPage({
      viewport: { width: 1600, height: 900 },
      deviceScaleFactor: 1,
    });

    await desktopPage.goto(`http://localhost:${PORT}/`, { waitUntil: 'networkidle' });
    // Wait for preloader animation or force start director
    await desktopPage.waitForTimeout(2000);
    await desktopPage.evaluate(() => {
      if (window.__director) {
        window.__director.start();
      }
    });
    await desktopPage.waitForTimeout(1500);

    // Get positions for all sections and transitions
    const targets = [
      { name: '01_hero_desktop', yRatio: 0.2 }, // Hero
      { name: '02_trans_hero_about_desktop', isTrans: true, from: 'hero', to: 'about' },
      { name: '03_about_desktop', yRatio: 1.4 }, // About
      { name: '04_trans_about_work_desktop', isTrans: true, from: 'about', to: 'work' },
      { name: '05_work_desktop', yRatio: 3.2 }, // Work
      { name: '06_trans_work_journey_desktop', isTrans: true, from: 'work', to: 'journey' },
      { name: '07_journey_desktop', yRatio: 5.6 }, // Journey
      { name: '08_trans_journey_skills_desktop', isTrans: true, from: 'journey', to: 'skills' },
      { name: '09_skills_desktop', yRatio: 7.2 }, // Skills
      { name: '10_trans_skills_awards_desktop', isTrans: true, from: 'skills', to: 'awards' },
      { name: '11_awards_desktop', yRatio: 9.2 }, // Awards
      { name: '12_trans_awards_contact_desktop', isTrans: true, from: 'awards', to: 'contact' },
      { name: '13_contact_desktop', yRatio: 11.5 }, // Contact
    ];

    for (const target of targets) {
      if (target.isTrans) {
        // Scroll to the exact middle of blade transition between target.from and target.to
        await desktopPage.evaluate(({ to }) => {
          const vh = window.innerHeight;
          const lead = 0.78 * vh;
          const span = 0.62 * vh;
          const targetEl = document.getElementById(`scene-${to}`);
          if (targetEl) {
            const rect = targetEl.getBoundingClientRect();
            const top = window.scrollY + rect.top;
            const midTransitionY = top - lead + span * 0.5;
            window.scrollTo(0, midTransitionY);
            if (window.__director) {
              window.__director.currentY = midTransitionY;
              window.__director.tick();
            }
          }
        }, { to: target.to });
      } else {
        await desktopPage.evaluate(({ yRatio }) => {
          const vh = window.innerHeight;
          const scrollY = vh * yRatio;
          window.scrollTo(0, scrollY);
          if (window.__director) {
            window.__director.currentY = scrollY;
            window.__director.tick();
          }
        }, { yRatio: target.yRatio });
      }

      await desktopPage.waitForTimeout(600);
      const outPath = path.join(SCREENSHOTS_DIR, `${target.name}.png`);
      await desktopPage.screenshot({ path: outPath });
      console.log(`Saved screenshot: ${target.name}.png`);
    }

    await desktopPage.close();

    // ==========================================
    // 2. MOBILE VIEWPORT (390 x 844)
    // ==========================================
    console.log('\n--- Capturing Mobile Screenshots (390x844) ---');
    const mobilePage = await browser.newPage({
      viewport: { width: 390, height: 844 },
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
    });

    await mobilePage.goto(`http://localhost:${PORT}/`, { waitUntil: 'networkidle' });
    await mobilePage.waitForTimeout(2000);
    await mobilePage.evaluate(() => {
      if (window.__director) {
        window.__director.start();
      }
    });
    await mobilePage.waitForTimeout(1500);

    const mobileTargets = [
      { name: '01_hero_mobile', yRatio: 0.2 },
      { name: '02_trans_hero_about_mobile', isTrans: true, from: 'hero', to: 'about' },
      { name: '03_about_mobile', yRatio: 1.4 },
      { name: '04_work_mobile', yRatio: 3.2 },
      { name: '05_journey_mobile', yRatio: 5.6 },
      { name: '06_skills_mobile', yRatio: 7.2 },
      { name: '07_awards_mobile', yRatio: 9.2 },
      { name: '08_contact_mobile', yRatio: 11.5 },
    ];

    for (const target of mobileTargets) {
      if (target.isTrans) {
        await mobilePage.evaluate(({ to }) => {
          const vh = window.innerHeight;
          const lead = 0.78 * vh;
          const span = 0.62 * vh;
          const targetEl = document.getElementById(`scene-${to}`);
          if (targetEl) {
            const rect = targetEl.getBoundingClientRect();
            const top = window.scrollY + rect.top;
            const midTransitionY = top - lead + span * 0.5;
            window.scrollTo(0, midTransitionY);
            if (window.__director) {
              window.__director.currentY = midTransitionY;
              window.__director.tick();
            }
          }
        }, { to: target.to });
      } else {
        await mobilePage.evaluate(({ yRatio }) => {
          const vh = window.innerHeight;
          const scrollY = vh * yRatio;
          window.scrollTo(0, scrollY);
          if (window.__director) {
            window.__director.currentY = scrollY;
            window.__director.tick();
          }
        }, { yRatio: target.yRatio });
      }

      await mobilePage.waitForTimeout(600);
      const outPath = path.join(SCREENSHOTS_DIR, `${target.name}.png`);
      await mobilePage.screenshot({ path: outPath });
      console.log(`Saved screenshot: ${target.name}.png`);
    }

    await mobilePage.close();
    console.log('\nAll screenshots captured successfully!');
  } finally {
    await browser.close();
    server.close();
  }
}

main().catch((err) => {
  console.error('Error taking screenshots:', err);
  process.exit(1);
});
