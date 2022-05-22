import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-tmodel',
  templateUrl: './tmodel.page.html',
  styleUrls: ['./tmodel.page.scss'],
})
export class TmodelPage implements OnInit {
  topics = [];
  Polls: any;

  constructor(private dataService: DataService,
    private alertCtrl: AlertController,) {
    this.dataService.getPoll().subscribe(async res => {
      console.log(res);
      //let topics = [];
      for(let i =0; i< res.length; i++){
        this.topics.push(res[i].topic)
      }
      console.log(this.topics);
    })
  }

  async deletePoll(id){
    const alert = await this.alertCtrl.create({
     header: 'Delete',
     //cssClass: 'logout',
     //color: 'danger',
     message: 'Are you sure you want to Delete this Poll?',
    buttons: [{
      text: 'No',
      role: 'cancel',
      cssClass: 'cancel-button',
    },
    {
      text: 'Yes',
      handler: () => {
       this.dataService.deletePoll(
         id,
        );
      }
    }
    ]
   });
   await alert.present();
    console.log("delete Function",id)
 }

  ngOnInit() {
    this.dataService.getPoll().subscribe(res =>{
      this.Polls = res;
      //this.PalntLenght = this.Plants.length;
      console.log(res)
    });
  }

}
