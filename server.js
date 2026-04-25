const express = require('express');
const fs      = require('fs');
const path    = require('path');
const multer  = require('multer');
const { adminSecret, port } = require('./config');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// ── Multer (subida de imágenes) ──────────────────────────────────────────────
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, 'public/assets')),
  filename:    (req, file, cb) => {
    const ext  = path.extname(file.originalname);
    const name = path.basename(file.originalname, ext).replace(/\s+/g, '-').toLowerCase();
    cb(null, `${name}-${Date.now()}${ext}`);
  }
});
const upload = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } });

// ── Auth middleware ──────────────────────────────────────────────────────────
const requireAdmin = (req, res, next) => {
  const key = req.headers['x-admin-key'];
  if (key !== adminSecret) return res.status(401).json({ error: 'No autorizado' });
  next();
};

// ── Data helpers ─────────────────────────────────────────────────────────────
const dataFile = (f) => path.join(__dirname, 'data', f);
const read  = (f) => JSON.parse(fs.readFileSync(dataFile(f), 'utf8'));
const write = (f, d) => fs.writeFileSync(dataFile(f), JSON.stringify(d, null, 2));

// ── Auth check endpoint ───────────────────────────────────────────────────────
app.post('/api/auth', (req, res) => {
  const { key } = req.body;
  res.json({ ok: key === adminSecret });
});

// ── Portfolio API ─────────────────────────────────────────────────────────────
app.get('/api/portfolio', (req, res) => res.json(read('portfolio.json')));

app.post('/api/portfolio', requireAdmin, (req, res) => {
  const data = read('portfolio.json');
  const project = { id: Date.now(), ...req.body };
  data.projects.push(project);
  write('portfolio.json', data);
  res.json(project);
});

app.put('/api/portfolio/:id', requireAdmin, (req, res) => {
  const data = read('portfolio.json');
  const i = data.projects.findIndex(p => String(p.id) === req.params.id);
  if (i === -1) return res.status(404).json({ error: 'No encontrado' });
  data.projects[i] = { ...data.projects[i], ...req.body };
  write('portfolio.json', data);
  res.json(data.projects[i]);
});

app.delete('/api/portfolio/:id', requireAdmin, (req, res) => {
  const data = read('portfolio.json');
  data.projects = data.projects.filter(p => String(p.id) !== req.params.id);
  write('portfolio.json', data);
  res.json({ ok: true });
});

// ── Posts API ──────────────────────────────────────────────────────────────────
app.get('/api/posts', (req, res) => res.json(read('posts.json')));

app.get('/api/posts/:slug', (req, res) => {
  const { posts } = read('posts.json');
  const post = posts.find(p => p.slug === req.params.slug);
  if (!post) return res.status(404).json({ error: 'No encontrado' });
  res.json(post);
});

app.post('/api/posts', requireAdmin, (req, res) => {
  const data = read('posts.json');
  const post = { date: new Date().toISOString().split('T')[0], ...req.body };
  data.posts.unshift(post);
  write('posts.json', data);
  res.json(post);
});

app.put('/api/posts/:slug', requireAdmin, (req, res) => {
  const data = read('posts.json');
  const i = data.posts.findIndex(p => p.slug === req.params.slug);
  if (i === -1) return res.status(404).json({ error: 'No encontrado' });
  data.posts[i] = { ...data.posts[i], ...req.body };
  write('posts.json', data);
  res.json(data.posts[i]);
});

app.delete('/api/posts/:slug', requireAdmin, (req, res) => {
  const data = read('posts.json');
  data.posts = data.posts.filter(p => p.slug !== req.params.slug);
  write('posts.json', data);
  res.json({ ok: true });
});

// ── Subida de imágenes ────────────────────────────────────────────────────────
app.post('/api/upload', requireAdmin, upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'Sin archivo' });
  res.json({ url: `assets/${req.file.filename}` });
});

// ── Diagnóstico API ───────────────────────────────────────────────────────────
app.get('/api/diagnostico', async (req, res) => {
  const { url } = req.query;
  if (!url) return res.status(400).json({ error: 'URL requerida' });

  let target = url.trim();
  if (!/^https?:\/\//i.test(target)) target = 'https://' + target;
  try { new URL(target); } catch { return res.status(400).json({ error: 'URL no válida' }); }

  const key = process.env.PAGESPEED_API_KEY ? `&key=${process.env.PAGESPEED_API_KEY}` : '';
  const apiUrl = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed' +
    `?url=${encodeURIComponent(target)}` +
    `&strategy=mobile&category=performance&category=accessibility&category=best-practices&category=seo${key}`;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 55000);

  try {
    const r = await fetch(apiUrl, { signal: controller.signal });
    clearTimeout(timer);
    if (!r.ok) {
      const err = await r.json().catch(() => ({}));
      return res.status(502).json({ error: err?.error?.message || 'No se pudo acceder a la web. Comprueba la URL.' });
    }
    const data   = await r.json();
    const cats   = data.lighthouseResult?.categories || {};
    const audits = data.lighthouseResult?.audits     || {};
    const sc = (k)  => Math.round((cats[k]?.score ?? 0) * 100);
    const au = (id) => audits[id];

    res.json({
      url: target,
      performance:   sc('performance'),
      seo:           sc('seo'),
      accessibility: sc('accessibility'),
      bestPractices: sc('best-practices'),
      fcp: au('first-contentful-paint')?.displayValue   || null,
      lcp: au('largest-contentful-paint')?.displayValue || null,
      cls: au('cumulative-layout-shift')?.displayValue  || null,
      tbt: au('total-blocking-time')?.displayValue      || null,
      hasSSL:             target.startsWith('https://'),
      hasMetaDescription: au('meta-description')?.score === 1,
      hasViewport:        au('viewport')?.score         === 1,
      hasTitle:           au('document-title')?.score   === 1,
      issues: ['uses-optimized-images','render-blocking-resources','unused-javascript',
               'unused-css-rules','uses-text-compression','offscreen-images',
               'uses-responsive-images','dom-size']
        .filter(id => au(id)?.score != null && au(id).score < 0.9)
        .map(id => ({ title: au(id).title }))
        .slice(0, 6),
    });
  } catch (err) {
    clearTimeout(timer);
    if (err.name === 'AbortError') return res.status(504).json({ error: 'El análisis tardó demasiado. Inténtalo de nuevo.' });
    res.status(500).json({ error: 'Error al analizar la web' });
  }
});

// ── Rutas de páginas ──────────────────────────────────────────────────────────
const page = (f) => (req, res) => res.sendFile(path.join(__dirname, 'public', f));
app.get('/blog',         page('blog.html'));
app.get('/blog/:slug',   page('post.html'));
app.get('/admin',        page('admin.html'));
app.get('/aviso-legal',  page('aviso-legal.html'));
app.get('/privacidad',   page('privacidad.html'));
app.get('/cookies',      page('cookies.html'));
app.get('/diagnostico',  page('diagnostico.html'));

app.listen(port, () =>
  console.log(`\n  VigilDigital corriendo en http://localhost:${port}\n  Admin: http://localhost:${port}/admin\n`)
);
