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
  readonly DISTANCE_THRESHOLD = 5;

  constructor() {
  }

  async getCurrentPosition() {
    const coordinates = await Geolocation.getCurrentPosition();

    const currentCoords = {
      latitude: coordinates.coords.latitude,
      longitude: coordinates.coords.longitude,
    };

    const distance = haversineDistance(currentCoords, this.TARGET_COORDS);

    this.distanceToTarget = distance;

    if (distance <= this.DISTANCE_THRESHOLD) {
      this.isCompleted = true;
    } else {
      this.isCompleted = false;
    }
  }
}
