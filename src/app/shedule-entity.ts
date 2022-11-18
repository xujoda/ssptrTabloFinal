//import { IAnyEntity, IEntityOptions } from "src/ssptr-base-types/any-entity";
import { IAnyEntity, IEntityOptions } from '@xujoda/ssprt_lib_base_types'

//-------------------------
export interface ISheduleEntity extends IAnyEntity {
    id:number;
    TypeId:string;
    Caption:string;
    CustCode:string;
  }
  
  // deprivated 
  export const XlsSheduleOption: IEntityOptions<ISheduleEntity>  = {
    name: "XlsShedule",
    location: "/WebInstance/XlsShedule",
    selectId: (x) => x.id,
    selBack: (x: string) => ("/" + x)
  };
  
  export const XlsSheduleSOption: IEntityOptions<ISheduleEntity>  = {
    name: "XlsSheduleS",
    location: "/WebInstance/XlsSheduleS",
    selectId: (x) => x.id,
    selBack: (x: string) => ("/" + x)
  };
  
  export const XlsSheduleWOption: IEntityOptions<ISheduleEntity>  = {
    name: "XlsSheduleW",
    location: "/WebInstance/XlsSheduleW",
    selectId: (x) => x.id,
    selBack: (x: string) => ("/" + x)
  };
  
  
  export const XlsSheduleLocOption: IEntityOptions<ISheduleEntity> = {
    name: "XlsSheduleLoc",
    location: "/WebInstance/XlsSheduleLoc",
    selectId: (x) => x.id,
    selBack: (x: string) => ("/" + x)
  };