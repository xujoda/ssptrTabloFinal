import { AfterContentInit, AfterViewInit, Attribute, Component, ElementRef, Input, OnInit, Optional, ViewChild } from '@angular/core';

enum mode { NORMAL, MINI, EXTRAMINI };
const MINI_SIZE_ATR:string = 'mat-mini-fab';
const EXTRA_MINI_SIZE_ATR:string = 'mat-extra-mini-fab';

const SDW_CLR = "rgba(0,0,0,0.5)" 

const VIEW_CFG:{[key:number]:{ wdh:number, hgt:number, mrx1:number ,mrx4:number, mrx5:number ,mrx6:number, ofstVrt:number, ofstHor:number  }} =({
  [mode.NORMAL]:{wdh:62, hgt:79, mrx1:0.208 ,mrx4:0.208, mrx5:-24 ,mrx6:-27, ofstVrt:-30, ofstHor:-5 } ,
  [mode.MINI  ]:{wdh:44, hgt:56, mrx1:0.148 ,mrx4:0.148, mrx5:-17 ,mrx6:-19, ofstVrt:-16, ofstHor:0 } ,
  [mode.EXTRAMINI]:{wdh:32, hgt:40, mrx1:0.105 ,mrx4:0.105, mrx5:-12 ,mrx6:-13, ofstVrt:-11, ofstHor:2 } ,
});


const SVG_PATH = "M 279.6380310058594 133.36993408203125 " +
    "C 210.131591796875 133.5400390625 153.7141571044922 187.43788146972656 129.13217163085938 285.9844970703125 " +
    "C 109.89353942871094 363.1101989746094 112.97976684570312 503.7231750488281 143.8748779296875 505.3211975097656 " +
    "C 179.50111389160156 507.1639404296875 172.5738525390625 433.8542175292969 277.1315002441406 392.29327392578125 " +
    "C 373.069580078125 354.15850830078125 404.0740051269531 331.1825866699219 411.0225524902344 258.3337097167969 " +
    "C 415.041259765625 185.6850128173828 351.48028564453125 133.42515563964844 279.6380310058594 133.36993408203125 Z";


@Component({
  selector: 'app-ejaculation-container',
  templateUrl: './ejaculation-container.component.html',
  styleUrls: ['./ejaculation-container.component.scss']
})

export class EjaculationContainerComponent implements OnInit  {

  @Input() color:string = "primary";
  @ViewChild('main', { static: true }) mainRef!: ElementRef; 
  private view_mode:mode = mode.NORMAL;         


  constructor( 
        @Optional() @Attribute(MINI_SIZE_ATR) isMini: any ,
        @Optional() @Attribute(EXTRA_MINI_SIZE_ATR) isExMini: any
    ){

      this.view_mode = ( isMini == undefined ) 
            ? ( isExMini == undefined ) 
                ? mode.NORMAL
                : mode.EXTRAMINI
            : mode.MINI; 
  }
  
   
  ngOnInit(): void {
  }

  
  getSvgBackColor  = () => window.getComputedStyle(this.mainRef.nativeElement).backgroundColor ;
  getSvgColor  = () => window.getComputedStyle(this.mainRef.nativeElement).color ;
  getSvgPath = () => SVG_PATH ;
  getSdwColor = () =>  SDW_CLR; 

  getSvgWidth  = (wthOfset:boolean = false) => VIEW_CFG[this.view_mode].wdh + ( wthOfset ? VIEW_CFG[this.view_mode].ofstHor : 0 );
  getSvgHeight = (wthOfset:boolean = false) => VIEW_CFG[this.view_mode].hgt + ( wthOfset ? VIEW_CFG[this.view_mode].ofstVrt : 0 );

  getSvgTransform = () => "matrix(" 
        + VIEW_CFG[this.view_mode].mrx1 + ",0,0,"
        + VIEW_CFG[this.view_mode].mrx4 + ","
        + VIEW_CFG[this.view_mode].mrx5 + ","
        + VIEW_CFG[this.view_mode].mrx6 + 
  ")";
        

}
