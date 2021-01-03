import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-song-nav',
  templateUrl: './song-nav.component.html',
  styleUrls: ['./song-nav.component.scss']
})
export class SongNavComponent implements OnInit {
  showSubmenu = false;
  showSubSubMenu = false;
  isShowing = false;
  @Input() isExpanded = false;
  constructor() { }

  ngOnInit(): void {
  }

}
