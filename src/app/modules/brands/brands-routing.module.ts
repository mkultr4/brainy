import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrandsContentComponent } from './brands-content/brands-content.component';

const routes: Routes = [
  { path: '', component: BrandsContentComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BrandsRoutingModule { }
