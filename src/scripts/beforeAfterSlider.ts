import gsap from 'gsap';
import { Draggable } from 'gsap/Draggable';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(Draggable, ScrollTrigger);

export function initBeforeAfterSliders() {
  document.querySelectorAll<HTMLElement>('.ba-slider').forEach((root) => {
    if (root.dataset.initialized) return;
    root.dataset.initialized = 'true';

    const clip = root.querySelector<HTMLElement>('.ba-clip')!;
    const handle = root.querySelector<HTMLElement>('.ba-handle')!;
    const thumb = handle.querySelector<HTMLElement>('[role="slider"]')!;

    const setPos = (pct: number) => {
      const clamped = Math.min(100, Math.max(0, pct));
      clip.style.width = `${clamped}%`;
      handle.style.left = `${clamped}%`;
      thumb.setAttribute('aria-valuenow', String(Math.round(clamped)));
    };

    Draggable.create(handle, {
      type: 'x',
      bounds: root,
      onDrag() {
        const rect = root.getBoundingClientRect();
        const pct = ((this.x + rect.width / 2) / rect.width) * 100;
        setPos(pct);
      },
    });

    thumb.addEventListener('keydown', (e) => {
      const current = parseFloat(handle.style.left || '50');
      if (e.key === 'ArrowLeft') setPos(current - 5);
      if (e.key === 'ArrowRight') setPos(current + 5);
    });

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
      setPos(50);
    } else {
      gsap.fromTo(
        clip,
        { width: '0%' },
        {
          width: '50%',
          duration: 1.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: root, start: 'top 75%' },
        }
      );
    }
  });
}
