import { Inject } from '@angular/core';
import { Optional } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Params, Router } from '@angular/router';


@Component({
  selector: 'app-thankyouliveclass',
  templateUrl: './thankyouliveclass.component.html',
  styleUrls: ['./thankyouliveclass.component.scss']
})
export class ThankyouliveclassComponent implements OnInit {
  prodId: any;
  urlEncryptId: any;
  EncrDecr: any;
  dataItem: any;
  popupImage: any;
  product_name1:any
  product_name2:any
  Name: any;
  reason: any;
  hazard: boolean = false
  showData: boolean = false
  text:any

  constructor(public dialog: MatDialog,public dialogRef: MatDialogRef<ThankyouliveclassComponent>,@Optional() @Inject(MAT_DIALOG_DATA) public data: any) {
    dialogRef.disableClose=true;
    

      this.Name = data.productName
      console.log(this.Name)
      this.reason = data.reason
      this.hazard = data.hazard
      this.text = data.text;
      

   }

  ngOnInit(): void {
   
    
  }
  closepopup(){
      this.dialog.closeAll();
      location.reload()
    
    
  }

}
