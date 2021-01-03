import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './modules/angular-material/angular-material.module';
import { EqAudioAnalyserElementDirective } from './directives/eq-audio-analyser-element.directive';
import { SongNavComponent } from './components/song-nav/song-nav.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AudioAnalyserService } from './directives/audio-analyser.service';
import { AudioTestPanelComponent } from './components/audio-test-panel/audio-test-panel.component';

@NgModule({
  declarations: [
    AppComponent,
    EqAudioAnalyserElementDirective,
    SongNavComponent,
    AudioTestPanelComponent
  ],
  imports: [
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [AudioAnalyserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
