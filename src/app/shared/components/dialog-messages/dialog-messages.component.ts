import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-messages',
  templateUrl: './dialog-messages.component.html',
  styleUrls: ['./dialog-messages.component.scss']
})
export class DialogMessagesComponent implements OnInit {

  message: string;
  title: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
    this.message = this.data.message;
    this.title = this.data.title;
  }
}
