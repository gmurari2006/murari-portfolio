import Lenis from 'lenis';
import gsap from 'gsap';

export type SceneId =
  | 'hero'
  | 'about'
  | 'work'
  | 'journey'
  | 'skills'
  | 'awards'
  | 'contact';

export interface SceneConfig {
  id: SceneId;
  label: string;
  from: number;
  to: number;
  x: number;
  k: number;
  vhHeight: number; // in vh units (e.g. 230)
}

export const SCENES: SceneConfig[] = [
  {
    id: 'hero',
    label: 'Hello',
    from: 0,
    to: 59,
    x: 0.70,
    k: 1.0,
    vhHeight: 230,
  },
  {
    id: 'about',
    label: 'About',
    from: 60,
    to: 117,
    x: 0.27,
    k: 1.0,
    vhHeight: 280,
  },
  {
    id: 'work',
    label: 'Work',
    from: 118,
    to: 193,
    x: 0.77,
    k: 0.86,
    vhHeight: 460,
  },
  {
    id: 'journey',
    label: 'Journey',
    from: 194,
    to: 220,
    x: 0.26,
    k: 1.0,
    vhHeight: 240,
  },
  {
    id: 'skills',
    label: 'Toolkit',
    from: 220,
    to: 231,
    x: 0.50,
    k: 0.98,
    vhHeight: 280,
  },
  {
    id: 'awards',
    label: 'Awards',
    from: 231,
    to: 238,
    x: 0.75,
    k: 1.0,
    vhHeight: 320,
  },
  {
    id: 'contact',
    label: 'Contact',
    from: 59,
    to: 0, // S1 reversed
    x: 0.50,
    k: 1.0,
    vhHeight: 240,
  },
];

export interface SceneMetrics {
  top: number;
  height: number;
}

export interface SceneCalculations {
  enter: number;
  p: number;
  exit: number;
  vis: number;
}

export interface TransitionState {
  isTransitioning: boolean;
  fromScene: SceneConfig | null;
  toScene: SceneConfig | null;
  fromFrame: number;
  toFrame: number;
  t: number; // 0..1
}

export interface DirectorState {
  y: number;
  vw: number;
  vh: number;
  maxScroll: number;
  activeScene: SceneConfig;
  activeSceneIndex: number;
  activeCalculations: SceneCalculations;
  scenes: Record<SceneId, SceneCalculations>;
  frame: number;
  transition: TransitionState;
  isContactWhite: boolean;
  totalProgress: number; // 0..1
}

export type DirectorSubscriber = (state: DirectorState) => void;

function clamp(val: number, min = 0, max = 1): number {
  return Math.min(Math.max(val, min), max);
}

function easeInOutSine(x: number): number {
  return -(Math.cos(Math.PI * x) - 1) / 2;
}

class ScrollDirector {
  private lenis: Lenis | null = null;
  private subscribers: Map<string, DirectorSubscriber> = new Map();
  private sceneMetrics: Map<SceneId, SceneMetrics> = new Map();
  private resizeObserver: ResizeObserver | null = null;
  private isStarted = false;
  private isIntroDone = false;
  private currentY = 0;
  private vw = typeof window !== 'undefined' ? window.innerWidth : 1600;
  private vh = typeof window !== 'undefined' ? window.innerHeight : 900;
  private maxScroll = 1;

  constructor() {
    if (typeof window !== 'undefined') {
      if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
      }
      this.initLenis();
      this.initResizeObserver();
    }
  }

  private initLenis() {
    this.lenis = new Lenis({
      lerp: 0.075,
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.4,
    });

    // Keep stopped until preloader finishes
    this.lenis.stop();

    // Drive from gsap.ticker with lagSmoothing(0)
    gsap.ticker.lagSmoothing(0);
    gsap.ticker.add((time: number) => {
      this.lenis?.raf(time * 1000);
    });

    this.lenis.on('scroll', (e: { scroll: number }) => {
      this.currentY = e.scroll;
      this.tick();
    });

    window.addEventListener('resize', () => {
      this.handleResize();
    });

    window.addEventListener('scroll', () => {
      if (!this.lenis) {
        this.currentY = window.scrollY || window.pageYOffset;
        this.tick();
      }
    });

    this.handleResize();
  }

  private initResizeObserver() {
    this.resizeObserver = new ResizeObserver(() => {
      this.measureSections();
      this.tick();
    });
  }

  public registerSectionElement(id: SceneId, el: HTMLElement | null) {
    if (!el) return;
    this.resizeObserver?.observe(el);
    this.measureSections();
  }

  public measureSections() {
    if (typeof window === 'undefined') return;
    this.vw = window.innerWidth;
    this.vh = window.innerHeight;

    let accTop = 0;
    SCENES.forEach((scene) => {
      const el = document.getElementById(`scene-${scene.id}`);
      let top = accTop;
      let height = (scene.vhHeight / 100) * this.vh;

      if (el) {
        const rect = el.getBoundingClientRect();
        top = window.scrollY + rect.top;
        height = el.offsetHeight || height;
      }
      this.sceneMetrics.set(scene.id, { top, height });
      accTop = top + height;
    });

    this.maxScroll = Math.max(1, document.documentElement.scrollHeight - this.vh);
  }

  private handleResize() {
    this.vw = window.innerWidth;
    this.vh = window.innerHeight;
    this.measureSections();
    this.lenis?.resize();
    this.tick();
  }

  public start() {
    if (this.isStarted) return;
    this.isStarted = true;
    this.measureSections();
    window.scrollTo(0, 0);
    this.currentY = 0;
    this.lenis?.start();
    this.lenis?.scrollTo(0, { immediate: true });
    this.isIntroDone = true;
    this.tick();

    // Dispatch intro start event
    window.dispatchEvent(new CustomEvent('portfolio:intro_start'));
  }

  public scrollTo(targetY: number | string, options?: { duration?: number }) {
    if (!this.lenis) return;
    if (typeof targetY === 'string') {
      const scene = SCENES.find((s) => s.id === targetY);
      if (scene) {
        const m = this.sceneMetrics.get(scene.id);
        if (m) {
          this.lenis.scrollTo(m.top, {
            duration: options?.duration ?? 2.2,
            easing: (t) => 1 - Math.pow(1 - t, 4), // easeOutQuart
          });
          return;
        }
      }
    }
    this.lenis.scrollTo(targetY, {
      duration: options?.duration ?? 2.2,
      easing: (t) => 1 - Math.pow(1 - t, 4),
    });
  }

  public subscribe(key: string, callback: DirectorSubscriber) {
    this.subscribers.set(key, callback);
    // Provide immediate first calculation
    const state = this.computeState();
    callback(state);
    return () => {
      this.subscribers.delete(key);
    };
  }

  public computeState(): DirectorState {
    const y = this.currentY;
    const vh = this.vh;
    const vw = this.vw;
    const lead = 0.78 * vh;
    const span = 0.62 * vh;

    const scenesCalculations: Record<SceneId, SceneCalculations> = {} as Record<
      SceneId,
      SceneCalculations
    >;

    SCENES.forEach((scene) => {
      const metric = this.sceneMetrics.get(scene.id) || {
        top: 0,
        height: (scene.vhHeight / 100) * vh,
      };
      const top = metric.top;
      const h = metric.height;

      const enter = clamp((y - (top - vh)) / vh);
      const p = clamp((y - top) / Math.max(1, h - vh));
      const exit = clamp((y - (top + h - vh)) / vh);
      const vis = clamp(Math.min(enter * 1.6, 1 - exit * 2.2));

      scenesCalculations[scene.id] = { enter, p, exit, vis };
    });

    // Active scene selection: last one where y >= top - lead
    let activeIndex = 0;
    for (let i = 0; i < SCENES.length; i++) {
      const scene = SCENES[i];
      const metric = this.sceneMetrics.get(scene.id) || {
        top: 0,
        height: (scene.vhHeight / 100) * vh,
      };
      if (y >= metric.top - lead) {
        activeIndex = i;
      }
    }

    const activeScene = SCENES[activeIndex];
    const activeMetric = this.sceneMetrics.get(activeScene.id) || {
      top: 0,
      height: (activeScene.vhHeight / 100) * vh,
    };
    const activeCalc = scenesCalculations[activeScene.id];

    // Transition calculation
    // Transition using t = easeInOutSine(clamp((y - (top - lead)) / span))
    // between previous scene's last frame and next scene's first frame.
    let transition: TransitionState = {
      isTransitioning: false,
      fromScene: null,
      toScene: null,
      fromFrame: activeScene.from,
      toFrame: activeScene.from,
      t: 0,
    };

    let calculatedFrame = activeScene.from + (activeScene.to - activeScene.from) * activeCalc.p;

    if (activeIndex > 0) {
      const transRaw = (y - (activeMetric.top - lead)) / span;
      if (transRaw < 1.0) {
        const prevScene = SCENES[activeIndex - 1];
        const t = easeInOutSine(clamp(transRaw));
        transition = {
          isTransitioning: true,
          fromScene: prevScene,
          toScene: activeScene,
          fromFrame: prevScene.to,
          toFrame: activeScene.from,
          t,
        };
      }
    }

    // Contact white trigger: On Contact, only after blade passes t > 0.6, HUD turns white
    let isContactWhite = false;
    if (activeScene.id === 'contact') {
      if (transition.isTransitioning) {
        isContactWhite = transition.t > 0.6;
      } else {
        isContactWhite = true;
      }
    }

    const totalProgress = clamp(y / Math.max(1, this.maxScroll));

    return {
      y,
      vw,
      vh,
      maxScroll: this.maxScroll,
      activeScene,
      activeSceneIndex: activeIndex,
      activeCalculations: activeCalc,
      scenes: scenesCalculations,
      frame: calculatedFrame,
      transition,
      isContactWhite,
      totalProgress,
    };
  }

  public tick() {
    const state = this.computeState();
    this.subscribers.forEach((cb) => cb(state));
  }
}

export const director = new ScrollDirector();
