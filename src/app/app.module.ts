import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppHandmadeSheduleComponent } from './app-handmade-shedule.component';

import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { EntityDataModule } from '@ngrx/data';
import { entityConfig } from './entity-metadata';

import { ENVIRONMENT, SsptrConfigService } from '@xujoda/ssptr_lib_config'
import { SsptrGruelModule } from '@xujoda/ssptr_lib_gruel'

import { HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    AppHandmadeSheduleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    EntityDataModule.forRoot(entityConfig),
    HttpClientModule,
    SsptrGruelModule,
    MatCardModule,
    MatTableModule,
    MatToolbarModule,
  ],
  providers: [{ provide: ENVIRONMENT, useValue: environment }],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(protected cfgSvc: SsptrConfigService) { }
}
