import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebserviceService {
  readonly ROOT_URL
  readonly Rozarpay_url
  constructor(private http: HttpClient) { 
  //this.ROOT_URL = "http://localhost/avisionService/index.php/api/"
  //this.Rozarpay_url = 'http://localhost/avisionService/index.php/razorpay/'
  this.Rozarpay_url = 'https://avision.co.in/adminpanel/razorpay/'
  this.ROOT_URL = "https://avision.co.in/adminpanel/api/"
  }
  get(uri: string, headers: HttpHeaders): Observable<any> {
    return  this.http.get(`${this.ROOT_URL}/${uri}`, {headers})
   }

   getRozarpay(uri: string, headers: HttpHeaders): Observable<any> {
    return  this.http.get(`${this.Rozarpay_url}/${uri}`, {headers})
   } 
  
   

   post(uri: string, payload: Object, headers: HttpHeaders) {
     console.log(payload)
    return this.http.post(`${this.ROOT_URL}${uri}`, payload, { headers})
   }
   delete(uri: string, headers: HttpHeaders) {
     return this.http.delete(`${this.ROOT_URL}/${uri}`, {headers})
   }

   patch(uri: string, payload: Object, headers: HttpHeaders) {
     return this.http.patch(`${this.ROOT_URL}/${uri}`, payload, { reportProgress: true, observe: 'events', headers})
   }
   api(uri: string, headers: HttpHeaders) {
    return  this.http.get(`${uri}`, {headers})
   }
  
}
