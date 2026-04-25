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

// ── Rutas de páginas ──────────────────────────────────────────────────────────
const page = (f) => (req, res) => res.sendFile(path.join(__dirname, 'public', f));
app.get('/blog',         page('blog.html'));
app.get('/blog/:slug',   page('post.html'));
app.get('/admin',        page('admin.html'));
app.get('/aviso-legal',  page('aviso-legal.html'));
app.get('/privacidad',   page('privacidad.html'));
app.get('/cookies',      page('cookies.html'));

app.listen(port, () =>
  console.log(`\n  VigilDigital corriendo en http://localhost:${port}\n  Admin: http://localhost:${port}/admin\n`)
);
