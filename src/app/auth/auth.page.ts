import { ViewChild, Component, OnInit } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Auth, getAuth, createUserWithEmailAndPassword, onAuthStateChanged,provideAuth, signOut, signInWithEmailAndPassword } from '@angular/fire/auth';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  @ViewChild(IonSlides) slides: IonSlides;

  email:string;
  password: string;
  showPassword = false;
  passwordToggleIcon = 'eye';


  constructor(private router: Router,private auth: Auth, private toastCtrl: ToastController,) { }

  togglePassord(): void{
    this.showPassword = !this.showPassword;
    if(this.passwordToggleIcon == 'eye'){
      this.passwordToggleIcon = 'eye-off'
    }else{
      this.passwordToggleIcon = 'eye'
    }
    //this.showPass = !this.showPass;
    //TouchList.input.type = this.showPass ? 'text'
  }
  goToNextSlide() {
    this.slides.slideTo(1, 500);
  }
  goToPreSlide() {
    this.slides.slideTo(0, 500);
  }

  goToLaSlide() {
    this.slides.slideTo(2, 500);
  }

  async signUP(){
    console.log(this.email)

      createUserWithEmailAndPassword(this.auth, this.email, this.password)
        .then(async (userCredential) => {
          // Signed in
          const user = userCredential.user;
          let toast = await this.toastCtrl.create({
            message: 'Account Created Successfully!',
            duration: 1000,
            position: 'bottom',
            color: 'danger'
          });

          await toast.present();
          this.router.navigateByUrl('/details');
          // ...
        })
        .catch(async (error) => {
          let toast = await this.toastCtrl.create({
            message: 'Invalid Email or Password!',
            duration: 3000,
            position: 'bottom',
            color: 'danger'
          });

          // toast.onDidDismiss(() => {
          //   console.log('Dismissed toast');
          // });

          await toast.present();
          console.log('Invalid Email or Password')
          const errorCode = error.code;
          const errorMessage = error.message;
          // ..
        });

    }
    signIN(){
      signInWithEmailAndPassword(this.auth, this.email, this.password).then(async (userCredential) => {
        const user = userCredential.user;
        //console.log(user);
        let toast = await this.toastCtrl.create({
          message: 'LogIn Successful!',
          duration: 1000,
          position: 'bottom',
          color: 'danger'
        });

        // toast.onDidDismiss(() => {
        //   console.log('Dismissed toast');
        // });

        await toast.present();
        this.router.navigateByUrl('/folder/Inbox');
      })
      .catch(async (error) => {
        let toast = await this.toastCtrl.create({
          message: 'Invalid Email or Password!',
          duration: 3000,
          position: 'bottom',
          color: 'danger'
        });

        // toast.onDidDismiss(() => {
        //   console.log('Dismissed toast');
        // });

        await toast.present();
        const errorCode = error.code;
        const errorMessage = error.message;
      });
    }

    signOUT(){
      return this.auth.signOut()
    }
  authStateChanged(){
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    const uid = user.uid;
    // ...
  } else {
    // User is signed out
    // ...
  }
});

  }

logout() {
    signOut(this.auth);
}
getFirebaseUser(): any {
  return this.auth.currentUser;
}
  // signUpWithEmail(email: string, password: string): Promise<auth.UserCredential> {
  //   return createUserWithEmailAndPassword(email, password);
  // }


  ngOnInit() {
  }

}
