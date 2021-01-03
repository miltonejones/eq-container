import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SongNavComponent } from './song-nav.component';

describe('SongNavComponent', () => {
  let component: SongNavComponent;
  let fixture: ComponentFixture<SongNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SongNavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SongNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
