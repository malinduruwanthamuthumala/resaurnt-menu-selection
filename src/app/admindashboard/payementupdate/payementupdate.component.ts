import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';
import { PriceupdateService } from 'src/app/shared/priceupdate.service';


import { Observable, BehaviorSubject } from 'rxjs';
import { Servicebooking } from 'src/app/shared/servicebooking.model';
import { ServicebookingService } from 'src/app/shared/servicebooking.service';  
import { NgForm } from '@angular/forms';
import { containsElement } from '@angular/animations/browser/src/render/shared';
import { Payements } from 'src/app/shared/payements.model';
@Component({
  selector: 'app-payementupdate',
  templateUrl: './payementupdate.component.html',
  styleUrls: ['./payementupdate.component.css']
})
export class PayementupdateComponent implements OnInit {
 
  quickwash=0;
  autowash=0;
  detailledwash=0;
  washandax=0;
  interior=0;
  lubrication=0;
  undercariagedegrease=0;
  tyredashdress=0;
  exteriorwax=0;
  engine_oil_and_filter_change=0;
  engineclean=0;
  flushreplace=0;
  enginescan=0;
  currentpriceref:AngularFirestoreCollection<Payements>;
  currentprice$:Observable<Payements[]>;
  
  vehicle_type='';
  vehicleselect='';
  constructor(
    private firestore:AngularFirestore,
    private toastr: ToastrService,
    public afAuth: AngularFireAuth,
    public authService: AuthService,
    public afs: AngularFirestore,   // Inject Firestore service
    private router: Router,
    private af: AuthService,
    private service1 : PriceupdateService,

  ) { 

  }

  ngOnInit() {

}
  
  resetForm(form ? :NgForm){
    if(form != null)
      form.resetForm();
    
     
     
  
     
  
    }

    selectvehicletype(){
      this.vehicleselect=this.vehicle_type;
      console.log("working");
      this.currentpriceref=this.afs.collection('prices',ref=>ref.where('identifier','==',this.vehicleselect));
      this.currentprice$=this.currentpriceref.valueChanges();
  
      this. currentprice$.subscribe(val => {
        this.quickwash=val[0].quickwash,
        this.autowash=val[0].autowash,
        this.detailledwash=val[0].detailledwash,
        this.washandax=val[0].washandax,
        this.interior=val[0].interior,
        this.lubrication=val[0].lubrication,
        this.undercariagedegrease=val[0].undercariagedegrease,
        this.tyredashdress=val[0].tyredashdress,
        this.exteriorwax=val[0].exteriorwax,
        this.engine_oil_and_filter_change=val[0].engine_oil_and_filter_change,
        this.engineclean=val[0].engineclean,
        this.flushreplace=val[0].flushreplace,
        this.enginescan=val[0].enginescan,
  
        console.log(val[0]);
  })
  
    }
  
  onSubmit(form:NgForm){
    let data=form.value;
    let id1=''
    console.log(this.vehicle_type)
    if(this.vehicle_type==="motorcycle"){
      id1='w2mlQtiF78oxElTWt2RJ';
    }
    else if(this.vehicle_type==="Medium Rigid (MR class) heavy vehicle"){
      id1='YYWQV1uxhqEac1vpRZYl';
    }
    else if(this.vehicle_type==="Special tractor "){
      id1='PhJo7ovNAGez8yk8HDim';
    }
    else if(this.vehicle_type==="Light Rigid (LR class) heavy vehicle"){
      id1='m4cjlkMJsZGZzxhcG3xo';
    }
    else if(this.vehicle_type==="threewheeler"){
      id1='qdNdFf75RWExeMRFFXY8';
    }
    else if(this.vehicle_type==="Car (C class) licence"){
      id1='yXsWARCThwxXupnAiX3M';
    }
    console.log(id1)
    
     this.firestore.firestore.collection('prices').doc(id1).update(data);
     this.resetForm();
     this.toastr.success('Luckvin Auto care','prices has been successfully updated')  
  }
  
}

   

  
