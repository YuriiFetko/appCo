import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

const routes: Routes = [
  {
    path: '', redirectTo: 'main-page', pathMatch: 'full'
  },
  {
    path: 'main-page', loadChildren: () => import('./main/main.module').then(mod => mod.MainModule),
    data: {breadcrumb: 'Main Page'}
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
