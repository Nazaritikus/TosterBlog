import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserServices} from '@core/services';
import {NumbersResp} from '@shared/interfaces';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-numbers',
  templateUrl: './randomNumberGenerator.component.html',
  styleUrls: ['./randomNumberGenerator.component.scss']
})
export class RandomNumberGeneratorComponent implements OnInit, OnDestroy {

  number: number;
  text: string;

  numbersSub: Subscription;

  constructor(
    private userServices: UserServices
  ) {
  }

  ngOnInit(): void {
    this.getNumber();
  }

  getNumber() {
    this.numbersSub = this.userServices.getNumbers().subscribe((resp: NumbersResp) => {
      this.number = resp.number;
      this.text = resp.text;
    });
  }

  ngOnDestroy(): void {
    if (this.numbersSub) {
      this.numbersSub.unsubscribe();
    }
  }
}
