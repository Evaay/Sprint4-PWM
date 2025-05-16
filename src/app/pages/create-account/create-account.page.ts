import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {IonCol, IonContent, IonGrid, IonHeader, IonRow, IonTitle, IonToolbar} from '@ionic/angular/standalone';
import {CreateAccountComponent} from "../../components/create-account/create-account.component";
import {HeaderComponent} from "../../components/header/header.component";

@Component({
  selector: 'app-create-account-page',
  templateUrl: './create-account.page.html',
  styleUrls: ['./create-account.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, CommonModule, FormsModule, CreateAccountComponent, IonGrid, IonRow, IonCol, HeaderComponent]
})
export class CreateAccountPage {

  constructor() { }

}
