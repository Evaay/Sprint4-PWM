import {Component, OnInit} from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonMenuButton,
  IonList, IonButton, NavController
} from '@ionic/angular/standalone';
import {UserService} from "../../services/user.service";
import {Contact} from "../../models/contact";
import {Observable} from "rxjs";
import {ContactBoxComponent} from "../../components/contact-box/contact-box.component";
import {AsyncPipe, NgForOf} from "@angular/common";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonMenuButton, IonList, ContactBoxComponent, NgForOf, AsyncPipe],
})
export class HomePage implements OnInit {
  contacts$!: Observable<Contact[]>;
  constructor(
    private userService: UserService,
    private navCtrl: NavController
    ) {}

  ngOnInit() {
    this.loadContacts();
  }

  ionViewWillEnter() {
    this.loadContacts();
  }

  loadContacts() {
    this.contacts$ = this.userService.getUsers();

  }

  showContact(contact: Contact) {
    this.navCtrl.navigateForward(['/contact-detail', contact.id]);
  }
}
