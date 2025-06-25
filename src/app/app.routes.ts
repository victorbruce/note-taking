import { Routes } from '@angular/router';

// pages
import { NotesComponent } from './pages/notes/notes.component';
import { ArchivedComponent } from './pages/archived/archived.component';
import { AddNoteComponent } from './pages/add-note/add-note.component';
import { NoteDetailComponent } from './pages/note-detail/note-detail.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'notes',
    component: NotesComponent,
    canActivate: [authGuard],
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
  { path: '**', component: PageNotFoundComponent },
];
