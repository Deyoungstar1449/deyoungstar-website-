const toggle = document.getElementById('menuToggle');
const nav = document.getElementById('siteNav');
if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }));
}
const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

const API_BASE = 'https://de-young-stars-backend.deyoungstarhomeofrestoration.workers.dev';

async function loadPublicContent() {
  try {
    const response = await fetch(`${API_BASE}/api/content`, { headers: { 'Accept': 'application/json' }, credentials: 'include' });
    if (!response.ok) return;
    const data = await response.json();
    const groups = {
      'Teaching': document.querySelector('#teachings .feature-grid'),
      'Ebook & Publication': document.querySelector('#publications .publication-layout'),
      'Song & Audio Teaching': document.querySelector('#audio .audio-panel'),
      'Video': document.querySelector('#teachings .feature-grid'),
      'Gallery': document.querySelector('#gallery .gallery-empty'),
      'Announcement': document.querySelector('#home .hero-content')
    };
    for (const item of (data.items || [])) {
      const target = groups[item.category];
      if (!target) continue;
      const card = document.createElement('article');
      card.className = 'feature-card';
      const heading = document.createElement('h3'); heading.textContent = item.title;
      const desc = document.createElement('p'); desc.textContent = item.description;
      card.append(heading, desc);
      if (item.url) {
        if (/\.(mp3|m4a|wav)$/i.test(item.url)) { const media=document.createElement('audio'); media.controls=true; media.src=item.url; card.append(media); }
        else if (/\.(mp4|webm)$/i.test(item.url)) { const media=document.createElement('video'); media.controls=true; media.preload='metadata'; media.src=item.url; media.style.maxWidth='100%'; card.append(media); }
        else if (/\.(jpg|jpeg|png|webp|gif)$/i.test(item.url)) { const media=document.createElement('img'); media.src=item.url; media.alt=item.title; media.loading='lazy'; media.style.maxWidth='100%'; card.append(media); }
        const link = document.createElement('a'); link.href = item.url; link.textContent = 'Open / download resource'; link.target = '_blank'; link.rel = 'noopener noreferrer'; card.append(link);
      }
      target.append(card);
    }
  } catch (_) { /* The public site remains usable if the API is not configured yet. */ }
}
loadPublicContent();
