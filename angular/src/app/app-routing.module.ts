import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedDbComponent } from './test/shared-db/shared-db.component';


const routes: Routes = [
  {
    path: 'test',
    loadChildren: () => import('./test/test.module').then(m => m.TestModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
