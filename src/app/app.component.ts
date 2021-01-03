import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'eq-container';
  showSubmenu = false;
  showSubSubMenu = false;
  isShowing = false;
  isExpanded = false;
  mouseenter() {}
  mouseleave() {}
}
