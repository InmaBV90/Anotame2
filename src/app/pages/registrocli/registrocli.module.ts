import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistrocliPageRoutingModule } from './registrocli-routing.module';

import { RegistrocliPage } from './registrocli.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistrocliPageRoutingModule
  ],
  declarations: [RegistrocliPage]
})
export class RegistrocliPageModule {}
