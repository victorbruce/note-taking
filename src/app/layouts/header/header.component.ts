import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NoteService } from '../../services/note.service';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  private router = inject(Router);
  private noteService = inject(NoteService);
  readonly searchQuery = this.noteService.searchQuery;

  onSettingsClick() {
    this.router.navigate(['/settings']);
  }

  onSearchInput(event: Event) {
    const input = event.target as HTMLInputElement;
    console.log('input value', input.value);
    this.noteService.searchQuery.set(input.value);
  }
}
