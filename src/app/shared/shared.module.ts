import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {QuillModule} from 'ngx-quill';
import {AddEditPostModalComponent, DialogMessagesComponent, PostPageComponent} from '@shared/components';
import {HomePageAnimationDirective, UserCoverPhotoDirective, ValidationMessageDirective} from '@shared/directives';
import {FilterPipe} from '@shared/pipes';
import {CommonModule} from '@angular/common';

import {MatTabsModule} from '@angular/material/tabs';
import {MatCardModule} from '@angular/material/card';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSliderModule} from '@angular/material/slider';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatStepperModule} from '@angular/material/stepper';
import {MatNativeDateModule} from '@angular/material/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
// import {EarthLoaderComponent} from './components/earth-loader/earth-loader.component';
// import {UnsavedEditsModalComponent} from './components/unsaved-edits-modal/unsaved-edits-modal.component';
import {UnsavedEditModalComponent} from './components/unsaved-edit-modal/unsaved-edit-modal.component';
import { EarthLoaderComponent } from './components/earth-loader/earth-loader.component';

const MATERIAL_LIBS = [
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatIconModule,
  MatStepperModule,
  MatSelectModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatToolbarModule,
  MatMenuModule,
  MatGridListModule,
  MatSidenavModule,
  MatTabsModule,
  MatDialogModule,
  MatProgressSpinnerModule,
  MatExpansionModule,
  MatSliderModule
];

@NgModule({
  imports: [
    HttpClientModule,
    ReactiveFormsModule,
    ...MATERIAL_LIBS,
    QuillModule.forRoot({
      modules: {
        toolbar: [
          ['bold', 'italic', 'underline'],        // toggled buttons
          ['blockquote', 'code-block'],

          [{list: 'ordered'}, {list: 'bullet'}],

          [{size: ['small', false, 'large', 'huge']}],  // custom dropdown

          [{color: []}],
          [{align: []}],

          ['link', 'image']                         // link and image, video
        ]
      }
    }),
    CommonModule
  ],
  exports: [
    HttpClientModule,
    ...MATERIAL_LIBS,
    ReactiveFormsModule,
    QuillModule,
    FilterPipe,
    ValidationMessageDirective,
    PostPageComponent,
    HomePageAnimationDirective,
    UserCoverPhotoDirective
  ],
  providers: [],
  declarations: [
    DialogMessagesComponent,
    PostPageComponent,
    AddEditPostModalComponent,
    HomePageAnimationDirective,
    UserCoverPhotoDirective,
    ValidationMessageDirective,
    FilterPipe,
    UnsavedEditModalComponent,
    EarthLoaderComponent
  ]
})
export class SharedModule {

}
