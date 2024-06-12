import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {
  IonButton,
  IonCheckbox,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonItemDivider,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';

import {Geolocation} from "@capacitor/geolocation";
import {haversineDistance} from "../geolocation.utils";
import {Router} from "@angular/router";

@Component({
  selector: 'app-task-1',
  templateUrl: './task-1.page.html',
  styleUrls: ['./task-1.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonItem, IonInput, IonCheckbox, IonItemDivider, IonButton]
})

export class Task1Page {

  isCompleted = false;
  distanceToTarget: number | null = null;

  readonly TARGET_COORDS = {
    latitude: 47.071945403994924,
    longitude: 8.348885173299777,
  };
  readonly DISTANCE_THRESHOLD = 50;

  constructor(private router: Router) {
  }

  async getCurrentPosition() {
    try {
      const coordinates = await Geolocation.getCurrentPosition();

      const currentCoords = {
        latitude: coordinates.coords.latitude,
        longitude: coordinates.coords.longitude,
      };

      const distance = haversineDistance(currentCoords, this.TARGET_COORDS);

      this.distanceToTarget = distance;

      this.isCompleted = distance <= this.DISTANCE_THRESHOLD;
    } catch (error) {
      console.error('Error getting current position:', error);
    }
  }

  navigateToTask2() {
    if (this.isCompleted) {
      this.router.navigate(['task-2']).then(() => {});
    }
  }

  backToStart() {
    this.router.navigate(['start-hunt']).then(r => {
    });
  }
}
