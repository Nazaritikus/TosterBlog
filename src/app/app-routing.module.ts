import { NgModule } from '@angular/core';
import {Routes, RouterModule, PreloadAllModules} from '@angular/router';
import {CurrentResolver} from './shared/services/current.resolver';
import {MyPageResolver} from './shared/services/myPageResolver';
import {SubscriptionResolver} from './shared/services/subscription.resolver';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./welcome/welcome.module').then(m => m.WelcomeModule)
  },
  {
    path: 'client', loadChildren: () => import('./clientSide/clientSide.module').then(m => m.ClientSideModule),
    resolve: {
      user: CurrentResolver,
      posts: MyPageResolver,
      subsc: SubscriptionResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
