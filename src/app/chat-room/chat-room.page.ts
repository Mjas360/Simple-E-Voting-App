import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { DataService } from '../services/data.service';
import { Auth, getAuth, createUserWithEmailAndPassword, onAuthStateChanged,provideAuth, signOut, signInWithEmailAndPassword } from '@angular/fire/auth';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.page.html',
  styleUrls: ['./chat-room.page.scss'],
})
export class ChatRoomPage implements OnInit {

  notes = [];
  //email: string;
  email: string;
  topic: string;
  question: string;
  response: string;
  option1: string;
  option2: string;
  option3= '';
  option4= '';
  option5= '';

  constructor(private dataService: DataService,
    private alertCtrl: AlertController,
    private router: Router,
    private toastCtrl: ToastController,) {
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

    this.dataService.getNotes().subscribe(res => {
        console.log(res);
        this.notes = res;
      })
  }

  async addPoll(){
    this.dataService.addPoll({topic: this.topic.toLocaleUpperCase(),
      question: this.question.toLocaleUpperCase(),
      option1: this.option1.toLocaleUpperCase(),
      option2: this.option2.toLocaleUpperCase(),
      option3: this.option3.toLocaleUpperCase(),
      option4: this.option4.toLocaleUpperCase(),
      option5: this.option5.toLocaleUpperCase(),
      email: this.email,
      });
      let toast = await this.toastCtrl.create({
        message: 'Poll added Successfully',
        duration: 1000,
        color: 'danger',
        position: 'bottom'
      })
        toast.present();
        //await alert.present();
        this.router.navigateByUrl('/admin');
        console.log('poll added successfully!')
   }

  async addNote(note){
    const alert = await this.alertCtrl.create({
      header: 'Add note',
      inputs: [{
       name: 'title',
       placeholder: 'My cool note',
       type: 'text',
      },
     {
       name: 'text',
       placeholder: 'My cool io nic',
       type: 'textarea',
     }],
     buttons: [{
       text: 'Cancel',
       role: 'cancel'
     },
     {
       text: 'Add',
       handler: (res) => {
         this.dataService.addNote({title: res.title, text: res.text});
       }
     }
     ]
    });
    await alert.present();

  }


  ngOnInit() {
  }

}
