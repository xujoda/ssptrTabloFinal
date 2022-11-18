import { ApplicationRef, NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { ENVIRONMENT, SsptrConfigService } from '@xujoda/ssptr_lib_config'

import { EntityDataModule } from '@ngrx/data';
import { entityConfig } from './entity-metadata';
import { HttpClientModule } from '@angular/common/http';
import { SsptrGruelModule } from '@xujoda/ssptr_lib_gruel';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { MatCardModule } from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HomeComponent } from './home/home.component';
import { SsptrFidsPresentorModule } from '@xujoda/ssptr_lib_fids_presentor';
import { NotImplementedComponent } from './not-implemented/not-implemented.component';
import { SsptrFidsModule } from '@xujoda/ssptr_lib_fids';
import { MatTableModule } from '@angular/material/table';
import { SsptrHandmadeSheduleModule } from '@xujoda/ssptr_lib_tablo_component';
import { APP_CFG_KEY, initConfigApp } from './app-config';
import { take, skip, tap } from 'rxjs';
import { SsptrFidsDesignModule } from 'src/ssptr-fids-design/ssptr-fids-design.module';
import { BrowserModule } from '@angular/platform-browser';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotImplementedComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    EntityDataModule.forRoot(entityConfig),
    HttpClientModule,
    SsptrGruelModule,
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    MatCardModule, 
    BrowserAnimationsModule,
    MatToolbarModule,
    SsptrFidsPresentorModule,
    SsptrFidsModule,
    MatTableModule,
    SsptrHandmadeSheduleModule,
    SsptrFidsDesignModule,
  ],

  providers: [{ provide: ENVIRONMENT, useValue: environment }],
  
 // bootstrap: [AppComponent],
  //entryComponents: [GruelMonitorDialog]

  

})

export class AppModule {

  constructor(protected cfgSvc: SsptrConfigService) { }

  ngDoBootstrap( appRef : ApplicationRef ) {
      this.cfgSvc.getValueT$(APP_CFG_KEY, initConfigApp).pipe(
          skip(1),
          take(1),
          tap( x =>console.log( x.isSite ? "Режим сайт..." : "Режим Sosipator..."  ) )
      )
      .subscribe( 
          x => x.isSite 
              //?  bootstrapApplication( SsptrSiteHomeComponent  )
              ?  appRef.bootstrap( HomeComponent ) //was home
              :  appRef.bootstrap( AppComponent )
      )

  }
      
}