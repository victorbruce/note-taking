import { Routes } from '@angular/router';

// pages
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { authGuard } from './guards/auth.guard';
import { NotesComponent } from './pages/notes/notes.component';
import { NotesResolver } from './pages/notes/notes-resolver.resolver';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'notes',
    pathMatch: 'full',
  },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: RegisterComponent },
  {
    path: '',
    canActivate: [authGuard],
    children: [
      {
        path: 'notes',
        component: NotesComponent,
        resolve: { notesData: NotesResolver },
      },
      {
        path: 'archived',
        loadComponent: () =>
          import('./pages/archived/archived.component').then(
            (c) => c.ArchivedComponent
          ),
      },
      {
        path: 'create',
        loadComponent: () =>
          import('./pages/new-note/new-note.component').then(
            (c) => c.NewNoteComponent
          ),
      },
      {
        path: 'settings',
        loadComponent: () =>
          import('./pages/settings/settings.component').then(
            (c) => c.SettingsComponent
          ),
      },
    ],
  },
  { path: '**', component: PageNotFoundComponent },
];
