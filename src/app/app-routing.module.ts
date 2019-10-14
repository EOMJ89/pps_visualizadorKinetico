import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth/auth.guard';
import { AuthLoginGuard } from './guards/auth-login/auth-login.guard';

const routes: Routes = [
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule', canActivate: [AuthLoginGuard] },
  {
    path: '',
    loadChildren: './tabs/tabs.module#TabsPageModule',
    canActivate: [AuthGuard],
  },
  /* { path: 'fullscreen', loadChildren: './pages/fullscreen/fullscreen.module#FullscreenPageModule' }, 
    { path: 'carga', loadChildren: './pages/carga/carga.module#CargaPageModule' }, 
    { path: 'estadisticas', loadChildren: './pages/estadisticas/estadisticas.module#EstadisticasPageModule' },
    { path: 'propias', loadChildren: './pages/propias/propias.module#PropiasPageModule' },
    { path: 'lindas', loadChildren: './pages/lindas/lindas.module#LindasPageModule' },
    { path: 'feas', loadChildren: './pages/feas/feas.module#FeasPageModule' },
    { path: 'home', loadChildren: './pages/home/home.module#HomePageModule' } */
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
