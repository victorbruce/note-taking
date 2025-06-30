import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  activeSection: string = '';
  tags = ['react', 'typescript'];
  private routerSub!: Subscription;
  private router = inject(Router);

  ngOnInit(): void {
    // Set active on load
    this.setActiveSection(this.router.url);

    // Listen to navigation changes
    this.routerSub = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.setActiveSection(event.urlAfterRedirects);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.routerSub) {
      this.routerSub.unsubscribe();
    }
  }

  private setActiveSection(url: string): void {
    const pathSegment = url.split('/')[1]; // e.g., 'notes' from '/notes'
    this.activeSection = pathSegment;
  }

  handleSectionClick(section: string): void {
    this.activeSection = section;
    this.router.navigate([`/${section}`]);
  }
}
