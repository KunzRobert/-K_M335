import { Component } from '@angular/core';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonItemDivider,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { cameraOutline, locationOutline } from 'ionicons/icons';
import { Camera } from '@capacitor/camera';
import { AsyncPipe, NgClass } from '@angular/common';
import { Geolocation } from '@capacitor/geolocation';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonIcon,
    IonItemDivider,
    AsyncPipe,
    NgClass,
  ],
})
export class HomePage {
  hasCameraPermission = false;
  hasLocationPermission = false;

  constructor(private router: Router) {
    addIcons({ cameraOutline, locationOutline });

    Camera.checkPermissions().then(
      c => (this.hasCameraPermission = c.camera === 'granted')
    );

    Geolocation.checkPermissions().then(
      c => (this.hasLocationPermission = c.location === 'granted')
    );
  }

  async requestCameraPermission(): Promise<void> {
    Camera.requestPermissions({ permissions: ['camera'] }).then(
      res => (this.hasCameraPermission = res.camera === 'granted')
    );
  }

  hasCameraAccess(): boolean {
    return this.hasCameraPermission;
  }

  async requestLocationPermission(): Promise<void> {
    Geolocation.requestPermissions({ permissions: ['location'] }).then(
      res => (this.hasLocationPermission = res.location === 'granted')
    );
  }

  hasLocationAccess(): boolean {
    return this.hasLocationPermission;
  }

  hasPermissions(): boolean {
    return this.hasLocationPermission && this.hasCameraPermission;
  }

  navigateToStartHunt() {
    if (this.hasPermissions()) {
      this.router.navigate(['start-hunt']).then();
    }
  }
}
