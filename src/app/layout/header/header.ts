import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatDivider } from '@angular/material/divider';

@Component({
  selector: 'app-header',
  imports: [MatToolbarModule, MatIconModule, MatButtonModule, MatMenuModule, MatDivider ],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  @Output() toggleSidenav = new EventEmitter<void>();

  constructor(private readonly router: Router) {}

  onToggle() {
    this.toggleSidenav.emit();
  }

  onLogout() {
    this.router.navigate(['/login']);
  }
}
