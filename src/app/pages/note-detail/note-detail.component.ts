import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-note-detail',
  imports: [CommonModule, FormsModule],
  templateUrl: './note-detail.component.html',
  styleUrl: './note-detail.component.scss',
})
export class NoteDetailComponent {
  @Input() noteId?: string;
  @Input() title: string = '';
@Input() content: string = ''
  @Input() tags: string[] = [];
  @Input() lastEdited: string = '';

  @Output() save = new EventEmitter<{
    title: string;
    content: string;
    tags: string[];
  }>();
  @Output() cancel = new EventEmitter<void>();
  @Output() archive = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();

  onSave() {
    const tagArray = this.tagsString
      .split(',')
      .map((t) => t.trim())
      .filter((t) => !!t);
    this.save.emit({
      title: this.title ?? '',
      content: this.content ?? '',
      tags: tagArray,
    });
  }

  onCancel() {
    this.cancel.emit();
  }

  get tagsString(): string {
    return this.tags.join(', ');
  }

  set tagsString(value: string) {
    this.tags = value.split(',').map((t) => t.trim());
  }

  // toggleMenu() {
  //   this.showMoreMenu = !this.showMoreMenu;
  // }
}
