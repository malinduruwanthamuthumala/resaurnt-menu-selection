import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



// Import all the components for which navigation service has to be activated 
import { SigninComponent } from '../signin/signin.component';
import { SignupComponent } from '../signup/signup.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { ForgotPassordComponent } from '../forgot-passord/forgot-passord.component';
 import { AuthGuard } from "../shared/guard/auth.guard";
 import { VerifyEmailComponent } from '../verify-email/verify-email.component';
 


import { VehicleAssistanceComponent } from '../admindashboard/vehicle-assistance/vehicle-assistance.component';
import { BookingComponent } from '../customerdashboard/booking/booking.component';

const routes: Routes = [
  { path: '', redirectTo: '/homepage', pathMatch: 'full' },
  { path: 'sign-in', component: SigninComponent },
 
  { path: 'register-user', component: SignupComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'forgot-password', component: ForgotPassordComponent },
   { path: 'verify-email-address', component: VerifyEmailComponent },
   { path: 'kitchen', component: VehicleAssistanceComponent },
   { path: 'booking', component: BookingComponent },
   


   
   
   

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
