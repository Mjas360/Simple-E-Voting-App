import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TmodelPageRoutingModule } from './tmodel-routing.module';

import { TmodelPage } from './tmodel.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TmodelPageRoutingModule
  ],
  declarations: [TmodelPage]
})
export class TmodelPageModule {}
