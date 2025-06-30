import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NoteService } from '../../services/note.service';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';
import { Note } from '../../models/note';

@Component({
  selector: 'app-notes',
  imports: [CommonModule, DatePipe],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.scss',
})
export class NotesComponent implements OnInit {
  private noteService = inject(NoteService);
  private router = inject(Router);

  readonly notes = this.noteService.filteredNotes;
  readonly searchQuery = this.noteService.searchQuery;

  error: string | null = null;

  // isActive = false;
  activeNote: Note | null = null;

  ngOnInit() {
    this.noteService.loadNotes();

    const notes = this.notes();
    if (notes.length > 0) {
      this.activeNote = notes[0];
    }

    console.log('not', this.activeNote);
  }

  async addNote() {
    try {
      await this.noteService.createNote();
      alert('note created');
    } catch (error) {}
  }

  onSave(data: any) {}

  onCancel() {}

  onDelete() {}

  onArchive() {}

  onCardClick(note: any) {
    this.activeNote = note;
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

  onSearchInput(event: Event) {
    const input = event.target as HTMLInputElement;
    console.log('input value', input.value);
    this.noteService.searchQuery.set(input.value);
  }

  async deleteNote(event: Event, noteId: string) {
    event.stopPropagation(); // prevent triggering card click
    const confirmed = confirm('Are you sure you want to delete this note?');
    if (!confirmed) return;

    const success = await this.noteService.deleteNoteById(noteId);
    if (!success) {
      this.error = 'Failed to delete note';
    }
  }
}
