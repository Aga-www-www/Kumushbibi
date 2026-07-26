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

function initScene(root) {
  const scene = document.createElement('div');
  scene.className = 'scene';
  scene.innerHTML = `
    <div class="stars"></div>
    <div class="moon-wrap" id="moonWrap">
      <div class="moon-ray"></div>
      <div class="moon"></div>
    </div>
    <div class="mountains">${mountainSVG()}</div>
    <div class="mist"></div>
  `;
  root.prepend(scene);
  buildStars(scene.querySelector('.stars'), 90);
  return scene;
}

// Moves the moon higher in the sky as `progress` goes 0 -> 1
function setMoonProgress(progress) {
  const wrap = document.getElementById('moonWrap');
  if (!wrap) return;
  const top = 78 - progress * 40; // from 78% down to 38%
  wrap.style.top = top + '%';
}
