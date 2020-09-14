import { Injectable } from '@angular/core';
import {Disc} from "../models/disc";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DiscService {

  discServicePath:string = "https://disc-catalog-rest-svc.herokuapp.com";

  private discs: Array<Disc>;

  constructor(private http: HttpClient) {
    this.discs = [];
  }

  loadAllDiscs(): Observable<Array<Disc>> {
    const url = this.discServicePath+"/discs";
    return this.http.get<Array<Disc>>(url);
  }
  
  // addNewDisc(desc): Observable<any> {
    //   let task: Disc = {description : desc};
    //   const url = this.discServicePath+"/discs";
    //   return this.http.post<any>(url, task)
    // }
    //
    // updateDisc(task): Observable<any> {
    //   const url = this.discServicePath+"/discs";
    //   return this.http.put<any>(url, task)
    // }
    //
    // deleteDisc(task): Observable<any> {
    //   const url = this.discServicePath+"/discs?taskId="+task.taskId;
    //   return this.http.delete<any>(url);
    // }
  // loadCompletedDiscs(): Observable<Array<Disc>> {
  //   const url = this.discServicePath+"/completedDiscs";
  //   return this.http.get<Array<Disc>>(url);
  // }
}
