import { Component, Input, OnInit } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { DataService, Profile } from '../services/data.service';

@Component({
  selector: 'app-pixmodel',
  templateUrl: './pixmodel.page.html',
  styleUrls: ['./pixmodel.page.scss'],
})
export class PixmodelPage implements OnInit {
  @Input() id: string;
  profilePix: any;
  imagepath: any;
  constructor(private dataService: DataService,) { }

  takePicture = async (type) => {
    //remove the pix before putting a new one
    this.dataService.deleteProfilePix(
      this.profilePix,
     );
     //
     this.dataService.deleteProfilePix(
      this.profilePix,
     );
     //
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri,
      source: CameraSource[type],
    });
    //this.dataService.UpdateProfilePix(this.imagepath);
    // image.webPath will contain a path that can be set as an image src.
    // You can access the original file using image.path, which can be
    // passed to the Filesystem API to read the raw data of the image,
    // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
    this.profilePix = image.webPath;

    //this.imagepath.push(this.profilePix)
    //console.log(this.profilePix)

    console.log('image: '+ this.imagepath);
    this.dataService.addProfilePix({
      PixPath: this.profilePix
    });
    if(CameraSource.Photos==null){
      //this.imagepath.pop[0];
    }


    // var fs = require('fs');
    // fs.rename('sample_old.txt', 'sample_new.txt', function (err) {
    //   if (err) throw err;
    //   console.log('File Renamed.');

    // Can be set to the src of an image now
    //imageElement.src = imageUrl;
// const axios = require('axios');
// const path = require('path');
// const fs = require('file-system');

// axios.get('https://picsum.photos/id/237/200/300')
//   .then((data) => {
//     fs.writeFile(path.resolve(__dirname, 'assets/img/'), data.data, (err) => {
//       if (err) {
//         console.log(err);
//         throw err;
//       }
//       console.log('file save successfully');
//     });
//   })
//   .catch((err) => {
//     console.log(err);
//   });

}
deleteFunction(){
  this.dataService.getProfilePix().subscribe(res =>{
      this.profilePix = res.pop();
      // this.dataService.addProfilePix({
      //   PixPath: this.profilePix
      // });
      console.log(this.profilePix)
    });
  this.dataService.deleteProfilePix(
    this.profilePix,
   );

  }
  ngOnInit() {
    // this.dataService.getProfilePixById(this.id).subscribe(res =>{
    //   this.profilePix = res;
    //   console.log(this.profilePix)
    // });
    this.dataService.getProfilePix().subscribe(res =>{
      this.profilePix = res;
      console.log(this.profilePix)
    });
  }

}
