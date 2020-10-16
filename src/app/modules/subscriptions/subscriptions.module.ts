import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '@shared/shared.module';
import {RouterModule} from '@angular/router';
import {SubscriptionManagerPageComponent} from './subscription-manager-page.component';
import {SmallUserSectionComponent} from './components/small-user-section/small-user-section.component';

@NgModule({
  declarations: [SubscriptionManagerPageComponent, SmallUserSectionComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([{path: '', component: SubscriptionManagerPageComponent}])
  ],
  exports: [RouterModule]
})
export class SubscriptionsModule { }
