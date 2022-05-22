import { Component, Input, OnInit } from '@angular/core';
import { DataService, Poll,  Response } from '../services/data.service';
import { Auth, getAuth, createUserWithEmailAndPassword, onAuthStateChanged,provideAuth, signOut, signInWithEmailAndPassword } from '@angular/fire/auth';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-model',
  templateUrl: './model.page.html',
  styleUrls: ['./model.page.scss'],
})
export class ModelPage implements OnInit {
@Input() id: string;
Null = '';
response: Response = null;
poll: Poll = null;
option1 = 0;
opt1Total = 0;
option2 = 0;
opt2Total = 0;
option3= 0;
opt3Total = 0;
option4= 0;
opt4Total = 0;
option5= 0;
opt5Total = 0;
pollState= 'Vote';
statM = 'View Stats'
email: string;
PollID: string;
option3Checker: any;
///
mailArr = [];
searchEmail: any;
stat = false;
//numberOFvote: any;
////
demoText = 'Select an Option:';
ID: string;
///progressbar
public loadProgress1: number=0;
public loadProgress2: number=0;
public loadProgress3: number=0;
public loadProgress4: number=0;
public loadProgress5: number=0;

  constructor(private dataService: DataService,private toastCtrl: ToastController,) {
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

  //           //////////////////////////////
  //           /////////////////////////////
  //           this.opt1Total = optionA;
  //           this.option1 = (1/100)*optionA;
  //           //option 2
  //           this.opt2Total = optionB;
  //           this.option2 = (1/100)*optionB;
  //           //option 3
  //           this.opt3Total = optionC;
  //           this.option3 = (1/100)*optionC;
  //         }
}

viewstat(){
  this.demoText = 'Vote Statistics:';
  //this.stat = true;
  if(this.stat == true){
    this.stat= false;
    this.statM = 'View Stats'
  }
  else{
    this.stat= true;
    this.statM = 'View Options'
  }
  let numberOfPoll = [];
  let optionOfsameType1 = [];
  let optionOfsameType2 = [];
  let optionOfsameType3 = [];
  let optionOfsameType4 = [];
  let optionOfsameType5 = [];
  function NUMopt(key, Arr){
    for(let i =0; i< Arr.length; i++){
          if(Arr[i].pollID === key){
            numberOfPoll.push(Arr[i])
          }
        }console.log('about to print array sorted by email')
        return numberOfPoll;
  }
  this.dataService.getResponse().subscribe(async res => {
      let obj = NUMopt(this.PollID, res)
      console.log(obj)
      console.log(res);
      //this.opt1Total = obj.length;
      //this.loadProgress1 = (1/50)*this.opt1Total;
      /////function to poll of the s ame categories
      console.log(this.poll.option1)
      function optOfsType1(key, Arr){
        for(let i =0; i< Arr.length; i++){
              if(Arr[i].option === key){
                optionOfsameType1.push(Arr[i])
              }
            }console.log('about to print array sorted by option')
            return optionOfsameType1;
      }
      function optOfsType2(key, Arr){
        for(let i =0; i< Arr.length; i++){
              if(Arr[i].option === key){
                optionOfsameType2.push(Arr[i])
              }
            }console.log('about to print array sorted by option')
            return optionOfsameType2;
      }
      function optOfsType3(key, Arr){
        for(let i =0; i< Arr.length; i++){
              if(Arr[i].option === key){
                optionOfsameType3.push(Arr[i])
              }
            }console.log('about to print array sorted by option')
            return optionOfsameType3;
      }
      function optOfsType4(key, Arr){
        for(let i =0; i< Arr.length; i++){
              if(Arr[i].option === key){
                optionOfsameType4.push(Arr[i])
              }
            }console.log('about to print array sorted by option')
            return optionOfsameType4;
      }
      function optOfsType5(key, Arr){
        for(let i =0; i< Arr.length; i++){
              if(Arr[i].option === key){
                optionOfsameType5.push(Arr[i])
              }
            }console.log('about to print array sorted by option')
            return optionOfsameType5;
      }
      //store option
      let optN1 = optOfsType1(this.poll.option1, res);
      this.opt1Total = optN1.length;
      let optN2 = optOfsType2(this.poll.option2, res);
      this.opt2Total = optN2.length;
      console.log(this.poll.option2)
      let optN3 = optOfsType3(this.poll.option3, obj);
      this.opt3Total = optN3.length;
      let optN4 = optOfsType4(this.poll.option4, obj);
      this.opt4Total = optN4.length;
      let optN5 = optOfsType5(this.poll.option5, obj);
      this.opt5Total = optN5.length;
      //console.log('look what i found: ' +this.opt2Total, optN2, this.poll.option2, 'OBJ'+obj);
      ///store in progressbar
      this.loadProgress1 = (1/50)*this.opt1Total;
      console.log(this.loadProgress3)
      this.loadProgress2 = (1/50)*this.opt2Total;
      this.loadProgress3 = (1/50)*this.opt3Total;
      this.loadProgress4 = (1/50)*this.opt4Total;
      this.loadProgress5 = (1/50)*this.opt5Total;

  })

}
  async addOptiontoFirebase(option){
    let emailArray = [];
    let pollIDArray = [];
    ///function to check for user email and store in an array
    function opt1(key, Arr){
      for(let i =0; i< Arr.length; i++){
            if(Arr[i].email === key){
              emailArray.push(Arr[i])
            }
          }console.log('about to print array sorted by email')
          return emailArray;
    }
    ///function to check for poll id and store in an array
    function opt2(key, Arr){
      for(let i =0; i< Arr.length; i++){
            if(Arr[i].pollID === key){
              pollIDArray.push(Arr[i])
            }
          }console.log('about to print array sorted by ID')
          return pollIDArray;
    }
    ///function to get reaponses;
    this.dataService.getResponse().subscribe(async res => {
      console.log(res)
      //console.log('array:'+this.mailArr);
      console.log(this.email)
      //chack for user email
      let obj = opt1(this.email, res)
      //chack for poll id
      let obj2 = opt2(this.PollID, emailArray)
      console.log(obj);
      console.log(obj2);
      ///////////
      if(pollIDArray.length == 0){
        this.pollState = 'Pls vote?';
        console.log('added to database')
        this.dataService.addResponses({option: option, pollID: this.PollID, email: this.email});
      }
      else if(pollIDArray.length == 1){
        this.pollState = 'vote submitted!';
        let toast = await this.toastCtrl.create({
          message: 'Vote has been submitted',
          duration: 1000,
          position: 'bottom',
          cssClass: 'toast',
          color: 'danger',
        });
        await toast.present();
      }
             })

  }

  ngOnInit() {
    this.dataService.getPollById(this.id).subscribe(res =>{
      this.poll = res;
      this.PollID = res.id;
      //console.log('poll id: '+this.PollID);
      this.option3Checker = res.option3;
      if(this.option3Checker == ''){
        this.option3Checker = false;
      }
      console.log(this.option3Checker);
    });
////////////////////
// this.dataService.getResponseById(this.id).subscribe(res =>{
//   this.response = res;
//   //console.log('poll id: '+this.PollID);
//   //this.option3 = res[0].option3;
//   console.log('Response: '+this.response);
// });
    //this.option3 = 'hello 3'
  }

}

 //////////////////////////////
              /////////////////////////////

          //3
          // else if(this.email != mail){
          //    //this.dataService.addResponses({option: option, pollID: this.PollID, email: this.email})
          //    console.log('cant find user email')

          //    //break;
          //     //break;
          // }
          // else if(this.email == mail){
          //   console.log('found user email')
          //   break;
          //  }
          //4
