import {NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {StatsComponent} from './stats.component';
import {StatsRoutingModule} from './stats-routing.module';
import { UserPageComponent } from './user-page/user-page.component';


@NgModule({
  declarations: [StatsComponent, UserPageComponent],
  imports: [
    StatsRoutingModule,
    SharedModule
  ]
})
export class StatsModule {
}
