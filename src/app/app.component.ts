import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  //profilePix='assets/img/blankpx.png';
  public folder: string;

  public appPages = [
    { title: 'Profile', url: '/profile', icon: 'Person' },
    { title: 'Admin', url: '/admin', icon: 'add-circle' },
    { title: 'Settings', url: '/folder/Outbox', icon: 'settings' },
    { title: 'Notification', url: '/folder/Favorites', icon: 'notifications' },
    { title: 'Help', url: '/folder/Archived', icon: 'help-circle' },
    { title: 'Contact Us', url: '/folder/Trash', icon: 'call' },
    //{ title: 'Logout', url: '/folder/Spam', icon: 'log-out' },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor(private activatedRoute: ActivatedRoute,) {}
  // ngOnInit() {
  //   this.folder = this.activatedRoute.snapshot.paramMap.get('id');
  // }
}
