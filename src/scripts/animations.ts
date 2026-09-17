import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const reduceMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function initCounter(el: HTMLElement) {
  const target = parseInt(el.dataset.count || '0', 10);
  if (reduceMotion) {
    el.textContent = String(target);
    return;
  }
  const obj = { val: 0 };
  gsap.to(obj, {
    val: target,
    duration: 2,
    ease: 'power2.out',
    onUpdate: () => (el.textContent = String(Math.round(obj.val))),
    scrollTrigger: { trigger: el, start: 'top 85%', once: true },
  });
}

export function initScrollReveals() {
  document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
    if (reduceMotion) {
      el.style.opacity = '1';
      return;
    }
    gsap.fromTo(
      el,
      { opacity: 0, y: 24 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 88%' },
      }
    );
  });

  document.querySelectorAll<HTMLElement>('[data-count]').forEach(initCounter);

  document.querySelectorAll<HTMLElement>('[data-marquee]').forEach((track) => {
    if (reduceMotion) return;
    const width = track.scrollWidth / 2;
    gsap.to(track, { x: -width, duration: 28, ease: 'linear', repeat: -1 });
  });
}
