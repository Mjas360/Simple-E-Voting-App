import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient} from '@angular/common/http';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { DataService } from '../services/data.service';
import { ModelPage } from '../model/model.page';
//import { Console } from 'console';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;
  //public question="Do you think mutual Friend is good? Do you think mutual Friend is good? Do you think mutual Friend is good?"
  public form = [
    { val: 'Yes', isChecked: false },
    { val: 'No', isChecked: false },
    // { val: 'Mushroom', isChecked: false }
  ];
  public loadProgress: number=0;
  box = null;
  hideMe= true;
  showMe= false;
  //
  //users: any[]=[];

  poll = [];
  /////////get poll
  email= '';
  topic: string;
  question: string;
  response: string;
  option1: string;
  option2: string;
  option3= '';
  option4= '';
  option5= '';


  constructor(private modalCtrl: ModalController, public loadingController: LoadingController,private dataService: DataService,private alertCtrl: AlertController,private activatedRoute: ActivatedRoute,) {
    this.dataService.getPoll().subscribe(res => {
        console.log(res);
        this.poll=res;
        this.topic = res[0].topic;
        this.question = res[0].question;
        this.option1 = res[0].option1;
        this.option2 = res[0].option2;
        console.log(this.question);
      })
      //if(this.poll == null){
        this.presentLoading();
      //}
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      duration: 1000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }
  async openVote(poll){
    const model = await this.modalCtrl.create({
      component: ModelPage,
      componentProps: {id: poll.id },
      breakpoints: [0, 0.5, 0.8],
      //swipeToClose: true,
      //backdropDismiss: true,
      initialBreakpoint: 0.4,
    });
    model.present();
  }

  hide() {
    this.hideMe = false;
    this.showMe = true;
    // if(this.form.isChecked== true){

    // }
  }
  checkboxClick(e){
    var statement = true;
    if(statement){
      e.checked = true;
      //console.log("==== in Checkbox function ====");
      this.box= true;
    }
    else if(e.checked == false){

      this.box= false;
    }
  }

  submit(){
    for(var i=0; i<this.form.length; i++) {
      console.log(this.form[i].val, this.form[i].isChecked)
    }
    this.loadProgress += 0.3;
       //console.log(this.form)
    // console.log(this.form[0].val)
    // console.log(this.form[0].isChecked)

  }

  // show() {
  //   this.showMe = false;
  // }

  ngOnInit() {
    //read data in firebase database
    // this.http.get("https://console.firebase.google.com/u/0/project/fuconnect-2d25f/database/fuconnect-2d25f-default-rtdb/data/").subscribe(data=>{

    //   this.users = JSON.parse(JSON.stringify(data));
    //   this.users = Object.values(data);
    //   console.log("Data", data)
    //   //console.log("sample",this.users.order)

    // });

    //inbox
    //this.folder = this.activatedRoute.snapshot.paramMap.get('id');
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
  }

}
