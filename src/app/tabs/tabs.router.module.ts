import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        children: [
          {
            path: '',
            loadChildren: '../pages/home/home.module#HomePageModule'
          }
        ]
      },
      {
        path: 'lindas',
        children: [
          {
            path: '',
            loadChildren: '../pages/lindas/lindas.module#LindasPageModule'
          },
        ]
      },
      {
        path: 'feas',
        children: [
          {
            path: '',
            loadChildren: '../pages/feas/feas.module#FeasPageModule'
          },
        ]
      },
      {
        path: 'propias',
        children: [
          {
            path: '',
            loadChildren: '../pages/propias/propias.module#PropiasPageModule'
          },
        ]
      },
      {
        path: 'estadisticas',
        children: [
          {
            path: '',
            loadChildren: '../pages/estadisticas/estadisticas.module#EstadisticasPageModule'
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
      }
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule { }
