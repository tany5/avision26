import { Injectable } from '@angular/core';
import { WebserviceService } from 'src/app/webservice.service';
import { HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class LiveclassdashboardService {

  constructor(private webService: WebserviceService) { }
  getLiveClassDetails(prodId) {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`live_class_details/${prodId}`, headers)
  }

  checkCuponCode(code,id,user_id){
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.post('check_cupon_code',{code,id,user_id},headers)
  }
  checkBuystatus(user_id,prod_id){
    console.log(user_id,prod_id);
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`live_class_check_buystat/${prod_id}/${user_id}`,headers)
  }

  getProductBrief(prodId){

    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`get_product_brief/${prodId}`, headers)
  }
  getRecomndedProducts(prodId){
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`get_recomended_product/${prodId}`, headers)
  }

  createOrder(reciecpt,amount,currency,payment_capture,keyId,keySecret,prod_id,user_id,cupon_code){
    let headers = new  HttpHeaders ({'Content-Type': 'text/plain'})
    return this.webService.getRozarpay(`create_order/${reciecpt}/${amount}/${currency}/${payment_capture}/${keyId}/${keySecret}/${prod_id}/${user_id}/${cupon_code}`, headers)
  }
  verifySignature(razorpay_payment_id,order_id,razorpay_signature,key_id,key_secret,prod_id,user_id){
    let headers = new  HttpHeaders ({'Content-Type': 'text/plain'})
    return this.webService.getRozarpay(`verify_signature/${razorpay_payment_id}/${order_id}/${razorpay_signature}/${key_id}/${key_secret}/${prod_id}/${user_id}`, headers)

  }
  getProductslug(prodId){

    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`get_product_slug/${prodId}`, headers)
  }
}
