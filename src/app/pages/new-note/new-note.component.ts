import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NoteService } from '../../services/note.service';

@Component({
  selector: 'app-new-note',
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './new-note.component.html',
  styleUrl: './new-note.component.scss',
})
export class NewNoteComponent {
  private fb: FormBuilder = inject(FormBuilder);
  private noteService = inject(NoteService);
  createNoteForm!: FormGroup;

  constructor() {
    this.createNoteForm = this.fb.group({
      title: this.fb.control(''),
      tags: this.fb.control(''),
      content: this.fb.control(''),
    });
  }

  createNote() {
    const formValues = this.createNoteForm.value;
    console.log('form values', formValues);
  }

  async deleteNote() {
    console.log('delete running');
    try {
      await this.noteService.deleteNoteById();
    } catch (error) {
      console.log(error);
    }
  }

  async editNote() {
    console.log('edit running');
    try {
      await this.noteService.updateNote();
    } catch (error) {
      console.log('error:', error);
    }
  }

  async getNote() {
    console.log('get note running');
    try {
      await this.noteService.getNotesById();
    } catch (error) {
      console.log('error', error)
    }
  }

  async demo() {
    console.log('runnning');
    await this.noteService.createNote();
    // const res = await this.noteService.dummy();

    // console.log('running dummy', res);
  }
}
