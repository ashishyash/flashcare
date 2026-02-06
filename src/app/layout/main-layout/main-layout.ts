import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { Header } from '../header/header';
import { Sidenav } from '../sidenav/sidenav';

@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet, MatSidenavModule, Header, Sidenav],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.scss',
})
export class MainLayout {
  sidenavOpened = true;

  toggleSidenav() {
    this.sidenavOpened = !this.sidenavOpened;
  }
}
