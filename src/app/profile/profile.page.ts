import { Component, Input, OnInit,  } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Auth, getAuth, createUserWithEmailAndPassword, onAuthStateChanged,provideAuth, signOut, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Database } from '@angular/fire/database';
import { DataService, Profile } from '../services/data.service';
import { AlertController, ModalController } from '@ionic/angular';
import { PixmodelPage } from '../pixmodel/pixmodel.page';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  @Input() id: string;
  profile: Profile = null;
  prof = [];
  imagepath: any;
  img: any;
  profilePix: any;
  //user profile
  email: string;
  firstN: string;
  lastN: string;
  department: string;
  user_mail: string;
  matricNo: string;
  profi: string;
  profileID: string;
  profileP: any;

  constructor(private modalCtrl: ModalController, private alertCtrl: AlertController,private auth: Auth,private router: Router,private db: Database,private dataService: DataService,) {
    if(this.profilePix == null || this.profilePix == undefined || this.profilePix == ''){
      this.img = 'assets/img/blankpx.png';
    }
    // else{
    //   //this.img = this.profilePix[0].PixPath;
    // }
    //console.log(this.profilePix.length)
    const Auth = getAuth();
    onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      this.email = user.email;
      console.log(this.email)
      // ...
    }
  });
  this.dataService.getProfile().subscribe(res =>{
    // this.profile = res;

  console.log(res)
  //if()
  for(let i = 0; i<res.length; i++){
    var Dmail = res[i].email;
    if(this.email == Dmail){
      this.profileID =res[i].id;
      console.log(res[i].Fname)
      this.firstN = res[i].Fname;
      this.lastN = res[i].Lname;
      this.department = res[i].Department;
      this.matricNo = res[i].MatricNo;

    }
    //console.log(res[i].email)

  }

  //console.log(res[1].email)
});

  }


  async pixModel(){
    const model = await this.modalCtrl.create({
      component: PixmodelPage,
      //componentProps: {id: poll.id },
      breakpoints: [0, 0.5, 0.8],
      initialBreakpoint: 0.3,
    });
    model.present();
  }
  async signOUT(){
    console.log("logout")
    const alert = await this.alertCtrl.create({
      header: 'Logout',
      cssClass: 'logout',
      //color: 'danger',
      message: 'Are you sure you want to Logout?',
     buttons: [{
       text: 'No',
       role: 'cancel',
       cssClass: 'cancel-button',
     },
     {
       text: 'Yes',
       handler: () => {
        this.router.navigateByUrl('/auth');
        return this.auth.signOut();
       }
     }
     ]
    });
    await alert.present();

    //this.router.navigateByUrl('/auth');
    //return this.auth.signOut();
  }
UpdateProfilePix(){
  this.dataService.UpdateProfilePix(this.imagepath);
}

  ngOnInit() {
    this.dataService.getProfilePix().subscribe(res =>{
      this.img = res[0].PixPath;
      this.profilePix = res[0].id;
      console.log(res)
    })
  }

}
