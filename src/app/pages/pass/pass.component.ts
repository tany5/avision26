import { Component, OnInit } from '@angular/core';
import { PassService } from './pass.service';
import { Router, ActivatedRoute, PRIMARY_OUTLET, UrlSegment } from '@angular/router';
import { MetatagServiceService } from 'src/app/metatag-service.service';
import { Title, Meta } from '@angular/platform-browser';
//import { ICustomWindow,WindowRefService } from './window-ref.service';
import { NgZone } from '@angular/core';
import { ICustomWindow, WindowRefService } from '../liveclassdashboard/window-ref.service';
import { MatDialog } from '@angular/material/dialog';
import { PassSuccessComponent } from '../pass-success/pass-success.component';
declare var jQuery: any;

@Component({
  selector: 'app-pass',
  templateUrl: './pass.component.html',
  styleUrls: ['./pass.component.scss']
})
export class PassComponent implements OnInit {
  private _window: ICustomWindow;
  public rzp: any;
  passData: any
  passLoader: boolean =false
  courseDetails: any
  subCategoryAllData: any
  id: any
  subCategoryName: any
  page_slug: any;
  page_meta: any;
  title: any;
  plan_id: any
  seo_body: any;
  tree: any;
  fragment: any;
  primary: any;
  keyId: string;
  keySecret: string;
  amount: any;
  options: any= {
    
  };
  private _orderId: any;
  constructor(private passServices: PassService,private router: Router,private route: ActivatedRoute,private metatagservice: MetatagServiceService,private titleService: Title,private metaTagService: Meta,private zone: NgZone,
    private winRef: WindowRefService,private dialog: MatDialog) {
      this._window = this.winRef.nativeWindow;
    this.passServices.getPassData().subscribe(
      (res)=> {
        console.log('passData...');
        console.log(res);       
        this.passData = res
        this.passLoader = true
        
      },
     (error)=> {
      console.log(error)
     })


     this.passServices.getCourseDetails().subscribe(
       (res)=> {
        
        this.courseDetails = res
        this.passServices.getSubCategoryAllData().subscribe(
          (res2)=> {
            console.log(res2)
            
            this.subCategoryAllData = res2
          },
          (error)=>{
            console.log(error)
          }
        )
       },
       (error)=> {
         console.log(error)
       }
     )


   }

   initPay(): void {
    
    /*this.liveclassDashboardService.createOrder(recreciecpt,amount,currency,payment_capture,this.keyId,this.keySecret,this.prodId,localStorage.getItem('currentUserId'),this.cupon_code).subscribe(
      (res) => {
        console.log(res)
        if(res['status'] == 200){

          this._orderId = res['order_id']

          this.options = {
            key: this.keyId, // add razorpay key here
            name: this.productName,
            description: 'Avision Live Class-2020 ',
            order_id: this._orderId,
            amount: amount, // razorpay takes amount in paisa
            // prefill: {
            //   name: 'The Swag Coder',
            //   email: 'anirban.visiable@gmail.com', // add your email id
            // },
            notes: {},
            theme: {
              color: '#3880FF'
            },
            handler: this.paymentHandler.bind(this),
            modal: {
              ondismiss: (() => {
                this.zone.run(() => {
                 
                })
              })
            }
          };
           this.rzp = new this.winRef.nativeWindow['Razorpay'](this.options);
            this.rzp.open();
         

        }
        
      }
    )*/
    
   
    
  }

  ngOnInit(): void {

    this.tree = this.router.parseUrl(this.router.url);
    this.fragment = this.tree.fragment;
    this.primary = this.tree.root.children[PRIMARY_OUTLET];
    const primarySegments: UrlSegment[] = this.primary.segments;
    
    this.page_slug = primarySegments[0];
    
    this.metatagservice.fetchMetaPage(this.page_slug).subscribe(

      (res:any) => {
        
        if(res.status == 200){
          this.page_meta = res.meta_data;
          this.title = this.page_meta[0]['page_title'];
          this.seo_body = this.page_meta[0]['seo_body'];
          this.titleService.setTitle(this.title);
          this.metaTagService.updateTag(
             { name: 'keywords', content: this.page_meta[0]['page_content'] }
           );
           this.metaTagService.updateTag(
             { name: 'description', content: this.page_meta[0]['page_description'] }
           );
          jQuery('head').append(this.seo_body)
        }
        
      }

    );
  }

  getSubCategory(event) {
    this.id = event.target.id
   

    this.passServices.getSubCategoryName(this.id).subscribe(
      (res)=> {
       
        this.subCategoryAllData = []
        this.subCategoryName = res
      },
      (error)=> {
        console.log(error)
    })
  }

  getAllCourseData() {
    this.passServices.getSubCategoryAllData().subscribe(
      (res)=> {
        this.subCategoryName = []
        this.subCategoryAllData = res
      },
      (error)=> {
        console.log(error)
      })

  }

  PayForPlan(plan_id){
    this.plan_id = plan_id
    //alert(localStorage.getItem('userloggedIn'))
    if(localStorage.getItem('userloggedIn') != '1'){
      jQuery('#loginModal').modal()
    }else{
      this.passServices.payForPlan(this.plan_id,localStorage.getItem('currentUserId')).subscribe(

        (res) => {
          console.log(res);
         if(res['status'] == 200){
          this.amount = res['offer_price'];
          this.keyId = 'rzp_live_uv8xHezKpGvUh6';
          this.keySecret = 'srtYpZwqjmoop1IfCj1tQ6IE';
          var recreciecpt=3456;
          var amount = this.amount;
          var currency ='INR';
          var payment_capture = 1;
          this.passServices.create_order(recreciecpt,amount,currency,payment_capture,this.keyId,this.keySecret,res['plan_id'],localStorage.getItem('currentUserId')).subscribe(
            (data) => {
              this._orderId = data['order_id']

              this.options = {
                key: this.keyId, // add razorpay key here
                name: res['plan_name'],
                description: 'Avision Prime-2020 ',
                order_id: this._orderId,
                amount: amount, // razorpay takes amount in paisa
                // prefill: {
                //   name: 'The Swag Coder',
                //   email: 'anirban.visiable@gmail.com', // add your email id
                // },
                notes: {},
                theme: {
                  color: '#3880FF'
                },
                handler: this.paymentHandler.bind(this),
                modal: {
                  ondismiss: (() => {
                    this.zone.run(() => {
                    
                    })
                  })
                }
          };
          this.rzp = new this.winRef.nativeWindow['Razorpay'](this.options);
          this.rzp.open();
            }
          )
          
         }else{
           alert(res['msg'])
         }
        }
      )
    } 

  }

  async paymentHandler(res: any,error:any) {
    var razorpay_payment_id = res['razorpay_payment_id']
    var razorpay_signature = res['razorpay_signature']
    console.log(res);
    await this.passServices.verify_signature(razorpay_payment_id,this._orderId,razorpay_signature,this.keyId,this.keySecret,this.plan_id,localStorage.getItem('currentUserId')).subscribe(

      (res) => {
        console.log(res)
        if(res['verify_stat'] == 1){
          const dioalogRef = this.dialog.open(PassSuccessComponent);
          dioalogRef.close()
          dioalogRef.afterClosed().subscribe(()=>{

              this.router.navigate(['dashboard/testseries'])
          })
        }
      }
    )
    
    
  }

  

}
