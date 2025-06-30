import { Component } from '@angular/core';

@Component({
  selector: 'app-bottom-nav',
  imports: [],
  templateUrl: './bottom-nav.component.html',
  styleUrl: './bottom-nav.component.scss',
})
export class BottomNavComponent {
  addNote() {
    // Add note functionality
    console.log('Add note clicked');
  }

  onHomeClick() {
    console.log('Home clicked');
  }

  onSearchClick() {
    console.log('Search clicked');
  }

  onFoldersClick() {
    console.log('Folders clicked');
  }

  onTagsClick() {
    console.log('Tags clicked');
  }

  onSettingsClick() {
    console.log('Settings clicked');
  }
}
