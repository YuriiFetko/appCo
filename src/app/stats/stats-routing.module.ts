import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {StatsComponent} from './stats.component';
import {UserPageComponent} from './user-page/user-page.component';

const routes: Routes = [
  {
    path: '', component: StatsComponent,
    children: [
      {
        path: '/user/:id', component: UserPageComponent
      }
    ]
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
export class StatsRoutingModule {
}
