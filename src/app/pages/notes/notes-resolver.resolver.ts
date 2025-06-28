import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { NoteService } from '../../services/note.service';

@Injectable({ providedIn: 'root' })
export class NotesResolver implements Resolve<void> {
  constructor(private notes: NoteService) {}

  async resolve() {
    await this.notes.loadNotes();
  }
}
