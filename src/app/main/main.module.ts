import {NgModule} from '@angular/core';
import {MainComponent} from './main.component';
import {MainRoutingModule} from './main-routing.module';
import {SharedModule} from '../shared/shared.module';
import {BreadcrumbModule} from 'xng-breadcrumb';


@NgModule({
  declarations: [MainComponent],
    imports: [
        MainRoutingModule,
        SharedModule,
        BreadcrumbModule
    ]
})
export class MainModule {
}
