import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {IonCol, IonContent, IonGrid, IonHeader, IonRow,} from '@ionic/angular/standalone';
import {HeaderComponent} from "../../components/header/header.component";
import {PhotoCarruselComponent} from "../../components/photo-carrusel/photo-carrusel.component";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.page.html',
  styleUrls: ['./main-page.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, CommonModule, FormsModule, HeaderComponent, PhotoCarruselComponent, IonCol, IonGrid, IonRow]
})
export class MainPagePage {

  constructor() { }

}
