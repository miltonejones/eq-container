import { AfterViewInit, ChangeDetectorRef, OnInit, Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from "rxjs/operators";
import { AudioTestPanelConfig } from './components/audio-test-panel/audio-test-panel.component';
import { SONG_LIST } from './constants/app.song-list.constant';
import { AudioAnalyserService } from './directives/audio-analyser.service';
import { EqDisplayType } from './directives/constants/eq-display-type.enum';

export const SONG_HOST = 'https://s3.amazonaws.com/box.import/';
export function getSongs(): any[] {
  const items = SONG_LIST;
  const out: any[] = [];
  items.map (item => {
    item.related?.map(track => out.push(track));
  });
  return out;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit, OnInit {
  title = 'eq-container';
  isExpanded = true;
  myControl = new FormControl();
  filteredOptions: Observable<string[]>;
  audioURL = '';
  songs: string[] = [];
  displayType: EqDisplayType = EqDisplayType.BAR;
  player$: HTMLAudioElement = {} as HTMLAudioElement;
  color = 'black';
  configs: AudioTestPanelConfig[];
  @ViewChild("stream") set playerRef(ref: ElementRef<HTMLAudioElement>) {
    this.player$ = ref.nativeElement;
  }
  constructor(private ch: ChangeDetectorRef, private analyst: AudioAnalyserService) {
    this.configs = [EqDisplayType.BAR, EqDisplayType.CSS, EqDisplayType.LINE].map(type => {
      return {
        color: 'black',
        debug: false,
        overlay: true,
        type
      }
    })
    this.songs = getSongs();
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this.filter(name) : this.songs.slice())
      );
  }
  ngOnInit(): void {
    const audioURL = localStorage["audioURL"];
    if (audioURL) { this.audioURL = audioURL; }
    this.myControl.setValue(audioURL);
    console.log({audioURL});
  }
  ngAfterViewInit(): void {
    this.attach();
  }
  attach(): void {
    this.analyst.attach(this.player$, this.color);
  }
  filter(name: string): any {
    const filterValue = name.toLowerCase();
    return this.songs.filter(option => option.toLowerCase().indexOf(filterValue) > -1);
  }  
  mouseenter() {}
  mouseleave() {}
  setSource(o: any) {
    this.audioURL = o;
    localStorage["audioURL"] = this.audioURL;
    this.myControl.setValue(o);
    this.play();
  }
  displayFn(user: string): string {
    return user;
  }
  play() {
    this.player$.src = SONG_HOST + escape(this.audioURL);
    setTimeout(() => this.ch.detectChanges(), 1999);
  }
  get paused(): boolean {
    if (this.player$?.paused === undefined) {
      return true;
    }
    return this.player$.paused;
  }
}
