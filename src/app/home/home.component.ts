import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FIDS_OPTION_PROPS_DESCRIPTOR } from '@xujoda/ssptr_lib_fids_presentor';
import { applyPropByIdxs, fdsPresentOptionWoItem, toRoutePath } from '@xujoda/ssptr_lib_fids_presentor';
import { FidsPresentOption } from '@xujoda/ssptr_lib_fids';
//import { FidsPresentOption } from 'src/ssptr-fids-presentor/ssptr-fids-present-types';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  optionDescriptor = FIDS_OPTION_PROPS_DESCRIPTOR;
  option :FidsPresentOption  = fdsPresentOptionWoItem ;

  route$ :  BehaviorSubject<string[]> =  new BehaviorSubject([] as string[] );

  constructor() {
    console.log(" HomeComponent");
   }

  ngOnInit(): void {
  }


  onValChange = ( val : [number,number]) =>  {
    console.log("GruelLandingComponent Rout");
    this.option =  applyPropByIdxs(  this.option, val[0], val[1] ) ;
    this.route$.next( [ '/' + toRoutePath( this.option ) ] );
}

}
