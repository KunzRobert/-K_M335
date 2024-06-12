import {Component, OnDestroy, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonButton, IonCheckbox,
  IonContent,
  IonHeader,
  IonIcon,
  IonItemDivider,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import { haversineDistance } from "../geolocation.utils";
import {Geolocation, Position, PositionOptions} from "@capacitor/geolocation";
import {Router} from "@angular/router";

@Component({
  selector: 'app-task-2',
  templateUrl: './task-2.page.html',
  styleUrls: ['./task-2.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, IonIcon, IonItemDivider, IonCheckbox]
})
export class Task2Page implements OnInit, OnDestroy {

  isCompleted = true;
  startCoords: { latitude: number; longitude: number } | null = null;
  watchId: string | null = null;

  readonly DISTANCE_THRESHOLD = 20;

  constructor(private router: Router) { }

  async ngOnInit() {
    const options: PositionOptions = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0
    };

    this.watchId = await Geolocation.watchPosition(options, (position, err) => {
      if (err) {
        this.positionErrorCallback(err);
      } else if (position) {
        this.positionCallback(position);
      }
    });
  }

  ngOnDestroy() {
    if (this.watchId) {
      Geolocation.clearWatch({id: this.watchId}).then(() => {});
    }
  }

  positionCallback(position: Position) {

    const currentCoords = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    };

    if (!this.startCoords) {
      this.startCoords = currentCoords;
    }

    const distance = haversineDistance(this.startCoords, currentCoords);

    if (distance >= this.DISTANCE_THRESHOLD) {
      this.isCompleted = true;
      if (this.watchId) {
        Geolocation.clearWatch({id: this.watchId}).then(() => {});
      }
    }
  }

  positionErrorCallback(error: GeolocationPositionError) {
    console.error('Error getting location', error);
  }

  navigateToTask4() {
    if (this.isCompleted) {
      this.router.navigate(['task-4']).then(() => {});
    }
  }

  backToStart() {
    this.router.navigate(['start-hunt']).then(r => {
    });
  }
}
