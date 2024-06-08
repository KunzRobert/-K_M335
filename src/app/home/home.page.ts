import {Component} from '@angular/core';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonItemDivider,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import {addIcons} from "ionicons";
import {cameraOutline, locationOutline} from "ionicons/icons";
import {Camera} from '@capacitor/camera';
import {AsyncPipe, NgClass} from "@angular/common";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonIcon, IonItemDivider, AsyncPipe, NgClass],
})
export class HomePage {

  hasCameraPermissions = false;

  constructor() {
    addIcons({cameraOutline, locationOutline})

    Camera.checkPermissions()
      .then(c => this.hasCameraPermissions = c.camera === 'granted');
  }

  async requestPermissions(): Promise<void> {
    Camera.requestPermissions({permissions: ['camera']})
      .then(res => this.hasCameraPermissions = res.camera === 'granted')
  }

  hasCameraAccess(): boolean {
    return this.hasCameraPermissions;
  }
}
