import { TestBed } from '@angular/core/testing';

import { AudioAnalyserService } from './audio-analyser.service';

describe('AudioAnalyserService', () => {
  let service: AudioAnalyserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AudioAnalyserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
