import {Directive, ElementRef, Input} from '@angular/core';

@Directive({
  selector: '[appValidator]'
})
export class ValidationMessageDirective {

  @Input() message: string;

  constructor(private element: ElementRef) {
  }

  @Input() set appValidator(condition: boolean) {
    condition ? this.element.nativeElement.innerText = this.message : this.element.nativeElement.innerText = '';
  }

}
