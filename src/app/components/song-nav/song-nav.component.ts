import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { SONG_LIST } from 'src/app/constants/app.song-list.constant';
import { Playlist } from 'src/app/viewmodel/playlist';

@Component({
  selector: 'app-song-nav',
  templateUrl: './song-nav.component.html',
  styleUrls: ['./song-nav.component.scss']
})
export class SongNavComponent implements OnInit {
  showSubmenu = true;
  showSubSubMenu = false;
  isShowing = false;
  readonly songList: Playlist[] = SONG_LIST;
  showingList: {[prop: string]: boolean} = {}
  @Input() isExpanded = false;
  @Output() select = new EventEmitter<string>();
  constructor() { }

  ngOnInit(): void {
    this.songList.map(item => this.showingList[item.Title] = false);
  }

}
