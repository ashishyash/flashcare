import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-sidenav',
  imports: [RouterLink, RouterLinkActive, MatListModule, MatIconModule],
  templateUrl: './sidenav.html',
  styleUrl: './sidenav.scss',
})
export class Sidenav {
  menuItems = [
    { path: '/dashboard', icon: 'dashboard', label: 'Dashboard' },
    { path: '/patients', icon: 'people', label: 'Patients' },
    { path: '/appointments', icon: 'event', label: 'Appointments' },
    { path: '/settings', icon: 'settings', label: 'Settings' },
  ];
}
