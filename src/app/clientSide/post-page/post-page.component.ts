import {Component, Input, OnInit} from '@angular/core';
import {UserServices} from '../../shared/services/user.services';
import {Post} from '../../shared/interfaces';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements OnInit {

  @Input() post: Post

  constructor(
    private userServices: UserServices
  ) { }

  ngOnInit(): void {
  }

}
