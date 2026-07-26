// ============================================
// scene.js — night sky, stars, moon, mountains
// Shared visual backdrop for both pages
// ============================================

function buildStars(container, count) {
  const frag = document.createDocumentFragment();
  for (let i = 0; i < count; i++) {
    const s = document.createElement('div');
    s.className = 'star';
    s.style.left = Math.random() * 100 + '%';
    s.style.top = Math.random() * 70 + '%';
    s.style.animationDelay = (Math.random() * 5).toFixed(2) + 's';
    s.style.animationDuration = (3.5 + Math.random() * 3).toFixed(2) + 's';
    const size = Math.random() < 0.15 ? 3 : 2;
    s.style.width = size + 'px';
    s.style.height = size + 'px';
    frag.appendChild(s);
  }
  container.appendChild(frag);
}

function mountainSVG() {
  return `
  <svg viewBox="0 0 1440 420" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0,300 L120,230 L260,290 L400,180 L520,260 L680,140 L820,240 L960,190 L1120,270 L1260,200 L1440,260 L1440,420 L0,420 Z" fill="#1b2540" opacity="0.8"/>
    <path d="M0,360 L160,290 L300,340 L470,250 L620,330 L780,260 L940,330 L1100,270 L1260,340 L1440,300 L1440,420 L0,420 Z" fill="#131c33"/>
    <path d="M0,400 L200,350 L380,395 L560,340 L760,390 L960,345 L1160,395 L1440,360 L1440,420 L0,420 Z" fill="#0a1120"/>
  </svg>`;
}

function heartSVG() {
  return `<svg viewBox="0 0 32 29" width="100%" height="100%">
    <path d="M23.6,0c-3.4,0-6.3,2-7.6,4.9C14.7,2,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,13,16,20.6c6.5-7.6,16-11.2,16-20.6C32,3.8,28.2,0,23.6,0z" fill="#c9525f"/>
  </svg>`;
}

function swanSVG() {
  return `<svg viewBox="0 0 100 100" width="100%" height="100%">
    <path d="M18,72 C16,56 27,44 43,45 C38,33 44,18 60,13 C55,23 57,33 64,37 C75,39 83,49 79,61 C91,58 96,69 88,76 C74,86 39,86 24,80 C15,77 14,74 18,72 Z" fill="rgba(255,253,246,0.88)"/>
  </svg>`;
}

function buildParticles(container, className, svgFn, count, opts) {
  const frag = document.createDocumentFragment();
  for (let i = 0; i < count; i++) {
    const el = document.createElement('div');
    el.className = className;
    el.innerHTML = svgFn();
    el.style.left = (opts.leftMin + Math.random() * (opts.leftMax - opts.leftMin)) + '%';
    el.style.top = (opts.topMin + Math.random() * (opts.topMax - opts.topMin)) + '%';
    el.style.width = el.style.height = (opts.sizeMin + Math.random() * (opts.sizeMax - opts.sizeMin)) + 'px';
    el.style.animationDuration = (opts.durMin + Math.random() * (opts.durMax - opts.durMin)).toFixed(1) + 's';
    el.style.animationDelay = (Math.random() * opts.delayMax).toFixed(1) + 's';
    el.style.setProperty('--drift', (Math.random() * 60 - 30) + 'px');
    frag.appendChild(el);
  }
  container.appendChild(frag);
}

function initScene(root) {
  const scene = document.createElement('div');
  scene.className = 'scene';
  scene.innerHTML = `
    <div class="stars"></div>
    <div class="swans" id="swansLayer"></div>
    <div class="moon-wrap" id="moonWrap">
      <div class="moon-ray"></div>
      <div class="moon"></div>
    </div>
    <div class="hearts" id="heartsLayer"></div>
    <div class="mountains">${mountainSVG()}</div>
    <div class="mist"></div>
  `;
  root.prepend(scene);
  buildStars(scene.querySelector('.stars'), 70);
  buildParticles(scene.querySelector('#heartsLayer'), 'heart-particle', heartSVG, 12, {
    leftMin: 2, leftMax: 92, topMin: 40, topMax: 95,
    sizeMin: 10, sizeMax: 20, durMin: 11, durMax: 19, delayMax: 14
  });
  buildParticles(scene.querySelector('#swansLayer'), 'swan-particle', swanSVG, 4, {
    leftMin: -10, leftMax: -10, topMin: 18, topMax: 52,
    sizeMin: 26, sizeMax: 40, durMin: 24, durMax: 36, delayMax: 10
  });
  return scene;
}

// Moves the moon higher in the sky as `progress` goes 0 -> 1
function setMoonProgress(progress) {
  const wrap = document.getElementById('moonWrap');
  if (!wrap) return;
  const top = 78 - progress * 40; // from 78% down to 38%
  wrap.style.top = top + '%';
}
