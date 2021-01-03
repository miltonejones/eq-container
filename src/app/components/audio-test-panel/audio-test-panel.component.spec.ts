import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AudioTestPanelComponent } from './audio-test-panel.component';

describe('AudioTestPanelComponent', () => {
  let component: AudioTestPanelComponent;
  let fixture: ComponentFixture<AudioTestPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AudioTestPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AudioTestPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
