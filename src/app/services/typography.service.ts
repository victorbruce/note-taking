import {
  Injectable,
  signal,
  computed,
  effect,
  PLATFORM_ID,
  inject,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type FontFamily = 'sans-serif' | 'serif' | 'monospace';

export interface FontFamilyDefinition {
  name: string;
  fontStack: string;
}

@Injectable({
  providedIn: 'root',
})
export class TypographyService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  private readonly STORAGE_KEY = 'app-font-family';

  private readonly fontFamilies: Record<FontFamily, FontFamilyDefinition> = {
    'sans-serif': {
      name: 'sans-serif',
      fontStack: '"Inter", sans-serif',
    },
    serif: {
      name: 'serif',
      fontStack: '"Noto Serif", serif',
    },
    monospace: {
      name: 'monospace',
      fontStack: '"Source Code Pro", monospace',
    },
  };

  private readonly _fontFamily = signal<FontFamily>('sans-serif');
  readonly fontFamily = this._fontFamily.asReadonly();

  public readonly currentFontDefinition = computed(
    () => this.fontFamilies[this._fontFamily()]
  );

  constructor() {
    if (this.isBrowser) {
      this.initializeFontFamily();
      this.setupFontFamilyEffect();
    }
  }

  private initializeFontFamily(): void {
    const stored = this.getStoredFontFamily();
    this._fontFamily.set(stored);
  }

  private setupFontFamilyEffect(): void {
    effect(() => {
      const fontFamily = this._fontFamily();
      this.applyFontFamilyToDOM(fontFamily);
      this.storeFontFamily(fontFamily);
    });
  }

  private getStoredFontFamily(): FontFamily {
    if (!this.isBrowser) return 'sans-serif';
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored && this.isValidFontFamily(stored)) {
        return stored;
      }
    } catch {
      // Ignore errors
    }
    return 'sans-serif';
  }

  private storeFontFamily(fontFamily: FontFamily): void {
    if (!this.isBrowser) return;
    try {
      localStorage.setItem(this.STORAGE_KEY, fontFamily);
    } catch {
      // Ignore errors
    }
  }

  private applyFontFamilyToDOM(fontFamily: FontFamily): void {
    if (!this.isBrowser) return;

    const htmlElement = document.documentElement;
    const fontDefinition = this.fontFamilies[fontFamily];

    htmlElement.style.setProperty(
      '--font-family-primary',
      fontDefinition.fontStack
    );

    htmlElement.setAttribute('data-font-family', fontFamily);

    htmlElement.classList.remove('font-sans', 'font-serif', 'font-mono');
    htmlElement.classList.add(
      `font-${
        fontFamily === 'sans-serif'
          ? 'sans'
          : fontFamily === 'serif'
          ? 'serif'
          : 'mono'
      }`
    );
  }

  private isValidFontFamily(value: any): value is FontFamily {
    return ['sans-serif', 'serif', 'monospace'].includes(value);
  }

  public setFontFamily(fontFamily: FontFamily): void {
    this._fontFamily.set(fontFamily);
  }

  getAvailableFontFamilies(): {
    key: FontFamily;
    definition: FontFamilyDefinition;
  }[] {
    return Object.entries(this.fontFamilies).map(([key, def]) => ({
      key: key as FontFamily,
      definition: def,
    }));
  }
}
