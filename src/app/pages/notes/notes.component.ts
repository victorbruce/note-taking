import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NoteService } from '../../services/note.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notes',
  imports: [CommonModule],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.scss',
})
export class NotesComponent implements OnInit {
  private auth = inject(AuthService);
  private noteService = inject(NoteService);
  private router = inject(Router);

  notes = this.noteService.notes;
  error: string | null = null;

  ngOnInit() {
    this.noteService.loadNotes();
  }

  async handleLogout() {
    this.auth.signOut().then(() => {
      this.router.navigate(['/login']);
    });
  }

  async toggleArchived() {
    try {
      await this.noteService.toggleArchived(
        '10793e8b-0b99-45c8-afb5-4fa03ecc461f'
      );
    } catch (error) {
      this.error = 'Failed to toggle';
      console.error(error);
    }
  }

  // async fetchNotes() {
  //   console.log('notes fetching');
  //   try {
  //     const notes = await this.noteService.getAllNotes();
  //     this.notes = notes as any[];
  //     console.log('notes success', notes);
  //   } catch (error) {
  //     console.log('error', error);
  //   }
  // }

  // async fetchTags() {
  //   console.log('fetching tags');
  //   try {
  //     const tags = await this.noteService.getTags();
  //     this.tags = tags as any;
  //     console.log('from component', tags);
  //   } catch (error) {
  //     console.error(error)
  //   }
  // }
}
