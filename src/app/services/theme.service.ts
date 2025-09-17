import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private renderer: Renderer2;
  private currentTheme: string = 'default';

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  setTheme(theme: string): void {
    const htmlElement = document.documentElement;
    this.renderer.setAttribute(htmlElement, 'data-theme', theme);
    this.currentTheme = theme;
    localStorage.setItem('theme', theme);
  }

  loadTheme(): void {
    const savedTheme = localStorage.getItem('theme') || 'default';
    this.setTheme(savedTheme);
  }

  getTheme(): string {
    return this.currentTheme;
  }
}
