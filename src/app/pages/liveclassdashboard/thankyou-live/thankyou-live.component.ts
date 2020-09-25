import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-thankyou-live',
  templateUrl: './thankyou-live.component.html',
  styleUrls: ['./thankyou-live.component.scss']
})
export class ThankyouLiveComponent implements OnInit {
  
  prodId: any;
  urlEncryptId: any;
  EncrDecr: any;

  constructor(private route: ActivatedRoute,private router: Router) { 

    this.route.parent.params.subscribe(
      (params: Params) => {
        this.prodId = params['prodId']         
        this.urlEncryptId = this.prodId
        
        var decrypted = this.EncrDecr.get('123456$#@$^@1ERF', this.prodId)
        this.prodId = decrypted       
      })
   }

  ngOnInit(): void {
  }

}
