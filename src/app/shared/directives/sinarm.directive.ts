import { Directive, ElementRef, EventEmitter, HostListener, OnInit, Output } from '@angular/core';

import { SinarmPipe } from '../pipes/sinarm.pipe';

@Directive({
  selector: '[sinarmDirective]',
  standalone: true
})
export class SinarmDirective implements OnInit{

  private el: HTMLInputElement;
  @Output() onPressEnter: EventEmitter<any> = new EventEmitter();
  arrayNumber:any[] = ["0","1","2","3","4","5","6","7","8","9"];
  arrayFunction:any[] = [, "ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"]

  constructor(
    private elementRef: ElementRef,
    private sinarmPipe: SinarmPipe
  ) {
    this.el = this.elementRef.nativeElement;
  }

  ngOnInit() {
    this.el.value = this.sinarmPipe.transform(this.el.value);
  }

  @HostListener("blur", ["$event.target.value"])
  onBlur(value:string) {
    this.el.value = this.sinarmPipe.transform(value);
  }

  @HostListener('keyup', ['$event']) onKeyUp(event: KeyboardEvent) {
    console.log(event);
    console.log(this.el.value);
    if (event.key == "Enter"){
      this.onPressEnter.emit(null);
    }else if(this.arrayFunction.indexOf(event.key)<0){
      this.el.value=this.sinarmPipe.transform(this.el.value);
    }
  }

}
