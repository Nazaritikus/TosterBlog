import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AngularFireModule} from '@angular/fire';
import {AngularFireStorageModule} from '@angular/fire/storage';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {SharedModule} from '@shared/shared.module';
import {environment} from '../environments/environment.prod';
import {CoreModule} from '@core/core.module';
import { SettingComponent } from './modules/setting/setting.component';


@NgModule({
  declarations: [
    AppComponent,
    SettingComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CoreModule,
    AngularFireModule.initializeApp(environment),
    AngularFireStorageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
