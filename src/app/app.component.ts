import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

  componentes!: Observable<Component[]>;
  isDarkMode: any;

  constructor(
    private menu: MenuController,
  ) { }

  ngOnInit() {
    this.componentes;
  }

  mostrarMenu() {
    this.menu.open('first');
  }
}