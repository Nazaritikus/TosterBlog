import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '@shared/shared.module';
import {ClientLayoutComponent} from './client-layout.component';
import { RouterModule, Routes} from '@angular/router';

const rotes: Routes = [
  {path: '', component: ClientLayoutComponent, children: [
      {
        path: 'homePage',
        loadChildren: () => import('../home/home.module').then(m => m.HomeModule),
      },
      {
        path: 'myPage',
        loadChildren: () => import('../myPage/my-page.module').then(m => m.MyPageModule),
      },
      {
        path: 'profile',
        loadChildren: () => import('../profilePage/profile-page.module').then(m => m.ProfilePageModule),
      },
      {
        path: 'subManager',
        loadChildren: () => import('../subscriptions/subscriptions.module').then(m => m.SubscriptionsModule),
      },
      {
        path: 'userPage/:id',
        loadChildren: () => import('../userPage/user-page.module').then(m => m.UserPageModule),
      },
      {
        path: 'settings',
        loadChildren: () => import('../setting/setting.module').then(m => m.SettingModule),
      },
    ]}
];

@NgModule({
  declarations: [ClientLayoutComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(rotes)
  ],
  exports: [RouterModule]
})
export class ClientLayoutModule { }
