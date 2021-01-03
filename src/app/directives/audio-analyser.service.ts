import { Injectable } from "@angular/core";
import { Observable } from "rxjs"; 
import { EqDisplayType } from "./constants/eq-display-type.enum";
import { drawBarGraph, statsBarGraph } from "./functions/app.bar-graph.function";
import { drawLineGraph } from "./functions/app.line-graph.function";

@Injectable()
export class AudioAnalyserService {
  analyser: AnalyserNode = {} as AnalyserNode;
  context = new AudioContext();
  observers: AudioAnalyserServiceObserverCollection = {};
  constructor() {}
  attach(audio: HTMLAudioElement, hue?: string): void {
    this.analyser = this.context.createAnalyser();
    const source = this.context.createMediaElementSource(audio);
    source.connect(this.analyser);
    this.analyser.connect(this.context.destination);
    audio.crossOrigin = "anonymous";
    audio.addEventListener("error", () => alert("An error occured"));
    this.observers = {
      [EqDisplayType.LINE]: drawLineGraph(this.analyser, audio, hue),
      [EqDisplayType.BAR]: drawBarGraph(this.analyser, audio, hue),
      [EqDisplayType.CSS]: statsBarGraph(this.analyser, audio)
    };
    console.log("attached!", hue);
  }
}
export interface AudioAnalyserServiceObserverCollection {
  [propName: string]: Observable<string>;
}
