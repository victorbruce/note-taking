import { Routes } from '@angular/router';

// pages
import { NotesComponent } from './pages/notes/notes.component';
import { ArchivedComponent } from './pages/archived/archived.component';
import { AddNoteComponent } from './pages/add-note/add-note.component';
import { NoteDetailComponent } from './pages/note-detail/note-detail.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';

export const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent,
  },
  {
    path: 'notes',
    component: NotesComponent,
  },
  {
    path: 'notes/:id',
    component: NoteDetailComponent,
  },
  {
    path: 'archived',
    component: ArchivedComponent,
  },
  {
    path: 'create',
    component: AddNoteComponent,
  },
];
