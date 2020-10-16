import {Component, OnInit} from '@angular/core';
import {UserServices} from '@core/services';

@Component({
  selector: 'app-unsaved-edit-modal',
  templateUrl: './unsaved-edit-modal.component.html',
  styleUrls: ['./unsaved-edit-modal.component.scss']
})
export class UnsavedEditModalComponent implements OnInit {

  constructor(
    private userService: UserServices
  ) {
  }

  ngOnInit(): void {
  }

}
