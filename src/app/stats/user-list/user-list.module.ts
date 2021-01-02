import {NgModule} from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {UserListComponent} from './user-list.component';
import {UserListRoutingModule} from './user-list-routing.module';
import {UserPageComponent} from '../user-page/user-page.component';
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
  declarations: [UserListComponent, UserPageComponent],
  imports: [
    UserListRoutingModule,
    SharedModule,
    NgxPaginationModule
  ]
})
export class UserListModule {
}
