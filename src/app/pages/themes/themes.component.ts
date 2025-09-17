import { CommonModule } from '@angular/common';
import { AfterViewInit, Component } from '@angular/core';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-themes',
  imports: [CommonModule],
  templateUrl: './themes.component.html',
  styleUrl: './themes.component.scss',
})
export class ThemesComponent implements AfterViewInit {
  showContent: boolean = false;
  themes = [
    {
      name: 'default',
      displayName: 'Default Theme',
      colors: ['#000000', '#333333', '#ffffff'],
    },
    {
      name: 'ocean-blue',
      displayName: 'Ocean Blue Theme',
      colors: ['#001f3d', '#003366', '#8ab4f8'],
    },
    {
      name: 'dark-blue',
      displayName: 'Dark Blue Theme',
      colors: ['#000', '#000033', '#0000ad'],
    },
    {
      name: 'dark-red',
      displayName: 'Dark Red Theme',
      colors: ['#000', '#330000', '#160000'],
    },
    {
      name: 'cyberpunk',
      displayName: 'Cyperpunk Neon',
      colors: ['#1a1a1a', '#5b005b', '#00ffff'],
    },
    {
      name: 'galaxy',
      displayName: 'Galaxy',
      colors: ['#0d0d1c', '#2a2a44', '#12122e'],
    },
    {
      name: 'pink',
      displayName: 'Pink Theme',
      colors: ['#ffe6f0', '#ff66b2', '#ff1493'],
    },
  ];

  constructor(private themeService: ThemeService) {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.showContent = true;
    }, 10);
  }

  selectTheme(themeName: string): void {
    this.themeService.setTheme(themeName);
  }
}
