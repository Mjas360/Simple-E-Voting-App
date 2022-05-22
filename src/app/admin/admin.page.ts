import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { DataService } from '../services/data.service';
//import { ModelPage } from '../model/model.page';
import { TmodelPage } from '../tmodel/tmodel.page';
import { Auth, getAuth, createUserWithEmailAndPassword, onAuthStateChanged,provideAuth, signOut, signInWithEmailAndPassword } from '@angular/fire/auth';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
  public folder: string;
  topics = []
  email: string;
  NoPoll: any;
  img: any;
  profilePix: any;
  constructor(private activatedRoute: ActivatedRoute,private modalCtrl: ModalController,
    private alertCtrl: AlertController,private dataService: DataService,private router: Router,
    private toastCtrl: ToastController,) {
      if(this.profilePix == null || this.profilePix == undefined || this.profilePix == ''){
      this.img = 'assets/img/blankpx.png';
    }
      // else{
      //   this.img = this.profilePix[0].PixPath;
      // }
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
  this.dataService.getPoll().subscribe(async res => {
    console.log(res.length);
    this.NoPoll = res.length;
            })
      let admin = [];
      this.dataService.getAdmin().subscribe(async res => {
        console.log(res);
        function AdminChecker(key, Arr){
          for(let i =0; i< Arr.length; i++){
                if(Arr[i].email === key){
                  admin.push(Arr[i])
                }
              }console.log('email checker')
              return admin;
        }
        //store option
        let optN1 = AdminChecker(this.email, res);
        console.log(optN1)
        if(optN1.length== 0){
          console.log('not an admin')
          this.router.navigateByUrl('/folder/Inbox');
          let toast = await this.toastCtrl.create({
            message: 'Opoos! looks like you are not an Admin',
            duration: 1000,
            position: 'bottom',
            cssClass: 'toast',
            color: 'danger',
          });
          await toast.present();
        }
      })

    }

  async addAdmin(){
    const alert = await this.alertCtrl.create({
      header: 'Add Admin',
      inputs: [{
       name: 'name',
       placeholder: 'Name:',
       type: 'text',
      },
     {
       name: 'email',
       placeholder: 'Email:',
       type: 'text',
     }],
     buttons: [{
       text: 'Cancel',
       role: 'cancel'
     },
     {
       text: 'Add',
       handler: async (res) => {
         this.dataService.addAdmin({name: res.name, email: res.email});
         let toast = await this.toastCtrl.create({
          message: 'Admin added successfully!',
          duration: 1000,
          position: 'bottom',
          cssClass: 'toast',
          color: 'danger',
        });
        await toast.present();
       }
     }
     ]
    });
    await alert.present();

  }
  async openTopic(){
    const model = await this.modalCtrl.create({
      component: TmodelPage,
      //componentProps: {id: note.id},
      breakpoints: [0, 0.5, 0.8],
      initialBreakpoint: 0.5,
    });
    model.present();
  }
  ngOnInit() {
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
      let admin = [];
      this.dataService.getAdmin().subscribe(async res => {
        console.log(res);
        function AdminChecker(key, Arr){
          for(let i =0; i< Arr.length; i++){
                if(Arr[i].email === key){
                  admin.push(Arr[i])
                }
              }console.log('email checker')
              return admin;
        }
        //store option
        let optN1 = AdminChecker(this.email, res);
        console.log(optN1)
        if(optN1.length== 0){
          console.log('not an admin')
          this.router.navigateByUrl('/folder/Inbox');
          let toast = await this.toastCtrl.create({
            message: 'Opoos! looks like you are not an Admin',
            duration: 1000,
            position: 'bottom',
            cssClass: 'toast',
            color: 'danger',
          });
          await toast.present();
        }
      })

    this.folder = this.activatedRoute.snapshot.paramMap.get('id');

    this.dataService.getProfilePix().subscribe(res =>{
      this.img = res[0].PixPath;
      this.profilePix = res[0].id;
      //this.profilePix = res;
    })
  }

}
