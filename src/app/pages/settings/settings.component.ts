import { Component, inject } from '@angular/core';
import {
  TypographyService,
  FontFamily,
} from '../../services/typography.service';
import { ThemeService, Theme } from '../../services/theme.service';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  imports: [CommonModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
})
export class SettingsComponent {
  private typographyService = inject(TypographyService);
  private themeService = inject(ThemeService);
  private auth = inject(AuthService);
  private router = inject(Router);

  get fonts() {
    return this.typographyService.getAvailableFontFamilies();
  }

  get currentFont() {
    return this.typographyService.fontFamily();
  }

  get currentTheme() {
    return this.themeService.getCurrentTheme();
  }

  setFont(font: FontFamily) {
    this.typographyService.setFontFamily(font);
  }

  setTheme(theme: Theme) {
    this.themeService.setTheme(theme);
  }

  onFontSelect(event: Event): void {
    const select = event.target as HTMLSelectElement;
    const selectedValue = select.value as FontFamily;
    this.setFont(selectedValue);
  }

  onThemeSelect(event: Event): void {
    const select = event.target as HTMLSelectElement;
    const theme = select.value as Theme;
    this.themeService.setTheme(theme);
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  async handleLogout() {
    this.auth.signOut().then(() => {
      this.router.navigate(['/auth/login']);
    });
  }
}
