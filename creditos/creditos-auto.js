(() => {
  'use strict';
  const video = document.getElementById('meuVideo');
  const toggle = document.getElementById('bizu-scroll-toggle');
  if (!toggle || !video) return;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const audio = document.getElementById('bizu-credit-audio');
  const sound = document.getElementById('bizu-credit-sound');
  let running = false, frame = 0, previous = null, position = 0;
  let blockedByUser = false;
  function update() { toggle.textContent = running ? 'Pausar créditos' : 'Continuar créditos'; }
  function stop() {
    running = false; cancelAnimationFrame(frame); previous = null; update();
  }
  function step(time) {
    if (!running) return;
    const max = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    if (window.scrollY >= max - 1 || max === 0) { stop(); return; }
    if (previous !== null) {
      position = Math.min(max, position + Math.min(time - previous, 80) * 0.055);
      window.scrollTo({top: Math.floor(position), behavior: 'instant'});
    }
    previous = time;
    frame = requestAnimationFrame(step);
  }
  function start() {
    if (running) return;
    const max = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    if (max === 0) return;
    if (window.scrollY >= max - 1) window.scrollTo({top: 0, behavior: 'instant'});
    position = window.scrollY; previous = null; running = true; update();
    frame = requestAnimationFrame(step);
  }
  function manual() { blockedByUser = true; if (running) stop(); }
  toggle.addEventListener('click', () => { blockedByUser = true; running ? stop() : start(); });
  window.addEventListener('wheel', manual, {passive: true});
  window.addEventListener('touchstart', e => { if (!e.target.closest('.bizu-credit-controls')) manual(); }, {passive: true});
  window.addEventListener('keydown', e => {
    if (['Tab','ArrowUp','ArrowDown','PageUp','PageDown','Home','End',' '].includes(e.key) && !e.target.closest('.bizu-credit-controls')) manual();
  });
  document.addEventListener('visibilitychange', () => { if (document.hidden) { blockedByUser = true; stop(); } });
  function reducedChanged() { if (reduced.matches) { blockedByUser = true; stop(); video.pause(); } }
  if (reduced.addEventListener) reduced.addEventListener('change', reducedChanged);
  video.muted = true; video.loop = true; video.playsInline = true;
  if (!reduced.matches) video.play().catch(() => {});
  else { video.autoplay = false; video.pause(); }
  if (audio && sound) {
    let muted = false;
    try { muted = sessionStorage.getItem('bizu-credits-muted') === '1'; } catch (_) {}
    function renderSound() { sound.textContent = audio.paused ? 'Ativar som' : 'Silenciar'; }
    function playSound() { if (!muted) audio.play().then(renderSound).catch(renderSound); }
    sound.addEventListener('click', () => {
      muted = !audio.paused;
      try { sessionStorage.setItem('bizu-credits-muted', muted ? '1' : '0'); } catch (_) {}
      if (muted) audio.pause(); else playSound(); renderSound();
    });
    audio.volume = 0.45;
    document.addEventListener('click', e => { if (!e.target.closest('#bizu-credit-sound')) playSound(); }, {passive: true});
    document.addEventListener('keydown', e => { if (!e.target.closest('#bizu-credit-sound')) playSound(); });
    playSound(); renderSound();
  }
  update();
  function init() { if (!reduced.matches && !blockedByUser) start(); }
  // O script usa defer: DOM disponível; não aguarda download de mídias.
  setTimeout(init, 500);
})();
