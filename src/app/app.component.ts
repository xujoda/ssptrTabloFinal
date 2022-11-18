import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, interval, NEVER, Observable, tap } from 'rxjs';
import { AllReaderService } from '@xujoda/ssptr_lib_base_data';
// import { SsptrFidsGruelService } from 'src/ssptr-fids-gruel-admin/ssptr-fids-gruel.service';
import { GruelService } from '@xujoda/ssptr_lib_gruel';


@Component({
  //standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit  {
  title = 'Sosipater2';


  s:Observable<any> = NEVER; 
  s1:Observable<any> = NEVER; 
  s3:Observable<any> = NEVER; 

  constructor(
    private gruel: GruelService,
    private wsSeason: AllReaderService,
    // private admSvc:SsptrFidsGruelService,
    //private testSvc:FidsExDataService
    //private lang$: FidsExLangService

  ){
      console.log(" AppComponent");
      wsSeason.getAll$;
      
      //gruel.registry();
      // admSvc.init();

      //test

      //this.s = testSvc.getDataSourceData$({ isLegasy:true, langMode:langModeType.RU, presentMode:presentType.ARRIVAL, isWeb:true }) 

     
  }

  ngOnInit() {

    // this.lang$.langs$({ isLegasy:true, langMode:langModeType.RUEN, presentMode:presentType.ARRIVAL, isWeb:true })
    //     .subscribe( x=> console.log(x));
     
    // var a = this.s.subscribe( {
    //   next: (x) => console.log('Observer got a next value: ' + x ),
    //   error: (err: Error) => console.error('Observer got an error: ' + err),
    //   complete: () => console.log('Observer got a complete notification'),
    // } );

    // interval(2000).pipe().subscribe(x => a.unsubscribe())

    // interval(12000).pipe().subscribe( x => {

    //       this.s1 = this.testSvc.getDataSourceData$({ isLegasy:true, langMode:langModeType.RU, presentMode:presentType.ARRIVAL, isWeb:true }) ;
    //       console.log("Subscr s1" );
    //       this.s1.subscribe( {
    //         next: (x) => console.log('S1 Observer got a next value: ' + x ),
    //         error: (err: Error) => console.error('S1  Observer got an error: ' + err),
    //         complete: () => console.log('S1  Observer got a complete notification'),
    //       } ); 
    //    }
    // )  

    //interval(10000).pipe().subscribe(x => this.s.subscribe( (x) => console.log('next value: ' + x )) )



     // this.s1 = this.testSvc.getDataSourceData$({ isLegasy:true, langMode:langModeType.RU, presentMode:presentType.ARRIVAL, isWeb:true }) 

    // this.s1.subscribe( x => console.log(x));

    // this.s3 = this.testSvc.getDataSourceData$({ isLegasy:true, langMode:langModeType.RU, presentMode:presentType.ARRIVAL, isWeb:true }) 

    // this.s3.subscribe( x => console.log(x));

    

    //  this.testSvc.getDataSourceData$({ isLegasy:true, langMode:langModeType.RU, presentMode:presentType.SEASON, isWeb:true })
    //          .subscribe( x => console.log(x)  )

    // interval(2000).pipe().subscribe(x =>  {
    //     console.log(x) 
    //     this.testSvc.getDataSourceData$({ isLegasy:true, langMode:langModeType.RU, presentMode:presentType.SEASON, isWeb:true })
    //         .subscribe( x => console.log(x)  )
    //   }
    //   )   ;

    // this.testSvc.getDataSourceData$({ isLegasy:true, langMode:langModeType.RU, presentMode:presentType.SEASON, isWeb:true })
    //        .subscribe( x => console.log(x)  )




    // interval(8000).pipe(
    //      tap(x=>console.log("interval") ),
    //      tap(
    //        x =>  this.testSvc.getDataSourceData$({ isLegasy:true, langMode:langModeType.RU, presentMode:presentType.SEASON, isWeb:true }).pipe(
    //                     tap( y => console.log("get"))
    //             )
    //           .subscribe( y => console.log(y)  ) ) ,

    //  ).subscribe(x => console.log(x) )


    
  }


}

