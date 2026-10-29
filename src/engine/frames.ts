export interface ManifestShot {
  from: number;
  to: number;
  box: [number, number, number, number]; // [x, y, w, h]
  cx: number;
}

export interface FramesManifest {
  w: number;
  h: number;
  count: number;
  shots: ManifestShot[];
}

export type FramesProgressCallback = (loaded: number, total: number, pct: number) => void;

class FrameLoader {
  public manifest: FramesManifest | null = null;
  public loadedFrames: Map<number, HTMLImageElement> = new Map();
  public isQuarterLoaded = false;
  public loadedCount = 0;
  public totalFrames = 239;
  public progress = 0; // 0..100
  private onQuarterCallback: (() => void) | null = null;
  private onProgressCallback: FramesProgressCallback | null = null;
  private isMobile = false;
  private isLoading = false;
  private quarterThreshold = 60;

  constructor() {
    if (typeof window !== 'undefined') {
      this.isMobile = window.innerWidth < 820;
    }
  }

  public async loadManifest(): Promise<FramesManifest> {
    if (this.manifest) return this.manifest;
    try {
      const res = await fetch('./frames/manifest.json');
      if (!res.ok) {
        throw new Error(`Failed to fetch manifest: ${res.statusText}`);
      }
      this.manifest = await res.json();
      if (this.manifest) {
        this.totalFrames = this.manifest.count;
        this.quarterThreshold = Math.ceil(this.totalFrames / 4);
      }
    } catch (err) {
      console.warn('Manifest load error, using default fallback manifest', err);
      this.manifest = {
        w: 1600,
        h: 900,
        count: 239,
        shots: [
          { from: 0, to: 59, box: [155, 9, 1445, 891], cx: 0.59 },
          { from: 60, to: 117, box: [155, 8, 1445, 892], cx: 0.58 },
          { from: 118, to: 193, box: [86, 0, 1350, 900], cx: 0.70 },
          { from: 194, to: 238, box: [153, 14, 1447, 886], cx: 0.58 },
        ],
      };
      this.totalFrames = 239;
      this.quarterThreshold = 60;
    }
    return this.manifest!;
  }

  public async startLoading(
    onQuarter?: () => void,
    onProgress?: FramesProgressCallback
  ) {
    if (this.isLoading) return;
    this.isLoading = true;
    this.onQuarterCallback = onQuarter || null;
    this.onProgressCallback = onProgress || null;

    await this.loadManifest();
    this.isMobile = typeof window !== 'undefined' && window.innerWidth < 820;
    const baseFolder = this.isMobile ? './frames/sm' : './frames/lg';

    // Stride order: 8 → 4 → 2 → 1, with shot boundaries first
    const shotBoundaries: number[] = [];
    this.manifest?.shots.forEach((s) => {
      shotBoundaries.push(s.from);
      shotBoundaries.push(s.to);
    });

    const sequence: number[] = [];
    const added = new Set<number>();

    const addFrame = (idx: number) => {
      if (idx >= 0 && idx < this.totalFrames && !added.has(idx)) {
        added.add(idx);
        sequence.push(idx);
      }
    };

    // 1. Shot boundaries first
    shotBoundaries.forEach(addFrame);

    // 2. Stride 8
    for (let i = 0; i < this.totalFrames; i += 8) addFrame(i);
    // 3. Stride 4
    for (let i = 0; i < this.totalFrames; i += 4) addFrame(i);
    // 4. Stride 2
    for (let i = 0; i < this.totalFrames; i += 2) addFrame(i);
    // 5. Stride 1 (all remaining)
    for (let i = 0; i < this.totalFrames; i += 1) addFrame(i);

    // Concurrently stream frames
    const concurrency = 6;
    let nextIdx = 0;

    const worker = async () => {
      while (nextIdx < sequence.length) {
        const frameIdx = sequence[nextIdx++];
        await this.loadSingleFrame(frameIdx, baseFolder);
      }
    };

    const workers = Array.from({ length: concurrency }, () => worker());
    await Promise.all(workers);
  }

  private async loadSingleFrame(idx: number, baseFolder: string): Promise<void> {
    if (this.loadedFrames.has(idx)) return;

    const img = new Image();
    const formatted = String(idx).padStart(3, '0');
    img.src = `${baseFolder}/f${formatted}.webp`;

    try {
      if (typeof img.decode === 'function') {
        await img.decode();
      } else {
        await new Promise((resolve, reject) => {
          img.onload = resolve;
          img.onerror = reject;
        });
      }
      this.loadedFrames.set(idx, img);
    } catch {
      // Fallback if decode fails
      this.loadedFrames.set(idx, img);
    }

    this.loadedCount = this.loadedFrames.size;
    this.progress = Math.min(
      100,
      Math.round((this.loadedCount / this.totalFrames) * 100)
    );

    if (this.onProgressCallback) {
      this.onProgressCallback(this.loadedCount, this.totalFrames, this.progress);
    }

    if (!this.isQuarterLoaded && this.loadedCount >= this.quarterThreshold) {
      this.isQuarterLoaded = true;
      if (this.onQuarterCallback) {
        this.onQuarterCallback();
      }
    }
  }

  public getShotForFrame(frameIdx: number): { shotIdx: number; shot: ManifestShot } | null {
    if (!this.manifest) return null;
    const rounded = Math.round(frameIdx);
    for (let i = 0; i < this.manifest.shots.length; i++) {
      const shot = this.manifest.shots[i];
      if (rounded >= shot.from && rounded <= shot.to) {
        return { shotIdx: i, shot };
      }
    }
    // Fallback to nearest shot
    if (rounded < this.manifest.shots[0].from) {
      return { shotIdx: 0, shot: this.manifest.shots[0] };
    }
    const lastIdx = this.manifest.shots.length - 1;
    return { shotIdx: lastIdx, shot: this.manifest.shots[lastIdx] };
  }

  public getFrame(frameIdx: number): HTMLImageElement | null {
    const rounded = Math.round(frameIdx);
    if (this.loadedFrames.has(rounded)) {
      return this.loadedFrames.get(rounded)!;
    }
    return this.getNearestFrame(rounded);
  }

  public getNearestFrame(frameIdx: number): HTMLImageElement | null {
    const shotInfo = this.getShotForFrame(frameIdx);
    if (!shotInfo) return null;
    const { shot } = shotInfo;

    // Search nearest within the same shot
    let bestDist = Infinity;
    let bestImg: HTMLImageElement | null = null;

    for (let f = shot.from; f <= shot.to; f++) {
      if (this.loadedFrames.has(f)) {
        const dist = Math.abs(f - frameIdx);
        if (dist < bestDist) {
          bestDist = dist;
          bestImg = this.loadedFrames.get(f)!;
        }
      }
    }

    return bestImg;
  }
}

export const frameLoader = new FrameLoader();
