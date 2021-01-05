import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainComponent} from './main.component';

const routes: Routes = [
  {
    path: '', component: MainComponent
  },
  {
    path: 'user-statistics', loadChildren: () => import('../stats/user-list/user-list.module').then(mod => mod.UserListModule),
    data: {breadcrumb: 'User statistics'}
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class MainRoutingModule {
}
