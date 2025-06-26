import { Injectable, inject, signal, computed } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { AuthService } from './auth.service';
import { Note } from '../models/note';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  private supabase = inject(SupabaseService);
  private authService = inject(AuthService);

  notes = signal<Note[]>([]);
  archivedNotes = computed(() =>
    this.notes().filter((note) => note.is_archived)
  );

  constructor() {}

  async loadNotes() {
    try {
      const data = await this.getAllNotes();
      this.notes.set(data);
    } catch (err) {
      console.error('Failed to load notes:', err);
    }
  }

  async getAllNotes() {
    const { data, error } = await this.supabase.client.rpc(
      'get_user_notes_with_tags',
      {
        user_id: this.authService.userId,
      }
    );
    if (error) throw error;
    return data;
  }

  async createNote() {
    try {
      const { data, error } = await this.supabase.client.rpc(
        'create_note_with_tags',
        {
          p_user_id: this.authService.userId,
          p_title: 'This will be deleted',
          p_content:
            'When I run the delete operation, this should be deleted from the database including it component table reference of note_tag',
          p_is_archived: false,
          p_tag_names: ['supabase', 'angular', 'rxjs'],
        }
      );
      if (error) throw error;

      this.notes.update((prev) => [...prev, data]);
      console.log('Note created:', data);
      return data;
    } catch (error) {
      console.log('Error creating note', error);
      return null;
    }
  }

  async getNotesById(noteId: string = 'a41e40ab-be35-4096-839b-4cf112e38cce') {
    try {
      const { data, error } = await this.supabase.client.rpc(
        'get_note_with_tags',
        {
          p_note_id: noteId,
          p_user_id: this.authService.userId,
        }
      );
      if (error) throw error;

      console.log('Single note:', data);
      return data;
    } catch (error) {
      console.error('Error fetching note by ID:', error);
      return null;
    }
  }

  async getTags() {
    try {
      const { data, error } = await this.supabase.client
        .from('tags')
        .select('name');
      if (error) throw error;

      console.log('Tags:', data);
      return data;
    } catch (error) {
      console.error('Error fetching tags:', error);
      return null;
    }
  }

  async deleteNoteById(
    noteId: string = '4b34189f-a81d-4ab3-8392-5e70d35159d5'
  ) {
    try {
      const { error } = await this.supabase.client
        .from('notes')
        .delete()
        .eq('id', noteId);
      if (error) throw error;

      this.notes.update((prev) => prev.filter((note) => note.id !== noteId));
      console.log('Note deleted successfully:');
      return true;
    } catch (error) {
      console.error('Failed to delete note:', error);
      return false;
    }
  }

  async updateNote(noteId: string = '10793e8b-0b99-45c8-afb5-4fa03ecc461f') {
    try {
      const { data, error } = await this.supabase.client.rpc(
        'update_note_with_tags',
        {
          p_note_id: noteId,
          p_user_id: this.authService.userId,
          p_title: 'My note title with firebase',
          p_content: 'Updated content here',
          p_is_archived: false,
          p_tag_names: ['firebase', 'angular'],
        }
      );
      if (error) throw error;

      this.notes.update((prev) =>
        prev.map((note) => (note.id === noteId ? data : note))
      );

      console.log('Note updated:', data);
      return data;
    } catch (error) {
      console.error('Error updating note:', error);
      return null;
    }
  }

  async toggleArchived(noteId: string) {
    try {
      const { data, error } = await this.supabase.client.rpc(
        'toggle_note_archive',
        {
          p_note_id: noteId,
          p_user_id: this.authService.userId,
        }
      );

      if (error) throw error;

      const newArchivedValue = data?.[0]?.is_archived;

      // Optionally update local store
      this.notes.update((prev) =>
        prev.map((note) =>
          note.id === noteId ? { ...note, is_archived: newArchivedValue } : note
        )
      );

      console.log('Toggle archived successful');
    } catch (error) {
      console.error('Toggle failed:', error);
    }
  }
}
