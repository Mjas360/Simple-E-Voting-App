import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TmodelPage } from './tmodel.page';

const routes: Routes = [
  {
    path: '',
    component: TmodelPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TmodelPageRoutingModule {}
