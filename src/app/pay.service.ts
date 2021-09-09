import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PayService {

  constructor(private http: HttpClient) { }

  postData(data: any){
    let params = new HttpParams().set("params",JSON.stringify(data))
    return this.http.get('http://localhost:4000/payment', {params})
  }
  
  callback(data: any){
    console.log(data)
    return this.http.post('http://localhost:4000/callback', data)
  }
}

