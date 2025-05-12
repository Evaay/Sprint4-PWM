import {Component, Input} from '@angular/core';
import {Contact} from "../../models/contact";
import {IonIcon} from "@ionic/angular/standalone";
import { heart, heartOutline, heartSharp } from 'ionicons/icons'

@Component({
  selector: 'app-contact-box',
  templateUrl: './contact-box.component.html',
  styleUrls: ['./contact-box.component.scss'],
  imports: [
    IonIcon
  ]
})
export class ContactBoxComponent {
  heartOutline = heartOutline;
  heartFilled = heart;
  @Input() contact!: Contact;
  private audio= new Audio();
  isFavorite: boolean = false;

  constructor() {
    this.audio.src = "assets/images/audio.mp3";
    this.audio.load();
  }

  playAudio(){
    this.audio.play();
  }

  toggleFavorite() {
    this.isFavorite = !this.isFavorite;
  }

}
