import {Component, Injectable,Input,Output,EventEmitter} from '@angular/core';

// Name Service




@Injectable()
export class SharedService {
  sharingData:string;
  saveData(str:string){
    this.sharingData=str; 
  }

  getData()
  {
    return this.sharingData;
  }
} 