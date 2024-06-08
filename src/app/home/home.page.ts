import { Component } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonIcon,
  IonItemDivider
} from '@ionic/angular/standalone';
import {addIcons} from "ionicons";
import {cameraOutline, locationOutline} from "ionicons/icons";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonIcon, IonItemDivider],
})
export class HomePage {
  constructor() {
    addIcons({ cameraOutline, locationOutline })
  }
}
