import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {IonCol, IonContent, IonGrid, IonRow} from '@ionic/angular/standalone';
import {CreateAccountComponent} from "../../components/create-account/create-account.component";

@Component({
  selector: 'app-create-account-page',
  templateUrl: './create-account.page.html',
  styleUrls: ['./create-account.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, CreateAccountComponent, IonGrid, IonRow, IonCol]
})
export class CreateAccountPage {

  constructor() { }

}
