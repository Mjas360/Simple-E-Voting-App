import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PixmodelPageRoutingModule } from './pixmodel-routing.module';

import { PixmodelPage } from './pixmodel.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PixmodelPageRoutingModule
  ],
  declarations: [PixmodelPage]
})
export class PixmodelPageModule {}
