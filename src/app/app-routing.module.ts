import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

const routes: Routes = [
  {
    path: 'main', loadChildren: () => import('./main/main.module').then(mod => mod.MainModule)
  },
  {
    path: 'stats', loadChildren: () => import('./stats/stats.module').then(mod => mod.StatsModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
