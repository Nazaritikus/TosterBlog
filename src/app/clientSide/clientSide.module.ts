import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import { ClientLayoutComponent } from './shared/client-layout/client-layout.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { MyPageComponent } from './my-page/my-page.component';
import { AddNewPostPageComponent } from './add-new-post-page/add-new-post-page.component';
import { SubscriptionManagerPageComponent } from './subscription-manager-page/subscription-manager-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import {SharedModule} from '../shared/shared.module';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {AuthServices} from '../shared/services/auth.services';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatTabsModule} from '@angular/material/tabs';
import {ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { NumbersComponent } from './numbers/numbers.component';
import { BgControlDirective } from './shared/bg-control.directive';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { PostPageComponent } from './post-page/post-page.component';
import {MyPageResolver} from '../shared/services/myPageResolver';
import { SmallUserSectionComponent } from './small-user-section/small-user-section.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { UserPageComponent } from './user-page/user-page.component';
import {SubscriptionResolver} from '../shared/services/subscription.resolver';
import {SearchPipe} from './shared/search.pipe';

const routes: Routes = [
  {path: '', component: ClientLayoutComponent, children: [
      {path: '', redirectTo: '/client/myPage' ,pathMatch: 'full'},
      {
          path: 'myPage',
          component: MyPageComponent,
          resolve: {
              posts: MyPageResolver
          }},
      {path: 'homePage', component: HomePageComponent},
      {path: 'profile', component: ProfilePageComponent},
      {path: 'userPage/:localId', component: UserPageComponent},
      {
        path: 'subManager',
        component: SubscriptionManagerPageComponent,
        resolve: {
          subs: SubscriptionResolver
        }
      }
    ]}
]

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        SharedModule,
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        MatMenuModule,
        MatGridListModule,
        MatSidenavModule,
        MatTabsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatCardModule,
        MatDialogModule,
        MatProgressSpinnerModule,
        MatExpansionModule
    ],
  exports: [RouterModule],
  declarations: [
    ClientLayoutComponent,
    ProfilePageComponent,
    MyPageComponent,
    AddNewPostPageComponent,
    SubscriptionManagerPageComponent,
    HomePageComponent,
    NumbersComponent,
    BgControlDirective,
    PostPageComponent,
    SmallUserSectionComponent,
    UserPageComponent,
    SearchPipe
  ],
  providers: [AuthServices]
})
export class ClientSideModule {

}
