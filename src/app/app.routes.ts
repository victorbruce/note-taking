import { Routes } from '@angular/router';

// pages
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { authGuard } from './guards/auth.guard';
import { NotesComponent } from './pages/notes/notes.component';

export const routes: Routes = [
  {
    path: '',
    component: NotesComponent,
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: '',
    canActivate: [authGuard],
    children: [
      {
        path: 'notes',
        loadChildren: () =>
          import('./pages/notes/notes.component').then((c) => c.NotesComponent),
      },
      {
        path: 'archived',
        loadChildren: () =>
          import('./pages/archived/archived.component').then(
            (c) => c.ArchivedComponent
          ),
      },
      {
        path: 'create',
        loadChildren: () =>
          import('./pages/new-note/new-note.component').then(
            (c) => c.NewNoteComponent
          ),
      },
    ],
  },
  { path: '**', component: PageNotFoundComponent },
];
