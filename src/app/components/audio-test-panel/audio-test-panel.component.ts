import { Component, Input, OnInit } from '@angular/core';
import { EqDisplayType } from 'src/app/directives/constants/eq-display-type.enum';

@Component({
  selector: 'app-audio-test-panel',
  templateUrl: './audio-test-panel.component.html',
  styleUrls: ['./audio-test-panel.component.scss']
})
export class AudioTestPanelComponent implements OnInit {
  @Input() config: AudioTestPanelConfig = {
    color: 'white',
    debug: false,
    overlay: false,
    type: EqDisplayType.BAR
  };
  constructor() { }

  ngOnInit(): void {
  }

}

export interface AudioTestPanelConfig {
  color: string;
  debug: boolean;
  overlay: boolean;
  type: EqDisplayType;
}
