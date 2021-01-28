import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedDbComponent } from './shared-db/shared-db.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '',
    component: SharedDbComponent,
  },
];


@NgModule({
  declarations: [SharedDbComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class TestModule { }
