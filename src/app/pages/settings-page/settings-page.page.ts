import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
    IonButtons,
    IonCol,
    IonContent,
    IonGrid,
    IonHeader,
    IonMenuButton, IonRow,
    IonTitle,
    IonToolbar
} from '@ionic/angular/standalone';
import {SettingsComponent} from "../../components/settings/settings.component";

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.page.html',
  styleUrls: ['./settings-page.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButtons, IonCol, IonGrid, IonMenuButton, IonRow, SettingsComponent]
})
export class SettingsPagePage {

  constructor() { }



}
