import {Directive, ElementRef, Input} from '@angular/core';

@Directive({
  selector: '[appValidator]'
})
export class ValidatorDirective {

  @Input() message: string
  @Input() set appValidator(condition: boolean) {
    condition ? this.element.nativeElement.innerText = this.message : this.element.nativeElement.innerText = ''
  }

  constructor(private element: ElementRef) {
  }

}
