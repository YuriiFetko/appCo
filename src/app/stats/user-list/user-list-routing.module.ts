import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserListComponent} from './user-list.component';
import {UserPageComponent} from '../user-page/user-page.component';

const routes: Routes = [
  {
    path: '', component: UserListComponent,
  },
  {
    path: 'user/:id', component: UserPageComponent,
    data: {
      breadcrumb: {
        alias: 'user'
      }
    }
  },
  {
    path: '**', redirectTo: '', pathMatch: 'full'
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
export class UserListRoutingModule {
}
