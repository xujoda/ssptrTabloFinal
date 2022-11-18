import { animate, state, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, Component, OnDestroy, OnInit, Type } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Params } from '@angular/router';
import { combineLatest, interval, NEVER, Observable, Subject, timer } from 'rxjs';
import { filter, map, startWith, switchMap, take, takeUntil, tap } from 'rxjs/operators';
import { AllReaderService } from '@xujoda/ssptr_lib_base_data';

import { IAnyEntity, IEntityOptions } from '@xujoda/ssprt_lib_base_types'

import { ISheduleEntity, XlsSheduleLocOption, XlsSheduleSOption, XlsSheduleWOption } from './shedule-entity';

const FADE_IN  = 'fade-In';    //проявка
const FADE_OUT = 'fade-Out';   //гаш
type aState = typeof FADE_IN | typeof FADE_OUT

/// METADATA CONSTS
const META_PROP_NAME_IS_DISP = "Display" ;
const META_PROP_NAME_IS_DESCR = "Description" ;
const META_PROP_NAME_IS_DISPNAME = "DisplayName" ;

const FADE_TIME = 500;

const REG_GR_ID  = 'REG';
const LOC_GR_ID  = 'LOC';
const ORD_GR_ID  = 'ORD';

const GR_CFG:{
  [key:string]:({
      exclCol:string[], 
      colspans:number[],
      fieldCaptions:{[key:string]:string } 
  }) } = ({
  [REG_GR_ID]:({
      exclCol:['id','Caption', 'TypeId', 'CustAccount'] , 
      colspans:[9,7],
      fieldCaptions:({ 
          ["CustCode"]:"АК",
          ["FlightD"]: "Рейс",
          ["AircraftType"]:"Тип ВС",
          ["DestD"]:"Направление",
          ["ArrTimeD"]:"Вылет",
          ["DepTimeD"]:"Прибытие",
          ["PeriodD"]:"Период",
          ["DaysD"]:"Дни",
          ["Trans"]:"Посадка в",
          ["FlightA"]: "Рейс",
          ["DestA"]:"Направление",
          ["ArrTimeA"]:"Вылет",
          ["DepTimeA"]:"Прибытие",
          ["PeriodA"]:"Период",
          ["DaysA"]:"Дни",
          ["Cust"]:"Перевозчик",
      })
    }),
  [LOC_GR_ID]:({
      exclCol:['id','Caption','DaysD', 'DaysA', 'TypeId', 'CustAccount', 'AircraftType', 'Trans', 'CustCode',  'Cust' ] ,
      colspans:[5,5] ,
      fieldCaptions:({  
          ["FlightD"]: "№ Рейсa",
          ["DestD"]:"Маршрут",
          ["ArrTimeD"]:"Вылет",
          ["DepTimeD"]:"Прибытие",
          ["PeriodD"]:"Даты вылета",
          ["FlightA"]: "№ Рейсa",
          ["DestA"]:"Маршрут",
          ["ArrTimeA"]:"Вылет",
          ["DepTimeA"]:"Прибытие",
          ["PeriodA"]:"Даты вылета",
      })     
    })
}); 


const CALC_SUBROW_FIELDS = ['ArrTimeD','PeriodD' ];
const COLS_STYLE1  = ['DestD' ,'Trans', 'DestA' ] ;
const COLS_STYLE2  = ['CustCode' ,'FlightD', 'FlightA','Cust' ] ;
const COLS_STYLE3  = ['ArrTimeD', 'DepTimeD', 'PeriodD',	'DaysD','ArrTimeA', 'DepTimeA', 'PeriodA',	'DaysA' ] ;


@Component({
  selector: 'app-handmade-shedule',
  templateUrl: './app-handmade-shedule.component.html',
  styleUrls: ['./app-handmade-shedule.component.scss'],
  animations: [
    trigger('fadeIn', [ 
      state(FADE_IN,  style({ opacity: 1 })),
      state(FADE_OUT, style({ opacity: 0 })),
      transition('* => '+FADE_IN,  animate("{{time}} ease-in"),  { params:{ time: "0.5s" }} ), 
      transition('* => '+FADE_OUT, animate("{{time}} ease-out"), { params:{ time: "0.5s" }} ) 
    ] ) 
  ]
})

export class AppHandmadeSheduleComponent implements OnInit , OnDestroy,  AfterViewInit {
 
  dataSource = new MatTableDataSource<IAnyEntity>();
  //shedules$: Observable<ISheduleEntity[][]> = NEVER;        // Новые данные прилетели по линии стэйта (либо обновились, либо другой источник)
  columnsEx$:  Subject< {name:string, caption:string}[] >  = new Subject(); 
  columns$:  Observable< string[] >  = NEVER;
  hypercolumns$:  Observable< string[] >  = NEVER; 
  progress$:Observable< number > = NEVER; 
  aState$:  Subject<aState> = new Subject();  

  shedulesMeta$:Observable< ({
      option:IEntityOptions<ISheduleEntity>, 
      caption: any, 
      subcaption:any  
      shedule: ISheduleEntity[]  //| null
      pagData: number [],
      columns: {name:string, caption:string}[]
  })[]> = NEVER; //IMetadata

  destroy$ = new Subject() ;

  viewOpt?:({ caption:string, subcaption:string, headColSpans1:number, headColSpans2:number }) = undefined ; 

  //Cust tunable parameters
  viewParams:({ showTime:number, rowsOnPage:number, progressGrade:number  }) = ({
    showTime:20000, //20000
    rowsOnPage:40, 
    progressGrade:50
  });
  
  constructor( 
    public readerService:AllReaderService, 
    private activatedRoute: ActivatedRoute,
    //private gruelSvs: GruelService 
  ) {
      this.activatedRoute.queryParams.pipe(takeUntil( this.destroy$ )).subscribe(this.parceParams) ;
      //console.log("dddd");
     // this.gruelSvs.registry();
  }

  private parceParams  = (params:Params) => {
      this.viewParams = ({
        ...this.viewParams,
         showTime: ( isNaN( parseInt(params?.["showTime"])) ?  this.viewParams.showTime : parseInt(params?.["showTime"])  ),
         rowsOnPage: ( isNaN( parseInt(params?.["rowsOnPage"])) ?  this.viewParams.rowsOnPage : parseInt(params?.["rowsOnPage"])  ),
         progressGrade: ( isNaN( parseInt(params?.["progressGrade"])) ?  this.viewParams.progressGrade : parseInt(params?.["progressGrade"])  )
      })
  }

  ngOnInit(): void {

    this.shedulesMeta$ =  combineLatest(  
        [XlsSheduleWOption,XlsSheduleSOption,XlsSheduleLocOption]
           .map( dsOpt => this.readerService.getMeta$( dsOpt ).pipe( 
                 filter( x => !!x ),
                 map( m => ({ option:dsOpt , meta:m }) ) 
                 
            ))
      ).pipe(
         //tap( x=> console.log(x) ),
         map( xs => 
              xs.filter( x => !(x.meta?.[META_PROP_NAME_IS_DISP] === false) )
                .map( x => ({ 
                    option:x.option, 
                    caption: x.meta?.[META_PROP_NAME_IS_DISPNAME], 
                    subcaption:x.meta?.[META_PROP_NAME_IS_DESCR]   
                })) 
          ), 
          switchMap( 
              xs => combineLatest(
                xs.map( meta => 
                  this.readerService.getAllNullT$( meta.option).pipe(
                    filter(x => !!x  ),
                    map(sdl => sdl ? sdl: []  ), 
                    map( sdl => ({
                       shedule: sdl , 
                       pagData: this.tableToPaginating(sdl), 
                       columns:this.tableToColumnsN(sdl) ,
                       ...meta  
                    }))
                  ) 
          ))),
      ).pipe( takeUntil( this.destroy$ ));
  
    this.columns$ = this.columnsEx$.pipe(map( xs => xs.map( x=>x.name)));       
    this.hypercolumns$ = this.columnsEx$.pipe(map( xs => xs.map( x=>'хй')));  

  }

  ngAfterViewInit():void {


    this.shedulesMeta$.pipe( 
        switchMap( shdls => interval(this.viewParams.showTime).pipe( startWith(-1), map( i =>  ({ shdls:shdls, idx:i }) ))), // run page iterator
        map( shdlsOpt => ({ ...shdlsOpt, idx: this.getPaginatingIdx( shdlsOpt.shdls.map( x => x.pagData),  shdlsOpt.idx)  })),   // abs index to ref index
        //tap( x=> console.log(x)),   // abs index to ref index
        switchMap( shdlsOpt => timer(0,FADE_TIME).pipe(  take(2),  map( x =>   ({ ...shdlsOpt, st: (x ? FADE_IN : FADE_OUT) as aState  })  ) ))    
      ).subscribe( shdlsOpt => {
        this.aState$.next(shdlsOpt.st);
        if( shdlsOpt.st == FADE_IN )
        {
          this.viewOpt = ({
              caption: shdlsOpt.shdls[shdlsOpt.idx[0]].caption 
                  +  ( (shdlsOpt.shdls[shdlsOpt.idx[0]].pagData.length > 1)   
                        ? (' [ стр: '+ (shdlsOpt.idx[1]+1 ) + ' из '+shdlsOpt.shdls[shdlsOpt.idx[0]].pagData.length+' ] ' ) 
                        : ' ') ,
              subcaption: shdlsOpt.shdls[shdlsOpt.idx[0]].subcaption ,
              headColSpans1: GR_CFG[ shdlsOpt.shdls[shdlsOpt.idx[0]].shedule[0].TypeId ].colspans [0] ,
              headColSpans2: GR_CFG[ shdlsOpt.shdls[shdlsOpt.idx[0]].shedule[0].TypeId ].colspans [1] ,
          });
          this.columnsEx$.next( shdlsOpt.shdls[shdlsOpt.idx[0]].columns )
          this.dataSource.data  = this.selectPageRowsN(shdlsOpt.shdls[shdlsOpt.idx[0]].shedule, shdlsOpt.shdls[shdlsOpt.idx[0]].pagData,shdlsOpt.idx[1] )
          
        } 
        else
        {
          this.progress$ = interval( this.viewParams.showTime/this.viewParams.progressGrade).pipe(take(this.viewParams.progressGrade),map(x => (x+2) * 100/this.viewParams.progressGrade )); 
        }
        
  }) ;  


  }  

  // fields names from columns$ data 
  capToName = (xs:({name:string, caption:string })[] | null ) => xs?.map(x => x.name)
  
  
  /// Columns list w/o excluded 
  private tableToColumnsN = ( table:ISheduleEntity[] ) =>  
      //table.length >0 ? table[0].TypeId : ""
      Object.keys(table[0]).filter( a => GR_CFG[ (table[0].TypeId) ].exclCol.indexOf(a) < 0 ) 
          .map( colname => ({name:colname, caption:  GR_CFG[ (table[0].TypeId) ].fieldCaptions?.[colname] ?? colname }))


  /// table to Paginatind data [[startRow1, sr2, ... ], [sr, sr ]] 
  private tableToPaginating = ( table:ISheduleEntity[] ) => 
    table
      .map( row => CALC_SUBROW_FIELDS.reduce( (a,e) => Math.max(  row[e].split("\n").length , a ),1))
      .reduce( 
        (a,e,i) => (a.counter + e >  this.viewParams.rowsOnPage) 
              ? ({ ret: [...a.ret, i] , counter:0  }) 
              : ({ ret: a.ret, counter: a.counter + e }) // index first row of page
              , ({ret:([0]), counter:0 })                // TODO last page to bottom
      ).ret;

  // calc indexes of page [ table index, page index]
  private getPaginatingIdx= (paginatings:number[][] ,  ind:number ) =>  //paginatings:number[][]
      paginatings.reduce(
          (act, tb, itb ) => tb.reduce(
              (acpg, s , ipg  ) =>  ({ 
                  ret: ( acpg.i == (ind%paginatings.reduce((a,e)=>a+e.length,0)) ? [itb, ipg] : acpg.ret ),  //ind % paginatings.reduce( (a,e) => a + e.length, 0)  
                  i: (acpg.i + 1)  
              }),
              act   
          ),
          ({ ret:[0,0] , i:0 })
      ).ret;

  
  // select data for view page
  private selectPageRowsN = ( shedule:ISheduleEntity[], pages:number[], idx2:number  ) => 
      shedule.filter( (row,i) => i >= pages[idx2] && ( pages.length == idx2 + 1 || i < pages[idx2+1] ) ) ;
            
              

  isStyle  = (fieldname:string) => !this.isStyle1( fieldname ) && !this.isStyle2( fieldname ) && !this.isStyle3( fieldname );
  isStyle1 = (fieldname:string) => (COLS_STYLE1.indexOf(fieldname) >= 0) 
  isStyle2 = (fieldname:string) => (COLS_STYLE2.indexOf(fieldname) >= 0) 
  isStyle3 = (fieldname:string) => (COLS_STYLE3.indexOf(fieldname) >= 0) 


  ngOnDestroy(): void {
    this.destroy$.next(undefined);
    this.destroy$.complete();
  }

}
