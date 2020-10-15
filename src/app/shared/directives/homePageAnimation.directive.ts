import {Directive, ElementRef, HostListener, Input} from '@angular/core';

@Directive({
  selector: '[appTransformDirective]'
})
export class HomePageAnimationDirective {

  @Input() elementType: string;

  constructor(private el: ElementRef) { }

  @HostListener('window:scroll', ['$event']) onPageScroll(event){
    let scroll = event.target.scrollingElement.scrollTop

    switch (this.elementType) {
      case 'bg': this.transform(`scale(${event.target.scrollingElement.scrollTop/5000 + 1})`)
        break;
      case 'leftM':
      case 'rightM':
        this.transform(`translate3d(${scroll * (this.elementType === 'rightM' ? 1 : -1)}px, 0, 0 ) scale(${scroll/450 + 1})`)
        this.el.nativeElement.style.zIndex = scroll < 430 ? 1 : 0
        break;
      case 'fog':
        this.transform(`scale(${scroll/400 + 1})`);
        this.el.nativeElement.style.opacity = 1 - scroll/500
        this.el.nativeElement.style.zIndex = scroll < 430 ? 2 : 0
        break;
    }
  }

  private transform(action: string){
    this.el.nativeElement.style.transform = action
  }

}
