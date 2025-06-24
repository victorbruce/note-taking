import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-notes',
  imports: [],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.scss',
})
export class NotesComponent {
  private auth = inject(AuthService);
  private router = inject(Router);

  async handleLogout() {
    this.auth.signOut().then(() => {
      this.router.navigate(['/login']);
    });
  }
}
