import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PageNotFoundComponent} from './page-not-found.component';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '@shared/shared.module';

const routes: Routes = [
  {
    path: '', component: PageNotFoundComponent
  }
]

@NgModule({
  declarations: [
    PageNotFoundComponent
  ],
  providers: [],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class PageNotFoundModule {

}
