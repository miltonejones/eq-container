import { AfterViewChecked, Directive, ElementRef, Input, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { createElement, EQ_ELEMENT_CSS,  fullGrid, GRID_MASK_CSS,  setStyle, stopWatch } from "./constants/eq-audio-analyser-element.constants";
import { AudioAnalyserService } from "./audio-analyser.service";
import { EqDisplayType } from "./constants/eq-display-type.enum";
export const DIV_PREFIX = 'eq-graph-label-item-'
@Directive({
  selector: "[eq-graph-label]"
})
export class EqAudioAnalyserElementDirective implements AfterViewChecked, OnInit {
  @Input('eq-graph-label') type = EqDisplayType.BAR;
  @Input() color = 'white';
  @Input() debug = false;
  @Input() overlay = false;
  readonly analyst: AudioAnalyserService;
  readonly el: HTMLElement;
  private maskEl: HTMLElement = {} as HTMLElement;
  
  private subscription: Subscription = {} as Subscription;
  private subscribed = false;
  private responses = 0;
  private ex = '';
  private useOverlay = false;
  logged = false;
  constructor(el: ElementRef, an: AudioAnalyserService) {
    this.el = el.nativeElement;
    this.analyst = an;
  }
  ngOnInit(): void {
    this.mask();
  }
  unsubscribe(): void {
    if (this.subscription.unsubscribe) {
      console.log("UNSUBSCRIBING");
      this.subscription.unsubscribe();
      this.mask();
    }
  }
  mask(): void {
    this.el.innerText = '';
    setStyle(this.el, EQ_ELEMENT_CSS);
    const d = createElement('div', GRID_MASK_CSS);
    if (this.overlay) {
      console.log('overlay = %s', this.color)
      d.style.backgroundImage = `url(${fullGrid(this.color)})`;
    }
    this.el.append(d);
    this.el.style.backgroundColor = this.color;
    this.maskEl = d;
  }
  unpack(src: {data: any, elapsed: number}): void {
    this.display(src.data);
    this.responses ++;
    if (this.debug) {
      const avg = Math.floor(src.elapsed / this.responses);
      this.maskEl.innerText = `ticks: ${this.responses}, avg: ${avg}ms`;
      return;
    }
    this.maskEl.innerText = '';
    if (this.responses > Math.pow(2,15)) {
      this.responses = 0;
    }
  }
  unhook(type = EqDisplayType.BAR): void {
    this.unsubscribe();
    const ob = this.analyst.observers[type];
    if (ob) {
      this.subscription = stopWatch(ob).subscribe(src => this.unpack(src));
      console.log("subscribed", this.color);
      this.subscribed = true;
    }
  }
  div(id: string) {
    const d = document.getElementById(id);
    if (d) return d;
    const e = document.createElement('div');
    const s = {
      float: 'left',
      width: '4px',
      marginLeft: '1px',
      display: 'block'
    }
    e.id = id;
    setStyle(e, s);
    this.el.append(e);
    return e;
  }
  render(src: any[]) {
    this.el.style.display = 'flex';
    this.el.style.gap = '1px';
    src.map((coord, i) => {
      const d = this.div(DIV_PREFIX + coord.index);
      d.style.height = coord.actualHeight + 'px';
      d.style.width = coord.barWidth + 'px';
      d.style.minWidth = coord.barWidth + 'px';
      d.style.marginTop = 'auto';
      d.style.backgroundColor = coord.fillStyle;
    });
  }
  display(src: any): void {
    if (this.type === EqDisplayType.CSS) {
      this.render(src)
      return;
    }
    this.el.style.backgroundImage = `url(${src})`;
  }
  ngAfterViewChecked(): void {
    if (this.type !== this.ex) {
      this.subscribed = false;
    }
    if (this.useOverlay !== this.overlay) {
      this.mask();
      this.useOverlay = this.overlay;
    }
    if (!this.subscribed) {
       this.unhook(this.type);      
       this.ex = this.type;
    }
  }
}

// 