(() => {
  // ====== Config dasar ======
  const CONFIG = {
    count: 300,
    color: 'white',
    radiusRange: [0.6, 5],
    speedRange:  [1, 3],
    windRange:   [-1.5, 4],
    theme: 'default',
  };

  // ====== Util ======
  const rand = (min, max) => Math.random() * (max - min) + min;
  const pick = arr => arr[(Math.random() * arr.length) | 0];

  // Retina fit
  function fitCanvasToElement(canvas) {
    const { width: cssW, height: cssH } = canvas.getBoundingClientRect();
    const dpr = Math.max(1, window.devicePixelRatio || 1);
    const needResize = canvas.width !== Math.round(cssW * dpr) ||
                       canvas.height !== Math.round(cssH * dpr);
    if (needResize) {
      canvas.width  = Math.round(cssW * dpr);
      canvas.height = Math.round(cssH * dpr);
      const ctx = canvas.getContext('2d');
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    return needResize;
  }

  // ====== THEME renderers & movers ======
  const THEMES = {
    default: {
      tune: (C) => C, // tanpa perubahan
      draw(p, c){
        c.beginPath();
        c.arc(p.x, p.y, p.radius, 0, Math.PI*2);
        c.fillStyle = p.color; c.fill();
      },
      update(p, W, H){
        p.y += p.speed;
        p.x += p.wind;
        if (p.y - p.radius > H) { p.y = -p.radius*2; p.x = Math.random()*W; }
        if (p.x < -p.radius) p.x = W + p.radius;
        if (p.x > W + p.radius) p.x = -p.radius;
      }
    },

    christmas: {
      tune: (C) => ({
        ...C,
        count: Math.max(350, C.count),
        color: 'white',
        radiusRange: [1.2, 3.8],
        speedRange:  [0.6, 2.2],
        windRange:   [-0.8, 1.2],
        palette: ['#ffffff', '#f7e08a', '#d4af37', '#2ecc71', '#e74c3c']
      }),
      draw(p, c){
        // bintang/flake sederhana
        const spikes = 6, outer = p.radius, inner = p.radius*0.45;
        let rot = Math.PI/2*3, x = p.x, y = p.y, step = Math.PI/spikes;
        c.beginPath();
        c.moveTo(x, y - outer);
        for (let i=0;i<spikes;i++){
          x = p.x + Math.cos(rot)*outer; y = p.y + Math.sin(rot)*outer; c.lineTo(x,y); rot+=step;
          x = p.x + Math.cos(rot)*inner; y = p.y + Math.sin(rot)*inner; c.lineTo(x,y); rot+=step;
        }
        c.closePath();
        c.fillStyle = p.col || '#fff';
        c.shadowColor = 'rgba(255,255,255,.5)';
        c.shadowBlur = 6;
        c.fill();
        c.shadowBlur = 0;
      },
      update(p, W, H){
        p.life += 1;
        p.y += p.speed;
        // sway lembut kanan-kiri
        p.x += p.wind*0.4 + Math.sin(p.life*0.05 + p.seed)*0.6;
        if (p.y - p.radius > H) { p.y = -p.radius*2; p.x = Math.random()*W; }
      }
    },

    halloween: {
      tune: (C) => ({
        ...C,
        count: Math.max(220, Math.min(C.count, 350)),
        color: '#000',
        radiusRange: [5, 10],   // ukuran kelelawar relatif
        speedRange:  [0.6, 1.5],
        windRange:   [-0.6, 1.4],
        palette: ['#000000', '#ff8c1a', '#ffaa33']
      }),
      draw(p, c){
        // siluet kelelawar sederhana
        const s = p.radius;
        c.save();
        c.translate(p.x, p.y);
        c.rotate(p.rot || 0);
        c.scale(s/8, s/8);

        c.fillStyle = p.col || '#000';
        c.beginPath();
        c.moveTo(-8,0);
        c.quadraticCurveTo(-14,-6, -10,-10);
        c.quadraticCurveTo(-6,-6, -4,-6);
        c.quadraticCurveTo(-2,-10, 0,-10);
        c.quadraticCurveTo(2,-10, 4,-6);
        c.quadraticCurveTo(6,-6, 10,-10);
        c.quadraticCurveTo(14,-6, 8,0);
        c.quadraticCurveTo(4,2, 0,6);
        c.quadraticCurveTo(-4,2, -8,0);
        c.closePath();
        c.fill();

        // mata kecil oranye biar halloween vibe
        c.fillStyle = 'rgba(255,140,26,.9)';
        c.fillRect(-2.8,-3, 1.2,1.2);
        c.fillRect(1.6,-3, 1.2,1.2);

        c.restore();
      },
      update(p, W, H){
        p.life += 1;
        // terbang menyamping + swoop sinus
        p.x += p.wind*1.2 + Math.cos(p.life*0.05 + p.seed)*1.4;
        p.y += p.speed*0.6 + Math.sin(p.life*0.03 + p.seed)*0.6;

        p.rot += 0.02 * Math.sin(p.life*0.04 + p.seed);

        // respawn ketika keluar layar
        if (p.x < -15) p.x = W + 15;
        if (p.x > W + 15) p.x = -15;
        if (p.y < -15) p.y = H + 15;
        if (p.y > H + 15) p.y = -15;
      }
    },

    batman: {
      tune: (C) => ({
        ...C,
        count: Math.max(180, Math.min(C.count, 280)),
        color: '#111',
        radiusRange: [6, 12],
        speedRange:  [0.8, 2.0],
        windRange:   [-2.0, 2.0],
        palette: ['#111111', '#222222', '#ffd400'] // kuning buat aksen opsional
      }),
      draw(p, c){
        // kelelawar lebih tajam + emblem hint
        const s = p.radius;
        c.save();
        c.translate(p.x, p.y);
        c.rotate(p.rot || 0);
        c.scale(s/9, s/9);
        c.fillStyle = p.col || '#111';
        c.beginPath();
        c.moveTo(-10,0);
        c.lineTo(-6,-6);
        c.lineTo(-2,-2);
        c.lineTo(0,-8);
        c.lineTo(2,-2);
        c.lineTo(6,-6);
        c.lineTo(10,0);
        c.lineTo(6,2);
        c.lineTo(2,6);
        c.lineTo(0,2);
        c.lineTo(-2,6);
        c.lineTo(-6,2);
        c.closePath();
        c.fill();

        // titik kuning kecil di badan (vibes bat-utility)
        c.fillStyle = 'rgba(255,212,0,.9)';
        c.fillRect(-0.8,0, 1.6,1.6);
        c.restore();
      },
      update(p, W, H){
        p.life += 1;
        // gerak agresif & cepat, sedikit zig-zag
        p.x += p.wind*1.6 + Math.cos(p.life*0.08 + p.seed)*1.8;
        p.y += p.speed*1.1 + Math.sin(p.life*0.06 + p.seed)*0.9;
        p.rot += 0.03 * Math.cos(p.life*0.05 + p.seed*1.3);

        if (p.x < -20) p.x = W + 20;
        if (p.x > W + 20) p.x = -20;
        if (p.y < -20) p.y = H + 20;
        if (p.y > H + 20) p.y = -20;
      }
    }
  };

  // ====== Kelas Partikel ======
  class Particle {
    constructor(canvas, opts = {}, themeObj) {
      this.canvas = canvas;
      this.ctx = canvas.getContext('2d');
      this.opts = opts;
      this.theme = themeObj;
      this.seed = Math.random() * 1000;
      this.life = 0;
      this.rot  = 0;
      this.col  = opts.palette ? pick(opts.palette) : opts.color;
      this.reset(true);
    }

    reset(init = false) {
      const { radiusRange, speedRange, windRange } = this.opts;
      this.radius = rand(...radiusRange);
      this.speed  = rand(...speedRange);
      this.wind   = rand(...windRange);
      this.color  = this.opts.color;

      this.x = rand(0, this.canvas.clientWidth);
      this.y = init ? rand(-this.canvas.clientHeight, this.canvas.clientHeight)
                    : -this.radius * 2;
    }

    update(W, H)  { this.theme.update(this, W, H); }
    draw()        { this.theme.draw(this, this.ctx); }
  }

  // ====== Inisialisasi ======
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  if (!canvas.style.width || !canvas.style.height) {
    canvas.style.width = '100%';
    canvas.style.height = '100%';
  }

  const particles = [];
  let ctx = canvas.getContext('2d');
  let THEME = THEMES[CONFIG.theme];

  function applyTheme(name){
    const t = THEMES[name] || THEMES.default;
    THEME = t;
    // terapkan penyesuaian nilai default tema
    const tuned = t.tune(CONFIG);
    Object.assign(CONFIG, tuned);
  }

  function createParticles() {
    particles.length = 0;
    for (let i = 0; i < CONFIG.count; i++) {
      particles.push(new Particle(canvas, {
        color: CONFIG.color,
        radiusRange: CONFIG.radiusRange,
        speedRange: CONFIG.speedRange,
        windRange: CONFIG.windRange,
        palette: CONFIG.palette
      }, THEME));
    }
  }

  function resize() {
    const resized = fitCanvasToElement(canvas);
    if (resized) {
      ctx = canvas.getContext('2d');
      particles.forEach(p => p.reset(true));
    }
  }

  function loop() {
    const W = canvas.clientWidth, H = canvas.clientHeight;
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => (p.draw(), p.update(W,H)));
    requestAnimationFrame(loop);
  }

  // Start (default theme)
  applyTheme(CONFIG.theme);
  createParticles();
  resize();
  window.addEventListener('resize', resize, { passive: true });
  requestAnimationFrame(loop);

  // ====== API runtime ======
  window.BgParticles = {
    setTheme(name){
      applyTheme(name);
      createParticles();
    },
    setColor(col)   { CONFIG.color = col; particles.forEach(p => { p.color = col; p.col = col; }); },
    setCount(cnt)   { CONFIG.count = cnt; createParticles(); },
    setRadius(min, max){ CONFIG.radiusRange = [min, max]; particles.forEach(p => p.reset(true)); },
    setSpeed(min, max) { CONFIG.speedRange  = [min, max]; particles.forEach(p => p.reset(true)); },
    setWind(min, max)  { CONFIG.windRange   = [min, max]; particles.forEach(p => p.reset(true)); },
  };
})();