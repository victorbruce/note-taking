import { Injectable } from '@angular/core';
import { Note } from '../models/note';
import { BehaviorSubject, Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  private notesSubject = new BehaviorSubject<Note[]>([]);
  notes$ = this.notesSubject.asObservable();

  constructor() {}

  getAllNotes(): Observable<Note[]> {
    return this.notes$;
  }

  getNoteById(id: string): Note | undefined {
    return this.notesSubject.value.find((note) => note.id === id);
  }

  createNote(note: Note): void {
    const newNote: Note = {
      ...note,
      id: note.id || crypto.randomUUID(),
      createdAt: note.createdAt || new Date(),
      updatedAt: new Date(),
    };

    const currentNotes = this.notesSubject.value;
    this.notesSubject.next([...currentNotes, newNote]);
  }

  updateNote(id: string, data: Partial<Note>): void {
    const updatedNotes = this.notesSubject.value.map((note) => {
      if (note.id === id) {
        return {
          ...note,
          ...data,
          updatedAt: new Date(),
        };
      }
      return note;
    });

    this.notesSubject.next(updatedNotes);
  }

  deleteNote(id: string): void {
    const filtered = this.notesSubject.value.filter((note) => note.id !== id);
    this.notesSubject.next(filtered);
  }

  toggleArchive(id: string): void {
    const updatedNotes = this.notesSubject.value.map((note) =>
      note.id === id
        ? { ...note, isArchived: !note.isArchived, updatedAt: new Date() }
        : note
    );

    this.notesSubject.next(updatedNotes);
  }

  getArchivedNotes(): Observable<Note[]> {
    return this.getAllNotes().pipe(
      map((notes) => notes.filter((note) => note.isArchived))
    );
  }

  getActiveNotes(): Observable<Note[]> {
    return this.getAllNotes().pipe(
      map((notes) => notes.filter((note) => !note.isArchived))
    );
  }

  searchNotes(query: string): Observable<Note[]> {
    const lowerQuery = query.toLowerCase();
    return this.getAllNotes().pipe(
      map((notes) =>
        notes.filter(
          (note) =>
            note.title.toLowerCase().includes(lowerQuery) ||
            note.content.toLowerCase().includes(lowerQuery) ||
            note.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))
        )
      )
    );
  }
}
