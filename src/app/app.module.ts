import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './modules/angular-material/angular-material.module';
import { EqAudioAnalyserElementDirective } from './directives/eq-audio-analyser-element.directive';
import { SongNavComponent } from './components/song-nav/song-nav.component';

@NgModule({
  declarations: [
    AppComponent,
    EqAudioAnalyserElementDirective,
    SongNavComponent
  ],
  imports: [
    AngularMaterialModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
