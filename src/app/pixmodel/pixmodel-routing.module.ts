import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PixmodelPage } from './pixmodel.page';

const routes: Routes = [
  {
    path: '',
    component: PixmodelPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PixmodelPageRoutingModule {}
