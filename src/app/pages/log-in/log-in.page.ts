import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {IonCol, IonContent, IonGrid, IonHeader, IonRow,} from '@ionic/angular/standalone';
import {LoginComponent} from "../../components/login/login.component";

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.page.html',
  styleUrls: ['./log-in.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, LoginComponent, IonCol, IonGrid, IonRow]
})
export class LogInPage {

  constructor() { }


}
