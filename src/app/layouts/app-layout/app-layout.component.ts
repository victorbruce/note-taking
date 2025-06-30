import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { HeaderComponent } from "../header/header.component";
import { BottomNavComponent } from "../bottom-nav/bottom-nav.component";

@Component({
  selector: 'app-app-layout',
  imports: [RouterModule, SidebarComponent, HeaderComponent, BottomNavComponent],
  templateUrl: './app-layout.component.html',
  styleUrl: './app-layout.component.scss',
})
export class AppLayoutComponent {

  addNote() {}
}
