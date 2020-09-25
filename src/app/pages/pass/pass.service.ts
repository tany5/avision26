import { Injectable } from '@angular/core';
import { WebserviceService } from 'src/app/webservice.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PassService {

  constructor(private webService: WebserviceService) { }
    getPassData() {
      let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
      return this.webService.get(`passData`,headers)
    }

    getCourseDetails() {
      let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
      return this.webService.get("courseDetails", headers)
    }

    getSubCategoryAllData() {
      let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
      return this.webService.get("subCategoryAllData", headers)

    }

    getSubCategoryName(id:any) {
      let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
      return this.webService.get(`subCategoryName/${id}`, headers)

    }
    payForPlan(plan_id,user_id){
      //alert(plan_id)
      let headers = new  HttpHeaders ({'Content-Type': 'text/plain'})
      return this.webService.post('pay_for_plan',{plan_id,user_id},headers)
    }

    create_order(recreciecpt,amount,currency,payment_capture,keyId,keySecret,prodId,user_id){

      let headers = new  HttpHeaders ({'Content-Type': 'text/plain'})
    return this.webService.getRozarpay(`create_order_plan/${recreciecpt}/${amount}/${currency}/${payment_capture}/${keyId}/${keySecret}/${prodId}/${user_id}`, headers)
    }
    verify_signature(razorpay_payment_id,orderId,razorpay_signature,keyId,keySecret,prodId,UserID){

      let headers = new  HttpHeaders ({'Content-Type': 'text/plain'})
    return this.webService.getRozarpay(`verify_signature_plan/${razorpay_payment_id}/${orderId}/${razorpay_signature}/${keyId}/${keySecret}/${prodId}/${UserID}`, headers)
    }

    
}
