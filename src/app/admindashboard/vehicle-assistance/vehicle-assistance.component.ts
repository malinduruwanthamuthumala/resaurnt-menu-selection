import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Breakdown } from 'src/app/shared/breakdown.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-vehicle-assistance',
  templateUrl: './vehicle-assistance.component.html',
  styleUrls: ['./vehicle-assistance.component.css']
})
export class VehicleAssistanceComponent implements OnInit {
  title: string = 'My first AGM project';
  public lat: number = 24.799448;
  public lng: number = 120.979021;

  public origin: any;
  public destination: any;
  list=[];
  status='';
  breakdownef:AngularFirestoreCollection<Breakdown>;
  breakdown$:Observable<Breakdown[]>;
  constructor(
    public authService: AuthService,
    public afs: AngularFirestore,   // Inject Firestore service
    public afAuth: AngularFireAuth,
    private router: Router,
    private af: AuthService,
    private firestore: AngularFirestore,
    private toastr: ToastrService,
  ) { 
   
  }

  ngOnInit() {
    
    this.getall();
  }


  
  getall(){
    this.afs.collection('orders').snapshotChanges().subscribe(actionArray => {
      this.list = actionArray.map(item=>{
         return { 
           id: item.payload.doc.id,
           ...item.payload.doc.data()
         } as Breakdown
     
       })
      
     });
    
  }
  showlocation(id:string){
    console.log(id)
    this.afs.collection('orders').doc(id).valueChanges().subscribe(val => {
     
      
     });
    
    let data = Object.assign({});
    data.status="seen";
    this.firestore.collection('orders').doc(id).update(data);
   
  }
  
}
