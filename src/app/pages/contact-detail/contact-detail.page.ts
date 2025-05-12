import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonAvatar, IonBackButton, IonButtons,
  IonCard, IonCardContent,
  IonCardHeader, IonCardSubtitle, IonCardTitle,
  IonContent,
  IonHeader, IonText,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import {ActivatedRoute} from "@angular/router";
import {Contact} from "../../models/contact";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.page.html',
  styleUrls: ['./contact-detail.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonCardHeader, IonCard, IonAvatar, IonCardTitle, IonCardSubtitle, IonText, IonCardContent, IonContent, IonTitle, IonBackButton, IonButtons, IonToolbar, IonHeader]
})
export class ContactDetailPage implements OnInit {

  name: string = ' ';
  email: string = ' ';
  birthday: string = ' ';
  description: string = ' ';
  profilePhoto: string = 'assets/images/userphoto.png';

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
    ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id){
      this.userService.getUserByID(id).subscribe(user => {
        this.profilePhoto = user.profilePhoto;
        this.name = user.name;
        this.email = user.email;
        this.birthday = user.birthday;
        this.description = user.description;
      })
    }
  }

}
