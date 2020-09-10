import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { DialogMessagesComponent } from './dialog-messages/dialog-messages.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {QuillModule} from 'ngx-quill';

@NgModule({
  imports: [
    HttpClientModule,
    MatDialogModule,
    MatButtonModule,
    QuillModule.forRoot({
      modules: {
        toolbar: [
          ['bold', 'italic', 'underline'],        // toggled buttons
          ['blockquote', 'code-block'],

          [{ 'list': 'ordered'}, { 'list': 'bullet' }],

          [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown

          [{ 'color': [] }],
          [{ 'align': [] }],

          ['link', 'image']                         // link and image, video
        ]
      }
    })
  ],
  exports: [
    HttpClientModule,
    QuillModule
  ],
  declarations: [DialogMessagesComponent]
})
export class SharedModule {

}
