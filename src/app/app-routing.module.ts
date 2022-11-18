import { NgModule, Type } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { buildRouteFromComponentSelector } from '@xujoda/ssptr_lib_fids_presentor';
import { presentType } from '@xujoda/ssptr_lib_fids';
import { GruelAdminComponent } from '@xujoda/ssptr_lib_gruel';
import { AppHandmadeSheduleComponent } from '@xujoda/ssptr_lib_tablo_component';
import { HomeComponent } from './home/home.component';
import { NotImplementedComponent } from './not-implemented/not-implemented.component';


const staticRoutes: Routes = [
    { path: 'admin',    component: GruelAdminComponent , pathMatch: 'full' },  
    { path: 'home',     component: HomeComponent , pathMatch: 'full' },
    { path: '**',       redirectTo: 'home', pathMatch: 'full' },
] ;



// const fidsRoutes: Routes = buildRouteFromComponentFun( 
//   (opt) => fidsOptionComponentSelector.
// );

// строит всевозможные роуты на базе fidspresentoption  и привязывает компоненты 
const fidsRoutes: Routes =  buildRouteFromComponentSelector(
  [
    [(opt) => 
        (opt.presentMode == presentType.SEASON || opt.presentMode == presentType.SEASON_W|| opt.presentMode == presentType.SEASON_S)
            && opt.isWeb , 
            NotImplementedComponent 
    ],
    [(opt) => opt.presentMode == presentType.SEASON && !opt.isWeb , AppHandmadeSheduleComponent ],
    [(opt) => (opt.presentMode == presentType.ARRIVAL || opt.presentMode == presentType.DEPARTURE )  &&  opt.isWeb , NotImplementedComponent ],
    [(opt) => (opt.presentMode == presentType.ARRIVAL || opt.presentMode == presentType.DEPARTURE )  && !opt.isWeb , NotImplementedComponent ],
    [(opt) => (opt.presentMode == presentType.ARR_DEP )  && !opt.isWeb , NotImplementedComponent ],    
  ]
  , NotImplementedComponent
)

@NgModule({
  imports: [RouterModule.forRoot(fidsRoutes.concat( staticRoutes))],
  exports: [RouterModule]
})
export class AppRoutingModule { 
    constructor(){
      console.log("Add " +  fidsRoutes.length + " fids routes..." );
     // console.log( fidsRoutes );
    }
}
