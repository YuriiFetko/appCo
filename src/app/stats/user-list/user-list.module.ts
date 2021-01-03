import {NgModule} from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {UserListComponent} from './user-list.component';
import {UserListRoutingModule} from './user-list-routing.module';
import {UserPageComponent} from '../user-page/user-page.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {BreadcrumbModule} from 'xng-breadcrumb';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [UserListComponent, UserPageComponent],
  imports: [
    UserListRoutingModule,
    SharedModule,
    NgxPaginationModule,
    BreadcrumbModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class UserListModule {
}
