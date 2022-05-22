import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService, Profile } from '../services/data.service';
import { ToastController } from '@ionic/angular';
import { Auth, getAuth, createUserWithEmailAndPassword, onAuthStateChanged,provideAuth, signOut, signInWithEmailAndPassword } from '@angular/fire/auth';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  email: string;
  profile = {
    firstName: '',
    lastName: '',
    department: '',
    matricNo: '',
  }
  constructor(private dataService: DataService, private router: Router, private toastCtrl: ToastController,) {
    const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      this.email = user.email;
      console.log(this.email)
      // ...
    }
  });
  }

  async addProfile(){
    this.dataService.addProfile({
    Fname: this.profile.firstName, Lname: this.profile.lastName, Department: this.profile.department, email: this.email, MatricNo: this.profile.matricNo,
  });
  let toast = await this.toastCtrl.create({
    message: 'Account setup successfully!',
    duration: 3000,
    position: 'bottom'
  });

  // toast.onDidDismiss(() => {
  //   console.log('Dismissed toast');
  // });

  await toast.present();
  this.router.navigateByUrl('/folder/Inbox');
    }


  ngOnInit() {
  }

}
