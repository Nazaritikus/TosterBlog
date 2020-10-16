import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CurrentUserResolver, MyPageResolver, SubscriptionResolver} from '@core/resolvers';
import {AuthGuard} from '@core/guards/authGuard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
  }
  ,
  {
    path: 'client',
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/client-layout/client-layout.module').then(m => m.ClientLayoutModule),
    resolve: {
      user: CurrentUserResolver,
      posts: MyPageResolver,
      subsc: SubscriptionResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
