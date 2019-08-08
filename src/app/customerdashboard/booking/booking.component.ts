import { Component, OnInit } from '@angular/core';
import { VehicleService } from 'src/app/shared/vehicle.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';
import { Vehicle } from 'src/app/shared/vehicle.model';
import { Observable, BehaviorSubject } from 'rxjs';
import { Servicebooking } from 'src/app/shared/servicebooking.model';
import { ServicebookingService } from 'src/app/shared/servicebooking.service';  
import { NgForm } from '@angular/forms';
import { containsElement } from '@angular/animations/browser/src/render/shared';
import { Payements } from 'src/app/shared/payements.model';
import { stringify } from 'querystring';
@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
usersCustomerId ='rrer';
vehicleref:AngularFirestoreCollection<Vehicle>;
vehicle$:Observable<Vehicle[]>;
vehiclestatus:BehaviorSubject<string>;
currentpriceref:AngularFirestoreCollection<Payements>;
currentprice$:Observable<Payements[]>;
vehicletyperef:AngularFirestoreCollection<Vehicle>;
vehicletype$:Observable<Vehicle[]>;

resdate='';
defaultExampleRadios='';
Fillet=false;
zinger=false;
lubrication1=false;
apple=false;
special=false;
charger=false;
chock=false;
orange=false;
chickensub=false;
table='';
capp=false;

imgsrc='../../assets/image/w.jpg';
textservice='welcome to luckvin auto care systems online reservation page';
cardtitle='Luckvin Auto Care Services';
reservedateref:AngularFirestoreCollection<Servicebooking>;
reservedate$:Observable<Servicebooking[]>;

formvalidity=false;
remaining=0;
showremaining=true;
showunavailability=true;
totalpayment=0;
vehicles=[];
carashpackageprice=0;
bodywash='';
price=0;
tp='';
vtype="";
id1='';
  constructor(
  private service: VehicleService,
  private firestore:AngularFirestore,
  private toastr: ToastrService,
  public afAuth: AngularFireAuth,
  public authService: AuthService,
  public afs: AngularFirestore,   // Inject Firestore service
  private router: Router,
  private af: AuthService,
  private service1 : ServicebookingService,
 
  ) { 
    
    
    
    
  }

  ngOnInit() {
  
  this.resetForm();
  this.SetUserID();
  console.log(this.usersCustomerId);


   this.afAuth.authState.subscribe(user => {
    if (user) {
      this.usersCustomerId = user.uid;
      console.log(this.usersCustomerId );
      this.vehicleref= this.afs.collection('vehicles',ref=>ref.where('userid','==',this.usersCustomerId).where('status','==','confirmed'));
   
 
      // this.vehicleref=this.afs.doc('users/'+this.usersCustomerId).collection('vehicles',ref=>ref.where('status','==','unconfirmed'))
      this.vehicle$=this.vehicleref.valueChanges(); 
     
       
      
    } 
  }) 

  
  }
 
  
  getvehicles(){
    console.log(this.usersCustomerId);
    this.vehicleref=this.afs.collection('users').doc('this.usersCustomerId ').collection('vehicles')
    this.vehicle$=this.vehicleref.valueChanges(); 
    
  }

  SetUserID(){
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.usersCustomerId = user.uid;
        } 
    }) 
  }
 
  changecardInfo(){
    this.currentpriceref=this.afs.collection('prices',ref=>ref.where('identifier','==','001'));
    this.currentprice$=this.currentpriceref.valueChanges();
    this. currentprice$.subscribe(val => {
      if(this.Fillet){
      this.totalpayment=this.totalpayment+val[0].Fillet;
      }
      else{
        this.totalpayment=this.totalpayment-val[0].Fillet;
      }
      this.price=val[0].Fillet;
    })
    this.imgsrc='../../assets/image/d.jpg';
    this.cardtitle='Fillet Burger Meal';
    this.textservice='Fillet Box Meal. Our simple, succulent 100% chicken breast fillet burger with fresh lettuce and mayo plus a piece of Original Recipe chicken, regular fries, regular side and a drink. The fully-loaded favourite with unbeatable flavour.';
     
   }

   changetoundercariage(){
    this.currentpriceref=this.afs.collection('prices',ref=>ref.where('identifier','==','001'));
    this.currentprice$=this.currentpriceref.valueChanges();
    this. currentprice$.subscribe(val => {
      if(this.chickensub){
      this.totalpayment=this.totalpayment+val[0].chickensub;
      }
      else{
        this.totalpayment=this.totalpayment-val[0].chickensub;
      }
      this.price=val[0].chickensub;
    })
    
    this.imgsrc='../../assets/image/p.jpg';
    this.cardtitle='Chicken submarine';
    this.textservice='Slices of chicken breast spiced with a secret recipe served on a bed of lettuce, tomatoes and Smileyís special mayonnaise ...';
    
  }
   changetyredress(){
    this.currentpriceref=this.afs.collection('prices',ref=>ref.where('identifier','==','001'));
    this.currentprice$=this.currentpriceref.valueChanges();
    this. currentprice$.subscribe(val => {
      if(this.zinger){
      this.totalpayment=this.totalpayment+val[0].zinger;
      }
      else{
        this.totalpayment=this.totalpayment-val[0].zinger;
      }
      this.price=val[0].zinger;
    })
    this.imgsrc='../../assets/image/m.jpg';
    this.cardtitle='Cheesy zinger stacker';
    this.textservice=' new Cheesy Zinger Stacker! Like the name suggests, the new burger comes with a stack of double Zinger chicken fillets, two cheese slices and two classic sauces – KFC’s signature jalapeno cheese and mayonnaise sauce.';
    
  }
   changeExteriorax(){
    this.currentpriceref=this.afs.collection('prices',ref=>ref.where('identifier','==','001'));
    this.currentprice$=this.currentpriceref.valueChanges();
    this. currentprice$.subscribe(val => {
      if(this.charger){
      this.totalpayment=this.totalpayment+val[0].charger;
      }
      else{
        this.totalpayment=this.totalpayment-val[0].charger;
      }
      this.price=val[0].charger;
    })
    this.imgsrc='../../assets/image/q.jpg';
    this.cardtitle='Chicken charger submarine';
    this.textservice='KFC is gifting Indians boxes of burgers and fried chicken with in-built mobile phone chargers. The fast-food chain has launched limited-edition “Watt-A-Box” packages in Delhi and Mumbai to apparently add “an element of utility” to the otherwise humble paper boxes';
   
  }
   changeInterior(){
     console.log('fsdfds');
    this.currentpriceref=this.afs.collection('prices',ref=>ref.where('identifier','==','001'));
    this.currentprice$=this.currentpriceref.valueChanges();
    this. currentprice$.subscribe(val => {
      if(this.special){
        console.log('sdsdsd');
        console.log(val[0]);
      this.totalpayment=this.totalpayment+val[0].special;
      }
      else{
        this.totalpayment=this.totalpayment-val[0].special;
      }
      this.price=val[0].special;
    })
    this.imgsrc='../../assets/image/f.jpg';
    this.cardtitle='Special chicken fried rice';
    this.textservice=' Chicken fried rice is the comfort dish of Chinese food. This classic take on the favorite is easy to make and makes the perfect lunch or dinner.';
   
  }
// photoes have to be updated
    changeengineOilFilter(){
      this.currentpriceref=this.afs.collection('prices',ref=>ref.where('identifier','==','001'));
      this.currentprice$=this.currentpriceref.valueChanges();
      this. currentprice$.subscribe(val => {
        if(this.chock){
        this.totalpayment=this.totalpayment+val[0].chock;
        }
        else{
          this.totalpayment=this.totalpayment-val[0].chock;
        }
        this.price=val[0].chock;
      })
    this.imgsrc='../../assets/image/4.jpg';
    this.cardtitle='chocklate milkshake';
    this.textservice=' chocolate milkshake, set the ice cream out on the counter for about 10 minutes to soften. Add 2 scoops of the ice cream to a blender, and add 1/4 to 1 cup of milk. If you';
   
  }
    EngineCleaning(){
      this.currentpriceref=this.afs.collection('prices',ref=>ref.where('identifier','==','001'));
      this.currentprice$=this.currentpriceref.valueChanges();
      this. currentprice$.subscribe(val => {
        if(this.apple){
        this.totalpayment=this.totalpayment+val[0].apple;
        }
        else{
          this.totalpayment=this.totalpayment-val[0].apple;
        }
        this.price=val[0].apple;
      })
    this.imgsrc='../../assets/image/2.png';
    this.cardtitle='apple juice';
    this.textservice='Apple juice is a fruit juice made by the maceration and pressing of an apple. The resulting expelled juice may be further treated by enzymatic and centrifugal clarification to remove the starch ';
    
  }
    RadiatorcoolerntReplace(){
      this.currentpriceref=this.afs.collection('prices',ref=>ref.where('identifier','==','001'));
      this.currentprice$=this.currentpriceref.valueChanges();
      this. currentprice$.subscribe(val => {
        if(this.orange){
        this.totalpayment=this.totalpayment+val[0].orange;
        }
        else{
          this.totalpayment=this.totalpayment-val[0].orange;
        }
        this.price=val[0].orange;
      })
    this.imgsrc='../../assets/image/df.jpg';
    this.cardtitle='orange juice';
    this.textservice='Orange juice is a liquid extract of the orange tree fruit, produced by squeezing oranges. It comes in several different varieties, including blood orange, navel oranges, valencia orange, clementine, and tangerine'; 
    
  }
    EngineScan(){
      this.currentpriceref=this.afs.collection('prices',ref=>ref.where('identifier','==','001'));
      this.currentprice$=this.currentpriceref.valueChanges();
      this. currentprice$.subscribe(val => {
        if(this.capp){
        this.totalpayment=this.totalpayment+val[0].capp;
        }
        else{
          this.totalpayment=this.totalpayment-val[0].capp;
        }
        this.price=val[0].capp;
      })
     
      this.imgsrc='../../assets/image/1.jpg';
      this.cardtitle='Engine Scanning';
      this.textservice='Our engine scanning uses state of the art diagnostic tools to identify and correct faults in your engine. Engine malfunctions can be quickly diagnosed and fixed.'; 
      
      
    }
    carwashpackagepayement(){
      this.currentpriceref=this.afs.collection('prices',ref=>ref.where('identifier','==','001'));
      this.currentprice$=this.currentpriceref.valueChanges();
      this.totalpayment=this.totalpayment-this.carashpackageprice;
      console.log(this.bodywash)
      if(this.bodywash=='quickwash'){
        
        this.carashpackageprice=0;  
        this. currentprice$.subscribe(val => {
          this.carashpackageprice=this.carashpackageprice+val[0].quickwash;
          this.totalpayment=this.totalpayment+this.carashpackageprice;
          this.price=val[0].quickwash;
        })
        
      }
      if(this.bodywash=='detailedwash'){
        this.carashpackageprice=0;
        this. currentprice$.subscribe(val => {
          this.carashpackageprice=this.carashpackageprice+val[0].detailledwash;
          this.totalpayment=this.totalpayment+this.carashpackageprice;
          this.price=val[0].detailledwash;
        })
      }
      if(this.bodywash=='washwax'){
        this.carashpackageprice=0;
        this. currentprice$.subscribe(val => {
          this.carashpackageprice=this.carashpackageprice+val[0].washandax;
          this.totalpayment=this.totalpayment+this.carashpackageprice;
          this.price=val[0].washandax;
        })
      }
      if(this.bodywash=='autowash'){
        this.carashpackageprice=0;
        this. currentprice$.subscribe(val => {
          this.carashpackageprice=this.carashpackageprice+val[0].autowash;
          this.totalpayment=this.totalpayment+this.carashpackageprice;
          this.price=val[0].autowash;
        })
      }
     
    }
    selectdate(form:NgForm){
      console.log("working");
      const date=this.resdate;
      console.log(date);
      this.reservedateref=this.afs.collection('service',ref=>ref.where('resdate','==',date));
      this.reservedate$=this.reservedateref.valueChanges();

      this.reservedate$.subscribe(val => {
        if(val.length >= 8){
         this.formvalidity=true;
         this.showunavailability=false;
        
         
        }
        else{
          const numberofreservations=val.length;
          this.remaining=8-numberofreservations;
          this.showremaining=false;
        }
        
        }
  );
  
    }
    
  resetForm(form ? :NgForm){
    if(form != null)
      form.resetForm();
    
     
     this.service1.formData={
      id:null,

      bodywash:'',
      resdate:new Date(),
      interior:false,
      lubrication:false,
      undercariagedegrease:false,
      tyredashdress:false,
      exteriorwax:false,
      engine_oil_and_filter_change:false,
      engineclean:false,
      flushreplace:false,
      enginescan:false,
     vehiclereg :'',
     
      status:'',
      tp:'',
     }
  
     
  
    }

    onSubmit(form:NgForm){
      this.afAuth.authState.subscribe(user => {
        if (user) {
          this.usersCustomerId = user.uid;
          } 
      }) 
      let data=form.value;
      data.status='ongoing';
      data.total=this.totalpayment;
      data.customerid=this.usersCustomerId; 
      this.firestore.collection('orders').add(data);
      this.resetForm();
      this.toastr.success('My burger','your order has been placed')  
    }
}
